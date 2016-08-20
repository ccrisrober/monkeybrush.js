/// <reference path="icamera.ts" />

class PerspectiveCamera extends ICamera {
	public update() {
		this._projection = mat4.perspective(this._projection, this._fov, this.getAspectRatio(), 
			this._near, this._far);
		this._view = mat4.lookAt(this._view, this.position, this._look, this._up);
		// target: vec3.add(vec3.create(), this.position, this._front) /* 
	}
}