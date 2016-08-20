/// <reference path="icamera.ts" />
// https://github.com/bagobor/opengl33_dev_cookbook_2013/tree/master/Chapter2/FreeCamera/FreeCamera
class FreeCamera extends ICamera {
	constructor(pos: Float32Array) {
		super(pos);
		this._translation = vec3.create();
	}

	public update() {
		// var R = this._genMatrixUsingYawPitchRoll(
		// this._yaw, this._pitch, this._roll);
		this._position = vec3.add(this._position, this._position, this._look);
		this._translation = vec3.create();


	}
	public rotate(yaw: number, pitch: number, roll: number) {}
	public walk(amount: number) {
		this._translation = vec3.scaleAndAdd(
			this._translation, this._translation, 
				this._look, amount);
	}
	public strafe(amount: number) {
		this._translation = vec3.scaleAndAdd(
			this._translation, this._translation, 
				this._right, amount);
	}
	public lift(amount: number) {
		this._translation = vec3.scaleAndAdd(
			this._translation, this._translation, 
				this._up, amount);
	}

	protected _yaw: number;
	protected _pitch: number;
	protected _roll: number;

	protected _translation: Float32Array;
}