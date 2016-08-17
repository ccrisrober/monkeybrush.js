/// <reference path="core.ts" />

"use strict";
/**
* This class wrap PostProcess effects
*
* @class core.PostProcess
*/
class PostProcess {
	static initialize() {
		const gl = Core.getInstance().getGL();
		if (!PostProcess._planeVAO) {
		    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
		    PostProcess._planeVAO = (<any>gl).createVertexArray();  
		    (<any>gl).bindVertexArray(PostProcess._planeVAO);  
		    let planeVertexVBO = gl.createBuffer();  
		    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexVBO);  
		    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		    gl.enableVertexAttribArray(0);
		    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		    (<any>gl).bindVertexArray(null);
		}
	}

	public static bind() {
		const gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(PostProcess._planeVAO);  
	}

	public static render() {
		// console.log("DRAW QUAD");
		const gl = Core.getInstance().getGL();
	    (<any>gl).bindVertexArray(PostProcess._planeVAO);  
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	    (<any>gl).bindVertexArray(null);  
	}

	protected static _planeVAO: any = null; // TODO: WebGLVertexArrayObject
	protected static _planeVertexVBO: WebGLBuffer = null;
}

PostProcess.initialize();