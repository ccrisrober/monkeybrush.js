/// <reference path="library/references.d.ts" />

import App from "./library/App";

import Core from "./library/core/core";
import Input from "./library/core/input";
import Sphere from "./library/models/sphere";
import Cube from "./library/models/cube";
import Torus from "./library/models/torus";
import Disc from "./library/models/disc";
import Cone from "./library/models/cone";
import Cylinder from "./library/models/cylinder";
import Prism from "./library/models/prism";
import Mesh from "./library/models/mesh";
import Texture2D from "./library/textures/texture2d";
import SimpleTexture2D from "./library/textures/simpleTexture2d";
import Program from "./library/core/program";
import Framebuffer from "./library/core/framebuffer";
import ProgramManager from "./library/resources/programManager";
import ResourceMap from "./library/resources/resourceMap";
import loaders from "./library/resources/loaders";
import Timer from "./library/extras/timer";
import PointLight from "./library/lights/pointLight";
import Vector2 from "./library/maths/vector2";
import Vector3 from "./library/maths/vector3";
import Camera2 from "./library/_demoCamera";
import Skybox from "./library/extras/skybox";

import ProgramCte from "./library/constants/ProgramCte";
import TextureFormat from "./library/constants/TextureFormat";
import TextureType from "./library/constants/TextureType";

"use strict";

let camera = new Camera2(new Float32Array([-2.7, -1.4, 11.8]));

let skybox: Skybox;

let esferita: Sphere;
let disquito: Disc;
let disquito2: Disc;
let conito: Cone;
let tubito: Cylinder;
let tubito2: Cylinder;
let tubito3: Cylinder;
let tubito4: Cylinder;
let prismito: Prism;
let prismito2: Prism;
let cubito: Cube;
let torito: Torus;

let SimpleConfig = function() {
    return {
        max: 10,
        resume: true,
        render: "0"
    };
};
let m: Mesh;

let view;
let projection;

let tex2d: Texture2D;

let _light = new PointLight(new Vector3<number>( -5.0, 0.0, 0.0 ));

let identityMatrix = mat4.create();
mat4.identity(identityMatrix);
let model = mat4.create();
let angle = 0;

let text = SimpleConfig();
function loadAssets() {
    loaders.loadImage("assets/images/example.png", "exampleImg");
    // skybox
    loaders.loadImage("assets/images/canyon/back.jpg");
    loaders.loadImage("assets/images/canyon/bottom.jpg");
    loaders.loadImage("assets/images/canyon/front.jpg");
    loaders.loadImage("assets/images/canyon/left.jpg");
    loaders.loadImage("assets/images/canyon/right.jpg");
    loaders.loadImage("assets/images/canyon/top.jpg");
}

const mainShader: string = "prog";

let framebuffer: Framebuffer;

function initialize(app: App) {
    esferita = new Sphere(15.0, 5.0, 5.0);
    conito = new Cone(15.0, 0.0, 15.0, 3.0, 2.0);
    tubito = new Cylinder(5.0, 15.0, 15.0, 2.0);
    tubito2 = new Cylinder(5.0, 15.0, 15.0, 2.0);
    tubito3 = new Cylinder(5.0, 15.0, 15.0, 2.0);
    tubito4 = new Cylinder(5.0, 15.0, 15.0, 2.0);

    prismito = new Prism(15.0, 30.0, 6.0, 1.0);
    prismito2 = new Prism(15.0, 30.0, 4.0, 4.0);

    disquito = new Disc(15.0, 5.1, 1.0, 0.0, 1.0);
    disquito2 = new Disc(15.0, 3.5, 5.0, 0.0, 1.0);

    cubito = new Cube(15.0);
    torito = new Torus(15.0, 10.0, 5, 5);








    // prismito = new Prism(5.0, 15.0, 5.0, 10.0, true, false);
    // prismito2 = new Prism(5.0, 15.0, 5.0, 10.0, false, false);




    m = new Mesh("assets/objects/teddy.json");

    let canvasSize = new Vector2<number>(
        Core.getInstance().canvas().width,
        Core.getInstance().canvas().height
    );

    skybox = new Skybox("assets/images/canyon", false);

    framebuffer = new Framebuffer([
        new SimpleTexture2D(canvasSize, {
            "internalFormat": TextureFormat.RGB,
            "format": TextureFormat.RGB,
            "type": TextureFormat.Float,
            "minFilter": TextureType.Nearest,
            "magFilter": TextureType.Nearest
        })
    ], canvasSize, true, true, {});

    // console.log(app);

    const webgl2 = app.webglVersion() === 2;

    ProgramManager.addWithFun("prog", (): Program => {
        let prog: Program = new Program();
        if (webgl2) {
            prog.addShader("./shaders/demoShader.vert", ProgramCte.shader_type.vertex, ProgramCte.mode.read_file);
            prog.addShader("./shaders/demoShader.frag", ProgramCte.shader_type.fragment, ProgramCte.mode.read_file);
        } else {
            prog.addShader("./shaders/demowebgl1.vert", ProgramCte.shader_type.vertex, ProgramCte.mode.read_file);
            prog.addShader("./shaders/demowebgl1.frag", ProgramCte.shader_type.fragment, ProgramCte.mode.read_file);
        }
        prog.compile();

        prog.addUniforms(["projection", "view", "model",
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });

    let cubeImage = ResourceMap.retrieveAsset("exampleImg");
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: TextureType.Linear,
        magFilter: TextureType.Linear,
        wrapS: TextureType.Clamp2Edge,
        wrapT: TextureType.Clamp2Edge
    });

    cameraUpdateCb();
}

