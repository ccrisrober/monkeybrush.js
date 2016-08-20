/// <reference path="core.ts" />

class Stencil {
	public use() {
		const gl = Core.getInstance().getGL();
		gl.enable(gl.STENCIL_TEST);
	}
	public func(compFun: ComparisonFunc, ref: number, mask: number) {
		const gl = Core.getInstance().getGL();
		gl.stencilFunc(compFun, ref, mask);
	}
	public operation(fail: StencilOp, zfail: StencilOp, zpass: StencilOp) {
		const gl = Core.getInstance().getGL();
		gl.stencilOp(fail, zfail, zpass);
	}
	public mask(mask: number) {
		const gl = Core.getInstance().getGL();
		gl.stencilMask(mask);
	}
	public clear() {
		const gl = Core.getInstance().getGL();
		gl.clear(gl.STENCIL_BUFFER_BIT);
	}
	public unuse() {
		const gl = Core.getInstance().getGL();
		gl.disable(gl.STENCIL_TEST);
	}
}