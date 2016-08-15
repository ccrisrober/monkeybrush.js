abstract class ICamera {
	protected _position: Float32Array;
	constructor(pos: Float32Array) {
		this._position = pos;
	}
	get position(): Float32Array { return this._position; }
	set position(pos: Float32Array) { this._position = pos; }
};