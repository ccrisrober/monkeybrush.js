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
    public loadAssets() { };
    protected mainShader: string;

    protected tex2: MB.Texture2DArray;
    public initialize() {
        var _this = this;

        MB.ProgramManager.addWithFun("prog", function () {
            var prog = new MB.Program();
            prog.addShader(`#version 300 es
            precision highp float;
            layout(location = 0) in vec3 vertPosition;
            out vec2 uv;
            uniform mat4 viewProj;
            void main(void) {
                uv = vec2(vertPosition.xy * 0.5) + vec2(0.5);
                vec3 pos = vertPosition;
                pos *= 50.0;
                gl_Position = viewProj * vec4(pos, 1.0);
            }`, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);

            prog.addShader(`#version 300 es
            precision highp float;
            precision highp sampler2DArray;

            out vec4 fragColor;
            in vec2 uv;

            uniform sampler2DArray tex;

            void main() {
                if (uv.x < 0.5) {
                    if (uv.y < 0.5) {
                        fragColor = texture(tex, vec3(uv, 0.0));
                    } else {
                        fragColor = texture(tex, vec3(uv, 2.0));
                    }
                } else {
                    if (uv.y > 0.5) {
                        fragColor = texture(tex, vec3(uv, 1.0));
                    } else {
                        fragColor = texture(tex, vec3(uv, 3.0));
                    }
                }
            }`, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            prog._compile();
            prog._link();
            prog.use();

            prog.addUniforms(["viewProj", "tex"]);

            return prog;
        });
        var texSize = 1024;

        var gl = MB.Core.getInstance().getGL();

        var bb1 = new Uint8Array(texSize * texSize * 3);
        var checkSize = 5;
        var n = 0;
        // Generate some checker board pattern
        for (var y = 0; y < texSize; ++y) {
            for (var x = 0; x < texSize; ++x) {
                if (((x/checkSize + y/checkSize) % 2) == 0) {
                    bb1[n++] = 255;
                    bb1[n++] = 255;
                    bb1[n++] = 255;
                } else {
                    bb1[n++] = 0;
                    bb1[n++] = 0;
                    bb1[n++] = 0;
                }
            }
        }
        var bb2 = new Uint8Array(texSize * texSize * 3);
        n = 0;
        // Generate some diagonal lines for the second layer
        for (var y = 0; y < texSize; y++) {
            for (var x = 0; x < texSize; x++) {
                if ((x + y) / 3 % 3 == 0) {
                    bb2[n++] = 255;
                    bb2[n++] = 255;
                    bb2[n++] = 255;
                } else {
                    bb2[n++] = 128;
                    bb2[n++] = 128;
                    bb2[n++] = 128;
                }
            }
        }
        var bb3 = new Uint8Array(texSize * texSize * 3);
        n = 0;
        // Generate some diagonal lines for the second layer
        for (var y = 0; y < texSize; y++) {
            for (var x = 0; x < texSize; x++) {
                if ((x + y) / 4 % 4 == 1) {
                    bb3[n++] = 128;
                    bb3[n++] = 128;
                    bb3[n++] = 128;
                } else {
                    bb3[n++] = 255;
                    bb3[n++] = 255;
                    bb3[n++] = 255;
                }
            }
        }
        var bb4 = new Uint8Array(texSize * texSize * 3);
        n = 0;
        // Generate some checker board pattern
        for (var y = 0; y < texSize; ++y) {
            for (var x = 0; x < texSize; ++x) {
                if (((x/checkSize + y/checkSize) % 2) == 1) {
                    bb4[n++] = 0;
                    bb4[n++] = 0;
                    bb4[n++] = 0;
                } else {
                    bb4[n++] = 255;
                    bb4[n++] = 255;
                    bb4[n++] = 255;
                }
            }
        }
        this.tex2 = new MB.Texture2DArray(new MB.Vector2<number>(texSize, texSize), [
            bb1, bb2, bb3, bb4
        ], {
            autoMipMap: true,
            minFilter: gl.LINEAR,    // LINEAR_MIPMAP_LINEAR
            magFilter: gl.LINEAR,
            internalFormat: gl.RGB8,
            level: 0,
            format: gl.RGB,
            type: gl.UNSIGNED_BYTE
        });
    };
    public numPoints: number;
    public update(dt: number) {
        this.angle += MB.Timer.deltaTime() * 0.001;
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

        var viewProj = mat4.create();
        var proj = mat4.create();
        var canvas = gl.canvas;
        mat4.perspective(proj, MB.Mathf.degToRad(60.0), canvas.width / canvas.height, 0.01, 100.0);
        var view = mat4.create();
        mat4.lookAt(view,
            new Float32Array([0.0, 1.0, 5.0]),
            new Float32Array([0.0, 0.0, 0.0]),
            new Float32Array([0.0, 1.0, 0.0]));
        mat4.mul(viewProj, proj, view);

        this.tex2.bind(0);
        prog.sendUniform1i("tex", 0);
        prog.sendUniformMat4("viewProj", viewProj);
        MB.PostProcess.render();
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
