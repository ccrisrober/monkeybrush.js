/// <reference path="core/core.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="resources/shaderManager.ts" />
/// <reference path="models/torus.ts" />
/// <reference path="textures/texture2d.ts" />

/// <reference path="core/postprocess.ts" />
/// <reference path="extras/timer.ts" />

/// <reference path="lights/pointLight.ts" />
/// <reference path="_demoCamera.ts" />
var camera = new Camera(new Float32Array([-2.7, -1.4, 11.8]));

var stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

var SimpleConfig = function() {
	return { };
};
var gui: dat.GUI;
var torito: Torus;

var view;
var projection;

function initialize() {
    torito = new Torus(3.7, 2.3, 25, 10);

    ShaderManager.addWithFun("prog", (): ShaderProgram => {
        var prog2: ShaderProgram = new ShaderProgram();
        prog2.addShader("./shaders/demoShader.vert", shader_type.vertex, mode.read_file);
        prog2.addShader("./shaders/demoShader.frag", shader_type.fragment, mode.read_file);
        prog2.compile();

        prog2.addUniforms(["projection", "view", "model", 
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog2;
    });

    var prog = ShaderManager.get("prog");

    prog.use();

    cameraUpdateCb();

    initTexture("matcap.jpg");
}
var counterTextures = 0;

function initTexture(str: string) {
    counterTextures++;

    var cubeImage = new Image();
    cubeImage.onload = function () { 
        var gl = Core.getInstance().getGL();
        var size: vector2<number> = new vector2<number>(1000.0, 1000.0);
        tex2d = new Texture2D(cubeImage, size, {
            flipY: true,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
            wrap: [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
        });
        counterTextures--;
    }
    cubeImage.src = str;
}
var tex2d: Texture2D;

var light = new PointLight(new Float32Array( [-2.5, -2.5, 0.0] ));

var identityMatrix = mat4.create();
mat4.identity(identityMatrix);
var model = mat4.create();
var angle = 0;

function cameraUpdateCb() {
    var canvas = Core.getInstance().canvas();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);

    var prog = ShaderManager.get("prog");
    prog.use();
    prog.sendUniformMat4("view", view);
    prog.sendUniformMat4("projection", projection);
    prog.sendUniform3fv("viewPos", camera.position);
}

// @param dt: Global time in seconds
function drawScene(dt: number) {
    var gl = Core.getInstance().getGL();
    camera.timeElapsed = timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    Core.getInstance().clearColorAndDepth();

    var prog = ShaderManager.get("prog");
    prog.use();

    prog.sendUniform3fv("lightPosition", light.position);

    angle += timer.deltaTime() * 0.001;
    //console.log(angle);

    tex2d.bind(0);
    prog.sendUniform1i("texSampler", 0);

    var varvar = 25;
    var i = 0, j = 0;
    var dd = -1;
    for(i = -varvar; i <varvar; i += 5.0) {
        for(j = -varvar; j < varvar; j += 5.0) {
            dd *= -1;
            mat4.translate(model,identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, 0.0));
            mat4.rotateY(model, model, 90.0 * Math.PI / 180);
            mat4.rotateY(model, model, angle * dd);
            mat4.scale(model, model, vec3.fromValues(0.25, 0.25, 0.25));

            prog.sendUniformMat4("model", model);

            torito.render();
        }
    }
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //

window.onload = () => {
    Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);

    var text = SimpleConfig();

    if(Object.keys(text).length > 0) {
        gui = new dat.GUI();

        for(var index in text) { 
            gui.add(text, index);
        }
    }
    initialize();

    var itv = setInterval(function() {
        //console.log(counterTextures);
        if(counterTextures === 0) {
            //console.log(tex2d);
            clearInterval(itv);
            requestAnimationFrame(loop);
        }        
    }, 100);
}

function loop(dt: number) {
    Input.getInstance().update();

	stats.begin();
    dt *= 0.001; // convert to seconds

    timer.update();

	drawScene(dt);    // User cliet

	stats.end();
	requestAnimationFrame(loop);
}