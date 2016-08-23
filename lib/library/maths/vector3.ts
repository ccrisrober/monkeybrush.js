
"use strict";

/**
 * Vector3<T> class
 * @class Vector3<T>
 */
class Vector3<T> {
    public x: T;
    public y: T;
    public z: T;
    /**
     * Vector3<T> constructor
     * @param {T} x: First value
     * @param {T} y: Second value
     * @param {T} z: Third value
     */
    constructor(x: T, y: T, z: T) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Check if two vector3<T> are equals
     * @param  {Vector3<T>} other: Second vector
     * @return {boolean}: True if both equals
     */
    public isEqual(other: Vector3<T>): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
};

export default Vector3;