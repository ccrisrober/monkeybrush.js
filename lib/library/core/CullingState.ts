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
import { FaceSide } from "../constants/FaceSide";

"use strict";

/**
 * CullingState class
 * @class CullingState
 */
class CullingState {
    /**
     * Enable cullFace test.
     */
    public static enable() {
        const gl = Core.getInstance().getGL();
        gl.enable(gl.CULL_FACE);
    }

    /**
     * Get current cullFace mode
     * @return {FaceSide}: Current cullFace mode
     */
    public static getMode(): FaceSide {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.CULL_FACE_MODE);
    }

    /**
     * Specify whether front/back-facing facets can be culled.
     * @param {FaceSide} mode: Cull face mode
     */
    public static setMode(mode: FaceSide) {
        const gl = Core.getInstance().getGL();
        gl.cullFace(mode);
    }

    /**
     * Disable cullFace test.
     */
    public static disable() {
        const gl = Core.getInstance().getGL();
        gl.disable(gl.CULL_FACE);
    }

    /**
     * Checks if cullFace is activated
     * @return {boolean}: True if activated
     */
    public static isEnabled(): boolean {
        const gl = Core.getInstance().getGL();
        return gl.isEnabled(gl.CULL_FACE);
    }
};

export { CullingState };
