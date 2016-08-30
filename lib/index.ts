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

    protected cubito: MB.Icosphere;
    protected floor: MB.Floor;
    protected skybox: MB.Skybox;
    protected view;
    protected projection;

    protected identityMatrix;
    protected model;
    protected angle = 0;

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

        MB.loaders.loadImage("descarga (2).png", "descarga");
        MB.loaders.loadImage("heightmap.png", "heightmap");
        MB.loaders.loadImage("grass.png", "grass");
    }
    protected tex2d: MB.Texture2D;
    protected tex2d2: MB.Texture2D;
    initialize() {
        this.skybox = new MB.Skybox("assets/images/skybox2", false);

        let grassImage = MB.ResourceMap.retrieveAsset("grass");
        this.tex2d = new MB.Texture2D(grassImage, {
            flipY: true,
            minFilter: MB.TextureType.Linear,
            magFilter: MB.TextureType.Linear,
            wrapS: MB.TextureType.Clamp2Edge,
            wrapT: MB.TextureType.Clamp2Edge
        });

        let heightmapImage = MB.ResourceMap.retrieveAsset("descarga");
        this.tex2d2 = new MB.Texture2D(heightmapImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.TextureType.MirroredRepeat,
            wrapT: MB.TextureType.MirroredRepeat
        });

        this.cubito = new MB.Icosphere(15.0, 1.0);
        this.floor = new MB.Floor(82.0);

        MB.ProgramManager.addWithFun("progubo", (): MB.Program => {
            let prog: MB.Program = new MB.Program();
            prog.addShader(
        `#version 300 es
        precision highp float;

        layout(location = 0) in vec3 position;
        layout(location = 1) in vec3 normal;
        layout(location = 2) in vec2 uv_;

        uniform mat4 projection;
        uniform mat4 view;
        uniform mat4 model;

        out vec3 outPosition;
        out vec3 outNormal;
        out vec2 uv;

        void main() {
            mat3 normalMatrix = mat3(inverse(transpose(model)));

            gl_Position = projection * view * model * vec4(position, 1.0f);
            outNormal = mat3(transpose(inverse(model))) * normal;
            outPosition = vec3(model * vec4(position, 1.0f));

            uv = uv_;

            gl_PointSize = 5.0;
        }`, ProgramCte.shader_type.vertex, ProgramCte.mode.read_text);
            prog.addShader(
        `#version 300 es
        precision highp float;

        in vec3 outNormal;
        in vec3 outPosition;
        in vec2 uv;

        out vec4 fragColor;

        uniform vec3 cameraPos;
        uniform sampler2D tex;

        void main() {
            fragColor = texture(tex, uv);
        }`, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);
            prog.compile();

            prog.use();

            const program = prog.id();

            prog.addUniforms(["projection", "view", "model", "tex"]);

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
        this.tex2d2.bind(0);
        prog.sendUniform1i("tex", 0);

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

        const gl = MB.Core.getInstance().getGL();
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

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
        prog.sendUniformMat4("projection", this.projection);
        prog.sendUniformMat4("view", this.view);

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
