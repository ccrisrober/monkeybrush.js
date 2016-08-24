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
    public value(): Float32Array {
        return this._value;
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
    get x(): number { return this._value[0]; }
    get y(): number { return this._value[1]; }
    set x(value: number) {
        this._value[0] = value;
    }
    set y(value: number) {
        this._value[1] = value;
    }
    public lerp(other: Vect2, t: number): Vect2 {
        let ax = this._value[0],
            ay = this._value[1];
        return new Vect2(
            ax + t * (other.x - ax),
            ay + t * (other.y - ay)
        );
    }
    public isEqual(other: Vect2): boolean {
        return this.x === other.x && this.y === other.y;
    }
    public dot(other: Vect2): number {
        return vec2.dot(this._value, other._value);
    }
};

export default Vect2;
