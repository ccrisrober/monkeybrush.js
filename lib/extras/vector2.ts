class Vector2<T> {
	public x: T;
	public y: T;
	constructor(x: T, y: T) {
		this.x = x;
		this.y = y;
	}
	public isEqual(other: Vector2<T>): boolean {
		return this.x === other.x && this.y === other.y;
	}
	/**
	get x(): T { return this._x; }
	set x(x: T) { this._x = x; }
	get y(): T { return this._y; }
	set y(y: T) { this._y = y; }
	/**/
}