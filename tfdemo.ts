/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />

let SimpleConfig = function () {
    return {
        resume: true,
        layer: 32
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

    protected tex3d: MB.Texture3D;
    protected texture: WebGLTexture;
    public initialize() {
        var _this = this;

        var gl = MB.Core.getInstance().getGL();

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
            precision highp sampler3D;

            out vec4 fragColor;
            in vec2 uv;

            uniform sampler3D tex;
            uniform float layer;

            void main() {
                float r = texture(tex, vec3(uv, layer)).r;
                fragColor = vec4(vec3(r), 1.0);
            }`, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
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
            minFilter: MB.ctes.TextureType.Linear, //_MIPMAP_LINEAR,
            magFilter: MB.ctes.TextureType.Linear,
            autoMipMap: true,
            internalFormat: gl.R8,
            format: MB.ctes.TextureFormat.RED,
            type: gl.UNSIGNED_BYTE
        });
    };
    public update(dt: number) {
        this.angle += MB.Timer.deltaTime() * 0.001;

        var gl = MB.Core.getInstance().getGL();
        //this.text.layer = Math.random();

        this.__resize__();
    };
    public draw(dt: number) {
        MB.Core.getInstance().clearColorAndDepth();
        var prog = MB.ProgramManager.get(this.mainShader);
        prog.use();
        this.tex3d.bind(0);
        prog.sendUniform1i("tex", 0);
        prog.sendUniform1f("layer", this.text.layer * 1.0);
        MB.PostProcess.render();
    };
    public cameraUpdate() {
    };
    public textCB(gui) {
        gui.add(this.text, "layer", 0, 64);
    };
};

var myScene: MyScene;

window.onload = function () {
    myScene = new MyScene();
    myScene.start();
};
