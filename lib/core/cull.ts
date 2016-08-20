/// <reference path="core.ts" />

class Cull {
	static gl = Core.getInstance().getGL();

	public static enable() {
		gl.enable(gl.CULL_FACE);
	}

	public static getMode(): CullMode {
		return gl.getParameter(gl.CULL_FACE_MODE);
	}

	public static setMode(mode: CullMode) {
		gl.cullFace(mode);
	}

	public static disable() {
		gl.disable(gl.CULL_FACE);
	}

}