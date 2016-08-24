/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


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
    // TODO: public get x(): number { return this._value[0]; }
    // TODO: public get y(): number { return this._value[1]; }
    // TODO: public get z(): number { return this._value[2]; }
    // TODO: public set x(value: number) {
    // TODO:      this._value[0] = value;
    // TODO: }
    // TODO: public set y(value: number) {
    // TODO:      this._value[1] = value;
    // TODO: }
    // TODO: public set z(value: number) {
    // TODO:      this._value[2] = value;
    // TODO: }
    // TODO: public lerp(other: Vect3, t: number): Vect3 {
    // TODO:     let ax = this._value[0],
    // TODO:         ay = this._value[1],
    // TODO:         az = this._value[2];
    // TODO:     return new Vect3(
    // TODO:         ax + t * (other.x - ax),
    // TODO:         ay + t * (other.y - ay),
    // TODO:         az + t * (other.z - az)
    // TODO:     );
    // TODO: }
    // TODO: public isEqual(other: Vect3): boolean {
    // TODO:     return this.x === other.x && this.y === other.y && this.z === other.z;
    // TODO: }
    public dot(other: Vect3): number {
        return vec3.dot(this._value, other._value);
    }
};

export default Vect3;
