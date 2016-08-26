/// <reference path="library/references.d.ts" />

import App from "./library/App";

import Core from "./library/core/core";
import Input from "./library/core/input";
import PostProcess from "./library/core/postProcess";
import Texture2D from "./library/textures/texture2d";
// import Texture2DArray from "./library/textures/texture2dArray";
// import SimpleTexture2D from "./library/textures/simpleTexture2d";
import Program from "./library/core/program";
// import Framebuffer from "./library/core/framebuffer";
import ProgramManager from "./library/resources/programManager";
import ResourceMap from "./library/resources/resourceMap";
import loaders from "./library/resources/loaders";
import Timer from "./library/extras/timer";
import PointLight from "./library/lights/pointLight";
// import Vector2 from "./library/maths/vector2";
import Vector3 from "./library/maths/vector3";
import Camera2 from "./library/_demoCamera";
// import Skybox from "./library/extras/skybox";
import {/*SamplerParams, */Sampler} from "./library/extras/sampler";

import ProgramCte from "./library/constants/ProgramCte";
// import TextureFormat from "./library/constants/TextureFormat";
import TextureType from "./library/constants/TextureType";

"use strict";

let camera = new Camera2(new Float32Array([-2.7, -1.4, 11.8]));

let SimpleConfig = function() {
    return {
        max: 10,
        resume: true,
        render: "0"
    };
};

let view;
let projection;

let tex2d: Texture2D;

let _light = new PointLight(new Vector3<number>( -5.0, 0.0, 0.0 ));

let identityMatrix = mat4.create();
mat4.identity(identityMatrix);
// let model = mat4.create();
let angle = 0;

let text = SimpleConfig();
function loadAssets() {
    loaders.loadImage("descarga (4).png", "exampleImg");
    // skybox
    loaders.loadImage("assets/images/canyon/back.jpg");
    loaders.loadImage("assets/images/canyon/bottom.jpg");
    loaders.loadImage("assets/images/canyon/front.jpg");
    loaders.loadImage("assets/images/canyon/left.jpg");
    loaders.loadImage("assets/images/canyon/right.jpg");
    loaders.loadImage("assets/images/canyon/top.jpg");
}

const mainShader: string = "pp";

function initialize(app: App) {

    // const webgl2 = app.webglVersion() === 2;

    ProgramManager.addWithFun("pp", (): Program => {
        let prog2: Program = new Program();
        prog2.addShader(`#version 300 es
            precision highp float;
            layout(location = 0) in vec3 vertPosition;
            uniform float tcdiv;
            out vec2 texCoord;
            void main(void) {
                texCoord = vec2(vertPosition.xy * 0.5) + vec2(0.5);
                //texCoord.x *= tcdiv / 5.0;
                //texCoord.y *= tcdiv / 5.0;
                gl_Position = vec4(vertPosition, 1.0);
            }`, ProgramCte.shader_type.vertex, ProgramCte.mode.read_text);
        prog2.addShader(`#version 300 es
            precision highp float;
            uniform sampler2D dataTexture;

            out vec4 fragColor;
            in vec2 texCoord;

            uniform float tcdiv;

            void main() {

                if(length(texCoord - 0.5) > 0.5){
                    discard;
                }
                vec2 tc = texCoord * vec2(tcdiv / 5.0);
                //fragColor = vec4(texCoord, 0.0, 1.0);
                fragColor = vec4(texture(dataTexture, tc).rgb, 1.0);
            }`, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);
        prog2.compile();

        prog2.addUniforms(["tcdiv"]);

        console.log(prog2);
        return prog2;
    });

    let cubeImage = ResourceMap.retrieveAsset("exampleImg");
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: TextureType.Linear,
        magFilter: TextureType.Linear,
        wrapS: TextureType.Clamp2Edge,
        wrapT: TextureType.Clamp2Edge
    });
    const gl = Core.getInstance().getGL();

    samplerA = new Sampler();
    samplerA.setParams({
        minFilter: gl.NEAREST,
        magFilter: gl.NEAREST,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
        /*wrapR: gl.CLAMP_TO_EDGE,
        compareFunc: gl.NONE,
        compareMode: gl.LEQUAL*/
    });
    samplerB = new Sampler();
    samplerB.setParams({
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrapS: gl.REPEAT,
        wrapT: gl.REPEAT/*,
        minLOD: -1000.0,
        maxLOD: 1000.0*/
    });

    samplerC = new Sampler();
    samplerC.setParams({
        minFilter: gl.NEAREST,
        magFilter: gl.LINEAR,
        wrapS: gl.MIRRORED_REPEAT,
        wrapT: gl.MIRRORED_REPEAT,
    });

    cameraUpdateCb();
};

let samplerA: Sampler;
let samplerB: Sampler;
let samplerC: Sampler;

// let layer = 0;

function drawScene(app: App) {
    Core.getInstance().clearColorAndDepth();

    let prog = ProgramManager.get(mainShader);
    prog.use();

    tex2d.bind(0);
    // const gl = Core.getInstance().getGL();


    const renderMode = text.render;
    let mode: Sampler;
    switch (renderMode) {
        case "0":
            mode = samplerA;
            break;
        case "1":
            mode = samplerB;
            break;
        case "2":
            mode = samplerC;
            break;
    }

    mode.bind(0);
    prog.sendUniform1i("texSampler", 0);
    prog.sendUniform1f("tcdiv", text.max);

    // let varvar = text.max;
    // let i = 0, j = 0, k = 0;
    // let dd = -1;

    // let m = 0;

    PostProcess.bind();
    PostProcess.render();
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //




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
};

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
