/// <reference path="../gl-matrix.d.ts" />
// https://github.com/bagobor/opengl33_dev_cookbook_2013/tree/master/Chapter2/FreeCamera/FreeCamera
abstract class ICamera {
	protected _position: Float32Array;
	protected _view: Float32Array;
	protected _projection: Float32Array;
	protected _fov: number;
	protected _ar: number;
	protected _near: number;
	protected _far: number;

	protected _up: Float32Array;
	protected _look: Float32Array;
	constructor(pos: Float32Array, fovy: number = 45.0, 
		near: number = 0.01, far: number = 1000.0, 
		aspRatio: number = 1.0, 
		target: Float32Array = new Float32Array([0.0, 0.0, -1.0]), 
		up: Float32Array = new Float32Array([0.0, 1.0, 0.0])) {

		this._position = pos;
		this._projection = mat4.create();
		this._view = mat4.create();

		this._up = up;
		this._look = target;
		this.setup(fovy, aspRatio);
		this.setup2(near, far);

		this.update();
	}
	abstract update();
	get position(): Float32Array { return this._position; }
	set position(pos: Float32Array) { this._position = pos; }

	public getViewMatrix(): Float32Array {
		return this._view;
	}

	public getProjectionMatrix(): Float32Array {
		return this._projection;
	}

	public getFOV(): number {
		return this._fov;
	}

	public getAspectRatio(): number {
		return this._ar;
	}
	public setup2(near: number, far: number) {
		this._near = near;
		this._far = far;
	}
	public setup(fovy: number, aspRatio: number) {
		this._fov = fovy;
		this._ar = aspRatio;
	}
};