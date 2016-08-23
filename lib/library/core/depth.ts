/// <reference path="../constants/_constants.ts" />
/// <reference path="context.ts" />

import Context from "./context";
import ComparisonFunc from "../constants/ComparisonFunc";

"use strict";

class Depth {
    /**
     * Enable depth testing.
     */
    public static enable() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.enable(gl.DEPTH_TEST);
    }

    /**
     * Enable writing into the depth buffer.
     */
    public static use() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.depthMask(true);
    }

    /**
     * Specify the mode used for depth buffer comparisons.
     * @param {ComparisonFunc} compFunc: Comparisor mode.
     */
    public static comparison(compFunc: ComparisonFunc) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.depthFunc(compFunc);
    }

    /**
     * Specify mapping of depth values from normalized device coordinates to window coordinates.
     * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
     * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
     */
    public static depthRange(znear: number = 0.0, zfar: number = 1.0) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        if (znear > zfar || znear < 0.0 || zfar > 1.0) {
            console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
            return;
        }
        gl.depthRange(znear, zfar);
    }

    /**
     * Clear depth buffer.
     */
    public static clear() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Disable writing into the depth buffer.
     */
    public static unuse() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.depthMask(false);
    }

    /**
     * Disable depth testing.
     */
    public static disable() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.disable(gl.DEPTH_TEST);
    }

    /**
     * Checks if depth test is activated
     * @return {boolean}: True if activated
     */
    public static isEnabled(): boolean {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        return gl.isEnabled(gl.DEPTH_TEST);
    }
};

export default Depth;