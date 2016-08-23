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
    // TODO: public get x(): number { return this._value[0]; }
    // TODO: public get y(): number { return this._value[1]; }
    // TODO: public get z(): number { return this._value[2]; }
    // TODO: public get w(): number { return this._value[3]; }
    // TODO: public set x(value: number) {
    // TODO:      this._value[0] = value;
    // TODO: }
    // TODO: public set y(value: number) {
    // TODO:      this._value[1] = value;
    // TODO: }
    // TODO: public set z(value: number) {
    // TODO:      this._value[2] = value;
    // TODO: }
    // TODO: public set w(value: number) {
    // TODO:      this._value[3] = value;
    // TODO: }
    // TODO: public lerp(other: Vect4, t: number): Vect4 {
    // TODO:     let ax = this._value[0], 
    // TODO:         ay = this._value[1], 
    // TODO:         az = this._value[2], 
    // TODO:         aw = this._value[3];
    // TODO:     return new Vect4(
    // TODO:         ax + t * (other.x - ax),
    // TODO:         ay + t * (other.y - ay),
    // TODO:         az + t * (other.z - az),
    // TODO:         aw + t * (other.w - aw)
    // TODO:     );
    // TODO: }
    // TODO: public isEqual(other: Vect4): boolean {
    // TODO:     return this.x === other.x && this.y === other.y  && this.z === other.z  && this.w === other.w;
    // TODO: }
    public dot(other: Vect4): number {
        return vec4.dot(this._value, other._value);
    }
};

export default Vect4;