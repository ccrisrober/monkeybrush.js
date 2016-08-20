/// <reference path="core.ts" />

class Blend {
	static gl = Core.getInstance().getGL();

	public static enable() {
		gl.enable(gl.BLEND);
	}

	public static disable() {
		gl.disable(gl.BLEND);
	}

	public static equation(mode: BlendingEq) {
		gl.blendEquation(mode);
	}

	public static color(red: number, green: number, blue: number, alpha: number) {
		gl.blendColor(red, green, blue, alpha);
	}

	public static func(sfactor: number, dfactor: number) {
		gl.blendFunc(sfactor, dfactor);
	}

	public static funcSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
		gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
	}

}