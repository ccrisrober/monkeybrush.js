/// <reference path="light.ts" />
class DirectionalLight extends Light {
	protected _direction: Float32Array;
	constructor(direction = new Float32Array([0.0, 0.0, 0.0])) {
		super();
		this.direction = direction;
	}

	get direction() { return this._direction; }
    set direction(direction: Float32Array) { this._direction = direction; }
}