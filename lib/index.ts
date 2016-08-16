/// <reference path="core/core.ts" />
/// <reference path="resources/quadToneMap.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="models/quad.ts" />
/// <reference path="models/cube.ts" />
/// <reference path="models/sphere.ts" />
/// <reference path="models/torus.ts" />
/// <reference path="core/model.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="textures/texture2d.ts" />
/// <reference path="resources/shaderManager.ts" />



/// <reference path="lights/pointLight.ts" />
/// <reference path="_demoCamera.ts" />
var camera = new Camera(new Float32Array([
    -2.7167108058929443, -1.4368079900741577, 11.785898208618164]));
    //-0.8767104148864746, -2.766807794570923, 68.27084350585938]));

var gl: WebGLRenderingContext;
var stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

var SimpleConfig = function() {
	return {
		message: 'dat.gui',
		speed: 0.8,
		displayOutline: false,
		explode: function() {  }
		// Define render logic ...
	};
};


var cc: Model;

var cubito: Cube;
var planito: Quad;
var esferita: Sphere;
var torito: Torus;

var view;
var projection;


window.onload = () => {
	gl = Core.getInstance().getGL();
	ToneMap.init(gl);

	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	var text = SimpleConfig();
	var gui = new dat.GUI();

	for(var index in text) { 
	    gui.add(text, index);
	}

    torito = new Torus(3.7, 2.3, 25, 10);
    esferita = new Sphere(2.5, 10, 20);
	planito = new Quad(1.0, 1.0, 1, 1);
	cubito = new Cube(5.0);
	cc = new Model("teddy.json");

    var ss : ShaderProgram = new ShaderProgram();
	ss.addShader("./shaders/demoShader.vert", gl.VERTEX_SHADER, mode.read_file);
	ss.addShader("./shaders/demoShader.frag", gl.FRAGMENT_SHADER, mode.read_file);
	ss.compile();

	ss.addAttributes(["position", "normal", "uv"]);
	ss.addUniforms(["projection", "view", "model", 
        "normalMatrix", "texSampler", "viewPos", "lightPosition"]);

    /*var arrShader = [];
    for(var ii = 0; ii < 22; ii++) {
        arrShader.push("offsets[" + (ii) + "]")
    }
    ss.addUniforms(arrShader);*/

	ss.use();

    ShaderManager.add("ss", ss);

    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(gl.canvas.width, gl.canvas.height);

    //console.log(view, projection);

    gl.uniformMatrix4fv(ss.uniformLocations['view'], false, view);
    gl.uniformMatrix4fv(ss.uniformLocations['projection'], false, projection);
        gl.uniform3fv(ss.uniformLocations["viewPos"], camera.position);
	//ss.sendUniform("demo", "vec2")([0.0, 0.0], false);


	view = camera.GetViewMatrix();
	projection = camera.GetProjectionMatrix(gl.canvas.width, gl.canvas.height);

    initTexture("matcap.jpg");
    //initTexture("Crystal Ice Monochrome Glow.jpg");
    //initTexture("example.png");
	//tex2d = initTexture("example.png");

    var itv = setInterval(function() {
        //console.log(counterTextures);
        if(counterTextures === 0) {
            //console.log(tex2d);
            clearInterval(itv);
            requestAnimationFrame(drawScene);
        }        
    }, 100);
}

var counterTextures = 0;

function initTexture(str: string) {
    //var tex2d_;

    counterTextures++;

    //gl.bindTexture(gl.TEXTURE_2D, _tex);
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));

    var cubeImage = new Image();
    cubeImage.onload = function () { 
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
    //return tex2d_;
}
var tex2d: Texture2D;

var light = new PointLight(new Float32Array( [-2.5, -2.5, 0.0] ));

var lastTime = Date.now();
var deltaTime = 0.0;
var identityMatrix = mat4.create();
mat4.identity(identityMatrix);
var model = mat4.create();
var angle = 0;

function cameraUpdateCb() {
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(gl.canvas.width, gl.canvas.height);

    var prog = ShaderManager.get("ss");
    gl.uniformMatrix4fv(prog.uniformLocations['view'], false, view);
    gl.uniformMatrix4fv(prog.uniformLocations['projection'], false, projection);
    gl.uniform3fv(prog.uniformLocations["viewPos"], camera.position);
}

