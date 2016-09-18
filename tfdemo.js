/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleConfig = function () {
    return {
        resume: true,
        render: function () {
            myScene.drawTick = true;
        }
    };
};
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene() {
        _super.call(this, SimpleConfig(), "EY", 2);
        this.drawTick = true;
        this.mainShader = "prog";
    }
    MyScene.prototype.loadAssets = function () { };
    ;
    MyScene.prototype.initialize = function () {
        var _this = this;
        MB.resources.ProgramManager.addWithFun("prog", function () {
            var prog = new MB.core.Program();
            prog.addShader("#version 300 es\n            in vec3 aPos;\n            void main(void) {\n                gl_PointSize = 50.0;\n                gl_Position = vec4(-aPos.x, aPos.yz, 1.0);\n            }", MB.ctes.ProgramCte.shader_type.vertex, MB.ctes.ProgramCte.mode.read_text);
            prog.addShader("#version 300 es\n            precision highp float;\n            out vec4 fragColor;\n            void main(void) {\n                fragColor = vec4( 1.,0.,0., 1. );\n            }\n            ", MB.ctes.ProgramCte.shader_type.fragment, MB.ctes.ProgramCte.mode.read_text);
            prog._compile();
            prog.feedbackVarying(["gl_Position"], MB.ctes.TFMode.Separate);
            prog._link();
            prog.use();
            MB.core.Core.getInstance().getGL().enableVertexAttribArray(0);
            _this.bA = new MB.core.VertexBuffer(MB.ctes.BufferType.Array);
            _this.bA.bufferData(new Float32Array([0.8, 0.0, 0.0]), MB.ctes.UsageType.DynamicCopy);
            _this.bB = new MB.core.VertexBuffer(MB.ctes.BufferType.Array);
            _this.bB.bufferData(3 * 4, MB.ctes.UsageType.DynamicCopy);
            _this.ttf = new MB.core.TransformFeedback();
            console.log(_this.ttf.getVarying(prog, 0));
            return prog;
        });
    };
    ;
    MyScene.prototype.update = function (dt) {
        this.__resize__();
    };
    ;
    MyScene.prototype.draw = function (dt) {
        if (this.drawTick === false) {
            return;
        }
        MB.core.Core.getInstance().clearColorAndDepth();
        var prog = MB.resources.ProgramManager.get(this.mainShader);
        prog.use();
        var gl = MB.core.Core.getInstance().getGL();
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
        this.bA = this.bB;
        this.bB = t;
    };
    ;
    MyScene.prototype.cameraUpdate = function () {
    };
    ;
    MyScene.prototype.textCB = function (gui) {
        gui.add(this.text, "render");
    };
    ;
    return MyScene;
}(MB.Scene));
;
var myScene;
window.onload = function () {
    myScene = new MyScene();
    myScene.start();
};
