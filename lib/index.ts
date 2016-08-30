/// <reference path="library/references.d.ts" />
// TODO:
import * as MB from "./library/MonkeyBrush";

import { ProgramCte } from "./library/constants/ProgramCte";
// import { TextureType } from "./library/constants/TextureType";

"use strict";

let SimpleConfig = function() {
    return {
        max: 10,
        resume: true,
        render: "0"
    };
};

class MyScene extends MB.Scene {
    protected camera = new MB.Camera2(new MB.Vect3(-2.7, -1.4, 11.8));

    protected cubito: MB.Cube;
    protected floor: MB.Floor;
    protected skybox: MB.Skybox;
    protected view;
    protected projection;

    protected identityMatrix;
    protected model;
    protected angle = 0;

    protected uniformPerDrawBuffer: MB.VertexUBO;
    protected uniformPerDrawBuffer2: MB.VertexUBO;

    constructor() {
        super(SimpleConfig(), "App", 2);
        this.identityMatrix = new MB.Mat4().identity();
        this.model = new MB.Mat4();
    }

    protected mainShader: string = "progubo";

    loadAssets() {
        // skybox
        MB.loaders.loadImage("assets/images/skybox2/back.jpg");
        MB.loaders.loadImage("assets/images/skybox2/bottom.jpg");
        MB.loaders.loadImage("assets/images/skybox2/front.jpg");
        MB.loaders.loadImage("assets/images/skybox2/left.jpg");
        MB.loaders.loadImage("assets/images/skybox2/right.jpg");
        MB.loaders.loadImage("assets/images/skybox2/top.jpg");

        MB.loaders.loadImage("heightmap.png", "heightmap");
        MB.loaders.loadImage("grass.png", "grass");
    }
    initialize() {
        this.skybox = new MB.Skybox("assets/images/skybox2", false);

        this.cubito = new MB.Cube(15.0);
        this.floor = new MB.Floor(82.0);

        MB.ProgramManager.addWithFun("progubo", (): MB.Program => {
            let prog: MB.Program = new MB.Program();
            prog.addShader(
        `#version 300 es
        precision highp float;

        layout(location = 0) in vec3 position;
        layout(location = 1) in vec3 normal;
        layout(location = 2) in vec2 uv;

        uniform mat4 model;

        layout(std140, column_major) uniform;

        uniform UboDemo {
            mat4 projection;
            mat4 view;
        } ubo1;

        out vec3 outPosition;
        out vec3 outNormal;

        void main() {
            mat3 normalMatrix = mat3(inverse(transpose(model)));

            gl_Position = ubo1.projection * ubo1.view * model * vec4(position, 1.0f);
            outNormal = mat3(transpose(inverse(model))) * normal;
            outPosition = vec3(model * vec4(position, 1.0f));

            gl_PointSize = 5.0;
        }`, ProgramCte.shader_type.vertex, ProgramCte.mode.read_text);
            prog.addShader(
        `#version 300 es
        precision highp float;

        in vec3 outNormal;
        in vec3 outPosition;
        out vec4 fragColor;

        uniform vec3 cameraPos;
        uniform samplerCube CubeMap;

        const float invGamma = 1.0 / 2.2;

        const mat4 shR = mat4(
            0.0151426, 0.0441249, -0.0200723, 0.040842,
            0.0441249, -0.0151426, 0.0147908, 0.161876,
            -0.0200723, 0.0147908, 0.0476559, 0.016715,
            0.040842, 0.161876, 0.016715, 0.394388
        );
        const mat4 shG = mat4(
            0.0158047, -0.0553513, -0.0183098, -0.0649404,
            -0.0553513, -0.0158047, 0.0294534, 0.147578,
            -0.0183098, 0.0294534, -0.0211293, 0.030445,
            -0.0649404, 0.147578, 0.030445, 0.381122
        );
        const mat4 shB = mat4(
            -0.00060538, -0.143711, -0.0279153, -0.15276,
            -0.143711, 0.00060538, 0.0364631, 0.183909,
            -0.0279153, 0.0364631, -0.0566425, 0.0386598,
            -0.15276, 0.183909, 0.0386598, 0.419227
        );

        void main() {
            vec4 nor = vec4(normalize(outNormal), 1.0);
            vec3 col;
            col.x = dot(nor, (shR * nor));
            col.y = dot(nor, (shG * nor));
            col.z = dot(nor, (shB * nor));

            //Gamma correction
            fragColor = vec4(pow(col.xyz, vec3(invGamma)), 1.0);
        }`, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);
            prog.compile();

            prog.use();

            const program = prog.id();

            this.uniformPerDrawBuffer = new MB.VertexUBO(program, "UboDemo", 0);

            prog.addUniforms(["model", "CubeMap"]);

            return prog;
        });

        MB.ProgramManager.addWithFun("floor", (): MB.Program => {
            let prog: MB.Program = new MB.Program();
            prog.addShader(
        `#version 300 es
        precision highp float;

        layout(location = 0) in vec3 position;

        uniform mat4 model;

        layout(std140, column_major) uniform;

        uniform UboDemo {
            mat4 projection;
            mat4 view;
        } ubo1;

        void main() {
            gl_Position = ubo1.projection * ubo1.view * model * vec4(position, 1.0f);
        }`, ProgramCte.shader_type.vertex, ProgramCte.mode.read_text);
            prog.addShader(
        `#version 300 es
        precision highp float;

        out vec4 fragColor;

        void main() {
            fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }`, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);
            prog.compile();

            prog.use();

            const program = prog.id();

            this.uniformPerDrawBuffer2 = new MB.VertexUBO(program, "UboDemo", 0);

            prog.addUniforms(["model"]);

            return prog;
        });

        this.cameraUpdate();
    }
    update(dt: number) {
        if (MB.Input.getInstance().isButtonClicked(MB.Input.mouseButton.Left)) {
            console.log("Mouse left clicked");
        }

        this.camera.timeElapsed = MB.Timer.deltaTime() / 10.0;

        this.camera.update(this.cameraUpdate.bind(this));

        this.angle += MB.Timer.deltaTime() * 0.001;
    }
    draw(dt?: number) {
        MB.Core.getInstance().clearColorAndDepth();

        let prog = MB.ProgramManager.get(this.mainShader);
        prog.use();

        let varvar = this.text.max;
        let i = 0, j = 0, k = 0;
        let dd = -1;

        this.skybox.texture.bind(0);
        prog.sendUniform1i("CubeMap", 0);

        const renderMode = this.text.render;
        let mode: string;
        switch (renderMode) {
            case "0":
                mode = "render";
                break;
            case "1":
                mode = "render2";
                break;
            case "2":
                mode = "render3";
                break;
        }

        for (i = -varvar; i < varvar; i += 10.0) {
            for (j = -varvar; j < varvar; j += 10.0) {
                for (k = -varvar; k < varvar; k += 10.0) {
                    dd *= -1;
                    this.model =
                        this.model
                            .reset()
                            .translate(new MB.Vect3(i * 1.0, j * 1.0, k * 1.0))
                            .rotate(90.0 * Math.PI / 180, MB.Vect3.yAxis)
                            .rotate(this.angle * 0.5 * dd, MB.Vect3.yAxis)
                            .scale(new MB.Vect3(0.25, 0.25, 0.25));
                    prog.sendUniformMat4("model", this.model);
                    this.cubito[mode]();
                }
            }
        }
        /*prog = MB.ProgramManager.get("floor");
        prog.use();
        mat4.translate(this.model, this.identityMatrix, vec3.fromValues(0.0, 0.0, 0.0));

        prog.sendUniformMat4("model", this.model);
        this.floor.render();*/
        this.skybox.render(this.view, this.projection);
    }
    cameraUpdate() {
        let canvas = MB.Core.getInstance().canvas();
        this.view = this.camera.GetViewMatrix();
        this.projection = this.camera.GetProjectionMatrix(canvas.width, canvas.height);

        let prog = MB.ProgramManager.get(this.mainShader);
        prog.use();

        prog.sendUniformVec3("viewPos", this.camera.GetPos());

        let transforms = new Float32Array([]);
        transforms = MB.utils.Float32Concat(transforms, this.projection._value);
        transforms = MB.utils.Float32Concat(transforms, this.view._value);

        this.uniformPerDrawBuffer.update(transforms);
        this.uniformPerDrawBuffer2.update(transforms);
    }
    textCB(gui: dat.GUI) {
        gui.add(this.text, "max", 5, 100);
        gui.add(this.text, "render", {
            simple: 0,
            lines: 1,
            points: 2
        });
    }
};

window.onload = () => {
    let myScene: MyScene = new MyScene();
    myScene.start();
};
