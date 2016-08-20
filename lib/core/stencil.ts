/// <reference path="core.ts" />

class Stencil {
	static gl = Core.getInstance().getGL();
	public static use() {
		gl.enable(gl.STENCIL_TEST);
	}
	public static func(compFun: ComparisonFunc, ref: number, mask: number) {
		gl.stencilFunc(compFun, ref, mask);
	}
	public static operation(fail: StencilOp, zfail: StencilOp, zpass: StencilOp) {
		gl.stencilOp(fail, zfail, zpass);
	}
	public static mask(mask: number) {
		gl.stencilMask(mask);
	}
	public static clear() {
		gl.clear(gl.STENCIL_BUFFER_BIT);
	}
	public static unuse() {
		gl.disable(gl.STENCIL_TEST);
	}
}