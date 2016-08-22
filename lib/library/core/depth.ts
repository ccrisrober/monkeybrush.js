/// <reference path="core.ts" />

"use strict";

class Depth {
    static gl = Core.getInstance().getGL();

    /**
     * Enable depth testing.
     */
    public static enable() {
        gl.enable(gl.DEPTH_TEST);
    }

    /**
     * Enable writing into the depth buffer.
     */
    public static use() {
        gl.depthMask(true);
    }

    /**
     * Specify the mode used for depth buffer comparisons.
     * @param {ComparisonFunc} compFunc: Comparisor mode.
     */
    public static comparison(compFunc: ComparisonFunc) {
        gl.depthFunc(compFunc);
    }

    /**
     * Specify mapping of depth values from normalized device coordinates to window coordinates.
     * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
     * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
     */
    public static depthRange(znear: number = 0.0, zfar: number = 1.0) {
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
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Disable writing into the depth buffer.
     */
    public static unuse() {
        gl.depthMask(false);
    }

    /**
     * Disable depth testing.
     */
    public static disable() {
        gl.disable(gl.DEPTH_TEST);
    }

    /**
     * Checks if depth test is activated
     * @return {boolean}: True if activated
     */
    public static isEnabled(): boolean {
        return gl.isEnabled(gl.DEPTH_TEST);
    }
}