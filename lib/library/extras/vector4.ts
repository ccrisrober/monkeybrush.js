
"use strict";

class Vector4<T> {
	public x: T;
	public y: T;
	public z: T;
	public w: T;
	/**
	 * @param {T}
	 * @param {T}
	 * @param {T}
	 * @param {T}
	 */
	constructor(x: T, y: T, z: T, w: T) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	/**
	 * @param  {Vector4<T>}
	 * @return {boolean}
	 */
	public isEqual(other: Vector4<T>): boolean {
		return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
	}
}