/// <reference path="library/core/core.ts" />
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
/// <reference path="library/textures/texture3d.ts" />

/// <reference path="library/core/gbuffer.ts" />
/// <reference path="library/core/gbufferSSAO.ts" />
/// <reference path="library/core/postprocess.ts" />
/// <reference path="library/extras/timer.ts" />

/// <reference path="library/lights/pointLight.ts" />
/// <reference path="library/_demoCamera.ts" />
/// <reference path="library/core/postProcess.ts" />
/// <reference path="library/_init_.ts" />

"use strict";

let camera = new Camera2(new Float32Array([-2.7, -1.4, 11.8]));

let gl_;

let esferita: Sphere;
let cubito: Cube;

let SimpleConfig = function() {
    return {
        max: 10
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
}

const mainShader: string = "prog";

let framebuffer: Framebuffer;

function initialize() {
    gl_ = Core.getInstance().getGL();
    esferita = new Sphere(1.0, 20, 20);
    torito = new Torus(3.7, 2.3, 25, 10);
    planito = new Plane(100.0, 100.0, 2.0, 2.0);
    m = new Mesh("assets/objects/teddy.json");
    cubito = new Cube(1.0);

    let canvasSize = new Vector2<number>(
        gl_.canvas.width,
        gl_.canvas.height
    );

    framebuffer = new Framebuffer([
        new SimpleTexture2D(canvasSize, {
            "internalformat": gl_.RGB,
            "format": gl_.RGB,
            "type": gl_.FLOAT,
            "minFilter": gl_.NEAREST,
            "maxFilter": gl_.NEAREST
        })
    ], canvasSize, true, true, {});

    const vsize = new Vector3<number>(100, 100, 100);

    ProgramManager.addWithFun("prog", (): Program => {
        let prog: Program = new Program();
        prog.addShader("./shaders/demoShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/demoShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();

        prog.addUniforms(["projection", "view", "model", 
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    }); 
    ProgramManager.addWithFun("blur", (): Program => {
        let prog2: Program = new Program();
        prog2.addShader(`#version 300 es
            precision highp float;
            layout(location = 0) in vec3 vertPosition;
            out vec2 texCoord;
            void main(void) {
                texCoord = vec2(vertPosition.xy * 0.5) + vec2(0.5);
                gl_Position = vec4(vertPosition, 1.0);
            }`, shader_type.vertex, mode.read_text);
        prog2.addShader(`#version 300 es
            precision highp float;
            uniform sampler2D dataTexture;

            out vec4 fragColor;
            in vec2 texCoord;

            void main() {

                fragColor = vec4(texture(dataTexture, texCoord).rgb, 1.0);

            }`, shader_type.fragment, mode.read_text);
        prog2.compile();

        prog2.addUniforms(["time"]);
        return prog2;
    });

    let cubeImage = ResourceMap.retrieveAsset("exampleImg");
    const gl = Core.getInstance().getGL();
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrap: [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
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
function drawScene(dt: number) {
    const gl = Core.getInstance().getGL();
    camera.timeElapsed = Timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    framebuffer.bind();

    Core.getInstance().clearColorAndDepth();

    const prog = ProgramManager.get(mainShader);
    prog.use();

    tex2d.bind(0);
    prog.sendUniform1i("tex", 0);

    angle += Timer.deltaTime() * 0.001;

    /*light.addTransform(
        Math.sin(angle) * 0.06,
        Math.cos(angle) * 0.06,
        0.0 //5.0 + Math.cos(dt) * 0.06
    );*/
    
    let varvar = text.max;
    let i = 0, j = 0, k = 0;
    let dd = -1;
    /**/
    for (i = -varvar; i < varvar; i += 5.0) {
        for (j = -varvar; j < varvar; j += 5.0) {
            for (k = -varvar; k < varvar; k += 5.0) {
                dd *= -1;
                mat4.translate(model, identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, k * 1.0));
                mat4.rotateY(model, model, 90.0 * Math.PI / 180);
                mat4.rotateY(model, model, angle * dd);
                mat4.scale(model, model, vec3.fromValues(0.1, 0.1, 0.1));

                prog.sendUniformMat4("model", model);

                m.render();
            }
        }
    }
    /**
    mat4.translate(model, identityMatrix, light.position);
    prog.sendUniformMat4("model", model);
    torito.render();
    /**/

    tex2d.unbind();

    framebuffer.onlyBindTextures();

    Core.getInstance().clearColorAndDepth();
    let prog2 = ProgramManager.get("blur");
    prog2.use();
    PostProcess.render();
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //


window.onload = () => {
    _init__.init(loadAssets, text);
    _init__.start(initialize, drawScene);
};