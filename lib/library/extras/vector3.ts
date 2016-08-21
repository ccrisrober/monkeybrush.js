
"use strict";

class Vector3<T> {
	public x: T;
	public y: T;
	public z: T;
	/**
	 * @param {T}
	 * @param {T}
	 * @param {T}
	 */
	constructor(x: T, y: T, z: T) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	/**
	 * @param  {Vector3<T>}
	 * @return {boolean}
	 */
	public isEqual(other: Vector3<T>): boolean {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}
}