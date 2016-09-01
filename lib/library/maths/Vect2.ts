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
 * Vect2 class
 * @class Vect2
 */
class Vect2 {
    public _value: Float32Array;
    static create(values: Float32Array): Vect2 {
        return new Vect2(values[0], values[1]);
    }
    /**
     * Vect2 constructor
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     */
    constructor(x: number = 0.0, y: number = 0.0) {
        this._value = new Float32Array([x, y]);
    };
    public toString = () : string => {
        return "NULL";
    };
    public value(): Float32Array {
        return this._value;
    };
    public add(v: Vect2): Vect2 {
        this.x += v.x;
        this.y += v.y;

        return this;
    };
    public sub(v: Vect2): Vect2 {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    };
    public mult(v: Vect2): Vect2 {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    };
    public div(v: Vect2): Vect2 {
        this.x /= v.x;
        this.y /= v.y;

        return this;
    };
    public negate(dest: Vect2 = null): Vect2 {
        if (!dest) dest = this;

        dest.x = -this.x;
        dest.y = -this.y;

        return dest;
    }
    public scale(value: number, dest: Vect2 = null): Vect2 {
        if (!dest) dest = this;

        dest.x *= value;
        dest.y *= value;

        return dest;
    }
    static squaredDistance(v: Vect2, v2: Vect2): number {
        const
            x = v2.x - v.x,
            y = v2.y - v.y;

        return (x * x + y * y);
    }
    static distance(v: Vect2, v2: Vect2): number {
        return Math.sqrt(this.squaredDistance(v, v2));
    }
    get x(): number { return this._value[0]; }
    get y(): number { return this._value[1]; }
    set x(value: number) {
        this._value[0] = value;
    }
    set y(value: number) {
        this._value[1] = value;
    }
    public isEqual(other: Vect2): boolean {
        return this.x === other.x && this.y === other.y;
    }
    public static dot(v: Vect2, v2: Vect2): number {
        return (v.x * v2.x + v.y * v2.y);
    }
    public isEquals(vec: Vect2, threshold: boolean = false): boolean {
        for (let i = 0; i < 2; ++i) {
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

export { Vect2 };
