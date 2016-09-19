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
        resume: true
    };
};
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene() {
        _super.call(this, SimpleConfig(), "EY", 2);
        this.viewports = new Array(4);
        this.drawTick = true;
        this.angle = 0;
    }
    MyScene.prototype.loadAssets = function () {
        MB.Loaders.loadImage("../assets/images/35479_subitem_full.jpg", "myTex");
    };
    ;
    MyScene.prototype.initialize = function () {
        var _this = this;
        var gl = MB.Core.getInstance().getGL();
        MB.ProgramManager.addWithFun("progF", function () {
            var prog = new MB.Program();
            prog.addShader("#version 300 es\n            precision highp float;\n            layout(location = 0) in vec3 vertPosition;\n            out vec2 uv;\n            uniform mat4 viewProj;\n            void main(void) {\n                uv = vec2(vertPosition.xy * 0.5) + vec2(0.5);\n                gl_Position = vec4(vertPosition, 1.0);\n            }", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            prog.addShader("#version 300 es\n            precision highp float;\n\n            out vec4 fragColor;\n            in vec2 uv;\n\n            uniform sampler2D tex;\n            uniform bool op;\n\n            void main() {\n                vec4 floatColor = texture(tex, uv);\n                if (op) {\n                    floatColor = floatColor / 64.0 * 64.0;\n                }\n                fragColor = vec4(floatColor);\n            }", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            prog._compile();
            prog._link();
            prog.use();
            prog.addUniforms(["tex", "op"]);
            return prog;
        });
        MB.ProgramManager.addWithFun("progI", function () {
            var prog = new MB.Program();
            prog.addShader("#version 300 es\n            precision highp float;\n            layout(location = 0) in vec3 vertPosition;\n            out vec2 uv;\n            uniform mat4 viewProj;\n            void main(void) {\n                uv = vec2(vertPosition.xy * 0.5) + vec2(0.5);\n                gl_Position = vec4(vertPosition, 1.0);\n            }", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            prog.addShader("#version 300 es\n            precision highp float;\n            precision highp usampler2D;\n\n            out vec4 fragColor;\n            in vec2 uv;\n\n            uniform usampler2D tex;\n            uniform bool op;\n\n            void main() {\n                vec2 uvv = vec2(1.0 - uv.x, uv.y);\n                uvec4 intColor = texture(tex, uvv);\n                if (!op) {\n                    intColor = intColor / 64u * 64u;\n                }\n                fragColor = vec4(intColor) / 255.0;\n            }", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            prog._compile();
            prog._link();
            prog.use();
            prog.addUniforms(["tex", "op"]);
            return prog;
        });
        var myTexture = MB.ResourceMap.retrieveAsset("myTex");
        this.tex2d = new MB.Texture2D(myTexture, {
            flipY: true,
            minFilter: MB.ctes.TextureType.Nearest,
            magFilter: MB.ctes.TextureType.Nearest,
            wrapS: MB.ctes.WrapMode.Clamp2Edge,
            wrapT: MB.ctes.WrapMode.Clamp2Edge,
            autoMipMap: true
        });
        this.tex2d2 = new MB.Texture2D(myTexture, {
            flipY: false,
            internalFormat: gl.RGBA8UI,
            format: gl.RGBA_INTEGER,
            minFilter: MB.ctes.TextureType.Nearest,
            magFilter: MB.ctes.TextureType.Nearest,
            wrapS: MB.ctes.WrapMode.Clamp2Edge,
            wrapT: MB.ctes.WrapMode.Clamp2Edge
        });
    };
    ;
    MyScene.prototype.update = function (dt) {
        this.angle += MB.Timer.deltaTime() * 0.001;
        var gl = MB.Core.getInstance().getGL();
        this.viewports[0] = new MB.Vector4(0, 0, gl.canvas.width / 2, gl.canvas.height / 2);
        this.viewports[1] = new MB.Vector4(gl.canvas.width / 2, 0, gl.canvas.width / 2, gl.canvas.height / 2);
        this.viewports[2] = new MB.Vector4(gl.canvas.width / 2, gl.canvas.height / 2, gl.canvas.width / 2, gl.canvas.height / 2);
        this.viewports[3] = new MB.Vector4(0, gl.canvas.height / 2, gl.canvas.width / 2, gl.canvas.height / 2);
        this.__resize__();
    };
    ;
    MyScene.prototype.draw = function (dt) {
        if (this.drawTick === false) {
            return;
        }
        MB.Core.getInstance().clearColorAndDepth();
        var prog, vp;
        // Floating textures
        prog = MB.ProgramManager.get("progF");
        prog.use();
        prog.sendUniform1i("tex", 0);
        this.tex2d.bind(0);
        // Top-left
        prog.sendUniform1b("op", false);
        vp = this.viewports[3];
        MB.GlobalState.setViewport(vp);
        MB.PostProcess.render();
        // Bottom-left
        prog.sendUniform1b("op", true);
        vp = this.viewports[0];
        MB.GlobalState.setViewport(vp);
        MB.PostProcess.render();
        // Integer textures
        prog = MB.ProgramManager.get("progI");
        prog.use();
        prog.sendUniform1i("tex", 0);
        this.tex2d2.bind(0);
        // Bottom-right
        prog.sendUniform1b("op", false);
        vp = this.viewports[1];
        MB.GlobalState.setViewport(vp);
        MB.PostProcess.render();
        // Top-right
        prog.sendUniform1b("op", true);
        vp = this.viewports[2];
        MB.GlobalState.setViewport(vp);
        MB.PostProcess.render();
        /*var prog = MB.ProgramManager.get("progI");
        prog.use();
        prog.sendUniform1i("tex", 0);
        this.tex2d2.bind(0);
        var vp = this.viewports[3];
        MB.GlobalState.setViewport(vp);
        MB.PostProcess.render();
        vp = this.viewports[0];
        MB.GlobalState.setViewport(vp);
        MB.PostProcess.render();*/
        /*for (var i = 0; i < 4; ++i) {
            if (i < 2) {
                this.tex2d.bind(0);
            } else {
                this.tex2d2.bind(0);
            }
            var vp = this.viewports[i];
            MB.GlobalState.setViewport(vp);
            MB.PostProcess.render();
        }*/
    };
    ;
    MyScene.prototype.cameraUpdate = function () {
    };
    ;
    MyScene.prototype.textCB = function (gui) {
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
