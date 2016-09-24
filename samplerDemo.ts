/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />

let SimpleConfig = function () {
    return {
        resume: true
    }
};
class MyScene extends MB.Scene {
    constructor() {
        super(SimpleConfig(), "EY", 2);
        this.mainShader = "prog";
        this.angle = 0;
    }
    protected angle: number;
    public loadAssets() {
        MB.Loaders.loadImage("../assets/images/35479_subitem_full.jpg", "myTex");
    };
    protected mainShader: string;

    protected tex2d: MB.Texture2D;
    protected viewports: Array<MB.Vector4<number>> = new Array(4);
    protected samplers: Array<MB.Sampler> = new Array(4);
    public initialize() {
        var _this = this;

        var gl = MB.Core.getInstance().getGL();

        this.samplers[0] = new MB.Sampler();
        this.samplers[0].parameterf(gl.TEXTURE_MIN_LOD, 0.0);
        this.samplers[0].parameterf(gl.TEXTURE_MAX_LOD, 0.0);
        this.samplers[0].parameteri(gl.TEXTURE_MIN_FILTER, MB.ctes.TextureType.Linear);
        this.samplers[0].parameteri(gl.TEXTURE_MAG_FILTER, MB.ctes.TextureType.Linear);

        this.samplers[1] = new MB.Sampler();
        this.samplers[1].parameterf(gl.TEXTURE_MIN_LOD, 3.0);
        this.samplers[1].parameterf(gl.TEXTURE_MAX_LOD, 3.0);
        this.samplers[1].parameteri(gl.TEXTURE_MIN_FILTER, MB.ctes.TextureType.Linear);
        this.samplers[1].parameteri(gl.TEXTURE_MAG_FILTER, MB.ctes.TextureType.Linear);


        this.samplers[2] = new MB.Sampler();
        this.samplers[2].parameterf(gl.TEXTURE_MIN_LOD, 0.0);
        this.samplers[2].parameterf(gl.TEXTURE_MAX_LOD, 10.0);
        this.samplers[2].parameteri(gl.TEXTURE_MIN_FILTER, MB.ctes.TextureType.Linear);
        this.samplers[2].parameteri(gl.TEXTURE_MAG_FILTER, MB.ctes.TextureType.Linear);


        this.samplers[3] = new MB.Sampler();
        this.samplers[3].parameterf(gl.TEXTURE_MIN_LOD, 0.0);
        this.samplers[3].parameterf(gl.TEXTURE_MAX_LOD, 50.0);
        this.samplers[3].parameteri(gl.TEXTURE_MIN_FILTER, MB.ctes.TextureType.Linear);
        this.samplers[3].parameteri(gl.TEXTURE_MAG_FILTER, MB.ctes.TextureType.Linear);

        MB.ProgramManager.addWithFun("prog", function () {
            var prog = new MB.Program();
            prog.addShader(`#version 300 es
            precision highp float;
            layout(location = 0) in vec3 vertPosition;
            out vec2 uv;
            uniform mat4 viewProj;
            void main(void) {
                uv = vec2(vertPosition.xy * 0.5) + vec2(0.5);
                gl_Position = vec4(vertPosition, 1.0);
            }`, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);

            prog.addShader(`#version 300 es
            precision highp float;

            out vec4 fragColor;
            in vec2 uv;

            uniform sampler2D tex;
            uniform float lodBias;

            void main() {
                fragColor = texture(tex, uv, lodBias * 20.0);
            }`, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            prog._compile();
            prog._link();
            prog.use();

            prog.addUniforms(["tex", "lodBias"]);

            return prog;
        });
        var myTexture = MB.ResourceMap.retrieveAsset("myTex");
        this.tex2d = new MB.Texture2D(myTexture, {
            flipY: true,
            minFilter: MB.ctes.TextureType.Linear,
            magFilter: MB.ctes.TextureType.Linear,
            wrapS: MB.ctes.WrapMode.Clamp2Edge,
            wrapT: MB.ctes.WrapMode.Clamp2Edge,
            autoMipMap: true
        });
    };
    public numPoints: number;
    public update(dt: number) {
        this.angle += MB.Timer.deltaTime() * 0.001;

        var gl = MB.Core.getInstance().getGL();

        this.viewports[0] = new MB.Vector4<number>(
            0, 0,
            gl.canvas.width / 2, gl.canvas.height / 2);
        this.viewports[1] = new MB.Vector4<number>(
            gl.canvas.width / 2, 0,
            gl.canvas.width / 2, gl.canvas.height / 2);
        this.viewports[2] = new MB.Vector4<number>(
            gl.canvas.width / 2, gl.canvas.height / 2,
            gl.canvas.width / 2, gl.canvas.height / 2);
        this.viewports[3] = new MB.Vector4<number>(
            0, gl.canvas.height / 2,
            gl.canvas.width / 2, gl.canvas.height / 2);

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
        prog.sendUniform1i("tex", 0);
        var lodBiasArray = [0.0, 0.0, 3.5, 4.0];
        for (var i = 0; i < 4; ++i) {
            var vp = this.viewports[i];
            MB.GlobalState.setViewport(vp);
            this.samplers[i].bind(0);
            this.tex2d.bind(0);
            prog.sendUniform1f("lodBias", lodBiasArray[i]);
            MB.PostProcess.render();
        }
    };
    public cameraUpdate() {
    };
    public textCB(gui) {
    };
};

var myScene: MyScene;

window.onload = function () {
    myScene = new MyScene();
    myScene.start();
};
