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
        this.angle = 0;
    }
    protected angle: number;
    public loadAssets() {
        MB.Loaders.loadImage("../assets/images/35479_subitem_full.jpg", "myTex");
    };
    protected mainShader: string;

    protected tex2d: MB.Texture2D;
    protected tex2d2: MB.Texture2D;
    protected viewports: Array<MB.Vector4<number>> = new Array(4);
    public initialize() {
        var _this = this;

        var gl = MB.Core.getInstance().getGL();

        MB.ProgramManager.addWithFun("progF", function () {
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
            uniform bool op;

            void main() {
                vec4 floatColor = texture(tex, uv);
                if (op) {
                    floatColor = floatColor / 64.0 * 64.0;
                }
                fragColor = vec4(floatColor);
            }`, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            prog._compile();
            prog._link();
            prog.use();

            prog.addUniforms(["tex", "op"]);

            return prog;
        });
        MB.ProgramManager.addWithFun("progI", function () {
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
            precision highp usampler2D;

            out vec4 fragColor;
            in vec2 uv;

            uniform usampler2D tex;
            uniform bool op;

            void main() {
                vec2 uvv = vec2(1.0 - uv.x, uv.y);
                uvec4 intColor = texture(tex, uvv);
                if (!op) {
                    intColor = intColor / 64u * 64u;
                }
                fragColor = vec4(intColor) / 255.0;
            }`, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
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

        var prog: MB.Program,
            vp: MB.Vector4<number>;
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
