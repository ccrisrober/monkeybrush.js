/// <reference path="core/core.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="resources/shaderManager.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="resources/loaders.ts" />
/// <reference path="models/torus.ts" />
/// <reference path="models/sphere.ts" />
/// <reference path="models/quad.ts" />
/// <reference path="models/mesh.ts" />
/// <reference path="textures/texture2d.ts" />
/// <reference path="textures/texture3d.ts" />

/// <reference path="core/gbuffer.ts" />
/// <reference path="core/gbufferSSAO.ts" />
/// <reference path="core/postprocess.ts" />
/// <reference path="extras/timer.ts" />

/// <reference path="lights/pointLight.ts" />
/// <reference path="_demoCamera.ts" />
/// <reference path="core/postProcess.ts" />

let camera = new Camera(new Float32Array([-2.7, -1.4, 11.8]));

var gl_;

let stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

let esferita: Sphere;

let SimpleConfig = function() {
    return {
        max: 10
    };
};
let gui: dat.GUI;
let torito: Torus;
let planito: Quad;
let m: Mesh;

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
    loaders.loadImage("matcap.jpg");
}

const mainShader: string = "prog";




var transformFeedback;

var particlePositions;
var particleVelocities;
var particleSpawntime;
var particleLifetime;
var particleIDs;

var Particle = {
    POSITION: 0,
    VELOCITY: 1,
    SPAWN_TIME: 2,
    LIFE_TIME: 3,
    ID: 4,
    MAX: 5
};

var NUM_PARTICLES = 1000;
var ACCELERATION = -1.0;

var particleVBOs;
var particleVAOs;

var POSITION_LOCATION = 0;
var VELOCITY_LOCATION = 1;
var SPAWNTIME_LOCATION = 2;
var LIFETIME_LOCATION = 3;
var ID_LOCATION = 4;


