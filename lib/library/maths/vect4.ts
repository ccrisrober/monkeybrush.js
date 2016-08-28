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
    get x(): number { return this._value[0]; }
    get y(): number { return this._value[1]; }
    get z(): number { return this._value[2]; }
    get w(): number { return this._value[3]; }
    set x(value: number) {
        this._value[0] = value;
    }
    set y(value: number) {
        this._value[1] = value;
    }
    set z(value: number) {
        this._value[2] = value;
    }
    set w(value: number) {
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
    public isEquals(vec: Vect4, threshold: boolean = false): boolean {
        for (let i = 0; i < 4; ++i) {
            if (threshold) {
                if (Math.abs(this._value[i] - vec._value[i]) > 0.00001) {
                    return false;
                }
            } else {
                if (Math.abs(this._value[i] - vec._value[i]) !== 0) {
                    return false;
                }
            }
        }

        return true;
    };
};

export { Vect4 };
