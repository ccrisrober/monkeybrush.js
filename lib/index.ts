/// <reference path="library/references.d.ts" />
import * as MB from "./library/MonkeyBrush";

"use strict";

let SimpleConfig = function() {
    return {
        max: 5,
        resume: true,
        render: "1"
    };
};

class MyScene extends MB.Scene {
    protected homePoint = new MB.Vect3(-2.7, -1.4, 11.8);
    protected camera = new MB.Camera2(this.homePoint);

    protected cubito: MB.Polyhedron;
    protected Floor: MB.Floor;
    protected skybox: MB.Skybox;
    protected view: MB.Mat4;
    protected projection: MB.Mat4;

    protected identityMatrix;
    protected model;
    protected angle = 0;

    protected spline: MB.Spline3D;
    protected function: MB.ParametricGeom;
    protected pointCloud: MB.PointCloud;

    constructor() {
        super(SimpleConfig(), "App", 2);
        this.identityMatrix = new MB.Mat4().identity;
        this.model = new MB.Mat4();
    }

    protected mainShader: string = "prog";

    loadAssets() {
        // skybox
        MB.Loaders.loadImage("assets/images/hw_mystic/back.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/bottom.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/front.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/left.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/right.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/top.jpg");

        MB.Loaders.loadImage("assets/images/matcap_058.png", "monkey");
        // MB.Loaders.loadVideo("assets/video/Possum vs Cat.mp4", "video");

        MB.Loaders.loadImage("_images/descarga (1).png", "descarga");
        MB.Loaders.loadImage("assets/images/Srtm_ramp2.world.21600x10800.jpg", "heightmap");
        // MB.Loaders.loadImage("assets/images/heightmap.png", "heightmap");
        MB.Loaders.loadImage("assets/images/55ac38bc604ce.jpg", "earth");
        // MB.Loaders.loadImage("_images/descarga (1).png", "earth");
        MB.Loaders.loadImage("assets/images/55ac38bc604ce.jpg", "55ac38bc604ce");
    }
    protected tex2d: MB.Texture2D;
    protected tex2d2: MB.Texture2D;
    protected tex2d3: MB.Texture2D;
    initialize() {
        this.skybox = new MB.Skybox("assets/images/hw_mystic", this._webglVersion === 2);

        let neoGeoImage = MB.ResourceMap.retrieveAsset("monkey");
        // const gl = MB.Core.getInstance().getGL();
        this.tex2d3 = new MB.Texture2D(neoGeoImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.WrapMode.Clamp2Edge,
            wrapT: MB.WrapMode.Clamp2Edge
        });

        let grassImage = MB.ResourceMap.retrieveAsset("earth");
        this.tex2d = new MB.Texture2D(grassImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.WrapMode.Clamp2Edge,
            wrapT: MB.WrapMode.Clamp2Edge
        });

        let heightmapImage = MB.ResourceMap.retrieveAsset("heightmap");
        // const gl = MB.Core.getInstance().getGL();
        this.tex2d2 = new MB.Texture2D(heightmapImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.WrapMode.Clamp2Edge,
            wrapT: MB.WrapMode.Clamp2Edge
        });

        this.cubito = new MB.Dodecahedron(5.0, 1);

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

            prog.addUniforms(["projection", "view", "model", "tex", "tex2"]);

            return prog;
        });

        this.cameraUpdate();
    }
    update(dt: number) {
        if (MB.Input.isButtonClicked(MB.Input.mouseButton.Left)) {
            console.log("Mouse left clicked");
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
        this.tex2d.bind(0);
        prog.sendUniform1i("tex", 0);
        this.tex2d2.bind(1);
        prog.sendUniform1i("tex2", 1);

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
        /**
        for (i = -varvar; i < varvar; i += 10.0) {
            for (j = -varvar; j < varvar; j += 10.0) {
                for (k = -varvar; k < varvar; k += 10.0) {
                    dd *= -1;
                    this.model =
                        this.model
                            .reset()
                            .translate(new MB.Vect3(i * 1.0, j * 1.0, k * 1.0))
                            .rotate(90.0 * Math.PI / 180, MB.Vect3.yAxis)
                            // .rotate(this.angle * 0.5 * dd, MB.Vect3.yAxis)
                            .scale(new MB.Vect3(0.25, 0.25, 0.25));
                    prog.sendUniformMat4("model", this.model);
                    this.cubito[mode]();
                }
            }
        }
        /**/
        /*if (this.pos <= 1) {
            let position = this.spline.evaluate(this.pos);
            i = position.x;
            j = position.y;
            k = position.z;

            this.pos += 0.001;
        } else {
            this.pos = 0;
        }*/

        this.model =
            this.model
                .reset()
                .translate(new MB.Vect3(i * 1.0, j * 1.0, k * 1.0))
                .rotate(90.0 * Math.PI / 180, MB.Vect3.yAxis)
                // .rotate(this.angle * 0.5 * dd, MB.Vect3.yAxis)
                .scale(new MB.Vect3(0.25, 0.25, 0.25));
        prog.sendUniformMat4("model", this.model);
        this.cubito[mode]();
        this.skybox.render(this.view, this.projection);
    }
    public pos = 0;
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
