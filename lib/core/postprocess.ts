/// <reference path="core.ts" />

"use strict";
/**
* This class wrap PostProcess effects
*
* @class core.PostProcess
*/
class PostProcess {
	static initialize() {
		var gl = Core.getInstance().getGL();
		if(!PostProcess._planeVAO) {
		    var positions = [
		        -1.0,  -1.0, 
		         1.0,  -1.0, 
		        -1.0,   1.0, 
		         1.0,   1.0
		    ];

		    PostProcess._planeVAO = (<any>gl).createVertexArray();  
		    (<any>gl).bindVertexArray(PostProcess._planeVAO);  
		    var planeVertexVBO = gl.createBuffer();  
		    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexVBO);  
		    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		    gl.enableVertexAttribArray(0);
		    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		    (<any>gl).bindVertexArray(null);
		}
	}

	public static bind() {
		var gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(PostProcess._planeVAO);  
	}

	public static render() {
		//console.log("DRAW QUAD");
		var gl = Core.getInstance().getGL();
	    (<any>gl).bindVertexArray(PostProcess._planeVAO);  
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	    (<any>gl).bindVertexArray(null);  
	}

	static _planeVAO: any = null; // TODO: WebGLVertexArrayObject
	static _planeVertexVBO: WebGLBuffer = null;
}

PostProcess.initialize();