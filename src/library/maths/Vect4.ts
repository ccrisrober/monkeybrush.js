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
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.ç

"use strict";

namespace MB {
    /**
     * Vect4 class
     * @class Vect4
     */
    export class Vect4 {
        protected _value: Float32Array;
        /**
         * Vect4 constructor
         * @param {number = 0.0} x
         * @param {number = 0.0} y
         * @param {number = 0.0} z
         * @param {number = 0.0} w
         */
        constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 0.0) {
            this._value = new Float32Array([x, y, z, w]);
        };
        /**
         * Create a new Vect4 initialized with the given values
         * @param  {ArrayLike<number>} values Array of values (minLength 4)
         * @return {Vect4} a new Vect4
         */
        static create(value: ArrayLike<number>): Vect4 {
            return new Vect4(value[0], value[1], value[2], value[3]);
        };
        /**
         * Create a new Vect4 initialized with the given value.
         * All Vect4 component set with same value.
         * @param  {number} value Simple value
         * @return {Vect4} a new Vect4
         */
        static createFromScalar(value: number): Vect4 {
            return new Vect4(value, value, value, value);
        };
        /**
         * Create a new Vect4 initialized with values from current Vect4
         * @return {Vect4} a new Vect4
         */
        public clone(): Vect4 {
            return new Vect4(this.x, this.y, this.z, this.w);
        };
        /**
         * Adds current Vect4 with another Vect4
         * @param  {Vect4} v Second vector
         * @return {Vect4} a new Vect4
         */
        public add(v: Vect4): Vect4 {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            this.w += v.w;

            return this;
        };
        /**
         * Substracts current Vect4 with another Vect4
         * @param  {Vect4} v Second vector
         * @return {Vect4} a new Vect4
         */
        public sub(v: Vect4): Vect4 {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            this.w -= v.w;

            return this;
        };
        /**
         * Multiplies current Vect4 with another Vect4
         * @param  {Vect4} v Second vector
         * @return {Vect4} a new Vect4
         */
        public mult(v: Vect4): Vect4 {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            this.w *= v.w;

            return this;
        };
        /**
         * Divides current Vect4 with another Vect4
         * @param  {Vect4} v Second vector
         * @return {Vect4} a new Vect4
         */
        public div(v: Vect4): Vect4 {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            this.w /= v.w;

            return this;
        };
        /**
         * Scales a Vect4 by a scalar number
         * @param  {number} value Amount to scale the vector by
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {Vect4} a new Vect4
         */
        public scale(value: number, dest: Vect4 = null): Vect4 {
            if (!dest) dest = this;

            dest.x *= value;
            dest.y *= value;
            dest.z *= value;
            dest.w *= value;

            return dest;
        };
        /**
         * Add two Vect4 after scaling the Vect4 given by a scalar value
         * @param  {Vect4} v Second vector
         * @param  {number} scale Amount to scale v by before adding
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {Vect4} a new Vect4
         */
        public scaleAndAdd(v: Vect4, scale: number, dest: Vect4 = null): Vect4 {
            if (!dest) dest = this;

            dest.x = this.x + (v.x * scale);
            dest.y = this.y + (v.y * scale);
            dest.z = this.z + (v.z * scale);
            dest.w = this.w + (v.w * scale);

            return dest;
        };
        /*
         * Calculate the euclidian distance between two Vect4s
         * @param  {Vect4}  v First Vect4 operand
         * @param  {Vect4}  v2 Second Vect4 operand
         * @return {number} Distance between Vect4s
         */
        static distance(v: Vect4, v2: Vect4): number {
            return Math.sqrt(this.squaredDistance(v, v2));
        };
        /**
         * Calculate the squared euclidian distance between two Vect4s
         * @param  {Vect4}  v First Vect4 operand
         * @param  {Vect4}  v2 Second Vect4 operand
         * @return {number} Distance between Vect4s
         */
        static squaredDistance(v: Vect4, v2: Vect4): number {
            const
                x = v2.x - v.x,
                y = v2.y - v.y,
                z = v2.z - v.z,
                w = v2.w - v.w;

            return (x * x + y * y + z * z + w * w);
        };
        /**
         * Negates the components of current Vect4
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {Vect4} a new Vect4
         */
        public negate(dest: Vect4 = null): Vect4 {
            if (!dest) dest = this;

            dest.x = -this.x;
            dest.y = -this.y;
            dest.z = -this.z;
            dest.w = -this.w;

            return dest;
        };
        /**
         * Inverse of the components of current Vect4
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {Vect4} a new Vect4
         */
        public inverse(dest: Vect4 = null): Vect4 {
            if (!dest) dest = this;

            dest.x = 1 / this.x;
            dest.y = 1 / this.y;
            dest.z = 1 / this.z;
            dest.w = 1 / this.w;

            return dest;
        };
        /**
         * Normalize current Vect4
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {Vect4} a new Vect4
         */
        public normalize(dest: Vect4 = null): Vect4 {
            if (!dest) dest = this;

            let len = this.x * this.x + this.y * this.y +
                this.z * this.z + this.w * this.w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                dest.x = this.x * len;
                dest.y = this.y * len;
                dest.z = this.z * len;
                dest.w = this.w * len;
            }

