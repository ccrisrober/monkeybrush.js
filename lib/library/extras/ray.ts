/// <reference path="vector3.ts" />

class Ray {
	protected _origin: Vector3<number>;
	protected _direction: Vector3<number>;
	constructor(origin: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0),
		direction: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)) {
		this._origin = origin;
		this._direction = direction;
	}
	get origin(): Vector3<number> { return this._origin; }
	set origin(origin: Vector3<number>) { this._origin = origin; }
	get direction(): Vector3<number> { return this._direction; }
	set direction(direction: Vector3<number>) { this._direction = direction; }

	public point_at(t: number) {
		return new Vector3<number>(
			this._origin.x + t * this._direction.x,
			this._origin.y + t * this._direction.y,
			this._origin.z + t * this._direction.z
		);
	}

}