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
     * Quat class
     * @class Quat
     */
    export class Quat {
        protected _value: Float32Array;

        get x(): number { return this._value[0]; };
        get y(): number { return this._value[1]; };
        get z(): number { return this._value[2]; };
        get w(): number { return this._value[3]; };
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
        set w(v: number) {
            this._value[3] = v;
            if (this.onChange) {
                this.onChange();
            }
        };

        static create(values: Float32Array): Quat {
            return new Quat(values[0], values[1], values[2], values[3]);
        };

        public reset() {
            this._value[0] = 0.0;
            this._value[1] = 0.0;
            this._value[2] = 0.0;
            this._value[3] = 1.0;
            if (this.onChange) {
                this.onChange();
            }
        }

        /**
         * Quat constructor
         * @param {number = 0.0} x
         * @param {number = 0.0} y
         * @param {number = 0.0} z
         * @param {number = 1.0} w
         */
        constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 1.0) {
            this._value = new Float32Array([x, y, z, w]);
        }
        /**
         * Set quaternion value to identity
         */
        public setIdentity(): Quat {
            this._value[0] = 0;
            this._value[1] = 0;
            this._value[2] = 0;
            this._value[3] = 1;

            return this;
        }
        public add(q: Quat): Quat {
            for (let i = 0; i < 4; ++i) {
                this._value[i] += q._value[i];
            }
            return this;
        }
        public rem(q: Quat): Quat {
            for (let i = 0; i < 4; ++i) {
                this._value[i] -= q._value[i];
            }
            return this;
        }
        static add(q: Quat, q2: Quat, dest: Quat = null): Quat {
            if (!dest) dest = new Quat();

            dest._value[0] = q.x + q2.x;
            dest._value[1] = q.y + q2.y;
            dest._value[2] = q.z + q2.z;
            dest._value[3] = q.w + q2.w;

            return dest;
        }
        static rem(q: Quat, q2: Quat, dest: Quat = null): Quat {
            if (!dest) dest = new Quat();

            dest._value[0] = q.x - q2.x;
            dest._value[1] = q.y - q2.y;
            dest._value[2] = q.z - q2.z;
            dest._value[3] = q.w - q2.w;

            return dest;
        }
        public roll(): number {
            const
                x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
        }
        public pitch(): number {
            const
                x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
        }
        public yaw(): number {
            return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
        }
        /**
         * Create a copy of this quaternion
         * @return {Quat}
         */
        public clone(): Quat {
            return new Quat(
                this._value[0],
                this._value[1],
                this._value[2],
                this._value[3]
           );
        }
        /**
         * Calculate dot product with another quaternion
         */
        static dot(q1: Quat, q2: Quat): number {
            return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
        }
        /**
         * Calculate multiplication with another quaternion
         */
        public mult(q: Quat): Quat {
            const
                q1x = this._value[0],
                q1y = this._value[1],
                q1z = this._value[2],
                q1w = this._value[3];

            const
                q2x = q.x,
                q2y = q.y,
                q2z = q.z,
                q2w = q.w;

            this._value[0] = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
            this._value[1] = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
            this._value[2] = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
            this._value[3] = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

            return this;
        }
        /**
         * Normalize quaternion
         */
        public normalize(dest: Quat = null): Quat {
            if (!dest) dest = this;

            const
                x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            let length = Math.sqrt(x * x + y * y + z * z + w * w);

            if (!length) {
                dest.x = 0;
                dest.y = 0;
                dest.z = 0;
                dest.w = 0;

                return dest;
            }

            length = 1 / length;

            dest.x = x * length;
            dest.y = y * length;
            dest.z = z * length;
            dest.w = w * length;

            return dest;
        }
        /**
         * Invert quaternion
         */
        public inverse(): Quat {
            const dot = Quat.dot(this, this);

            if (!dot) {
                this.reset();

                return this;
            }

            const invDot = dot ? 1.0 / dot : 0;

            this.x *= -invDot;
            this.y *= -invDot;
            this.z *= -invDot;
            this.w *= invDot;

            return this;
        };
        conjugate(): Quat {
            this._value[0] = -this._value[0];
            this._value[1] = -this._value[1];
            this._value[2] = -this._value[2];

            if (this.onChange) {
                this.onChange();
            }

            return this;
        };
        /**
         * Returns whether or not current Quat and another Quat have exactly the same elements
         *     in the same position.
         * @param  {Vect2}   other The second vector
         * @return {boolean} True if the quaternions are equals, false otherwise
         */
        public exactEquals(other: MB.Quat): boolean {
            return this.x === other.x && this.y === other.y
                && this.z === other.z && this.w === other.w;
        }
        static fromAxis(axis: Vect3, angle: number, dest: Quat = null): Quat {
            if (!dest) dest = new Quat();

            angle *= 0.5;
            const sin = Math.sin(angle);

            dest._value[0] = axis.x * sin;
            dest._value[1] = axis.y * sin;
            dest._value[2] = axis.z * sin;
            dest._value[3] = Math.cos(angle);

            return dest;
        }

        public onChange: Function;

        public setFromEuler (euler: MB.EulerAngle): MB.Quat {
            // Based on http://www.mathworks.com/matlabcentral/fileexchange/
            //     20696-function-to-convert-between-dcm-euler-angles-quaternions-
            //     and-euler-vectors/content/SpinCalc.m

            const s1 = Math.sin(euler.x / 2.0);
            const s2 = Math.sin(euler.y / 2.0);
            const s3 = Math.sin(euler.z / 2.0);
            const c1 = Math.cos(euler.x / 2.0);
            const c2 = Math.cos(euler.y / 2.0);
            const c3 = Math.cos(euler.z / 2.0);

            const order = euler.order;
            if (order === MB.RotSeq.xyz) {
                this._value[0] = s1 * c2 * c3 + c1 * s2 * s3;
                this._value[1] = c1 * s2 * c3 - s1 * c2 * s3;
                this._value[2] = c1 * c2 * s3 + s1 * s2 * c3;
                this._value[3] = c1 * c2 * c3 - s1 * s2 * s3;
            } else if (order === MB.RotSeq.yxz) {
                this._value[0] = s1 * c2 * c3 + c1 * s2 * s3;
                this._value[1] = c1 * s2 * c3 - s1 * c2 * s3;
                this._value[2] = c1 * c2 * s3 - s1 * s2 * c3;
                this._value[3] = c1 * c2 * c3 + s1 * s2 * s3;
            } else if (order === MB.RotSeq.zxy) {
                this._value[0] = s1 * c2 * c3 - c1 * s2 * s3;
                this._value[1] = c1 * s2 * c3 + s1 * c2 * s3;
                this._value[2] = c1 * c2 * s3 + s1 * s2 * c3;
                this._value[3] = c1 * c2 * c3 - s1 * s2 * s3;
            } else if (order === MB.RotSeq.zyx) {
                this._value[0] = s1 * c2 * c3 - c1 * s2 * s3;
                this._value[1] = c1 * s2 * c3 + s1 * c2 * s3;
                this._value[2] = c1 * c2 * s3 - s1 * s2 * c3;
                this._value[3] = c1 * c2 * c3 + s1 * s2 * s3;
            } else if (order === MB.RotSeq.yzx) {
                this._value[0] = s1 * c2 * c3 + c1 * s2 * s3;
                this._value[1] = c1 * s2 * c3 + s1 * c2 * s3;
                this._value[2] = c1 * c2 * s3 - s1 * s2 * c3;
                this._value[3] = c1 * c2 * c3 - s1 * s2 * s3;
            } else if (order === MB.RotSeq.xzy) {
                this._value[0] = s1 * c2 * c3 - c1 * s2 * s3;
                this._value[1] = c1 * s2 * c3 - s1 * c2 * s3;
                this._value[2] = c1 * c2 * s3 + s1 * s2 * c3;
                this._value[3] = c1 * c2 * c3 + s1 * s2 * s3;
            }
            return this;
        }
    };
};
