/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";

/**
 * Vect4 class
 * @class Vect4
 */
class Vect4 {
    protected _value: Float32Array;
    /**
     * Creates a new vect2
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 0.0) {
        this._value = vec4.fromValues(x, y, z, w);
    }
    
    public toString = () : string => {
        return vec4.str(this._value);
    }

    public add(v: Vect4) {
        vec4.add(this._value, this._value, v._value);
    }
    public sub(v: Vect4) {
        vec4.sub(this._value, this._value, v._value);
    }
    public mult(other: Vect4) {
        vec4.multiply(this._value, this._value, other._value);
    }
    public div(other: Vect4) {
        vec4.div(this._value, this._value, other._value);
    }
    public negate() {
        vec4.negate(this._value, this._value);
    }
    public scale(value: number) {
        vec4.scale(this._value, this._value, value);
    }
    public distance(): number {
        return vec4.squaredLength(this._value);
    }
    public get x(): number { return this._value[0]; }
    public get y(): number { return this._value[1]; }
    public get z(): number { return this._value[2]; }
    public get w(): number { return this._value[3]; }
    public set x(value: number) {
         this._value[0] = value;
    }
    public set y(value: number) {
         this._value[1] = value;
    }
    public set z(value: number) {
         this._value[2] = value;
    }
    public set w(value: number) {
         this._value[3] = value;
    }
    public lerp(other: Vect4, t: number): Vect4 {
        let ax = this._value[0], 
            ay = this._value[1], 
            az = this._value[2], 
            aw = this._value[3];
        return new Vect4(
            ax + t * (other.x - ax),
            ay + t * (other.y - ay),
            az + t * (other.z - az),
            aw + t * (other.w - aw)
        );
    }
    public isEqual(other: Vect4): boolean {
        return this.x === other.x && this.y === other.y  && this.z === other.z  && this.w === other.w;
    }
    public dot(other: Vect4): number {
        return vec4.dot(this._value, other._value);
    }
}