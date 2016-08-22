/// <reference path="material.ts" />
/// <reference path="../../core/program.ts" />

class DepthMat extends Material {
    static ss: Program = new Program();
    static initialize() {
        // const gl = Core.getInstance().getGL();
        // DepthMat.ss.addShader("shaders/depthShader.vert", shader_type.vertex, mode.read_file);
    }
}
// DepthMat.initialize();