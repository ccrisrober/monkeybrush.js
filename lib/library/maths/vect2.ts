/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";

/**
 * Vect2 class
 * @class Vect2
 */
class Vect2 {
    protected _value: Float32Array;
    /**
     * Creates a new vect2
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     */
    constructor(x: number = 0.0, y: number = 0.0) {
        this._value = vec2.fromValues(x, y);
    }
    
    public toString = () : string => {
        return vec2.str(this._value);
    }

    public add(v: Vect2) {
        vec2.add(this._value, this._value, v._value);
    }
    public sub(v: Vect2) {
        vec2.sub(this._value, this._value, v._value);
    }
    public mult(other: Vect2) {
        vec2.multiply(this._value, this._value, other._value);
    }
    public div(other: Vect2) {
        vec2.div(this._value, this._value, other._value);
    }
    public negate() {
        vec2.negate(this._value, this._value);
    }
    public scale(value: number) {
        vec2.scale(this._value, this._value, value);
    }
    public distance(): number {
        return vec2.squaredLength(this._value);
    }
    // TODO: public get x(): number { return this._value[0]; }
    // TODO: public get y(): number { return this._value[1]; }
    // TODO: public set x(value: number) {
    // TODO:      this._value[0] = value;
    // TODO: }
    // TODO: public set y(value: number) {
    // TODO:      this._value[1] = value;
    // TODO: }
    // TODO: public lerp(other: Vect2, t: number): Vect2 {
    // TODO:     let ax = this._value[0], 
    // TODO:         ay = this._value[1];
    // TODO:     return new Vect2(
    // TODO:         ax + t * (other.x - ax),
    // TODO:         ay + t * (other.y - ay)
    // TODO:     );
    // TODO: }
    // TODO: public isEqual(other: Vect2): boolean {
    // TODO:     return this.x === other.x && this.y === other.y;
    // TODO: }
    public dot(other: Vect2): number {
        return vec2.dot(this._value, other._value);
    }
};

export default Vect2;