            return dest;
        };
        /**
         * Calculate the dot product of two Vect4´s
         * @param  {Vect4}  v  First Vect4 operand
         * @param  {Vect4}  v2 Second Vect4 operand
         * @return {number} a new Vect4
         */
        static dot(v: Vect4, v2: Vect4): number {
            const
                x = v.x,
                y = v.y,
                z = v.z,
                w = v.w;

            const
                x2 = v2.x,
                y2 = v2.y,
                z2 = v2.z,
                w2 = v2.w;

            return (x * x2 + y * y2 + z * z2 + w * w2);
        };
        /**
         * Return a string representation of Vect4
         * @return {String} String representation of Vect4
         */
        public toString = () : string => {
            return `Vect4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
        };
        /**
         * Get internal values of Vect4
         * @return {Float32Array} Interval Vect4 values
         */
        get value(): Float32Array {
            return this._value;
        };
        /**
         * Return x component of Vect2
         * @return {number} First component of Vect2
         */
        get x(): number { return this._value[0]; }
        /**
         * Return y component of Vect2
         * @return {number} Second component of Vect2
         */
        get y(): number { return this._value[1]; }
        /**
         * Return z component of Vect2
         * @return {number} Third component of Vect2
         */
        get z(): number { return this._value[2]; }
        /**
         * Return w component of Vect2
         * @return {number} Fourth component of Vect2
         */
        get w(): number { return this._value[3]; }
        /**
         * Set x component of Vect2
         * @param {number} value New first component value
         */
        set x(value: number) {
            this._value[0] = value;
        }
        /**
         * Set y component of Vect2
         * @param {number} value New second component value
         */
        set y(value: number) {
            this._value[1] = value;
        }
        /**
         * Set z component of Vect2
         * @param {number} value New third component value
         */
        set z(value: number) {
            this._value[2] = value;
        }
        /**
         * Set w component of Vect2
         * @param {number} value New fourth component value
         */
        set w(value: number) {
            this._value[3] = value;
        }
        /**
         * Returns whether or not current Vect4 and another Vect4 have exactly the same elements
         *     in the same position.
         * @param  {Vect4}   other The second vector
         * @return {boolean} True if the vectors are equals, false otherwise
         */
        public exactEquals(other: Vect4): boolean {
            return this.x === other.x && this.y === other.y  && this.z === other.z  && this.w === other.w;
        }
        /**
         * Returns whether or not current Vect4 and another Vect4 have approximately the same elements
         *     in the same position.
         * @param  {Vect4}   other The second vector
         * @param  {boolean} Enable or disable threshold epsilon in values comparison
         * @return {boolean} True if the vectors are equals, false otherwise
         */
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
        /**
         * Adds two Vect4´s
         * @param  {Vect4}    v  First Vect4 operand
         * @param  {Vect4}    v2 Second Vect4 operand
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {number} a new Vect4
         */
        static add(v: Vect4, v2: Vect4, dest: Vect4 = null): Vect4 {
            if (!dest) dest = new Vect4();

            dest.x = v.x + v2.x;
            dest.y = v.y + v2.y;
            dest.z = v.z + v2.z;
            dest.w = v.w + v2.w;

            return dest;
        };
        /**
         * Subtracts two Vect4´s
         * @param  {Vect4}    v  First Vect4 operand
         * @param  {Vect4}    v2 Second Vect4 operand
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {number} a new Vect4
         */
        static sub(v: Vect4, v2: Vect4, dest: Vect4 = null): Vect4 {
            if (!dest) dest = new Vect4();

            dest.x = v.x - v2.x;
            dest.y = v.y - v2.y;
            dest.z = v.z - v2.z;
            dest.w = v.w - v2.w;

            return dest;
        };
        /**
         * Multiplies two Vect4´s
         * @param  {Vect4}    v  First Vect4 operand
         * @param  {Vect4}    v2 Second Vect4 operand
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {number} a new Vect4
         */
        static mult(v: Vect4, v2: Vect4, dest: Vect4 = null): Vect4 {
            if (!dest) dest = new Vect4();

            dest.x = v.x * v2.x;
            dest.y = v.y * v2.y;
            dest.z = v.z * v2.z;
            dest.w = v.w * v2.w;

            return dest;
        };
        /**
         * Divides two Vect4´s
         * @param  {Vect4}    v  First Vect4 operand
         * @param  {Vect4}    v2 Second Vect4 operand
         * @param  {Vect4 = null} dest Destiny Vect4 (optional)
         * @return {number} a new Vect4
         */
        static div(v: Vect4, v2: Vect4, dest: Vect4 = null): Vect4 {
            if (!dest) dest = new Vect4();

            dest.x = v.x / v2.x;
            dest.y = v.y / v2.y;
            dest.z = v.z / v2.z;
            dest.w = v.w / v2.w;

            return dest;
        };
    };
};
