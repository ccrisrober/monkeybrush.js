/// <reference path="core/core.ts" />
/// <reference path="resources/quadToneMap.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />

function getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
	var contexts: string[] = "webgl,webgl2,experimental-webgl2".split(",");
	var gl: WebGLRenderingContext;
	var ctx;
	for (var i = 0; i < contexts.length; i++) {
		ctx = contexts[i];
		gl = <WebGLRenderingContext>canvas.getContext(contexts[i]);
		if (gl) {
			return gl;
		}
	}
	return null;
}
function getVendors() {
	var vendors: string[] = "ms,moz,webkit,o".split(",");
	if (!window.requestAnimationFrame) {
		var vendor;
		for (var i = 0; i < vendors.length; i++) {
			vendor = vendors[i];
			window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
			if (window.requestAnimationFrame) {
				break;
			}
		}
	}
}

var gl: WebGLRenderingContext;
var stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

var FizzyText = function() {
	return {
		message: 'dat.gui',
		speed: 0.8,
		displayOutline: false,
		explode: function() {  }
		// Define render logic ...
	};
};

window.onload = () => {
	gl = Core.getInstance().getGL();
	ToneMap.init(gl);

	gl.clearColor(1.0, 0.0, 0.0, 1.0);

	var text = FizzyText();
	var gui = new dat.GUI();

	for(var index in text) { 
	    gui.add(text, index);
	}

	requestAnimationFrame(drawScene);
}

function drawScene(dt: number) {
	stats.begin();
	dt *= 0.001; // convert to seconds

	//resize(gl);

	gl.clear(gl.COLOR_BUFFER_BIT);

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
	}
}

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