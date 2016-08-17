/// <reference path="core/core.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="resources/shaderManager.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="models/torus.ts" />
/// <reference path="core/model.ts" />
/// <reference path="textures/texture2d.ts" />

/// <reference path="core/gbuffer.ts" />
/// <reference path="core/postprocess.ts" />
/// <reference path="extras/timer.ts" />

/// <reference path="lights/pointLight.ts" />
/// <reference path="_demoCamera.ts" />
/// <reference path="core/postProcess.ts" />

let camera = new Camera(new Float32Array([-2.7, -1.4, 11.8]));

let stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

let deferred: GBuffer;

let SimpleConfig = function() {
	return {
        max: 10
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

const mainShader: string = "prepass";

function initialize() {
    torito = new Torus(3.7, 2.3, 25, 10);
    m = new Model("teddy.json");

    let canvas: HTMLCanvasElement = Core.getInstance().canvas();
    deferred = new GBuffer(new Vector2<number>(
        canvas.width,
        canvas.height
    ));

    ShaderManager.addWithFun("prepass", (): ShaderProgram => {
        let prog: ShaderProgram = new ShaderProgram();
        prog.addShader("./shaders/gBufferShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/gBufferShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();

        prog.addUniforms(["projection", "view", "model", "normalMatrix"]);

        return prog;
    });
    ShaderManager.addWithFun("postpass", (): ShaderProgram => {
        let prog: ShaderProgram = new ShaderProgram();
        prog.addShader("./shaders/postprocessShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/postprocessShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();

        return prog;
    });

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
            uniform sampler2D gPosition;
            uniform sampler2D gNormal;
            uniform sampler2D gAlbedoSpec;

            out vec4 fragColor;
            in vec2 texCoord;

            uniform float time;

            void main() {
                vec3 outPosition = texture(gPosition, texCoord).rgb;
                vec3 outNormal = texture(gNormal, texCoord).rgb;
                vec4 AlbedoSpec = texture(gAlbedoSpec, texCoord);

                
                if (outNormal == vec3(0.0, 0.0, 0.0)){ discard; } 

                vec3 ambColor = vec3(0.24725, 0.1995, 0.0745);
                vec3 objectColor = AlbedoSpec.rgb;
                vec3 specColor = vec3(0.628281, 0.555802, 0.366065);
                float shininess = 0.4;
                vec3 lightPosition = vec3(1.0);

                vec3 lightColor = vec3(0.0, 0.0, 1.0);

                vec3 ambient = ambColor * lightColor;

                // Diffuse 
                vec3 norm = normalize(outNormal);
                vec3 lightDir = normalize(lightPosition - outPosition);
                float diff = max(dot(norm, lightDir), 0.0);
                vec3 diffuse = diff * lightColor;

                // Attenuation
                float dist    = length(lightPosition - outPosition);

                float constant = 1.0;
                float linear = 0.14;
                float quadratic = 0.07;

                float attenuation = 1.0 / (constant + linear * dist + quadratic * (dist * dist));    

                attenuation = 1.0;

                vec3 color = ((ambient + diffuse) * attenuation) * objectColor;


                fragColor = vec4(color.rgb, 1.0);
            }`, shader_type.fragment, mode.read_text);
        prog.compile();

        prog.addUniforms(["time"]);
        prog.addUniforms(["gPosition", "gNormal", "gAlbedoSpec"]);

        prog.use();

        prog.sendUniform1i("gPosition", 0);
        prog.sendUniform1i("gNormal", 1);
        prog.sendUniform1i("gAlbedoSpec", 2);
        console.log(prog.uniformLocations);
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

    deferred.bindForWriting();

    Core.getInstance().clearColorAndDepth();

    /*
    gl.depthMask(false);
    var prog2 = ShaderManager.get("pp");
    prog2.use();
    prog2.sendUniform1f("time", dt);
    PostProcess.render();
    gl.depthMask(true);
    */

    const prog = ShaderManager.get(mainShader);
    prog.use();

    angle += Timer.deltaTime() * 0.001;

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
    deferred.bindForReading();
    Core.getInstance().clearColorAndDepth();
    var prog2 = ShaderManager.get("pp");
    prog2.use();
    PostProcess.render();
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