function cameraUpdateCb() {
    let canvas = Core.getInstance().canvas();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);

    let prog = ProgramManager.get(mainShader);
    prog.use();
    prog.sendUniformMat4("view", view);
    prog.sendUniformMat4("projection", projection);
    prog.sendUniformVec3("viewPos", camera.position);
}

// @param dt: Global time in seconds
function updateScene(app: App, dt: number) {
    if (Input.getInstance().isButtonClicked(Input.mouseButton.Left)) {
        console.log("Mouse left clicked");
    }

    camera.timeElapsed = Timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    angle += Timer.deltaTime() * 0.001;
}

function drawScene(app: App) {
    Core.getInstance().clearColorAndDepth();

    let prog = ProgramManager.get(mainShader);
    prog.use();

    tex2d.bind(0);
    prog.sendUniform1i("texSampler", 0);

    let varvar = text.max;
    let i = 0, j = 0, k = 0;
    let dd = -1;

    let m = 0;

    const renderMode = text.render;
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

    for (i = -varvar; i < varvar; i += 5.0) {
        for (j = -varvar; j < varvar; j += 5.0) {
            for (k = -varvar; k < varvar; k += 5.0) {
                dd *= -1;
                mat4.translate(model, identityMatrix,
                    vec3.fromValues(i * 1.0, j * 1.0, k * 1.0));
                mat4.rotateY(model, model, 90.0 * Math.PI / 180);
                mat4.rotateY(model, model, angle * dd);
                mat4.scale(model, model, vec3.fromValues(0.1, 0.1, 0.1));

                prog.sendUniformMat4("model", model);

                switch (m % 12) {
                    case 0:
                        disquito2[mode]();
                        break;
                    case 1:
                        tubito2[mode]();
                        break;
                    case 2:
                        conito[mode]();
                        break;
                    case 3:
                        tubito4[mode]();
                        break;
                    case 4:
                        disquito[mode]();
                        break;
                    case 5:
                        esferita[mode]();
                        break;
                    case 6:
                        prismito[mode]();
                        break;
                    case 7:
                        tubito[mode]();
                        break;
                    case 8:
                        prismito2[mode]();
                        break;
                    case 9:
                        tubito3[mode]();
                        break;
                    case 10:
                        cubito[mode]();
                        break;
                    case 11:
                        torito[mode]();
                        break;
                }
                m++;
            }
        }
    }
    skybox.render(view, projection);
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //

/**/
window.onload = () => {
    new App({
        // title: "Demo appp",
        webglVersion: 2,
        loadAssets: loadAssets,
        initialize: initialize,
        update: updateScene,
        draw: drawScene,
        cameraUpdate: cameraUpdateCb,
        textCB: function(gui: dat.GUI) {
            gui.add(text, "max", 5, 100);
            gui.add(text, "render", {
                simple: 0,
                lines: 1,
                points: 2
            });
        }
    }, text).start();
};
/**/
