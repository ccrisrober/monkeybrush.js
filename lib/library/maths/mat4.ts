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
        const
            t01 = this._value[1], t02 = this._value[2],
            t03 = this._value[3], t12 = this._value[6],
            t13 = this._value[7], t23 = this._value[11];

        this._value[1] = this._value[4];
        this._value[2] = this._value[8];
        this._value[3] = this._value[12];
        this._value[4] = t01;
        this._value[6] = this._value[9];
        this._value[7] = this._value[13];
        this._value[8] = t02;
        this._value[9] = t12;
        this._value[11] = this._value[14];
        this._value[12] = t03;
        this._value[13] = t13;
        this._value[14] = t23;

        return this;
    };
    determinant(): number {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a03 = this._value[3],
            a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a13 = this._value[7],
            a20 = this._value[8], a21 = this._value[9], a22 = this._value[10], a23 = this._value[11],
            a30 = this._value[12], a31 = this._value[13], a32 = this._value[14], a33 = this._value[15];

        const
            det00 = a00 * a11 - a01 * a10,
            det01 = a00 * a12 - a02 * a10,
            det02 = a00 * a13 - a03 * a10,
            det03 = a01 * a12 - a02 * a11,
            det04 = a01 * a13 - a03 * a11,
            det05 = a02 * a13 - a03 * a12,
            det06 = a20 * a31 - a21 * a30,
            det07 = a20 * a32 - a22 * a30,
            det08 = a20 * a33 - a23 * a30,
            det09 = a21 * a32 - a22 * a31,
            det10 = a21 * a33 - a23 * a31,
            det11 = a22 * a33 - a23 * a32;

        return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
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
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a03 = this._value[3],
            a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a13 = this._value[7],
            a20 = this._value[8], a21 = this._value[9], a22 = this._value[10], a23 = this._value[11],
            a30 = this._value[12], a31 = this._value[13], a32 = this._value[14], a33 = this._value[15];

        let
            b0 = this._value[0],
            b1 = this._value[1],
            b2 = this._value[2],
            b3 = this._value[3];

        this._value[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._value[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._value[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._value[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this._value[4];
        b1 = this._value[5];
        b2 = this._value[6];
        b3 = this._value[7];

        this._value[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._value[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._value[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._value[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this._value[8];
        b1 = this._value[9];
        b2 = this._value[10];
        b3 = this._value[11];

        this._value[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._value[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._value[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._value[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this._value[12];
        b1 = this._value[13];
        b2 = this._value[14];
        b3 = this._value[15];

        this._value[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._value[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._value[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._value[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return this;
    };
    multVec3(v: Vect3): Vect3 {
        const
            x = v.x,
            y = v.y,
            z = v.z;

        return new Vect3(
            this._value[0] * x + this._value[4] * y + this._value[8]  * z + this._value[12],
            this._value[1] * x + this._value[5] * y + this._value[9]  * z + this._value[13],
            this._value[2] * x + this._value[6] * y + this._value[10] * z + this._value[14]
        );
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
        const
            x = v.x,
            y = v.y,
            z = v.z;

        this._value[12] += this._value[0] * x + this._value[4] * y + this._value[8]  * z;
        this._value[13] += this._value[1] * x + this._value[5] * y + this._value[9]  * z;
        this._value[14] += this._value[2] * x + this._value[6] * y + this._value[10] * z;
        this._value[15] += this._value[3] * x + this._value[7] * y + this._value[11] * z;

        return this;
    };
    rotate(angle: number, axis: Vect3): Mat4 {
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
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a03 = this._value[3],
            a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a13 = this._value[7],
            a20 = this._value[8], a21 = this._value[9], a22 = this._value[10], a23 = this._value[11];

        const
            b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s,
            b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s,
            b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

        this._value[0] = a00 * b00 + a10 * b01 + a20 * b02;
        this._value[1] = a01 * b00 + a11 * b01 + a21 * b02;
        this._value[2] = a02 * b00 + a12 * b01 + a22 * b02;
        this._value[3] = a03 * b00 + a13 * b01 + a23 * b02;

        this._value[4] = a00 * b10 + a10 * b11 + a20 * b12;
        this._value[5] = a01 * b10 + a11 * b11 + a21 * b12;
        this._value[6] = a02 * b10 + a12 * b11 + a22 * b12;
        this._value[7] = a03 * b10 + a13 * b11 + a23 * b12;

        this._value[8] = a00 * b20 + a10 * b21 + a20 * b22;
        this._value[9] = a01 * b20 + a11 * b21 + a21 * b22;
        this._value[10] = a02 * b20 + a12 * b21 + a22 * b22;
        this._value[11] = a03 * b20 + a13 * b21 + a23 * b22;

        return this;
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
    static frustum(l: number, r: number, b: number, t: number, n: number, f: number): Mat4 {
        const
            rl = (r - l),
            tb = (t - b),
            fn = (f - n);

        return new Mat4([
             (n * 2.0) / rl,               0.0,                   0.0,       0.0,
                        0.0,    (n * 2.0) / tb,                   0.0,       0.0,
               (r + l) / rl,      (t + b) / tb,         -(f + n) / fn,      -1.0,
                        0.0,               0.0,   -(f * n * 2.0) / fn,       0.0
        ]);
    };
    static perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
        const
            top = near * Math.tan(fovy * Math.PI / 360.0),
            right = top * aspect;

        return Mat4.frustum(-right, right, -top, top, near, far);
    };
    static orthographic(l: number, r: number, b: number, t: number, n: number, f: number): Mat4 {
        const
            rl = (r - l),
            tb = (t - b),
            fn = (f - n);

        return new Mat4([
                 2.0 / rl,               0.0,               0.0,         0.0,
                      0.0,          2.0 / tb,               0.0,         0.0,
                      0.0,               0.0,         -2.0 / fn,         0.0,
            -(l + r) / rl,     -(t + b) / tb,     -(f + n) / fn,         1.0
        ]);
    };

    static lookAt(pos: Vect3, target: Vect3, up: Vect3): Mat4 {
        if (pos.isEquals(target)) {
            return this.identity;
        }

        const z = Vect3.diff(pos, target).normalize();

        const x = Vect3.cross(up, z).normalize();
        const y = Vect3.cross(z, x).normalize();

        return new Mat4([
                           x.x,                y.x,                z.x,     0,
                           x.y,                y.y,                z.y,     0,
                           x.z,                y.z,                z.z,     0,
            -Vect3.dot(x, pos), -Vect3.dot(y, pos), -Vect3.dot(z, pos),     1
        ]);
    };
    static product(m1: Mat4, m2: Mat4, result: Mat4 = null): Mat4 {
        const
            a00 = m1._value[0], a01 = m1._value[1], a02 = m1._value[2], a03 = m1._value[3],
            a10 = m1._value[4], a11 = m1._value[5], a12 = m1._value[6], a13 = m1._value[7],
            a20 = m1._value[8], a21 = m1._value[9], a22 = m1._value[10], a23 = m1._value[11],
            a30 = m1._value[12], a31 = m1._value[13], a32 = m1._value[14], a33 = m1._value[15];

        const
            b00 = m2._value[0], b01 = m2._value[1], b02 = m2._value[2], b03 = m2._value[3],
            b10 = m2._value[4], b11 = m2._value[5], b12 = m2._value[6], b13 = m2._value[7],
            b20 = m2._value[8], b21 = m2._value[9], b22 = m2._value[10], b23 = m2._value[11],
            b30 = m2._value[12], b31 = m2._value[13], b32 = m2._value[14], b33 = m2._value[15];

        if (result) {
            result.init([
                b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

                b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

                b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

                b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
            ]);

            return result;
        } else {
            return new Mat4([
                b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

                b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

                b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

                b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
            ]);
        }
    };
    static identity = new Mat4().identify();
};

export default Mat4;
