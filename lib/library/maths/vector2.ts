
"use strict";

/**
 * Vector2<T> class
 * @class Vector2<T>
 */
class Vector2<T> {
	public x: T;
	public y: T;
	/**
	 * Vector2<T> constructor
	 * @param {T} x: First value
	 * @param {T} y: Second value
	 */
	constructor(x: T, y: T) {
		this.x = x;
		this.y = y;
	}
	/**
	 * Check if two vector2<T> are equals
	 * @param  {Vector2<T>} other: Second vector
	 * @return {boolean}: True if both equals
	 */
	public isEqual(other: Vector2<T>): boolean {
		return this.x === other.x && this.y === other.y;
	}
}