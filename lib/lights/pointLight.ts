/// <reference path="light.ts" />
class PointLight extends Light {
	protected _position: Float32Array;
	constructor(position = new Float32Array([0.0, 0.0, 0.0])) {
		super();
		this.position = position;
	}

	get position() { return this._position; }
    set position(position: Float32Array) { this._position = position; }
}