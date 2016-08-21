/// <reference path="core.ts" />

"use strict";

class Cull {
	static gl = Core.getInstance().getGL();

	/**
	 * Enable cullFace test.
	 */
	public static enable() {
		gl.enable(gl.CULL_FACE);
	}

	/**
	 * Get current cullFace mode
	 * @return {Face}: Current cullFace mode
	 */
	public static getMode(): Face {
		return gl.getParameter(gl.CULL_FACE_MODE);
	}

	/**
	 * Specify whether front/back-facing facets can be culled.
	 * @param {Face} mode: Cull face mode
	 */
	public static setMode(mode: Face) {
		gl.cullFace(mode);
	}

	/**
	 * Disable cullFace test.
	 */
	public static disable() {
		gl.disable(gl.CULL_FACE);
	}

	/**
	 * Checks if cullFace is activated
	 * @return {boolean}: True if activated
	 */
	public static isEnabled(): boolean {
		return gl.isEnabled(gl.CULL_FACE);
	}


}