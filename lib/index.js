"use strict";
const MB = require("./library/MonkeyBrush");
"use strict";
let SimpleConfig = function () {
    return {
        max: 5,
        resume: true,
        render: "2"
    };
};
class MyScene extends MB.Scene {
    constructor() {
        super(SimpleConfig(), "App", 2);
        this.homePoint = new MB.Vect3(-2.7, -1.4, 11.8);
        this.camera = new MB.Camera2(this.homePoint);
        this.angle = 0;
        this.mainShader = "prog";
        this.layer = 0;
        this.pos = 0;
        this.identityMatrix = new MB.Mat4().identity;
        this.model = new MB.Mat4();
        this.spline = new MB.Spline3D("catmullRom", [
            new MB.Vect3(-100, 20, 100),
            new MB.Vect3(-40, 20, 20),
            new MB.Vect3(0, 20, -100),
            new MB.Vect3(20, 20, -100),
            new MB.Vect3(40, 20, 100),
            new MB.Vect3(70, 20, 10),
            new MB.Vect3(100, 20, 30),
            new MB.Vect3(-100, 20, 100)
        ]);
        this.function = new MB.ParametricGeom(function (u, v) {
            var r = 50;
            var x = Math.sin(u) * r;
            var z = Math.sin(v / 2) * 2 * r;
            var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
            return new MB.Vect3(x, y, z);
        }, 60, 40);
        console.log(this.function);
    }
    loadAssets() {
        MB.Loaders.loadImage("assets/images/hw_mystic/back.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/bottom.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/front.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/left.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/right.jpg");
        MB.Loaders.loadImage("assets/images/hw_mystic/top.jpg");
        MB.Loaders.loadImage("assets/images/matcap_058.png", "monkey");
        MB.Loaders.loadImage("_images/descarga (1).png", "descarga");
        MB.Loaders.loadImage("assets/images/Srtm_ramp2.world.21600x10800.jpg", "heightmap");
        MB.Loaders.loadImage("assets/images/55ac38bc604ce.jpg", "earth");
        MB.Loaders.loadImage("assets/images/55ac38bc604ce.jpg", "55ac38bc604ce");
    }
    initialize() {
        this.skybox = new MB.Skybox("assets/images/hw_mystic", this._webglVersion === 2);
        let neoGeoImage = MB.ResourceMap.retrieveAsset("monkey");
        this.tex2d3 = new MB.Texture2D(neoGeoImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.TextureType.Clamp2Edge,
            wrapT: MB.TextureType.Clamp2Edge
        });
        let grassImage = MB.ResourceMap.retrieveAsset("earth");
        this.tex2d = new MB.Texture2D(grassImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.TextureType.Clamp2Edge,
            wrapT: MB.TextureType.Clamp2Edge
        });
        let heightmapImage = MB.ResourceMap.retrieveAsset("heightmap");
        this.tex2d2 = new MB.Texture2D(heightmapImage, {
            flipY: true,
            minFilter: MB.TextureType.Nearest,
            magFilter: MB.TextureType.Nearest,
            wrapS: MB.TextureType.Clamp2Edge,
            wrapT: MB.TextureType.Clamp2Edge
        });
        const obj = MB.ObjLoader.loadObj("assets/objects/example.obj");
        this.pointCloud = new MB.PointCloud();
        let vertices = [];
        let indices = [];
        const range = 500;
        for (let i = 0; i < 5000; ++i) {
            let particle = new MB.Vect3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
            this.pointCloud.addPoint(particle);
            indices.push(i);
            vertices.push(particle.x, particle.y, particle.z);
        }
        var vbg = new MB.VertexBufferGeometry();
        vbg.addAttr("position", new MB.BufferAttribute(new Float32Array(vertices), 3));
        vbg.setIndex(new Uint16Array(indices));
        this.cubito = new MB.CustomModel({
            vertices: this.function.verts,
            normals: this.function.normals,
            indices: this.function.indices,
            texCoords: this.function.uvs
        });
        this.Floor = new MB.Floor(82.0);
        MB.ProgramManager.addWithFun("prog", () => {
            let prog = new MB.Program();
            if (this._webglVersion === 2) {
                prog.addShader("shaders/demoShader.vert", MB.ProgramCte.shader_type.vertex, MB.ProgramCte.mode.read_file);
                prog.addShader("shaders/demoShader.frag", MB.ProgramCte.shader_type.fragment, MB.ProgramCte.mode.read_file);
            }
            else {
                prog.addShader("shaders/demowebgl1.vert", MB.ProgramCte.shader_type.vertex, MB.ProgramCte.mode.read_file);
                prog.addShader("shaders/demowebgl1.frag", MB.ProgramCte.shader_type.fragment, MB.ProgramCte.mode.read_file);
            }
            prog.compile();
            prog.use();
            prog.addUniforms(["projection", "view", "model", "tex", "tex2"]);
            return prog;
        });
        this.cameraUpdate();
    }
    update(dt) {
        if (MB.Input.isButtonClicked(MB.Input.mouseButton.Left)) {
            console.log("Mouse left clicked");
        }
        this.camera.timeElapsed = MB.Timer.deltaTime() / 10.0;
        this.camera.update(this.cameraUpdate.bind(this));
        this.angle += MB.Timer.deltaTime() * 0.001;
    }
    draw(dt) {
        MB.Core.getInstance().clearColorAndDepth();
        let prog = MB.ProgramManager.get(this.mainShader);
        prog.use();
        let varvar = this.text.max;
        let i = 0, j = 0, k = 0;
        let dd = -1;
        this.tex2d.bind(0);
        prog.sendUniform1i("tex", 0);
        this.tex2d2.bind(1);
        prog.sendUniform1i("tex2", 1);
        const renderMode = this.text.render;
        let mode;
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
                .translate(new MB.Vect3(i * 1.0, j * 1.0, k * 1.0))
                .rotate(90.0 * Math.PI / 180, MB.Vect3.yAxis)
                .scale(new MB.Vect3(0.25, 0.25, 0.25));
        prog.sendUniformMat4("model", this.model);
        this.cubito[mode]();
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
    textCB(gui) {
        gui.add(this.text, "max", 5, 100);
        gui.add(this.text, "render", {
            simple: 0,
            lines: 1,
            points: 2
        });
    }
}
;
window.onload = () => {
    let myScene = new MyScene();
    myScene.start();
};
