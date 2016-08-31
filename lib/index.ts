/// <reference path="library/references.d.ts" />
import * as MB from "./library/MonkeyBrush";

"use strict";

let SimpleConfig = function() {
    return {
        max: 10,
        resume: true,
        render: "0"
    };
};

class MyScene extends MB.Scene {
    protected homePoint = new MB.Vect3(-2.7, -1.4, 11.8);
    protected camera = new MB.Camera2(this.homePoint);

    protected cubito: MB.Cube;
    protected Floor: MB.Floor;
    protected skybox: MB.Skybox;
    protected view: MB.Mat4;
    protected projection: MB.Mat4;

    protected identityMatrix;
    protected model;
    protected angle = 0;

    constructor() {
        super(SimpleConfig(), "App", 2);
        this.identityMatrix = new MB.Mat4().identity();
        this.model = new MB.Mat4();
    }

    protected mainShader: string = "prog";

    loadAssets() {
        // skybox
        MB.Loaders.loadImage("assets/images/canyon/back.jpg");
        MB.Loaders.loadImage("assets/images/canyon/bottom.jpg");
        MB.Loaders.loadImage("assets/images/canyon/front.jpg");
        MB.Loaders.loadImage("assets/images/canyon/left.jpg");
        MB.Loaders.loadImage("assets/images/canyon/right.jpg");
        MB.Loaders.loadImage("assets/images/canyon/top.jpg");

        MB.Loaders.loadImage("assets/images/matcap_058.png", "monkey");

        MB.Loaders.loadImage("_images/descarga (1).png", "descarga");
        MB.Loaders.loadImage("assets/images/heightmap.png", "heightmap");
        MB.Loaders.loadImage("assets/images/grass.png", "grass");
    }
    protected tex2d: MB.Texture2D;
    protected tex2d2: MB.Texture2D;
    initialize() {
        this.skybox = new MB.Skybox("assets/images/canyon", this._webglVersion === 2);

        /*let grassImage = MB.ResourceMap.retrieveAsset("grass");
        this.tex2d = new MB.Texture2D(grassImage, {
            flipY: true,
            minFilter: MB.TextureType.Linear,
            magFilter: MB.TextureType.Linear,
            wrapS: MB.TextureType.Clamp2Edge,
            wrapT: MB.TextureType.Clamp2Edge
        });*/

        let heightmapImage = MB.ResourceMap.retrieveAsset("heightmap");
        // const gl = MB.Core.getInstance().getGL();
        this.tex2d2 = new MB.Texture2D(heightmapImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.TextureType.MirroredRepeat,
            wrapT: MB.TextureType.MirroredRepeat
        });

        this.cubito = new MB.Cube(15.0);
        this.Floor = new MB.Floor(82.0);

        MB.ProgramManager.addWithFun("prog", (): MB.Program => {
            let prog: MB.Program = new MB.Program();

            if (this._webglVersion === 2) {
                prog.addShader("shaders/demoShader.vert",
                    MB.ProgramCte.shader_type.vertex, MB.ProgramCte.mode.read_file);
                prog.addShader("shaders/demoShader.frag",
                    MB.ProgramCte.shader_type.fragment, MB.ProgramCte.mode.read_file);
            } else {
                prog.addShader("shaders/demowebgl1.vert",
                    MB.ProgramCte.shader_type.vertex, MB.ProgramCte.mode.read_file);
                prog.addShader("shaders/demowebgl1.frag",
                    MB.ProgramCte.shader_type.fragment, MB.ProgramCte.mode.read_file);
            }
            prog.compile();

            prog.use();

            prog.addUniforms(["projection", "view", "model", "tex", "layer"]);

            return prog;
        });

        this.cameraUpdate();
    }
    update(dt: number) {
        if (MB.Input.getInstance().isButtonClicked(MB.Input.mouseButton.Left)) {
            console.log("Mouse left clicked");
        }

        if (MB.Input.getInstance().isKeyClicked(MB.Input.getInstance().keys.Y)) {
            console.log("Key Y clicked");
            this.camera.setHome(this.homePoint);
        }

        this.camera.timeElapsed = MB.Timer.deltaTime() / 10.0;

        this.camera.update(this.cameraUpdate.bind(this));

        this.angle += MB.Timer.deltaTime() * 0.001;
    }
    public layer: number = 0;
    draw(dt?: number) {
        MB.Core.getInstance().clearColorAndDepth();

        let prog = MB.ProgramManager.get(this.mainShader);
        prog.use();

        let varvar = this.text.max;
        let i = 0, j = 0, k = 0;
        let dd = -1;

        // this.skybox.texture.bind(0);
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
