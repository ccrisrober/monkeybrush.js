/// <reference path="material.ts" />
/// <reference path="../core/shaderProgram.ts" />

class DepthMat extends Material {
	static ss: ShaderProgram = new ShaderProgram();
	static initialize() {
		DepthMat.ss.addShader("shaders/depthShader.vert", gl.VERTEX_SHADER, mode.read_file);
	}
}
//DepthMat.initialize();