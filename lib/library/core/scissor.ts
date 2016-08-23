/// <reference path="core.ts" />
import Core from "./core";

"use strict";

/**
 * scissor wrapper
 * @class Scissor
 */
class Scissor {
    /**
     * Enable scissor test.
     */
    public static use() {
        const gl = Core.getInstance().getGL();
        gl.enable(gl.SCISSOR_TEST);
    }
    /**
     * Define the scissor box.
     * @param {number} x: Specifying the horizontal coordinate for the lower left corner of the box.
     * @param {number} y: Specifying the vertical coordinate for the lower left corner of the box.
     * @param {number} width: Specifying the width of the scissor box.
     * @param {number} height: Specifying the height of the scissor box.
     */
    public setRectangle(x: number, y: number, width: number, height: number) {
        const gl = Core.getInstance().getGL();
        gl.scissor(x, y, width, height);
    }
    /**
     * Get scissor rectangle in use.
     * @return {Int32Array}: Scissor box size [x, y, width, height]
     */
    public getRectangle(): Int32Array {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.SCISSOR_BOX);
    }
    /**
     * Disable scissor test.
     */
    public static unuse() {
        const gl = Core.getInstance().getGL();
        gl.disable(gl.SCISSOR_TEST);
    }

    /**
     * Checks if scissor test is activated
     * @return {boolean}: True if activated
     */
    public static isEnabled(): boolean {
        const gl = Core.getInstance().getGL();
        return gl.isEnabled(gl.SCISSOR_TEST);
    }
};