/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


import { Core } from "./Core";
import { ComparisonFunc } from "../constants/ComparisonFunc";
import { StencilOp } from "../constants/StencilOp";
import { FaceSide } from "../constants/FaceSide";

"use strict";

/**
 * StencilState wrapper
 * @class StencilState
 */
class StencilState {

    // TODO: Cache stencilmask, stencilTest, opstencilfail, ...

    /**
     * Enable stencil test
     */
    public static use() {
        const gl = Core.getInstance().getGL();
        gl.enable(gl.STENCIL_TEST);
    }
    /**
     * Set front and back function and reference value for stencil testing
     * @param {ComparisonFunc} compFunc Specifies the test function.
     * @param {number} ref Specifies the reference value for the stencil test
     * @param {number} mask Specifies a mask that is ANDed with both the
     *    reference value and the stored stencil value when the test is done.
     */
    public static func(compFun: ComparisonFunc, ref: number, mask: number) {
        const gl = Core.getInstance().getGL();
        gl.stencilFunc(compFun, ref, mask);
    }
    /**
     * Set front and back stencil test actions.
     * @param {StencilOp} fail Action to take when the stencil test fails.
     * @param {StencilOp} zfail Stencil action when the stencil test passes,
     *    but the depth test fails.
     * @param {StencilOp} zpass Specifies the stencil action when both the stencil
     *    and depth test passes.
     */
    public static operation(fail: StencilOp, zfail: StencilOp, zpass: StencilOp) {
        const gl = Core.getInstance().getGL();
        gl.stencilOp(fail, zfail, zpass);
    }
    /**
     * Control the front and back writing of individual bits in the stencil planes
     * @param {number} mask Specifies a bit mask to enable and disable writing of
     *    individual bits in the stencil planes.
     */
    public static mask(mask: number) {
        const gl = Core.getInstance().getGL();
        gl.stencilMask(mask);
    }
    /**
     * Fontrol the front and/or back writing of individual bits in the stencil planes
     * @param {FaceSide} face Specifies whether the front and/or back stencil writemask is updated
     * @param {number} mask Specifies a bit mask to enable and disable writing of individual
     *    bits in the stencil planes.
     */
    public static maskFace(face: FaceSide, mask: number) {
        const gl = Core.getInstance().getGL();
        gl.stencilMaskSeparate(face, mask);
    }
    /**
     * Get front write mask
     * @return {number}
     */
    public static getFrontWriteMask(): number {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.STENCIL_WRITEMASK);
    }
    /**
     * Get back write mask
     * @return {number}
     */
    public static getBackWriteMask(): number {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
    }
    /**
     * Get stencil bits
     * @return {number}
     */
    public static getBits(): number {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.STENCIL_BITS);
    }
    /**
     * Clear stencil values
     */
    public static clear() {
        const gl = Core.getInstance().getGL();
        gl.clear(gl.STENCIL_BUFFER_BIT);
    }
    /**
     * Disable stencil test
     */
    public static unuse() {
        const gl = Core.getInstance().getGL();
        gl.disable(gl.STENCIL_TEST);
    }

    /**
     * Checks if stencil test is activated
     * @return {boolean} True if activated
     */
    public static isEnabled(): boolean {
        const gl = Core.getInstance().getGL();
        return gl.isEnabled(gl.STENCIL_TEST);
    }
};

export { StencilState };
