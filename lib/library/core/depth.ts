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


/// <reference path="../constants/_constants.ts" />
/// <reference path="context.ts" />

import { Context } from "./context";
import { ComparisonFunc } from "../constants/ComparisonFunc";

"use strict";

class Depth {
    /**
     * Enable depth testing.
     */
    public static enable() {
        const gl = Context.getContext();
        gl.enable(gl.DEPTH_TEST);
    }

    /**
     * Enable writing into the depth buffer.
     */
    public static use() {
        const gl = Context.getContext();
        gl.depthMask(true);
    }

    /**
     * Specify the mode used for depth buffer comparisons.
     * @param {ComparisonFunc} compFunc: Comparisor mode.
     */
    public static comparison(compFunc: ComparisonFunc) {
        const gl = Context.getContext();
        gl.depthFunc(compFunc);
    }

    public static currentComparation(): number {
        const gl = Context.getContext();
        return gl.getParameter(gl.DEPTH_FUNC);
    };

    /**
     * Specify mapping of depth values from normalized device coordinates to window coordinates.
     * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
     * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
     */
    public static depthRange(znear: number = 0.0, zfar: number = 1.0) {
        const gl = Context.getContext();
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
        const gl = Context.getContext();
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Disable writing into the depth buffer.
     */
    public static unuse() {
        const gl = Context.getContext();
        gl.depthMask(false);
    }

    /**
     * Disable depth testing.
     */
    public static disable() {
        const gl = Context.getContext();
        gl.disable(gl.DEPTH_TEST);
    }

    /**
     * Checks if depth test is activated
     * @return {boolean}: True if activated
     */
    public static isEnabled(): boolean {
        const gl = Context.getContext();
        return gl.isEnabled(gl.DEPTH_TEST);
    }
};

export { Depth };
