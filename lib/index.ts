/// <reference path="library/references.d.ts" />
// TODO: Texture LOD DEMO
import App from "./library/App";

import Core from "./library/core/core";
import Input from "./library/core/input";
import PostProcess from "./library/core/postProcess";
import utils from "./library/core/utils";
import Texture2D from "./library/textures/texture2d";
// import Texture2DArray from "./library/textures/texture2dArray";
// import SimpleTexture2D from "./library/textures/simpleTexture2d";
import Program from "./library/core/program";
import Cone from "./library/models/cone";
import VertexUBO from "./library/core/vertexUBO";
// import Framebuffer from "./library/core/framebuffer";
import ProgramManager from "./library/resources/programManager";
import ResourceMap from "./library/resources/resourceMap";
import loaders from "./library/resources/loaders";
import CustomModel from "./library/models/customModel";
import Timer from "./library/extras/timer";
import PointLight from "./library/lights/pointLight";
// import Vector2 from "./library/maths/vector2";
import Vector3 from "./library/maths/vector3";
import Camera2 from "./library/_demoCamera";
// import Skybox from "./library/extras/skybox";
import {/*SamplerParams, */Sampler} from "./library/extras/sampler";
import {SyncCte, Sync} from "./library/extras/sync";

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

let conito: Cone;

let view;
let projection;

let customModel: CustomModel;

let tex2d: Texture2D;

let _light = new PointLight(new Vector3<number>( -5.0, 0.0, 0.0 ));

let identityMatrix = mat4.create();
mat4.identity(identityMatrix);
let model = mat4.create();
let angle = 0;

let sync: Sync;

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

const mainShader: string = "progubo";

function initialize(app: App) {

    conito = new Cone(15.0, 0.0, 15.0, 3.0, 2.0);

    customModel = new CustomModel([
        0,  1,  2,
        0,  2,  3,
        0,  3,  4,
        0,  4,  5,
        0,  5,  6,
        0,  6,  7,
        0,  7,  8,
        0,  8,  9,
        0,  9, 10,
        0, 10,  1
    ], [
          1.5,       0.0,       0.0,
         -1.5,       1.0,       0.0,
         -1.5,  0.809017,  0.587785,
         -1.5,  0.309017,  0.951057,
         -1.5, -0.309017,  0.951057,
         -1.5, -0.809017,  0.587785,
         -1.5,      -1.0,       0.0,
         -1.5, -0.809017, -0.587785,
         -1.5, -0.309017, -0.951057,
         -1.5,  0.309017, -0.951057,
         -1.5,  0.809017, -0.587785
    ]);

    const webgl2 = app.webglVersion() === 2;

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

            layout (location = 0) out vec4 fragColor;
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

        const gl = Core.getInstance().getGL();

        prog.addUniforms(["projection", "view", "model",
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });
    ProgramManager.addWithFun("progubo", (): Program => {
        let prog: Program = new Program();
        //if (webgl2) {
            prog.addShader("./shaders/demoShaderUBO.vert", ProgramCte.shader_type.vertex, ProgramCte.mode.read_file);
            prog.addShader("./shaders/demoShaderUBO.frag", ProgramCte.shader_type.fragment, ProgramCte.mode.read_file);
        //} else {
        //    prog.addShader("./shaders/demowebgl1.vert", ProgramCte.shader_type.vertex, ProgramCte.mode.read_file);
        //    prog.addShader("./shaders/demowebgl1.frag", ProgramCte.shader_type.fragment, ProgramCte.mode.read_file);
        //}
        prog.compile();

        const gl = Core.getInstance().getGL();

        let data = {
            projection: new Float32Array(16),
            view: new Float32Array(16),
            model: new Float32Array(16),
        };

        //let buff = gl.createBuffer();
        //gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);

        //let uniformIdx = gl.getUniformBlockIndex(prog.program(), "ObjectData");
        //gl.uniformBlockBinding(prog.program(), uniformIdx, n);
        //gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, buff);

        prog.use();

        var program = prog.program();

        uniformPerDrawBuffer = new VertexUBO(program, "UboDemo", 0);

        prog.addUniforms(["projection", "view", "model",
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });

    const gl = Core.getInstance().getGL();

    let cubeImage = ResourceMap.retrieveAsset("exampleImg");
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: TextureType.Linear,
        magFilter: TextureType.Linear,
        wrapS: TextureType.Clamp2Edge,
        wrapT: TextureType.Clamp2Edge
    });

    cameraUpdateCb();
};
var uniformPerDrawBuffer: VertexUBO;
let samplerA: Sampler;
let samplerB: Sampler;
let samplerC: Sampler;

// let layer = 0;

function drawScene(app: App) {
    Core.getInstance().clearColorAndDepth();

    let prog = ProgramManager.get(mainShader);
    prog.use();

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

                conito[mode]();
            }
        }
    }
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
    //prog.sendUniformMat4("view", view);
    //prog.sendUniformMat4("projection", projection);
    prog.sendUniformVec3("viewPos", camera.position);


    let gl = Core.getInstance().getGL();

    // var uniformPerDrawLocation = gl.getUniformBlockIndex(prog.program(), 'PerDraw');

    var transforms = new Float32Array([]);
    transforms = utils.Float32Concat(transforms, projection);
    transforms = utils.Float32Concat(transforms, view);
    //console.log(transforms);


    uniformPerDrawBuffer.update(transforms);
}

// @param dt: Global time in seconds
function updateScene(app: App, dt: number) {
    if (Input.getInstance().isButtonClicked(Input.mouseButton.Left)) {
        console.log("Mouse left clicked");
    }

    camera.timeElapsed = Timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    angle += Timer.deltaTime() * 0.001;

    const gl = Core.getInstance().getGL();

    sync = new Sync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);

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


//
//
// http://malideveloper.arm.com/downloads/OpenGL_ES_3.0.pdf
//
//
// uniform ObjectData {
//     vec4 position[NumObjects];
//      vec4 velocity[NumObjects];
//      float drag[NumObjects];
// };
//
//
//
// OLD
// glUniform4fv( positionLoc, NumObjects, data.position );
// glUniform4fv( velocityLoc, NumObjects, data.velocity );
// glUniform4fv( dragLoc, NumObjects, data.drag );
//
// NEW
// glGenBuffer( 1, &uniformBuffer );
// glBufferData( GL_UNIFORM_BUFFER, sizeof(data), data, GL_STATIC_DRAW );
// GLuint uniformIndex = glGetUniformBlockIndex( program, “ObjectData” );
// glUniformBlockBinding( program, uniformIndex, n );
// glBindBufferBase( GL_UNIFORM_BUFFER, 0, uniformBuffer );

