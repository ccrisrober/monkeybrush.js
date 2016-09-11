/// <reference path="library/references.d.ts" />
import * as MB from "./library/MonkeyBrush";

"use strict";

let SimpleConfig = function() {
    return {
        max: 5,
        resume: true,
        render: "0"
    };
};

// MB.mod.MyModel

class MyScene extends MB.Scene {
    protected homePoint = new MB.maths.Vect3(-2.7, -1.4, 11.8);
    protected camera = new MB.Camera2(this.homePoint);

    protected cubito: MB.models.Drawable;
    protected skybox: MB.extras.Skybox;
    protected view: MB.maths.Mat4;
    protected projection: MB.maths.Mat4;

    protected identityMatrix;
    protected model;
    protected angle = 0;

    constructor() {
        super(SimpleConfig(), "App", 2);
        this.identityMatrix = new MB.maths.Mat4().identity;
        this.model = new MB.maths.Mat4();
    }

    protected mainShader: string = "prog";

    loadAssets() {
        MB.resources.Loaders.loadCubeMap("assets/images/hw_mystic");
        MB.resources.Loaders.loadImage("assets/images/55ac38bc604ce.jpg", "myTex");
    }
    protected tex2d: MB.textures.Texture2D;
    initialize() {
        this.skybox = new MB.extras.Skybox("assets/images/hw_mystic", this._webglVersion === 2);

        let myTexture = MB.resources.ResourceMap.retrieveAsset("myTex");
        this.tex2d = new MB.textures.Texture2D(myTexture, {
            flipY: true,
            minFilter: MB.constants.TextureType.Nearest,
            magFilter: MB.constants.TextureType.Nearest,
            wrapS: MB.constants.WrapMode.Clamp2Edge,
            wrapT: MB.constants.WrapMode.Clamp2Edge
        });

        let points = [];
        const height = 5;
        const count = 30;
        for (let p = count; p > 0; --p) {
            points.push(
                new MB.maths.Vect3((Math.sin(p * 0.2) + Math.cos(p * 0.3)) * height + 12,
                    p - height,
                    (count - p) + count / 2));
        }
        this.cubito = new MB.models.Lathe(points, 275);

        MB.resources.ProgramManager.addWithFun("prog", (): MB.core.Program => {
            let prog: MB.core.Program = new MB.core.Program();

            if (this._webglVersion === 2) {
                prog.addShader("shaders/demoShader.vert",
                    MB.constants.ProgramCte.shader_type.vertex, MB.constants.ProgramCte.mode.read_file);
                prog.addShader("shaders/demoShader.frag",
                    MB.constants.ProgramCte.shader_type.fragment, MB.constants.ProgramCte.mode.read_file);
            } else {
                prog.addShader("shaders/demowebgl1.vert",
                    MB.constants.ProgramCte.shader_type.vertex, MB.constants.ProgramCte.mode.read_file);
                prog.addShader("shaders/demowebgl1.frag",
                    MB.constants.ProgramCte.shader_type.fragment, MB.constants.ProgramCte.mode.read_file);
            }
            prog.compile();

            prog.use();

            prog.addUniforms(["projection", "view", "model", "tex", "tex2"]);

            return prog;
        });

        this.cameraUpdate();
    }
    update(dt: number) {
        if (MB.core.Input.isButtonClicked(MB.core.MouseButton.Left)) {
            console.log("Mouse left clicked");
        }

        this.camera.timeElapsed = MB.extras.Timer.deltaTime() / 10.0;

        this.camera.update(this.cameraUpdate.bind(this));

        this.angle += MB.extras.Timer.deltaTime() * 0.001;
    }
    public layer: number = 0;
    draw(dt?: number) {
        MB.core.Core.getInstance().clearColorAndDepth();

        let prog = MB.resources.ProgramManager.get(this.mainShader);
        prog.use();

        // let varvar = this.text.max;
        let i = 0, j = 0, k = 0;
        let dd = -1;

        this.tex2d.bind(0);
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

        this.model =
            this.model
                .reset()
                .translate(new MB.maths.Vect3(i * 1.0, j * 1.0, k * 1.0))
                .rotate(90.0 * Math.PI / 180, MB.maths.Vect3.yAxis)
                .rotate(this.angle * 0.5 * dd, MB.maths.Vect3.yAxis)
                .scale(new MB.maths.Vect3(0.25, 0.25, 0.25));
        prog.sendUniformMat4("model", this.model);
        this.cubito[mode]();
        this.skybox.render(this.view, this.projection);
    }
    public pos = 0;
    cameraUpdate() {
        let canvas = MB.core.Core.getInstance().canvas();
        this.view = this.camera.GetViewMatrix();
        this.projection = this.camera.GetProjectionMatrix(canvas.width, canvas.height);

        let prog = MB.resources.ProgramManager.get(this.mainShader);
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