function drawScene(dt: number) {
    var currentTime = Date.now();
    var timeElapsed = currentTime - lastTime;

    //camera.timeElapsed = timeElapsed;
    deltaTime = timeElapsed;

    lastTime = currentTime;

    Input.getInstance().update();

	stats.begin();
	dt *= 0.001; // convert to seconds

	dt = deltaTime;
    //console.log(dt);
    camera.timeElapsed = dt / 10.0;

    /**
    light.addTransform(
        Math.cos(angle) * 0.05,
        0.0,
        Math.sin(angle) * 0.05
    );
    /**/

    camera.update(cameraUpdateCb);

	//resize(gl);

	Core.getInstance().clearColorAndDepth();

    //console.log("LEFT: " + Input.getInstance().isKeyPressed(Input.keys["Left"]));

	angle += dt * 0.001;
	/*if(angle >= 180.0) {
		angle = -180.0;
	}*/

    var prog = ShaderManager.get("ss");
    prog.use();

    gl.uniform3fv(prog.uniformLocations["lightPosition"], light.position);


    tex2d.bind(0);
    gl.uniform1i(prog.uniformLocations["texSampler"], 0);

    var dd = -1;

    var i = 0, j = 0;

    mat4.translate(model,identityMatrix, new Float32Array(light.position));
    mat4.rotateY(model, model, 90.0 * Math.PI / 180);
    //mat4.rotateY(model, model, angle * dd);
    mat4.scale(model, model, vec3.fromValues(0.335, 0.335, 0.335));

    gl.uniformMatrix4fv(prog.uniformLocations['model'], false, model);

    //cc.render();
    //cubito.render();
    //planito.render();
    esferita.render();

    //var offsets = [];

    var varvar = 10;
    var index = 0;
    for(var a = -varvar; a < varvar; a += 5.0) {
        for(var b = -varvar; b < varvar; b += 5.0) {
            //offsets.push([a, b]);
            gl.uniform2f(prog.uniformLocations["offsets[" + (index++) + "]"], a*2.0, b*2.0);
        }
    }

    varvar = 25;
    for(i = -varvar; i <varvar; i += 5.0) {
        for(j = -varvar; j < varvar; j += 5.0) {
            dd *= -1;
            mat4.translate(model,identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, 0.0));
            mat4.rotateY(model, model, 90.0 * Math.PI / 180);
            mat4.rotateY(model, model, angle * dd);
            //mat4.scale(model, model, vec3.fromValues(0.335, 0.335, 0.335));
            //mat4.rotateX(model, model, 90.0 * Math.PI / 180);
            //mat4.rotateZ(model, model, angle * dd);
            mat4.scale(model, model, vec3.fromValues(0.25, 0.25, 0.25));

            gl.uniformMatrix4fv(prog.uniformLocations['model'], false, model);

            //cc.render();
            torito.render();
            //torito.render2(index);
            //cubito.render();
            //planito.render();
            //esferita.render();
        }
    }

	stats.end();

	requestAnimationFrame(drawScene);
}

function resize(gl: WebGLRenderingContext) {
	var realToCSSPixels = window.devicePixelRatio || 1;

	// Lookup the size the browser is displaying the canvas in CSS pixels
	// and compute a size needed to make our drawingbuffer match it in
	// device pixels.
	var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
	var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

	// Check if the canvas is not the same size.
	if (gl.canvas.width  != displayWidth ||
		gl.canvas.height != displayHeight) {

		// Make the canvas the same size
		gl.canvas.width  = displayWidth;
		gl.canvas.height = displayHeight;

		// Set the viewport to match
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        cameraUpdateCb();
	}
}
/**
var url = "config.json";
var request = new XMLHttpRequest();
request.open('GET', url, false);
request.onload = function () {
    if (request.status < 200 || request.status > 299) {
        console.log('Error: HTTP Status ' + request.status + ' on resource ' + url);
        return {};
    } else {
    	var json = JSON.parse(request.responseText);
        console.log(json);
    }
};
request.send();
/**/
/*
window.onbeforeunload = function (e) {
  var message = "Your confirmation message goes here.",
  e = e || window.event;
  // For IE and Firefox
  if (e) {
    e.returnValue = message;
  }
  alert(message);
  // For Safari
  return message;
};*/