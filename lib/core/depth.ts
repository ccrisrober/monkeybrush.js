/// <reference path="core.ts" />

class Depth {
	static gl = Core.getInstance().getGL();
	public static use() {
		gl.enable(gl.STENCIL_TEST);
	}

	public static comparison(compFunc: ComparisonFunc) {
		gl.depthFunc(compFunc);
	}

	public static enable() {
		gl.depthMask(true);
	}

	public static disable() {
		gl.depthMask(false);
	}

	public static depthRange(znear: number = 0.0, zfar: number = 1.0) {
		if (znear > zfar || znear < 0.0 || zfar > 1.0) {
			console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
			return;
		}
		gl.depthRange(znear, zfar);
	}

	public static clear() {
		gl.clear(gl.DEPTH_BUFFER_BIT);
	}

	public static unuse() {
		gl.disable(gl.DEPTH_TEST);
	}
}