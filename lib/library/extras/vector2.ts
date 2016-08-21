
"use strict";

class Vector2<T> {
	public x: T;
	public y: T;
	/**
	 * @param {T}
	 * @param {T}
	 */
	constructor(x: T, y: T) {
		this.x = x;
		this.y = y;
	}
	/**
	 * @param  {Vector2<T>}
	 * @return {boolean}
	 */
	public isEqual(other: Vector2<T>): boolean {
		return this.x === other.x && this.y === other.y;
	}
}