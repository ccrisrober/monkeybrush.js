/// <reference path="core.ts" />

"use strict";

/**
 * Stencil wrapper
 * @class Stencil
 */
class Stencil {
	static gl = Core.getInstance().getGL();
	/**
	 * Enable stencil test
	 */
	public static use() {
		gl.enable(gl.STENCIL_TEST);
	}
	/**
	 * Set front and back function and reference value for stencil testing
	 * @param {ComparisonFunc} compFunc: Specifies the test function.
	 * @param {number} ref: Specifies the reference value for the stencil test
	 * @param {number} mask: Specifies a mask that is ANDed with both the reference value and the stored stencil value when the test is done.
	 */
	public static func(compFun: ComparisonFunc, ref: number, mask: number) {
		gl.stencilFunc(compFun, ref, mask);
	}
	/**
	 * Set front and back stencil test actions.
	 * @param {StencilOp} fail: Action to take when the stencil test fails.
	 * @param {StencilOp} zfail: Stencil action when the stencil test passes, but the depth test fails.
	 * @param {StencilOp} zpass: Specifies the stencil action when both the stencil and depth test passes.
	 */
	public static operation(fail: StencilOp, zfail: StencilOp, zpass: StencilOp) {
		gl.stencilOp(fail, zfail, zpass);
	}
	/**
	 * Control the front and back writing of individual bits in the stencil planes
	 * @param {number} mask: Specifies a bit mask to enable and disable writing of individual bits in the stencil planes.
	 */
	public static mask(mask: number) {
		gl.stencilMask(mask);
	}
	/**
	 * Fontrol the front and/or back writing of individual bits in the stencil planes
	 * @param {Face} face: Specifies whether the front and/or back stencil writemask is updated
	 * @param {number} mask: Specifies a bit mask to enable and disable writing of individual bits in the stencil planes.
	 */
	public static maskFace(face: Face, mask: number) {
		gl.stencilMaskSeparate(face, mask);
	}
	public static getFrontWriteMasks(): number {
		return gl.getParameter(gl.STENCIL_WRITEMASK);
	}
	public static getBackWriteMask(): number {
		return gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
	}
	public static getBits(): number {
		return gl.getParameter(gl.STENCIL_BITS);
	}
	/**
	 * Clear stencil values
	 */
	public static clear() {
		gl.clear(gl.STENCIL_BUFFER_BIT);
	}
	/**
	 * Disable stencil test
	 */
	public static unuse() {
		gl.disable(gl.STENCIL_TEST);
	}

	/**
	 * Checks if stencil test is activated
	 * @return {boolean}: True if activated
	 */
	public static isEnabled(): boolean {
		return gl.isEnabled(gl.STENCIL_TEST);
	}
}