function initialize() {
    gl_ = Core.getInstance().getGL();
    esferita = new Sphere(1.0, 20, 20);
    torito = new Torus(3.7, 2.3, 25, 10);
    planito = new Quad(100.0, 100.0, 2.0, 2.0);
    m = new Mesh("teddy.json");

    const vsize = new Vector3<number>(100, 100, 100);

    ShaderManager.addWithFun("prog", (): ShaderProgram => {
        let prog: ShaderProgram = new ShaderProgram();
        prog.addShader("./shaders/demoShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/demoShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();

        prog.addUniforms(["projection", "view", "model", 
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
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


    ShaderManager.addWithFun("emit", (): ShaderProgram => {
        let prog = new ShaderProgram();
        prog.addShader(`#version 300 es
        #define POSITION_LOCATION 0
        #define VELOCITY_LOCATION 1
        #define SPAWNTIME_LOCATION 2
        #define LIFETIME_LOCATION 3
        #define ID_LOCATION 4
        precision highp float;
        precision highp int;
        precision highp sampler3D;
        uniform float u_time;
        uniform vec2 u_acceleration;
        layout(location = POSITION_LOCATION) in vec2 a_position;
        layout(location = VELOCITY_LOCATION) in vec2 a_velocity;
        layout(location = SPAWNTIME_LOCATION) in float a_spawntime;
        layout(location = LIFETIME_LOCATION) in float a_lifetime;
        layout(location = ID_LOCATION) in float a_ID;
        out vec2 v_position;
        out vec2 v_velocity;
        out float v_spawntime;
        out float v_lifetime;
        float rand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }
        void main()
        {
            if (a_spawntime == 0.0 || (u_time - a_spawntime > a_lifetime) || a_position.y < -0.5) {
                // Generate a new particle
                v_position = vec2(0.0, 0.0);
                v_velocity = vec2(rand(vec2(a_ID, 0.0)) - 0.5, rand(vec2(a_ID, a_ID)));
                v_spawntime = u_time;
                v_lifetime = 5000.0;
            } else {
                v_velocity = a_velocity + 0.01 * u_acceleration;
                v_position = a_position + 0.01 * v_velocity;
                v_spawntime = a_spawntime;
                v_lifetime = a_lifetime;
            }
        }`, shader_type.vertex, mode.read_text);
        prog.addShader(`#version 300 es
        precision highp float;
        precision highp int;
        out vec4 color;
        void main()
        {
            color = vec4(1.0);
        }`, shader_type.fragment, mode.read_text);
        prog.compile();

        var varyings = ['v_position', 'v_velocity', 'v_spawntime', 'v_lifetime'];
        (<any>gl).transformFeedbackVaryings(prog.program(), varyings, (<any>gl).SEPARATE_ATTRIBS);

        prog.addUniforms(["u_time", "u_acceleration"]);
        console.log(prog);

        return prog;
    });


    ShaderManager.addWithFun("draw", (): ShaderProgram => {
        let prog = new ShaderProgram();
        prog.addShader(`#version 300 es
        #define POSITION_LOCATION 0
        #define VELOCITY_LOCATION 1
        #define SPAWNTIME_LOCATION 2
        #define LIFETIME_LOCATION 3
        precision highp float;
        precision highp int;
        uniform float u_time;
        uniform vec2 u_acceleration;
        layout(location = POSITION_LOCATION) in vec2 a_position;
        layout(location = VELOCITY_LOCATION) in vec2 a_velocity;
        layout(location = SPAWNTIME_LOCATION) in float a_spawntime;
        layout(location = LIFETIME_LOCATION) in float a_lifetime;
        void main()
        {
            float deltaTime = u_time - a_spawntime;
            if (deltaTime < a_lifetime) {
                gl_Position = vec4(a_position, 0.0, 1.0);
            } else {
                gl_Position = vec4(-100.0, -100.0, 0.0, 1.0);
            }
            gl_PointSize = 2.0;
        }`, shader_type.vertex, mode.read_text);
        prog.addShader(`#version 300 es
        precision highp float;
        precision highp int;
        uniform vec4 u_color;
        out vec4 color;
        void main()
        {
            color = u_color;
        }`, shader_type.fragment, mode.read_text);

        prog.compile();

        prog.addUniforms(["u_time", "u_acceleration", "u_color"]);

        console.log(prog);

        return prog;
    });


    particlePositions = new Float32Array(NUM_PARTICLES * 2);
    particleVelocities = new Float32Array(NUM_PARTICLES * 2);
    particleSpawntime = new Float32Array(NUM_PARTICLES);
    particleLifetime = new Float32Array(NUM_PARTICLES);
    particleIDs = new Float32Array(NUM_PARTICLES);


    for (var p = 0; p < NUM_PARTICLES; ++p) {
        particlePositions[p * 2] = 0.0;
        particlePositions[p * 2 + 1] = 0.0;
        particleVelocities[p * 2] = 0.0;
        particleVelocities[p * 2 + 1] = 0.0;
        particleSpawntime[p] = 0.0;
        particleLifetime[p] = 0.0;
        particleIDs[p] = p;
    }


    // -- Init Buffer
    particleVBOs = new Array(2);
    for (var i = 0; i < 2; ++i) {
        particleVBOs[i] = new Array(Particle.MAX);
        for (var j = 0; j < Particle.MAX; ++j) {
            particleVBOs[i][j] = gl.createBuffer();
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, particleVBOs[i][Particle.POSITION]);
        gl.bufferData(gl.ARRAY_BUFFER, particlePositions, (<any>gl).STREAM_COPY);
        gl.bindBuffer(gl.ARRAY_BUFFER, particleVBOs[i][Particle.VELOCITY]);
        gl.bufferData(gl.ARRAY_BUFFER, particleVelocities, (<any>gl).STREAM_COPY);
        gl.bindBuffer(gl.ARRAY_BUFFER, particleVBOs[i][Particle.SPAWN_TIME]);
        gl.bufferData(gl.ARRAY_BUFFER, particleSpawntime, (<any>gl).STREAM_COPY);
        gl.bindBuffer(gl.ARRAY_BUFFER, particleVBOs[i][Particle.LIFE_TIME]);
        gl.bufferData(gl.ARRAY_BUFFER, particleLifetime, (<any>gl).STREAM_COPY);
        gl.bindBuffer(gl.ARRAY_BUFFER, particleVBOs[i][Particle.ID]);
        gl.bufferData(gl.ARRAY_BUFFER, particleIDs, (<any>gl).STATIC_READ);
    }
    // -- Init Vertex Array
    particleVAOs = [(<any>gl).createVertexArray(), (<any>gl).createVertexArray()];
    // -- Init TransformFeedback
    transformFeedback = (<any>gl).createTransformFeedback();


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

function setupVertexAttributes(vaoId, vboArray) {
    const gl: any = Core.getInstance().getGL();
    gl.bindVertexArray(vaoId);
    gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[Particle.POSITION]);
    gl.vertexAttribPointer(POSITION_LOCATION, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[Particle.VELOCITY]);
    gl.vertexAttribPointer(VELOCITY_LOCATION, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[Particle.SPAWN_TIME]);
    gl.vertexAttribPointer(SPAWNTIME_LOCATION, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[Particle.LIFE_TIME]);
    gl.vertexAttribPointer(LIFETIME_LOCATION, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[Particle.ID]);
    gl.vertexAttribPointer(ID_LOCATION, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(POSITION_LOCATION);
    gl.enableVertexAttribArray(VELOCITY_LOCATION);
    gl.enableVertexAttribArray(SPAWNTIME_LOCATION);
    gl.enableVertexAttribArray(LIFETIME_LOCATION);
    gl.enableVertexAttribArray(ID_LOCATION);
}
var currentSourceIdx = 0;
function emitParticles() {
    const gl: any = Core.getInstance().getGL();
    let progEmit = ShaderManager.get("emit");
    // Toggle source and destination VBO
    var sourceVBO = particleVBOs[currentSourceIdx];
    var sourceVAO = particleVAOs[currentSourceIdx];
    var destinationVBO = particleVBOs[(currentSourceIdx + 1) % 2];
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
    gl.useProgram(progEmit.program());
    setupVertexAttributes(sourceVAO, sourceVBO);
    // Set transform feedback buffer
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, destinationVBO[Particle.POSITION]);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, destinationVBO[Particle.VELOCITY]);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 2, destinationVBO[Particle.SPAWN_TIME]);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 3, destinationVBO[Particle.LIFE_TIME]);
    // Turn off rasterization - we are not drawing
    gl.enable(gl.RASTERIZER_DISCARD);
    // Set uniforms
    gl.uniform1f(progEmit.uniformLocations["u_time"], Timer.deltaTime());
    gl.uniform2f(progEmit.uniformLocations["u_acceleration"], 0.0, ACCELERATION);
    // Emit particles using transform feedback
    gl.beginTransformFeedback(gl.POINTS);
    gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);
    gl.endTransformFeedback();
    // Restore state
    gl.disable(gl.RASTERIZER_DISCARD);
    gl.useProgram(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, null);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 2, null);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 3, null);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    // Ping pong the buffers
    currentSourceIdx = (currentSourceIdx + 1) % 2;
}
// @param dt: Global time in seconds
function drawScene(dt: number) {
    const gl = Core.getInstance().getGL();
    emitParticles();
    // Set the viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height - 10);
    // Clear color buffer
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let progDraw = ShaderManager.get("draw");

    setupVertexAttributes(particleVAOs[currentSourceIdx], particleVBOs[currentSourceIdx]);
    gl.useProgram(progDraw.program());
    // Set uniforms
    gl.uniform1f(progDraw["u_time"], Timer.deltaTime());
    gl.uniform4f(progDraw["u_color"], 0.0, 1.0, 1.0, 1.0);
    gl.uniform2f(progDraw["u_acceleration"], 0.0, ACCELERATION);
    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);

    //requestAnimationFrame(drawScene);

    /**
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

    mat4.translate(model, identityMatrix, light.position);
    prog.sendUniformMat4("model", model);
    esferita.render();
    /**/
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //

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