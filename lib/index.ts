/// <reference path="core/core.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="resources/shaderManager.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="models/torus.ts" />
/// <reference path="core/model.ts" />
/// <reference path="textures/texture2d.ts" />

/// <reference path="core/postprocess.ts" />
/// <reference path="extras/timer.ts" />

/// <reference path="lights/pointLight.ts" />
/// <reference path="_demoCamera.ts" />
/// <reference path="core/postProcess.ts" />

let camera = new Camera(new Float32Array([-2.7, -1.4, 11.8]));

let stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

let SimpleConfig = function() {
	return {
        max: 25
    };
};
let gui: dat.GUI;
let torito: Torus;
let m: Model;

let view;
let projection;

let tex2d: Texture2D;

let light = new PointLight(new Float32Array( [-2.5, -2.5, 0.0] ));

let identityMatrix = mat4.create();
mat4.identity(identityMatrix);
let model = mat4.create();
let angle = 0;

let text = SimpleConfig();
function loadAssets() {
    myImageLoader("crystal.jpg");
}

function initialize() {
    torito = new Torus(3.7, 2.3, 25, 10);
    m = new Model("teddy.json");

    ShaderManager.addWithFun("prog", (): ShaderProgram => {
        let prog: ShaderProgram = new ShaderProgram();
        prog.addShader("./shaders/demoShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/demoShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();

        prog.addUniforms(["projection", "view", "model", 
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });

    ShaderManager.addWithFun("pp", (): ShaderProgram => {
        let prog: ShaderProgram = new ShaderProgram();
        prog.addShader(`#version 300 es
            precision highp float;
            layout(location = 0) in vec3 vertPosition;
            out vec2 texCoord;
            void main(void) {
                texCoord = vec2(vertPosition.xy * 0.5) + vec2(0.5);
                gl_Position = vec4(vertPosition, 1.0);
            }`, shader_type.vertex, mode.read_text);
        prog.addShader(`#version 300 es
            precision highp float;
            /*uniform sampler2D dataTexture;*/

            out vec4 fragColor;
            in vec2 texCoord;

            uniform float time;

            void main() {
                fragColor = vec4(texCoord, 0.0, 1.0);
                fragColor.rgb = vec3(cos(time), 0.0, 1.0);
            }`, shader_type.fragment, mode.read_text);
        prog.compile();

        prog.addUniforms(["time"]);
        return prog;
    });

    let prog = ShaderManager.get("prog");

    prog.use();

    let cubeImage = ResourceMap.retrieveAsset("crystal.jpg");
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

    let prog = ShaderManager.get("prog");
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

    Core.getInstance().clearColorAndDepth();

    /**/
    gl.depthMask(false);
    let prog2 = ShaderManager.get("pp");
    prog2.use();
    prog2.sendUniform1f("time", dt);
    PostProcess.render();
    gl.depthMask(true);
    /**/

    const prog = ShaderManager.get("prog");
    prog.use();

    prog.sendUniformVec3("lightPosition", light.position);

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
                mat4.translate(model, identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, k * 1.0));
                mat4.rotateY(model, model, 90.0 * Math.PI / 180);
                mat4.rotateY(model, model, angle * dd);
                mat4.scale(model, model, vec3.fromValues(0.1, 0.1, 0.1));

                prog.sendUniformMat4("model", model);

                m.render();
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
    Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);


    if (Object.keys(text).length > 0) {
        gui = new dat.GUI();

        /*for (var index in text) { 
            gui.add(text, index);
        }*/
        gui.add(text, "max", 5, 100);
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
        requestAnimationFrame(loop);
    });
};

function loop(dt: number) {
    Input.getInstance().update();

	stats.begin();
    dt *= 0.001; // convert to seconds

    Timer.update();
    

    resize();
	

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