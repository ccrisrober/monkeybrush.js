/// <reference path="library/App.ts" />

/// <reference path="library/core/core.ts" />
/// <reference path="library/core/input.ts" />
/// <reference path="library/core/program.ts" />
/// <reference path="library/resources/programManager.ts" />
/// <reference path="library/resources/resourceMap.ts" />
/// <reference path="library/resources/loaders.ts" />
/// <reference path="library/models/torus.ts" />
/// <reference path="library/models/sphere.ts" />
/// <reference path="library/models/plane.ts" />
/// <reference path="library/models/cube.ts" />
/// <reference path="library/models/mesh.ts" />
/// <reference path="library/textures/texture2d.ts" />
/// <reference path="library/extras/skybox.ts" />

/// <reference path="library/core/postprocess.ts" />
/// <reference path="library/extras/timer.ts" />

/// <reference path="library/lights/pointLight.ts" />
/// <reference path="library/_demoCamera.ts" />
/// <reference path="library/core/postProcess.ts" />
/// <reference path="library/constants/ProgramCte.ts" />
/// <reference path="library/constants/TextureType.ts" />

import App from "./library/App";

import Core from "./library/core/core";
import Input from "./library/core/input";
import Torus from "./library/models/torus";
import Sphere from "./library/models/sphere";
import Plane from "./library/models/plane";
import Cube from "./library/models/cube";
import Mesh from "./library/models/mesh";
import Texture2D from "./library/textures/texture2d";
import SimpleTexture2D from "./library/textures/simpleTexture2d";
import Program from "./library/core/program";
import Framebuffer from "./library/core/framebuffer";
import PostProcess from "./library/core/postProcess";
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
import TextureType from "./library/constants/TextureType";

"use strict";

let camera = new Camera2(new Float32Array([-2.7, -1.4, 11.8]));

let skybox: Skybox;

let esferita: Sphere;
let cubito: Cube;

let SimpleConfig = function() {
    return {
        max: 10,
        resume: true
    };
};
let torito: Torus;
let planito: Plane;
let m: Mesh;

let view;
let projection;

let tex2d: Texture2D;

let light = new PointLight(new Vector3<number>( -5.0, 0.0, 0.0 ));

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
    // video
    // loaders.loadVideo("assets/video/Firefox.ogv");
}

const mainShader: string = "prog";

let framebuffer: Framebuffer;

function initialize() {
    esferita = new Sphere(1.0, 20, 20);
    torito = new Torus(3.7, 2.3, 25, 10);
    planito = new Plane(100.0, 100.0, 2.0, 2.0);
    m = new Mesh("assets/objects/teddy.json");
    cubito = new Cube(1.0);

    let canvasSize = new Vector2<number>(
        Core.getInstance().canvas().width,
        Core.getInstance().canvas().height
    );

    skybox = new Skybox("assets/images/canyon", false);

    /*framebuffer = new Framebuffer([
        new SimpleTexture2D(canvasSize, {
            "internalformat": gl_.RGB,
            "format": gl_.RGB,
            "type": gl_.FLOAT,
            "minFilter": TextureType.Nearest,
            "maxFilter": TextureType.Nearest
        })
    ], canvasSize, true, true, {});*/

    const webgl2 = true;

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
    const gl = Core.getInstance().getGL();
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: TextureType.Linear,
        magFilter: TextureType.Linear,
        wrapS: TextureType.Clamp2Edge,
        wrapT: TextureType.Clamp2Edge
    });

    // const ext = gl_.getExtension("OES_draw_buffers_indexed");
    // console.log(ext);

    /*let arr = [
        'OES_element_index_uint',
        'EXT_sRGB',
        'EXT_blend_minmax',
        'EXT_frag_depth',
        'WEBGL_depth_texture',
        'WEBKIT_WEBGL_depth_texture',
        'EXT_shader_texture_lod',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_draw_buffers',
        'OES_fbo_render_mipmap',
        'ANGLE_instanced_arrays'
    ];

    arr.forEach((v: string) => {
        console.log(v);
        console.log(gl_.getExtension(v));
    });*/

    console.log(ResourceMap._resourceMap);

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
function drawScene(dt: number) {
    camera.timeElapsed = Timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    Core.getInstance().clearColorAndDepth();

    /**
    gl.depthMask(false);
    var prog2 = ShaderManager.get("pp");
    prog2.use();
    prog2.sendUniform1f("time", dt);
    PostProcess.render();
    gl.depthMask(true);
    /**/

    let prog = ProgramManager.get(mainShader);
    prog.use();

    // prog.sendUniformVec3("lightPosition", light.position);

    angle += Timer.deltaTime() * 0.001;
    // console.log(angle);

    tex2d.bind(0);
    prog.sendUniform1i("texSampler", 0);

    let varvar = text.max;
    let i = 0, j = 0, k = 0;
    let dd = -1;
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

                m.render();
            }
        }
    }
    skybox.render(view, projection);

    if (Input.getInstance().isButtonClicked(Input.mouseButton.Left)) {
        console.log("Mouse left clicked");
    }

    /**
    const gl = Core.getInstance().getGL();
    camera.timeElapsed = Timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    Core.getInstance().clearColorAndDepth();

    const prog = ProgramManager.get(mainShader);
    prog.use();

    tex2d.bind(0);
    prog.sendUniform1i("tex", 0);

    angle += Timer.deltaTime() * 0.001;

    light.addTransform(
        Math.sin(angle) * 0.06,
        Math.cos(angle) * 0.06,
        0.0 // 5.0 + Math.cos(dt) * 0.06
    );

    let varvar = text.max;
    let i = 0, j = 0, k = 0;
    let dd = -1;
    //for (i = -varvar; i < varvar; i += 5.0) {
    //    for (j = -varvar; j < varvar; j += 5.0) {
    //        for (k = -varvar; k < varvar; k += 5.0) {
    //            dd *= -1;
    //            mat4.translate(model, identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, k * 1.0));
    //            mat4.rotateY(model, model, 90.0 * Math.PI / 180);
    //            mat4.rotateY(model, model, angle * dd);
    //            mat4.scale(model, model, vec3.fromValues(0.1, 0.1, 0.1));
    //
    //            prog.sendUniformMat4("model", model);
    //
    //            m.render();
    //        }
    //    }
    //}
    //mat4.translate(model, identityMatrix,
    //    new Float32Array([
    //        light._position.x,
    //        light._position.y,
    //        light._position.z
    //    ]));
    //prog.sendUniformMat4("model", model);
    //esferita.render();

    skybox.render(view, projection);
    /**/
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //

/**/
window.onload = () => {
    let app = new App({
        loadAssets: loadAssets,
        initialize: initialize,
        draw: drawScene,
        cameraUpdate: cameraUpdateCb,
        textCB: function(gui: dat.GUI) {
            gui.add(text, "max", 5, 100);
        }
    }, text).start();
};
/**/
