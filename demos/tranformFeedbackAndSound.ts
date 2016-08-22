/// <reference path="core/core.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="resources/shaderManager.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="models/torus.ts" />
/// <reference path="models/sphere.ts" />
/// <reference path="models/quad.ts" />
/// <reference path="core/model.ts" />
/// <reference path="textures/texture2d.ts" />

/// <reference path="core/gbuffer.ts" />
/// <reference path="core/gbufferSSAO.ts" />
/// <reference path="core/postprocess.ts" />
/// <reference path="extras/timer.ts" />
/// <reference path="resources/audioClip.ts" />

/// <reference path="lights/pointLight.ts" />
/// <reference path="_demoCamera.ts" />
/// <reference path="core/postProcess.ts" />

let camera = new Camera(new Float32Array([-2.7, -1.4, 11.8]));
let audiosSystem = new AudioClip();

let stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

let deferred: GBuffer;
let ssao: GBufferSSAO;
let esferita: Sphere;

let SimpleConfig = function() {
	return {
        drawButton: function() {
            draw();
            audiosSystem.playSound("clip.mp3");
        },
        max: 10
    };
};
let gui: dat.GUI;
let torito: Torus;
let planito: Quad;
let m: Model;

let view;
let projection;

let tex2d: Texture2D;

let light = new PointLight(new Float32Array( [-5.0, 0.0, 0.0] ));

let identityMatrix = mat4.create();
mat4.identity(identityMatrix);
let model = mat4.create();
let angle = 0;

let text = SimpleConfig();
function loadAssets() {
    myImageLoader("matcap.jpg");
    audiosSystem.loadAudio("clip.mp3");
}

const mainShader: string = "prog";

function initialize() {
    //esferita = new Sphere(1.0, 20, 20);
    //torito = new Torus(3.7, 2.3, 25, 10);
    //planito = new Quad(100.0, 100.0, 2.0, 2.0);
    //m = new Model("teddy.json");

    ShaderManager.addWithFun("prog", (): ShaderProgram => {
        let prog: ShaderProgram = new ShaderProgram();
        prog.addShader("./shaders/demoShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/demoShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();

        prog.addUniforms(["projection", "view", "model", 
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });

    ShaderManager.addWithFun("tf", (): ShaderProgram => {
        let prog: ShaderProgram = new ShaderProgram();
        prog.addShader("./shaders/transformFeedback.vert", shader_type.vertex, mode.read_file);
        prog.addShader(`#version 300 es
precision highp float;
  out vec4 fragColor;
void main(void) {
   fragColor = vec4( 1.,0.,0., 1. );
}`, shader_type.fragment, mode.read_text);

        var gl = Core.getInstance().getGL();
        
        prog.compile();

        (<any>gl).transformFeedbackVaryings(prog.program(), ["gl_Position"], 
            (<any>gl).SEPARATE_ATTRIBS);

        prog.addAttributes(["position"]);

        return prog;
    });

    let cubeImage = ResourceMap.retrieveAsset("matcap.jpg");
    const gl = Core.getInstance().getGL();
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrap: [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
    });

    //audio.playBackgroundAudio("music.mp3");

    let prog = ShaderManager.get("tf");
    prog.use();

    gl.enableVertexAttribArray(prog.attribLocations["position"]);

    bufA = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([.8,0,0]), (<any>gl).DYNAMIC_COPY)

    bufB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufB);
    gl.bufferData(gl.ARRAY_BUFFER, 3 * Float32Array.BYTES_PER_ELEMENT, (<any>gl).DYNAMIC_COPY);

    var tff = (<any>gl).createTransformFeedback();
    (<any>gl).bindTransformFeedback((<any>gl).TRANSFORM_FEEDBACK, tff);

    draw();

    //cameraUpdateCb();
}

var bufA, bufB;

