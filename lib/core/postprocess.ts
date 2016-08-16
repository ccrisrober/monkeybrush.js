/// <reference path="core.ts" />

"use strict";
/**
* This class wrap PostProcess effects
*
* @class core.PostProcess
*/
class PostProcess {
	constructor() {
		var gl = Core.getInstance().getGL();
		if(!PostProcess.planeVAO) {
			PostProcess.planeVAO = (<any>gl).createVertexArray();

			var positions = [
				-1.0,  -1.0, 
				 1.0,  -1.0, 
				-1.0,   1.0, 
				 1.0,   1.0
			];
	
			PostProcess.planeVertexVBO = gl.createBuffer();  
			gl.bindBuffer(gl.ARRAY_BUFFER, PostProcess.planeVertexVBO);  
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(0);
			gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
			(<any>gl).bindVertexArray(null);
		}
	}

	public bind() {
		var gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(PostProcess.planeVAO);  
	}

	public render() {
		var gl = Core.getInstance().getGL();
	    (<any>gl).bindVertexArray(PostProcess.planeVAO);  
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	    (<any>gl).bindVertexArray(null);  
	}

	static planeVAO: any = null; // TODO: WebGLVertexArrayObject
	static planeVertexVBO: WebGLBuffer = null;
}