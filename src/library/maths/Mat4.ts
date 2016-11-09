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

namespace MB {
    /**
     * Mat4 class
     * @class Mat4
     */
    export class Mat4 {

        public _value: Float32Array = new Float32Array(16);
        /**
         * Mat4 constructor
         * @param {ArrayLike<number>[] = null} values [description]
         */
        constructor(values: ArrayLike<number> = null) {
            if (values) {
                this._value = new Float32Array(16);
                for (let i = 0; i < 16; ++i) {
                    this._value[i] = values[i];
                }
            } else {
                this._value = new Float32Array([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 0]);
            }
        };

        /**
         * Create a new Mat4 initialized with values from current Mat4
         * @return {Mat4} a new Mat4
         */
        public clone(): Mat4 {
            return new Mat4([
                 this._value[0],  this._value[1],  this._value[2],  this._value[3],
                 this._value[4],  this._value[5],  this._value[6],  this._value[7],
                 this._value[8],  this._value[9], this._value[10], this._value[11],
                this._value[12], this._value[13], this._value[14], this._value[15],
            ]);
        };
        /**
         * Create a new Mat4 initialized with the given values
         * @param  {ArrayLike<number>} values Array of values (minLength 16)
         * @return {Mat4} a new Mat4
         */
        public static create(values: ArrayLike<number>): Mat4 {
            return new Mat4(values);
        };
        /**
         * Transpose the values of a mat4 not using SIMD
         * @return {Mat4} [description]
         */
        // TODO: SIMD version
        public transpose(dest: Mat4 = null): Mat4 {
            if (!dest) dest = this;
            let a01 = this._value[1], a02 = this._value[2], a03 = this._value[3],
                a12 = this._value[6], a13 = this._value[7],
                a23 = this._value[11];

            dest._value[1] = this._value[4];
            dest._value[2] = this._value[8];
            dest._value[3] = this._value[12];
            dest._value[4] = a01;
            dest._value[6] = this._value[9];
            dest._value[7] = this._value[13];
            dest._value[8] = a02;
            dest._value[9] = a12;
            dest._value[11] = this._value[14];
            dest._value[12] = a03;
            dest._value[13] = a13;
            dest._value[14] = a23;

            return dest;
        };
        /**
         * Inverse of the components of current Mat4
         * @param  {Mat4 = null} dest Destiny Mat4 (optional)
         * @return {Mat4} a new Mat4
         */
        // TODO: SIMD version
        public inverse(dest: Mat4 = null): Mat4 {
            if (!dest) dest = this;

            let a00 = this._value[0],  a01 = this._value[1],  a02 = this._value[2],  a03 = this._value[3],
                a10 = this._value[4],  a11 = this._value[5],  a12 = this._value[6],  a13 = this._value[7],
                a20 = this._value[8],  a21 = this._value[9],  a22 = this._value[10], a23 = this._value[11],
                a30 = this._value[12], a31 = this._value[13], a32 = this._value[14], a33 = this._value[15],

            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,

            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            dest._value[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            dest._value[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            dest._value[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            dest._value[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            dest._value[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            dest._value[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            dest._value[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            dest._value[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            dest._value[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            dest._value[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            dest._value[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            dest._value[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            dest._value[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            dest._value[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            dest._value[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            dest._value[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

            return dest;
        };
        public determinant(): number {
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

            // Calculate the determinant
            return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
        };
        // SIMD version
        public mult = function(b: Mat4, dest: Mat4 = null): Mat4 {
            if (!dest) dest = this;
            let a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a03 = this._value[3],
                a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a13 = this._value[7],
                a20 = this._value[8], a21 = this._value[9], a22 = this._value[10], a23 = this._value[11],
                a30 = this._value[12], a31 = this._value[13], a32 = this._value[14], a33 = this._value[15];

            // Cache only the current line of the second matrix
            let b0  = b._value[0], b1 = b._value[1], b2 = b._value[2], b3 = b._value[3];
            dest._value[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            dest._value[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            dest._value[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            dest._value[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b._value[4]; b1 = b._value[5]; b2 = b._value[6]; b3 = b._value[7];
            dest._value[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            dest._value[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            dest._value[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            dest._value[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b._value[8]; b1 = b._value[9]; b2 = b._value[10]; b3 = b._value[11];
            dest._value[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            dest._value[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            dest._value[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            dest._value[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b._value[12]; b1 = b._value[13]; b2 = b._value[14]; b3 = b._value[15];
            dest._value[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            dest._value[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            dest._value[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            dest._value[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            return dest;
        };
        // TODO: SIMD version
        public translate(v: Vect3, dest: Mat4 = null): Mat4 {
            if (!dest) dest = this;
            const
                x = v.x,
                y = v.y,
                z = v.z;

            dest._value[12] = this._value[0] * x + this._value[4] * y + this._value[8] * z + this._value[12];
            dest._value[13] = this._value[1] * x + this._value[5] * y + this._value[9] * z + this._value[13];
            dest._value[14] = this._value[2] * x + this._value[6] * y + this._value[10] * z + this._value[14];
            dest._value[15] = this._value[3] * x + this._value[7] * y + this._value[11] * z + this._value[15];

            return dest;
        };
        // TODO: SIMD version
        public scale(v: Vect3, dest: Mat4 = null): Mat4 {
            if (!dest) dest = this;
            const
                x = v.x,
                y = v.y,
                z = v.z;

            dest._value[0] *= x;
            dest._value[1] *= x;
            dest._value[2] *= x;
            dest._value[3] *= x;

            dest._value[4] *= y;
            dest._value[5] *= y;
            dest._value[6] *= y;
            dest._value[7] *= y;

            dest._value[8] *= z;
            dest._value[9] *= z;
            dest._value[10] *= z;
            dest._value[11] *= z;

            dest._value[12] = this._value[12];
            dest._value[13] = this._value[13];
            dest._value[14] = this._value[14];
            dest._value[15] = this._value[15];

            return dest;
        };
        public rotate(angle: number, axis: Vect3, dest: Mat4 = null): Mat4 {
            if (!dest) dest = this;
            let x = axis.x, y = axis.y, z = axis.z,
                len = Math.sqrt(x * x + y * y + z * z),
                s, c, t,
                a00, a01, a02, a03,
                a10, a11, a12, a13,
                a20, a21, a22, a23,
                b00, b01, b02,
                b10, b11, b12,
                b20, b21, b22;

            if (Math.abs(len) < 0.0001) { return null; }

            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;

            s = Math.sin(angle);
            c = Math.cos(angle);
            t = 1 - c;

            a00 = this._value[0]; a01 = this._value[1]; a02 = this._value[2]; a03 = this._value[3];
            a10 = this._value[4]; a11 = this._value[5]; a12 = this._value[6]; a13 = this._value[7];
            a20 = this._value[8]; a21 = this._value[9]; a22 = this._value[10]; a23 = this._value[11];

            // Construct the elements of the rotation matrix
            b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
            b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
            b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

            // Perform rotation-specific matrix multiplication
            dest._value[0] = a00 * b00 + a10 * b01 + a20 * b02;
            dest._value[1] = a01 * b00 + a11 * b01 + a21 * b02;
            dest._value[2] = a02 * b00 + a12 * b01 + a22 * b02;
            dest._value[3] = a03 * b00 + a13 * b01 + a23 * b02;
            dest._value[4] = a00 * b10 + a10 * b11 + a20 * b12;
            dest._value[5] = a01 * b10 + a11 * b11 + a21 * b12;
            dest._value[6] = a02 * b10 + a12 * b11 + a22 * b12;
            dest._value[7] = a03 * b10 + a13 * b11 + a23 * b12;
            dest._value[8] = a00 * b20 + a10 * b21 + a20 * b22;
            dest._value[9] = a01 * b20 + a11 * b21 + a21 * b22;
            dest._value[10] = a02 * b20 + a12 * b21 + a22 * b22;
            dest._value[11] = a03 * b20 + a13 * b21 + a23 * b22;

            if (dest !== this) { // If the source and destination differ, copy the unchanged last row
                dest._value[12] = this._value[12];
                dest._value[13] = this._value[13];
                dest._value[14] = this._value[14];
                dest._value[15] = this._value[15];
            }
            return dest;
        };
        // TODO:
        //     - rotateX
        //     - rotateY
        //     - rotateZ








        /*toMat3(): Mat3 {
            return new Mat3([
                this._value[0],
                this._value[1],
                this._value[2],
                this._value[4],
                this._value[5],
                this._value[6],
                this._value[8],
                this._value[9],
                this._value[10]
            ]);
        }
        reset(): Mat4 {
            return this.identity();
        }
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
        identity(): Mat4 {
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
        };*/
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
            const f = 1.0 / Math.tan(fovy / 2),
                nf = 1 / (near - far);
            let out = new Float32Array(16);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = (2 * far * near) * nf;
            out[15] = 0;
            return new Mat4(out);
            /*const
                top = near * Math.tan(fovy * Math.PI / 360.0),
                right = top * aspect;

            return Mat4.frustum(-right, right, -top, top, near, far);*/
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

            const z = Vect3.sub(pos, target).normalize();

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
                return Mat4.create([
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
            } else {
                return Mat4.create([
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
        public static identity = Mat4.create([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        public toMat3(): Mat3 {
            return new Mat3([
                this._value[0],
                this._value[1],
                this._value[2],
                this._value[4],
                this._value[5],
                this._value[6],
                this._value[8],
                this._value[9],
                this._value[10]
            ]);
        };
        /**
         * [toCSSMatrix description]
         * @return {string} [description]
         *
         * Example:
         *     var m = new MB.Mat4(...);
         *     $("#myElem").css("transform", m.toCSSMatrix());
         */
        public toCSSMatrix(): string {
            let str = "";
            str += this._value[0].toFixed(20) + ",";
            str += this._value[1].toFixed(20) + ",";
            str += this._value[2].toFixed(20) + ",";
            str += this._value[3].toFixed(20) + ",";
            str += this._value[4].toFixed(20) + ",";
            str += this._value[5].toFixed(20) + ",";
            str += this._value[6].toFixed(20) + ",";
            str += this._value[7].toFixed(20) + ",";
            str += this._value[8].toFixed(20) + ",";
            str += this._value[9].toFixed(20) + ",";
            str += this._value[10].toFixed(20) + ",";
            str += this._value[11].toFixed(20) + ",";
            str += this._value[12].toFixed(20) + ",";
            str += this._value[13].toFixed(20) + ",";
            str += this._value[14].toFixed(20) + ",";
            str += this._value[15].toFixed(20);

            return `matrix3d(${str})`;
        };

        public decompose(position: MB.Vect3, quaternion: MB.Quat, scale: MB.Vect3) {
            let v = new MB.Vect3();
            let m = new MB.Mat4();

            let sx = v.set(this._value[0], this._value[1], this._value[2]).length();
            let sy = v.set(this._value[4], this._value[5], this._value[6]).length();
            let sz = v.set(this._value[8], this._value[9], this._value[10]).length();

            // if determine is negative, we need to invert one scale
            if (this.determinant() < 0) {
                sx = - sx;
            }

            position.x = this._value[12];
            position.y = this._value[13];
            position.z = this._value[14];

            // scale the rotation part

            m._value.set(this._value); // at this point matrix is incomplete so we can't use .copy()

            const invSX = 1.0 / sx;
            const invSY = 1.0 / sy;
            const invSZ = 1.0 / sz;

            m._value[0] *= invSX;
            m._value[1] *= invSX;
            m._value[2] *= invSX;

            m._value[4] *= invSY;
            m._value[5] *= invSY;
            m._value[6] *= invSY;

            m._value[8] *= invSZ;
            m._value[9] *= invSZ;
            m._value[10] *= invSZ;

            quaternion.setFromRotationMatrix(m);

            scale.x = sx;
            scale.y = sy;
            scale.z = sz;
        }

        public compose(position: MB.Vect3, quaternion: MB.Quat, scale: MB.Vect3) {
            /// ROTATION
            let x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
            let x2 = x + x, y2 = y + y, z2 = z + z;
            let xx = x * x2, xy = x * y2, xz = x * z2;
            let yy = y * y2, yz = y * z2, zz = z * z2;
            let wx = w * x2, wy = w * y2, wz = w * z2;

            this._value[0] = 1 - (yy + zz);
            this._value[4] = xy - wz;
            this._value[8] = xz + wy;

            this._value[1] = xy + wz;
            this._value[5] = 1 - (xx + zz);
            this._value[9] = yz - wx;

            this._value[2] = xz - wy;
            this._value[6] = yz + wx;
            this._value[10] = 1.0 - (xx + yy);

            // last column
            this._value[3] = 0.0;
            this._value[7] = 0.0;
            this._value[11] = 0.0;

            // bottom row
            this._value[12] = 0.0;
            this._value[13] = 0.0;
            this._value[14] = 0.0;
            this._value[15] = 1.0;

            /// SCALE
            x = scale.x;
            y = scale.y;
            z = scale.z;
            this._value[0] *= x; this._value[4] *= y; this._value[8] *= z;
            this._value[1] *= x; this._value[5] *= y; this._value[9] *= z;
            this._value[2] *= x; this._value[6] *= y; this._value[10] *= z;
            this._value[3] *= x; this._value[7] *= y; this._value[11] *= z;

            /// POSITION
            this._value[12] = position.x;
            this._value[13] = position.y;
            this._value[14] = position.z;
        };
        public copy(m: MB.Mat4): MB.Mat4 {
            this._value.set(m._value);
            return this;
        };
        public set(
            e11: number, e12: number, e13: number, e14: number,
            e21: number, e22: number, e23: number, e24: number,
            e31: number, e32: number, e33: number, e34: number,
            e41: number, e42: number, e43: number, e44: number): MB.Mat4 {

            this._value[0] = e11; this._value[4] = e12; this._value[8] = e13; this._value[12] = e14;
            this._value[1] = e21; this._value[5] = e22; this._value[9] = e23; this._value[13] = e24;
            this._value[2] = e31; this._value[6] = e32; this._value[10] = e33; this._value[14] = e34;
            this._value[3] = e41; this._value[7] = e42; this._value[11] = e43; this._value[15] = e44;

            return this;
        };

        public makeRotationFromQuat(qt: MB.Quat): MB.Mat4 {
            const x = qt.x,
                  y = qt.y,
                  z = qt.z,
                  w = qt.w;

            const x2 = x + x,
                  y2 = y + y,
                  z2 = z + z;

            const xx = x * x2,
                  xy = x * y2,
                  xz = x * z2;

            const yy = y * y2,
                  yz = y * z2,
                  zz = z * z2;

            const wx = w * x2,
                  wy = w * y2,
                  wz = w * z2;

            this._value[0] = 1 - (yy + zz);
            this._value[4] = xy - wz;
            this._value[8] = xz + wy;

            this._value[1] = xy + wz;
            this._value[5] = 1 - (xx + zz);
            this._value[9] = yz - wx;

            this._value[2] = xz - wy;
            this._value[6] = yz + wx;
            this._value[10] = 1 - (xx + yy);

            // last column
            this._value[3] = 0;
            this._value[7] = 0;
            this._value[11] = 0;

            // bottom row
            this._value[12] = 0;
            this._value[13] = 0;
            this._value[14] = 0;
            this._value[15] = 1;

            return this;
        }
    };
};
