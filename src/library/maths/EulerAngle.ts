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
        protected _order: MB.RotSeq;

        get x(): number { return this._value[0]; };
        get y(): number { return this._value[1]; };
        get z(): number { return this._value[2]; };
        set x(v: number) {
            this._value[0] = v;
            if (this.onChange) {
                this.onChange();
            }
        };
        set y(v: number) {
            this._value[1] = v;
            if (this.onChange) {
                this.onChange();
            }
        };
        set z(v: number) {
            this._value[2] = v;
            if (this.onChange) {
                this.onChange();
            }
        };

        public onChange: Function;

        public set(vx: number, vy: number, vz: number) {
            this.x = vx;
            this.y = vy;
            this.z = vz;
            if (this.onChange) {
                this.onChange();
            }
        };

        static create(values: Float32Array): EulerAngle {
            return new EulerAngle(values[0], values[1], values[2], RotSeq.xyz);
        };

        public reset() {
            for (let i = 0; i < 3; ++i) {
                this._value[i] = 0.0;
            }
            this._order = MB.RotSeq.xyz;
            if (this.onChange) {
                this.onChange();
            }
        }

        /**
         * EulerAngle constructor
         * @param {number = 0.0} x
         * @param {number = 0.0} y
         * @param {number = 0.0} z
         */
        constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0,
            public order: RotSeq = RotSeq.xyz) {

            this._value = new Float32Array([x, y, z]);
            this._order = order;
        }

        public static createFromVec3(v: MB.Vect3, order: MB.RotSeq = MB.RotSeq.xyz): MB.EulerAngle {
            return new MB.EulerAngle(v.x, v.y, v.x, order);
        }

        public setFromRotationMatrix(mat: MB.Mat4, order: MB.RotSeq, update: boolean): EulerAngle {
            const
                m11 = mat._value[0],
                m12 = mat._value[4],
                m13 = mat._value[8];
            const
                m21 = mat._value[1],
                m22 = mat._value[5],
                m23 = mat._value[9];
            const
                m31 = mat._value[2],
                m32 = mat._value[6],
                m33 = mat._value[10];

            order = order || this._order;

            if (order === MB.RotSeq.xyz) {
                this.y = Math.asin(MB.Mathf.clamp(m13, - 1, 1));
                if (Math.abs(m13) < 0.99999) {
                    this.x = Math.atan2(- m23, m33);
                    this.z = Math.atan2(- m12, m11);
                } else {
                    this.x = Math.atan2(m32, m22);
                    this.z = 0.0;
                }
            } else if (order === MB.RotSeq.yxz) {
                this.x = Math.asin(-MB.Mathf.clamp(m23, - 1, 1));
                if (Math.abs(m23) < 0.99999) {
                    this.y = Math.atan2(m13, m33);
                    this.z = Math.atan2(m21, m22);
                } else {
                    this.y = Math.atan2(- m31, m11);
                    this.z = 0.0;
                }
            } else if (order === MB.RotSeq.zxy) {
                this.x = Math.asin(MB.Mathf.clamp(m32, - 1, 1));
                if (Math.abs(m32) < 0.99999) {
                    this.y = Math.atan2(- m31, m33);
                    this.z = Math.atan2(- m12, m22);

                } else {
                    this.y = 0.0;
                    this.z = Math.atan2(m21, m11);
                }
            } else if (order === MB.RotSeq.zyx) {
                this.y = Math.asin(-MB.Mathf.clamp(m31, - 1, 1));
                if (Math.abs(m31) < 0.99999) {
                    this.x = Math.atan2(m32, m33);
                    this.z = Math.atan2(m21, m11);
                } else {
                    this.x = 0.0;
                    this.z = Math.atan2(- m12, m22);
                }
            } else if (order === MB.RotSeq.yzx) {
                this.z = Math.asin(MB.Mathf.clamp(m21, - 1, 1));
                if (Math.abs(m21) < 0.99999) {
                    this.x = Math.atan2(- m23, m22);
                    this.y = Math.atan2(- m31, m11);
                } else {
                    this.x = 0.0;
                    this.y = Math.atan2(m13, m33);
                }

            } else if (order === MB.RotSeq.xzy) {
                this.z = Math.asin(-MB.Mathf.clamp(m12, - 1, 1));
                if (Math.abs(m12) < 0.99999) {
                    this.x = Math.atan2(m32, m22);
                    this.y = Math.atan2(m13, m11);
                } else {
                    this.x = Math.atan2(- m23, m33);
                    this.y = 0.0;
                }
            } else {
                // Order undefined
            }

            this._order = order;

            if (update !== false) this.onChange();

            return this;
        };

        public setFromQuaternion(q: MB.Quat, order: MB.RotSeq, update: boolean = false): EulerAngle {
            let matrix = new MB.Mat4();
            if (!order) {
                order = this.order;
            }
            matrix.makeRotationFromQuat(q);
            return this.setFromRotationMatrix(matrix, order, update);
        };
    };
};
