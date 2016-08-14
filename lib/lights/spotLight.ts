/// <reference path="light.ts" />
class SpotLight extends Light {
	protected _position: Float32Array;
	protected _direction: Float32Array;
	
	constructor(position = new Float32Array([0.0, 0.0, 0.0]), 
		direction = new Float32Array([0.0, 0.0, 0.0])) {
		super();
		this.direction = direction;
		this.position = position;
	}

	get position() { return this._position; }
    set position(position: Float32Array) { this._position = position; }

	get direction() { return this._direction; }
    set direction(direction: Float32Array) { this._direction = direction; }
}