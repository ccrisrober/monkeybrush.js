/// <reference path="../gl-matrix.d.ts" />
// https://github.com/bagobor/opengl33_dev_cookbook_2013/tree/master/Chapter2/FreeCamera/FreeCamera
abstract class ICamera {
	protected _position: Float32Array;
	protected _view: Float32Array;
	protected _projection: Float32Array;
	protected _fov: number;
	protected _ar: number;

	protected _look: Float32Array;
	protected _up: Float32Array;
	protected _right: Float32Array;
	constructor(pos: Float32Array) {
		this._position = pos;
		this._projection = mat4.create();
		this._view = mat4.create();
	}
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

	public setupProjection(fovy: number, aspRatio: number) {
		this._projection = mat4.perspective(
			this._projection, fovy, aspRatio, 0.01, 1000.0); // TODO: near and far configurable
		this._fov = fovy;
		this._ar = aspRatio;
	}
};