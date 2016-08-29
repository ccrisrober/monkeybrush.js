/// <reference path="library/references.d.ts" />
// TODO:
import * as MonkeyBrush from "./library/MonkeyBrush";

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

class MyScene extends MonkeyBrush.Scene {
    protected camera = new MonkeyBrush.Camera2(new Float32Array([-2.7, -1.4, 11.8]));

    protected cubito: MonkeyBrush.Cube;
    protected skybox: MonkeyBrush.Skybox;
    protected view;
    protected projection;

    protected identityMatrix = mat4.create();
    protected model = mat4.create();
    protected angle = 0;

    protected uniformPerDrawBuffer: MonkeyBrush.VertexUBO;

    constructor() {
        super(SimpleConfig(), "App", 2);
        mat4.identity(this.identityMatrix);
    }

    protected mainShader: string = "progubo";

    loadAssets() {
        // skybox
        MonkeyBrush.loaders.loadImage("assets/images/skybox2/back.jpg");
        MonkeyBrush.loaders.loadImage("assets/images/skybox2/bottom.jpg");
        MonkeyBrush.loaders.loadImage("assets/images/skybox2/front.jpg");
        MonkeyBrush.loaders.loadImage("assets/images/skybox2/left.jpg");
        MonkeyBrush.loaders.loadImage("assets/images/skybox2/right.jpg");
        MonkeyBrush.loaders.loadImage("assets/images/skybox2/top.jpg");

        MonkeyBrush.loaders.loadImage("heightmap.png", "heightmap");
        MonkeyBrush.loaders.loadImage("grass.png", "grass");
    }
    initialize() {
        this.skybox = new MonkeyBrush.Skybox("assets/images/skybox2", false);

        this.cubito = new MonkeyBrush.Cube(15.0);

        MonkeyBrush.ProgramManager.addWithFun("progubo", (): MonkeyBrush.Program => {
            let prog: MonkeyBrush.Program = new MonkeyBrush.Program();
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

        void main() {
            vec3 I = normalize(outPosition - cameraPos);
            vec3 R = reflect(I, normalize(outNormal));
            fragColor = texture(CubeMap, R);

            // float ratio = 1.00 / 1.33;
            // vec3 I = normalize(outPosition - cameraPos);
            // vec3 R = refract(I, normalize(outNormal), ratio);
            // fragColor = texture(CubeMap, R);

        }`, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);
            prog.compile();

            prog.use();

            const program = prog.id();

            this.uniformPerDrawBuffer = new MonkeyBrush.VertexUBO(program, "UboDemo", 0);

            prog.addUniforms(["projection", "view", "model",
                "normalMatrix", "viewPos", "CubeMap"]);

            return prog;
        });

        for (let i = 0; i < 10; ++i) {
            console.log(MonkeyBrush.utils.random.nextInt(1, 6));
        }

        this.cameraUpdate();
    }
    update(dt: number) {
        if (MonkeyBrush.Input.getInstance().isButtonClicked(MonkeyBrush.Input.mouseButton.Left)) {
            console.log("Mouse left clicked");
        }

        this.camera.timeElapsed = MonkeyBrush.Timer.deltaTime() / 10.0;

        this.camera.update(this.cameraUpdate.bind(this));

        this.angle += MonkeyBrush.Timer.deltaTime() * 0.001;
    }
    draw(dt?: number) {
        MonkeyBrush.Core.getInstance().clearColorAndDepth();

        let prog = MonkeyBrush.ProgramManager.get(this.mainShader);
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
                    mat4.translate(this.model, this.identityMatrix,
                        vec3.fromValues(i * 1.0, j * 1.0, k * 1.0));
                    mat4.rotateY(this.model, this.model, 90.0 * Math.PI / 180);
                    mat4.rotateY(this.model, this.model, this.angle * 0.5 * dd);
                    mat4.scale(this.model, this.model, vec3.fromValues(0.25, 0.25, 0.25));

                    prog.sendUniformMat4("model", this.model);
                    this.cubito[mode]();
                }
            }
        }
        this.skybox.render(this.view, this.projection);
    }
    cameraUpdate() {
        let canvas = MonkeyBrush.Core.getInstance().canvas();
        this.view = this.camera.GetViewMatrix();
        this.projection = this.camera.GetProjectionMatrix(canvas.width, canvas.height);

        let prog = MonkeyBrush.ProgramManager.get(this.mainShader);
        prog.use();

        prog.sendUniformVec3("viewPos", this.camera.position);

        let transforms = new Float32Array([]);
        transforms = MonkeyBrush.utils.Float32Concat(transforms, this.projection);
        transforms = MonkeyBrush.utils.Float32Concat(transforms, this.view);

        this.uniformPerDrawBuffer.update(transforms);
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
