/// <reference path="../constants/_constants.ts" />
/// <reference path="context.ts" />

import Context from "./context";

"use strict";

class Cull {
    /**
     * Enable cullFace test.
     */
    public static enable() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.enable(gl.CULL_FACE);
    }

    /**
     * Get current cullFace mode
     * @return {Face}: Current cullFace mode
     */
    public static getMode(): Face {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        return gl.getParameter(gl.CULL_FACE_MODE);
    }

    /**
     * Specify whether front/back-facing facets can be culled.
     * @param {Face} mode: Cull face mode
     */
    public static setMode(mode: Face) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.cullFace(mode);
    }

    /**
     * Disable cullFace test.
     */
    public static disable() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.disable(gl.CULL_FACE);
    }

    /**
     * Checks if cullFace is activated
     * @return {boolean}: True if activated
     */
    public static isEnabled(): boolean {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        return gl.isEnabled(gl.CULL_FACE);
    }
};

import Face from "../constants/Face";

export default Cull;