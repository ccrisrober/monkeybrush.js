/// <reference path="library/references.d.ts" />
// TODO:
import * as MonkeyBrush from "./library/MonkeyBrush"

import { ProgramCte } from "./library/constants/ProgramCte";
import { TextureType } from "./library/constants/TextureType";

"use strict";

let camera = new MonkeyBrush.Camera2(new Float32Array([-2.7, -1.4, 11.8]));

let SimpleConfig = function() {
    return {
        max: 10,
        resume: true,
        render: "0"
    };
};

let cubito: MonkeyBrush.Cube;
let skybox: MonkeyBrush.Skybox;

let view;
let projection;

let customModel: MonkeyBrush.CustomModel;

let identityMatrix = mat4.create();
mat4.identity(identityMatrix);
let model = mat4.create();
let angle = 0;

let tex: MonkeyBrush.Texture2D;
let tex2: MonkeyBrush.Texture2D;

let text = SimpleConfig();
function loadAssets() {
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

const mainShader: string = "progubo";

function initialize(app: MonkeyBrush.App) {
    skybox = new MonkeyBrush.Skybox("assets/images/skybox2", false);

    cubito = new MonkeyBrush.Cube(15.0);

    const webgl2 = app.webglVersion() === 2;

    MonkeyBrush.ProgramManager.addWithFun("progubo", (): MonkeyBrush.Program => {
        let prog: MonkeyBrush.Program = new MonkeyBrush.Program();
        prog.addShader(`#version 300 es
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
        prog.addShader(`#version 300 es
    precision highp float;

    in vec3 outNormal;
    in vec3 outPosition;
    out vec4 fragColor;

    uniform vec3 cameraPos;
    uniform samplerCube CubeMap;

    void main() {
        /**/
        vec3 I = normalize(outPosition - cameraPos);
        vec3 R = reflect(I, normalize(outNormal));
        fragColor = texture(CubeMap, R);
        /**/

        /**
        float ratio = 1.00 / 1.33;
        vec3 I = normalize(outPosition - cameraPos);
        vec3 R = refract(I, normalize(outNormal), ratio);
        fragColor = texture(CubeMap, R);
        /**/
    }`, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);
        prog.compile();

        const gl = MonkeyBrush.Core.getInstance().getGL();

        prog.use();

        var program = prog.program();

        uniformPerDrawBuffer = new MonkeyBrush.VertexUBO(program, "UboDemo", 0);

        prog.addUniforms(["projection", "view", "model",
            "normalMatrix", "viewPos", "CubeMap"]);

        return prog;
    });

    const gl = MonkeyBrush.Core.getInstance().getGL();

    //
    for (var i = 0; i < 10; ++i) {
        console.log(MonkeyBrush.utils.random.nextInt(1, 6));
    }

    cameraUpdateCb();
};
var uniformPerDrawBuffer: MonkeyBrush.VertexUBO;

function drawScene(app: MonkeyBrush.App) {
    MonkeyBrush.Core.getInstance().clearColorAndDepth();

    let prog = MonkeyBrush.ProgramManager.get(mainShader);
    prog.use();

    let varvar = text.max;
    let i = 0, j = 0, k = 0;
    let dd = -1;

    skybox.texture.bind(0);
    prog.sendUniform1i("CubeMap", 0);

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

    for (i = -varvar; i < varvar; i += 10.0) {
        for (j = -varvar; j < varvar; j += 10.0) {
            for (k = -varvar; k < varvar; k += 10.0) {
                dd *= -1;
                mat4.translate(model, identityMatrix,
                    vec3.fromValues(i * 1.0, j * 1.0, k * 1.0));
                mat4.rotateY(model, model, 90.0 * Math.PI / 180);
                mat4.rotateY(model, model, angle * 0.5 * dd);
                mat4.scale(model, model, vec3.fromValues(0.25, 0.25, 0.25));

                prog.sendUniformMat4("model", model);
                cubito[mode]();
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

function cameraUpdateCb() {
    let canvas = MonkeyBrush.Core.getInstance().canvas();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);

    let prog = MonkeyBrush.ProgramManager.get(mainShader);
    prog.use();

    prog.sendUniformVec3("viewPos", camera.position);

    let gl = MonkeyBrush.Core.getInstance().getGL();

    var transforms = new Float32Array([]);
    transforms = MonkeyBrush.utils.Float32Concat(transforms, projection);
    transforms = MonkeyBrush.utils.Float32Concat(transforms, view);

    uniformPerDrawBuffer.update(transforms);
}

// @param dt: Global time in seconds
function updateScene(app: MonkeyBrush.App, dt: number) {
    if (MonkeyBrush.Input.getInstance().isButtonClicked(MonkeyBrush.Input.mouseButton.Left)) {
        console.log("Mouse left clicked");
    }

    camera.timeElapsed = MonkeyBrush.Timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    angle += MonkeyBrush.Timer.deltaTime() * 0.001;
};

/**/
window.onload = () => {
    new MonkeyBrush.App({
        title: "Demo appp",
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
