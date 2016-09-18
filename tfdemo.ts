/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />

let SimpleConfig = function () {
    return {
        resume: true,
        render: function() {
            myScene.drawTick = true;
        }
    }
};
class MyScene extends MB.Scene {
    constructor() {
        super(SimpleConfig(), "EY", 2);
        this.mainShader = "prog";
    }
    public loadAssets() { };
    protected tex: MB.Texture2D;
    protected mainShader: string;

    public initialize() {
        var _this = this;

        MB.ProgramManager.addWithFun("prog", function () {
            var prog = new MB.Program();
            prog.addShader(`#version 300 es
            in vec3 aPos;
            void main(void) {
                gl_PointSize = 50.0;
                gl_Position = vec4(-aPos.x, aPos.yz, 1.0);
            }`, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            prog.addShader(`#version 300 es
            precision highp float;
            out vec4 fragColor;
            void main(void) {
                fragColor = vec4( 1.,0.,0., 1. );
            }
            `, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            prog._compile();
            prog.feedbackVarying(["gl_Position"], MB.ctes.TFMode.Separate);
            prog._link();
            prog.use();

            MB.Core.getInstance().getGL().enableVertexAttribArray(0);

            _this.bA = new MB.VertexBuffer(MB.ctes.BufferType.Array);
            _this.bA.bufferData(new Float32Array([0.8, 0.0, 0.0]), MB.ctes.UsageType.DynamicCopy);

            _this.bB = new MB.VertexBuffer(MB.ctes.BufferType.Array);
            _this.bB.bufferData(3 * 4, MB.ctes.UsageType.DynamicCopy);

            _this.ttf = new MB.TransformFeedback();

            console.log(_this.ttf.getVarying(prog, 0));

            return prog;
        });

    };
    public bA: MB.VertexBuffer;
    public bB: MB.VertexBuffer;

    public ttf: MB.TransformFeedback;

    public update(dt: number) {
        this.__resize__();
    };
    public drawTick: boolean = true;
    public draw(dt: number) {
        if (this.drawTick === false) {
            return;
        }
        MB.Core.getInstance().clearColorAndDepth();
        var prog = MB.ProgramManager.get(this.mainShader);
        prog.use();

        const gl = MB.Core.getInstance().getGL();
        this.ttf.bind();

        this.bA.bind();
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        this.bB.bindBufferBase(MB.ctes.BufferType.TransformFeedback, 0);

        this.ttf.beginPoints();
        gl.drawArrays(gl.POINTS, 0, 1);
        this.ttf.end();


        var feedback2 = new ArrayBuffer(3 * Float32Array.BYTES_PER_ELEMENT);
        gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, feedback2);
        console.log(new Float32Array(feedback2));


        gl.bindBufferBase(MB.ctes.BufferType.TransformFeedback, 0, null);

        this.drawTick = false;
        var t = this.bA;
        this.bA = this.bB
        this.bB = t;

    };
    public cameraUpdate() {
    };
    public textCB(gui) {
        gui.add(this.text, "render");
    };
};

var myScene: MyScene;

window.onload = function () {
    myScene = new MyScene();
    myScene.start();
};
