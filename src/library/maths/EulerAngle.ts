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
    export enum RotSeq {
        zyx, zyz, zxy, zxz, yxz, yxy, yzx, yzy, xyz, xyx, xzy, xzx
    };
    export class EulerAngle {
        protected _value: Float32Array;

        get x(): number { return this._value[0]; };
        get y(): number { return this._value[1]; };
        get z(): number { return this._value[2]; };
        set x(v: number) { this._value[0] = v; };
        set y(v: number) { this._value[1] = v; };
        set z(v: number) { this._value[2] = v; };

        static create(values: Float32Array): EulerAngle {
            return new EulerAngle(values[0], values[1], values[2]);
        };

        public reset() {
            for (let i = 0; i < 3; ++i) {
                this._value[i] = 0.0;
            }
        }

        /**
         * EulerAngle constructor
         * @param {number = 0.0} x
         * @param {number = 0.0} y
         * @param {number = 0.0} z
         */
        constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
            this._value = new Float32Array([x, y, z]);
        }
        /*protected static _twoaxisrot(r11: number, r12: number, r21: number,
            r31: number, r32: number): Vect3 {
            let res = new Vect3();
            res.x = Math.atan2(r11, r12);
            res.y = Math.acos (r21);
            res.z = Math.atan2(r31, r32);
            return res;
        }

        protected static _threeaxisrot(r11: number, r12: number, r21: number,
            r31: number, r32: number): Vect3 {
            let res = new Vect3();
            res.x = Math.atan2(r31, r32);
            res.y = Math.asin (r21);
            res.z = Math.atan2(r11, r12);
            return res;
        }
        // Code based on http://bediyap.com/programming/convert-quaternion-to-euler-rotations/
        public static fromQuaternion(q: Quat, order: RotSeq = RotSeq.xyz): Vect3 {

            switch (order) {
                case RotSeq.zyx:
                    return this._threeaxisrot(2 * (q.x * q.y + q.w * q.z),
                        q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
                        -2 * (q.x * q.z - q.w * q.y),
                        2 * (q.y * q.z + q.w * q.x),
                        q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z);

                case RotSeq.zyz:
                    return this._twoaxisrot(2 * (q.y * q.z - q.w * q.x),
                        2 * (q.x * q.z + q.w * q.y),
                        q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
                        2 * (q.y * q.z + q.w * q.x),
                        -2 * (q.x * q.z - q.w * q.y));

                case RotSeq.zxy:
                    return this._threeaxisrot(-2 * (q.x * q.y - q.w * q.z),
                        q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
                        2 * (q.y * q.z + q.w * q.x),
                        -2 * (q.x * q.z - q.w * q.y),
                        q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z);

                case RotSeq.zxz:
                    return this._twoaxisrot(2 * (q.x * q.z + q.w * q.y),
                        -2 * (q.y * q.z - q.w * q.x),
                        q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
                        2 * (q.x * q.z - q.w * q.y),
                        2 * (q.y * q.z + q.w * q.x));

                case RotSeq.yxz:
                    return this._threeaxisrot(2 * (q.x * q.z + q.w * q.y),
                        q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
                        -2 * (q.y * q.z - q.w * q.x),
                        2 * (q.x * q.y + q.w * q.z),
                        q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z);

                case RotSeq.yxy:
                    return this._twoaxisrot(2 * (q.x * q.y - q.w * q.z),
                        2 * (q.y * q.z + q.w * q.x),
                        q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
                        2 * (q.x * q.y + q.w * q.z),
                        -2 * (q.y * q.z - q.w * q.x));

                case RotSeq.yzx:
                    return this._threeaxisrot(-2 * (q.x * q.z - q.w * q.y),
                        q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
                        2 * (q.x * q.y + q.w * q.z),
                        -2 * (q.y * q.z - q.w * q.x),
                        q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z);

                case RotSeq.yzy:
                    return this._twoaxisrot(2 * (q.y * q.z + q.w * q.x),
                        -2 * (q.x * q.y - q.w * q.z),
                        q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
                        2 * (q.y * q.z - q.w * q.x),
                        2 * (q.x * q.y + q.w * q.z));

                case RotSeq.xyz:
                    return this._threeaxisrot(-2 * (q.y * q.z - q.w * q.x),
                        q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
                        2 * (q.x * q.z + q.w * q.y),
                        -2 * (q.x * q.y - q.w * q.z),
                        q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z);

                case RotSeq.xyx:
                    return this._twoaxisrot(2 * (q.x * q.y + q.w * q.z),
                        -2 * (q.x * q.z - q.w * q.y),
                        q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
                        2 * (q.x * q.y - q.w * q.z),
                        2 * (q.x * q.z + q.w * q.y));

                case RotSeq.xzy:
                    return this._threeaxisrot(2 * (q.y * q.z + q.w * q.x),
                        q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
                        -2 * (q.x * q.y - q.w * q.z),
                        2 * (q.x * q.z + q.w * q.y),
                        q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z);

                case RotSeq.xzx:
                    return this._twoaxisrot(2 * (q.x * q.z - q.w * q.y),
                        2 * (q.x * q.y + q.w * q.z),
                        q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
                        2 * (q.x * q.z + q.w * q.y),
                        -2 * (q.x * q.y - q.w * q.z));
                default:
                    throw new Error("Unknown rotation sequence");
            }

        }*/
    };
};
