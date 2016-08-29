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


"use strict";

/**
 * Vect4 class
 * @class Vect4
 */
class Vect4 {
    public _value: Float32Array;
    static create(value: Float32Array): Vect4 {
        return new Vect4(value[0], value[1], value[2], value[3]);
    };
    /**
     * Creates a new vect2
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 0.0) {
        this._value = new Float32Array([x, y, z, w]);
    }

    public toString = () : string => {
        return "NULL";
    }

    public add(v: Vect4): Vect4 {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;
    };
    public sub(v: Vect4): Vect4 {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;
    };
    public mult(v: Vect4): Vect4 {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;

        return this;
    };
    public div(v: Vect4): Vect4 {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;

        return this;
    };
    public negate(dest: Vect4 = null): Vect4 {
        if (!dest) dest = this;

        dest.x = -this.x;
        dest.y = -this.y;
        dest.z = -this.z;
        dest.w = -this.w;

        return dest;
    }
    public scale(value: number, dest: Vect4 = null): Vect4 {
        if (!dest) dest = this;

        dest.x *= value;
        dest.y *= value;
        dest.z *= value;
        dest.w *= value;

        return dest;
    }
    static distance(v: Vect4, v2: Vect4): number {
        var x = v2.x - v.x,
            y = v2.y - v.y,
            z = v2.z - v.z,
            w = v2.w - v.w;

        return Math.sqrt(this.squaredDistance(v, v2));
    }
    static squaredDistance(v: Vect4, v2: Vect4): number {
        var x = v2.x - v.x,
            y = v2.y - v.y,
            z = v2.z - v.z,
            w = v2.w - v.w;

        return (x * x + y * y + z * z + w * w);
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
    public isEqual(other: Vect4): boolean {
        return this.x === other.x && this.y === other.y  && this.z === other.z  && this.w === other.w;
    }
    static dot(v: Vect4, v2: Vect4): number {
        var x = v.x,
            y = v.y,
            z = v.z,
            w = v.w;

        var x2 = v2.x,
            y2 = v2.y,
            z2 = v2.z,
            w2 = v2.w;

        return (x * x2 + y * y2 + z * z2 + w * w2);
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
