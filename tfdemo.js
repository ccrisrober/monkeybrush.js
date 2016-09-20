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
        layer: 32
    };
};
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene() {
        _super.call(this, SimpleConfig(), "EY", 2);
        this.mainShader = "prog";
        this.angle = 0;
    }
    MyScene.prototype.loadAssets = function () {
        MB.Loaders.loadImage("../assets/images/35479_subitem_full.jpg", "myTex");
    };
    ;
    MyScene.prototype.initialize = function () {
        var _this = this;
        var gl = MB.Core.getInstance().getGL();
        MB.ProgramManager.addWithFun("prog", function () {
            var prog = new MB.Program();
            prog.addShader("#version 300 es\n            precision highp float;\n            layout(location = 0) in vec3 vertPosition;\n            out vec2 uv;\n            uniform mat4 viewProj;\n            void main(void) {\n                uv = vec2(vertPosition.xy * 0.5) + vec2(0.5);\n                gl_Position = vec4(vertPosition, 1.0);\n            }", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            prog.addShader("#version 300 es\n            precision highp float;\n            precision highp sampler3D;\n\n            out vec4 fragColor;\n            in vec2 uv;\n\n            uniform sampler3D tex;\n            uniform float layer;\n\n            void main() {\n                float r = texture(tex, vec3(uv, layer)).r;\n                fragColor = vec4(vec3(r), 1.0);\n            }", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            prog._compile();
            prog._link();
            prog.use();
            prog.addUniforms(["tex", "layer"]);
            return prog;
        });
        var size = 64;
        var data = new Uint8Array(Math.pow(size, 3));
        for (var k = 0; k < size; ++k) {
            for (var j = 0; j < size; ++j) {
                for (var i = 0; i < size; ++i) {
                    data[i + j * size + k * size * size] = MB.RandomGenerator.random() * 255; //Math.floor(MB.Noise.worley.Euclidean(i, j, k)[0] * 255);
                }
            }
        }
        this.tex3d = new MB.Texture3D(data, new MB.Vect3(size, size, size), {
            minFilter: MB.ctes.TextureType.Linear,
            magFilter: MB.ctes.TextureType.Linear,
            autoMipMap: true,
            internalFormat: gl.R8,
            format: MB.ctes.TextureFormat.RED,
            type: gl.UNSIGNED_BYTE
        });
    };
    ;
    MyScene.prototype.update = function (dt) {
        this.angle += MB.Timer.deltaTime() * 0.001;
        var gl = MB.Core.getInstance().getGL();
        //this.text.layer = Math.random();
        this.__resize__();
    };
    ;
    MyScene.prototype.draw = function (dt) {
        MB.Core.getInstance().clearColorAndDepth();
        var prog = MB.ProgramManager.get(this.mainShader);
        prog.use();
        this.tex3d.bind(0);
        prog.sendUniform1i("tex", 0);
        prog.sendUniform1f("layer", this.text.layer * 1.0);
        MB.PostProcess.render();
    };
    ;
    MyScene.prototype.cameraUpdate = function () {
    };
    ;
    MyScene.prototype.textCB = function (gui) {
        gui.add(this.text, "layer", 0, 64);
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
