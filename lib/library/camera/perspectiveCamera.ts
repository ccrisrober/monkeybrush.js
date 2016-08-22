/// <reference path="camera.ts" />

"use strict";

/**
 * Perspective camera class
 * @class PerspectiveCamera
 */
class PerspectiveCamera extends Camera {
	/**
	 * Update view and projection matrix based on perspective projection
	 */
	public update() {
		this._projection = mat4.perspective(this._projection, this._fov, this.getAspectRatio(), 
			this._near, this._far);
		this._view = mat4.lookAt(this._view, this.position, this._look, this._up);
		// target: vec3.add(vec3.create(), this.position, this._front) /* 
	}
}