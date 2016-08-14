/// <reference path="core/core.ts" />


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

window.onload = () => {
	gl = Core.getInstance().getGL();

	gl.clearColor(1.0, 0.0, 0.0, 1.0);

	requestAnimationFrame(drawScene);
}

function drawScene(dt: number) {
	dt *= 0.001; // convert to seconds

	resize(gl);

	gl.clear(gl.COLOR_BUFFER_BIT);

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