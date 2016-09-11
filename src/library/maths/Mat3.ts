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


import { Vect2 } from "./Vect2";
import { Vect3 } from "./Vect3";
import { Mat4 } from "./Mat4";

"use strict";

/**
 * Mat3 class
 * @class Mat3
 */
class Mat3 {
    public _value: Float32Array = new Float32Array(9);
    /**
     * Mat3 constructor
     * @param {number[] = null} values [description]
     */
    constructor(values: number[] = null) {
        if (values) {
            this.init(values);
        }
    };
    init(values: number[]): Mat3 {
        for (let i = 0; i < 9; ++i) {
            this._value[i] = values[i];
        }
        return this;
    };
    isEquals(mat: Mat3, threshold: boolean = false): boolean {
        for (let i = 0; i < 9; ++i) {
            if (threshold) {
                if (Math.abs(this._value[i] - mat._value[i]) > 0.00001) {
                    return false;
                }
            } else {
                if (Math.abs(this._value[i] - mat._value[i]) !== 0) {
                    return false;
                }
            }
        }

        return true;
    };
    toMat4(result: Mat4 = null): Mat4 {
        if (result) {
            return Mat4.create([
                this._value[0],
                this._value[1],
                this._value[2],
                0,

                this._value[3],
                this._value[4],
                this._value[5],
                0,

                this._value[6],
                this._value[7],
                this._value[8],
                0,

                0,
                0,
                0,
                1
            ]);
        }
        else {
            return new Mat4([
                this._value[0],
                this._value[1],
                this._value[2],
                0,

                this._value[3],
                this._value[4],
                this._value[5],
                0,

                this._value[6],
                this._value[7],
                this._value[8],
                0,

                0,
                0,
                0,
                1
            ]);
        }
    }
    transpose(): Mat3 {
        const t01 = this._value[1],
            t02 = this._value[2],
            t12 = this._value[5];

        this._value[1] = this._value[3];
        this._value[2] = this._value[6];
        this._value[3] = t01;
        this._value[5] = this._value[7];
        this._value[6] = t02;
        this._value[7] = t12;

        return this;
    };
    determinant(): number {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];

        const det01 = a22 * a11 - a12 * a21,
            det11 = -a22 * a10 + a12 * a20,
            det21 = a21 * a10 - a11 * a20;

        return a00 * det01 + a01 * det11 + a02 * det21;
    };
    invert(): Mat3 {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];

        const
            det01 = a22 * a11 - a12 * a21,
            det11 = -a22 * a10 + a12 * a20,
            det21 = a21 * a10 - a11 * a20;

        let det = a00 * det01 + a01 * det11 + a02 * det21;

        if (!det)
            return null;

        det = 1.0 / det;

        this._value[0] = det01 * det;
        this._value[1] = (-a22 * a01 + a02 * a21) * det;
        this._value[2] = (a12 * a01 - a02 * a11) * det;
        this._value[3] = det11 * det;
        this._value[4] = (a22 * a00 - a02 * a20) * det;
        this._value[5] = (-a12 * a00 + a02 * a10) * det;
        this._value[6] = det21 * det;
        this._value[7] = (-a21 * a00 + a01 * a20) * det;
        this._value[8] = (a11 * a00 - a01 * a10) * det;

        return this;
    };
    add(m: Mat3): Mat3 {
        for (let i = 0; i < 9; ++i) {
            this._value[i] += m._value[i];
        }
        return this;
    };
    sub(m: Mat3): Mat3 {
        for (let i = 0; i < 9; ++i) {
            this._value[i] -= m._value[i];
        }
        return this;
    };
    mult(m: Mat3): Mat3 {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];

        const
            b00 = this._value[0], b01 = this._value[1], b02 = this._value[2],
            b10 = this._value[3], b11 = this._value[4], b12 = this._value[5],
            b20 = this._value[6], b21 = this._value[7], b22 = this._value[8];

        this._value[0] = b00 * a00 + b01 * a10 + b02 * a20;
        this._value[1] = b00 * a01 + b01 * a11 + b02 * a21;
        this._value[2] = b00 * a02 + b01 * a12 + b02 * a22;

        this._value[3] = b10 * a00 + b11 * a10 + b12 * a20;
        this._value[4] = b10 * a01 + b11 * a11 + b12 * a21;
        this._value[5] = b10 * a02 + b11 * a12 + b12 * a22;

        this._value[6] = b20 * a00 + b21 * a10 + b22 * a20;
        this._value[7] = b20 * a01 + b21 * a11 + b22 * a21;
        this._value[8] = b20 * a02 + b21 * a12 + b22 * a22;

        return this;
    };
    identity(): Mat3 {
        this._value[0] = 1;
        this._value[1] = 0;
        this._value[2] = 0;

        this._value[3] = 0;
        this._value[4] = 1;
        this._value[5] = 0;

        this._value[6] = 0;
        this._value[7] = 0;
        this._value[8] = 1;

        return this;
    };
    toString(): string {
        return `Mat3(
            ${this._value[0]}, ${this._value[1]},  ${this._value[2]},
            ${this._value[3]}, ${this._value[4]},  ${this._value[5]},
            ${this._value[6]}, ${this._value[7]},  ${this._value[8]}
        )`;
    };
    translate(v: Vect2): Mat3 {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8],
            x = v[0], y = v[1];

        this._value[6] = x * a00 + y * a10 + a20;
        this._value[7] = x * a01 + y * a11 + a21;
        this._value[8] = x * a02 + y * a12 + a22;

        return this;
    };
    rotate(angle: number, axis: Vect3): Mat3 {
        let
            x = axis.x,
            y = axis.y,
            z = axis.z;

        let length = Math.sqrt(x * x + y * y + z * z);

        if (!length)
            return null;

        if (length !== 1) {
            length = 1 / length;
            x *= length;
            y *= length;
            z *= length;
        }

        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const t = 1.0 - c;

        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[4], a11 = this._value[5], a12 = this._value[6],
            a20 = this._value[8], a21 = this._value[9], a22 = this._value[10];

        const
            b00 = x * x * t + c,     b01 = y * x * t + z * s, b02 = z * x * t - y * s,
            b10 = x * y * t - z * s, b11 = y * y * t + c,     b12 = z * y * t + x * s,
            b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

        this._value[0] = a00 * b00 + a10 * b01 + a20 * b02;
        this._value[1] = a01 * b00 + a11 * b01 + a21 * b02;
        this._value[2] = a02 * b00 + a12 * b01 + a22 * b02;

        this._value[3] = a00 * b10 + a10 * b11 + a20 * b12;
        this._value[4] = a01 * b10 + a11 * b11 + a21 * b12;
        this._value[5] = a02 * b10 + a12 * b11 + a22 * b12;

        this._value[6] = a00 * b20 + a10 * b21 + a20 * b22;
        this._value[7] = a01 * b20 + a11 * b21 + a21 * b22;
        this._value[8] = a02 * b20 + a12 * b21 + a22 * b22;

        return this;
    };
    scale(v: Vect2): Mat3 {
        const x = v[0], y = v[1];

        this._value[0] *= x;
        this._value[1] *= x;
        this._value[2] *= x;
        this._value[3] *= y;
        this._value[4] *= y;
        this._value[5] *= y;

        return this;
    };
};

export { Mat3 };
