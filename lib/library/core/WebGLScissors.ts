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


/// <reference path="context.ts" />
import { Core } from "./Core";

"use strict";

/**
 * WebGLScissors wrapper
 * @class WebGLScissors
 */
class WebGLScissors {
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

export { WebGLScissors };
