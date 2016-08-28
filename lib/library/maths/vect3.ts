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
    };
    public toString = () : string => {
        return vec3.str(this._value);
    };
    public add(v: Vect3) {
        vec3.add(this._value, this._value, v._value);
    };
    public sub(v: Vect3) {
        vec3.sub(this._value, this._value, v._value);
    };
    public mult(other: Vect3) {
        vec3.multiply(this._value, this._value, other._value);
    };
    public div(other: Vect3) {
        vec3.div(this._value, this._value, other._value);
    };
    public negate() {
        vec3.negate(this._value, this._value);
    };
    public scale(value: number) {
        vec3.scale(this._value, this._value, value);
    };
    public distance(): number {
        return vec3.squaredLength(this._value);
    };
    get x(): number { return this._value[0]; };
    get y(): number { return this._value[1]; };
    get z(): number { return this._value[2]; };
    set x(value: number) {
        this._value[0] = value;
    };
    set y(value: number) {
        this._value[1] = value;
    };
    set z(value: number) {
        this._value[2] = value;
    };
    public lerp(other: Vect3, t: number): Vect3 {
        let ax = this._value[0],
            ay = this._value[1],
            az = this._value[2];
        return new Vect3(
            ax + t * (other.x - ax),
            ay + t * (other.y - ay),
            az + t * (other.z - az)
        );
    };
    public dot(other: Vect3): number {
        return vec3.dot(this._value, other._value);
    };
    public isEquals(vec: Vect3, threshold: boolean = false): boolean {
        for (let i = 0; i < 3; ++i) {
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
    public length(): number {
        return Math.sqrt(this.distance());
    };
    public normalize(dest: Vect3 = null): Vect3 {
        if (!dest) dest = this;

        let length = this.length();

        if (length === 1) {
            return this;
        }

        if (length === 0) {
            dest.x = 0;
            dest.y = 0;
            dest.z = 0;

            return dest;
        }

        length = 1.0 / length;

        dest.x *= length;
        dest.y *= length;
        dest.z *= length;

        return dest;
    };
    static cross(vector: Vect3, vector2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        const
            x = vector.x,
            y = vector.y,
            z = vector.z;

        const
            x2 = vector2.x,
            y2 = vector2.y,
            z2 = vector2.z;

        dest.x = y * z2 - z * y2;
        dest.y = z * x2 - x * z2;
        dest.z = x * y2 - y * x2;

        return dest;
    };
    static dot(vector: Vect3, vector2: Vect3): number {
        const
            x = vector.x,
            y = vector.y,
            z = vector.z;

        const
            x2 = vector2.x,
            y2 = vector2.y,
            z2 = vector2.z;

        return (x * x2 + y * y2 + z * z2);
    };
    static sum(vector: Vect3, vector2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = vector.x + vector2.x;
        dest.y = vector.y + vector2.y;
        dest.z = vector.z + vector2.z;

        return dest;
    };

    static rem(vector: Vect3, vector2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;
        dest.z = vector.z - vector2.z;

        return dest;
    }

    static diff(vector: Vect3, vector2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;
        dest.z = vector.z - vector2.z;

        return dest;
    }

    static mult(vector: Vect3, vector2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = vector.x * vector2.x;
        dest.y = vector.y * vector2.y;
        dest.z = vector.z * vector2.z;

        return dest;
    }
};

export { Vect3 };
