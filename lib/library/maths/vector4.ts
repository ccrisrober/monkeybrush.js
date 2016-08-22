
"use strict";

/**
 * Vector4<T> class
 * @class Vector4<T>
 */
class Vector4<T> {
    public x: T;
    public y: T;
    public z: T;
    public w: T;
    /**
     * Vector4<T> constructor
     * @param {T} x: First value
     * @param {T} y: Second value
     * @param {T} z: Third value
     * @param {T} z: Fourth value
     */
    constructor(x: T, y: T, z: T, w: T) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    /**
     * Check if two vector4<T> are equals
     * @param  {Vector4<T>} other: Second vector
     * @return {boolean}: True if both equals
     */
    public isEqual(other: Vector4<T>): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }
}