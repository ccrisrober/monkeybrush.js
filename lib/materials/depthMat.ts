/// <reference path="material.ts" />
/// <reference path="../core/shaderProgram.ts" />

class DepthMat extends Material {
	static ss: ShaderProgram = new ShaderProgram();
	static initialize() {
        // const gl = Core.getInstance().getGL();
		// DepthMat.ss.addShader("shaders/depthShader.vert", shader_type.vertex, mode.read_file);
	}
}
// DepthMat.initialize();