function draw() {
    const gl = Core.getInstance().getGL();
    gl.clear(gl.COLOR_BUFFER_BIT);

    let prog = ShaderManager.get("tf");
    prog.use();

    gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
    gl.vertexAttribPointer(prog.attribLocations["position"], 3, gl.FLOAT, false, 0, 0);
    (<any>gl).bindBufferBase((<any>gl).TRANSFORM_FEEDBACK_BUFFER, 0, bufB);

    (<any>gl).beginTransformFeedback(gl.POINTS);
    gl.drawArrays(gl.POINTS, 0, 1);
    (<any>gl).endTransformFeedback();

    (<any>gl).bindBufferBase((<any>gl).TRANSFORM_FEEDBACK_BUFFER, 0, null);

    var t = bufA;
    bufA = bufB;
    bufB = t;
}

function cameraUpdateCb() {
    let canvas = Core.getInstance().canvas();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);

    let prog = ShaderManager.get(mainShader);
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

    const prog = ShaderManager.get(mainShader);

    light.addTransform(
        Math.sin(dt) * 0.06,
        Math.cos(dt) * 0.06,
        0.0 //5.0 + Math.cos(dt) * 0.06
    );

    prog.use();

    prog.sendUniformVec3("lightPosition", light.position);

    tex2d.bind(0);
    prog.sendUniform1i("tex", 0);

    angle += Timer.deltaTime() * 0.001;

    prog.sendUniform1b("usemc", true);

    /**
    let varvar = text.max;
    let i = 0, j = 0, k = 0;
    let dd = -1;
    for (i = -varvar; i < varvar; i += 5.0) {
        for (j = -varvar; j < varvar; j += 5.0) {
            for (k = -varvar; k < varvar; k += 5.0) {
                dd *= -1;
                mat4.translate(model, identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, k * 1.0));
                mat4.rotateY(model, model, 90.0 * Math.PI / 180);
                mat4.rotateY(model, model, angle * dd);
                mat4.scale(model, model, vec3.fromValues(0.23, 0.35, 0.35));

                prog.sendUniformMat4("model", model);

                torito.render();
            }
        }
    }
    /**/
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //

function myImageLoader(src) {
    if (!ResourceMap.isAssetLoaded(src)) {
        let img = new Image();
        ResourceMap.asyncLoadRequested(src);
        img.onload = function() {
            // setTimeout(function() {
                ResourceMap.asyncLoadCompleted(src, img);
            // }, 2500);
        };
        img.onerror = function(err) {
            ResourceMap.asyncLoadFailed(src);
        };
        img.src = src;
    } else {
        ResourceMap.incAssetRefCount(src);
    }
};

window.onload = () => {
    Core.getInstance().initialize([0.0, 1.0, 0.0, 1.0]);


    if (Object.keys(text).length > 0) {
        gui = new dat.GUI();

        /*for (var index in text) { 
            gui.add(text, index);
        }*/
        gui.add(text, "max", 5, 100);
        gui.add(text, "drawButton");
    }

    loadAssets();

    ResourceMap.setLoadCompleteCallback(function() {
        console.log("ALL RESOURCES LOADED!!!!");

        Element.prototype.remove = function() {
            this.parentElement.removeChild(this);
        };
        NodeList.prototype["remove"] = HTMLCollection.prototype["remove"] = function() {
            for (let i = this.length - 1; i >= 0; i--) {
                if (this[i] && this[i].parentElement) {
                    this[i].parentElement.removeChild(this[i]);
                }
            }
        };

        // Remove loader css3 window
        document.getElementById("spinner").remove();

        initialize();
        //requestAnimationFrame(loop);
    });
};

function loop(dt: number) {
    Input.getInstance().update();

	stats.begin();
    dt *= 0.001; // convert to seconds

    Timer.update();
    

    //resize();
	

    drawScene(dt);    // Draw user function

	stats.end();
	requestAnimationFrame(loop);
}
function resize() {
    let canvas: HTMLCanvasElement = Core.getInstance().canvas();
    let realToCSSPixels = window.devicePixelRatio || 1;

    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    let displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
    let displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;

        // Set the viewport to match
        Core.getInstance().changeViewport(0, 0, canvas.width, canvas.height);

        cameraUpdateCb();
    }
}