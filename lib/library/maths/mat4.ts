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
/// <reference path="vect3.ts" />

import Vect3 from "./vect3";

"use strict";

/**
 * Mat4 class
 * @class Mat4
 */
class Mat4 {
    protected _value: Float32Array = new Float32Array(16);
    constructor(values: number[] = null) {
        if (values) {
            this.init(values);
        }
    };
    init(values: number[]): Mat4 {
        for (let i = 0; i < 16; ++i) {
            this._value[i] = values[i];
        }
        return this;
    };
    isEquals(mat: Mat4, threshold: boolean = false): boolean {
        for (let i = 0; i < 16; ++i) {
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
    transpose(): Mat4 {
        return null;
    };
    determinant(): number {
        return 0;
    };
    invert(): Mat4 {
        return null;
    };
    add(m: Mat4): Mat4 {
        for (let i = 0; i < 16; ++i) {
            this._value[i] += m._value[i];
        }
        return this;
    };
    sub(m: Mat4): Mat4 {
        for (let i = 0; i < 16; ++i) {
            this._value[i] -= m._value[i];
        }
        return this;
    };
    mult(m: Mat4): Mat4 {
        return null;
    };
    identify(): Mat4 {
        this._value[0] = 1;
        this._value[1] = 0;
        this._value[2] = 0;
        this._value[3] = 0;

        this._value[4] = 0;
        this._value[5] = 1;
        this._value[6] = 0;
        this._value[7] = 0;

        this._value[8] = 0;
        this._value[9] = 0;
        this._value[10] = 1;
        this._value[11] = 0;

        this._value[12] = 0;
        this._value[13] = 0;
        this._value[14] = 0;
        this._value[15] = 1;

        return this;
    };
    toString(): string {
        return `Mat4(
             ${this._value[0]},  ${this._value[1]},  ${this._value[2]},  ${this._value[3]},
             ${this._value[4]},  ${this._value[5]},  ${this._value[6]},  ${this._value[7]},
             ${this._value[8]},  ${this._value[9]}, ${this._value[10]}, ${this._value[11]},
            ${this._value[12]}, ${this._value[13]}, ${this._value[14]}, ${this._value[15]},
        )`;
    };
    translate(v: Vect3): Mat4 {
        return null;
    };
    rotate(angle: number, axis: Vect3): Mat4 {
        return null;
    };
    scale(v: Vect3): Mat4 {
        const x =
            v[0],
            y = v[1],
            z = v[2];

        this._value[0] *= x;
        this._value[1] *= x;
        this._value[2] *= x;
        this._value[3] *= x;

        this._value[4] *= y;
        this._value[5] *= y;
        this._value[6] *= y;
        this._value[7] *= y;

        this._value[8] *= z;
        this._value[9] *= z;
        this._value[10] *= z;
        this._value[11] *= z;

        return this;
    };
    static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
        const
            rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);

        return new Mat4([
            (near * 2.0) / rl,
            0.0,
            0.0,
            0.0,

            0.0,
            (near * 2.0) / tb,
            0.0,
            0.0,

            (right + left) / rl,
            (top + bottom) / tb,
            -(far + near) / fn,
            -1.0,

            0.0,
            0.0,
            -(far * near * 2.0) / fn,
            0.0
        ]);
    };
    static perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
        const
            top = near * Math.tan(fovy * Math.PI / 360.0),
            right = top * aspect;

        return Mat4.frustum(-right, right, -top, top, near, far);
    };
    static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
        const
            rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);

        return new Mat4([
            2.0 / rl,
            0.0,
            0.0,
            0.0,

            0.0,
            2.0 / tb,
            0.0,
            0.0,

            0.0,
            0.0,
            -2.0 / fn,
            0.0,

            -(left + right) / rl,
            -(top + bottom) / tb,
            -(far + near) / fn,
            1.0
        ]);
    };
    // static lookAt(...)
};

export default Mat4;
