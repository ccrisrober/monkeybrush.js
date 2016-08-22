/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";

/**
 * Vect3 class
 * @class Vect3
 */
class Vect3 {
    protected _value: Float32Array;
    /**
     * Creates a new vect3
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this._value = vec3.fromValues(x, y, z);
    }
    
    public toString = () : string => {
        return vec3.str(this._value);
    }

    public add(v: Vect3) {
        vec3.add(this._value, this._value, v._value);
    }
    public sub(v: Vect3) {
        vec3.sub(this._value, this._value, v._value);
    }
    public mult(other: Vect3) {
        vec3.multiply(this._value, this._value, other._value);
    }
    public div(other: Vect3) {
        vec3.div(this._value, this._value, other._value);
    }
    public negate() {
        vec3.negate(this._value, this._value);
    }
    public scale(value: number) {
        vec3.scale(this._value, this._value, value);
    }
    public distance(): number {
        return vec3.squaredLength(this._value);
    }
    public get x(): number { return this._value[0]; }
    public get y(): number { return this._value[1]; }
    public get z(): number { return this._value[2]; }
    public set x(value: number) {
         this._value[0] = value;
    }
    public set y(value: number) {
         this._value[1] = value;
    }
    public set z(value: number) {
         this._value[2] = value;
    }
    public lerp(other: Vect3, t: number): Vect3 {
        let ax = this._value[0], 
            ay = this._value[1],
            az = this._value[2];
        return new Vect3(
            ax + t * (other.x - ax),
            ay + t * (other.y - ay),
            az + t * (other.z - az)
        );
    }
    public isEqual(other: Vect3): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
    public dot(other: Vect3): number {
        return vec3.dot(this._value, other._value);
    }
}