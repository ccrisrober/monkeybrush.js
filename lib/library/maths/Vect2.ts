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
    protected _value: Float32Array;
    /**
     * Vect2 constructor
     * @param {number = 0.0} x First component
     * @param {number = 0.0} y Second component
     */
    constructor(x: number = 0.0, y: number = 0.0) {
        this._value = new Float32Array([x, y]);
    };
    /**
     * Create a new Vect2 initialized with the given values
     * @param  {ArrayLike<number>} values Array of values (minLength 2)
     * @return {Vect2} a new Vect2
     */
    static create(values: ArrayLike<number>): Vect2 {
        return new Vect2(values[0], values[1]);
    };
    /**
     * Create a new Vect2 initialized with the given value.
     * All Vect2 component set with same value.
     * @param  {number} value Simple value
     * @return {Vect2} a new Vect2
     */
    static createFromScalar(value: number): Vect2 {
        return new Vect2(value, value);
    };
    /**
     * Create a new Vect2 initialized with values from current Vect2
     * @return {Vect2} a new Vect2
     */
    public clone(): Vect2 {
        return new Vect2(this.x, this.y);
    };
    /**
     * Adds current Vect2 with another Vect2
     * @param  {Vect2} v Second vector
     * @return {Vect2} a new Vect2
     */
    public add(v: Vect2): Vect2 {
        this.x += v.x;
        this.y += v.y;

        return this;
    };
    /**
     * Substracts current Vect2 with another Vect2
     * @param  {Vect2} v Second vector
     * @return {Vect2} a new Vect2
     */
    public sub(v: Vect2): Vect2 {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    };
    /**
     * Multiplies current Vect2 with another Vect2
     * @param  {Vect2} v Second vector
     * @return {Vect2} a new Vect2
     */
    public mult(v: Vect2): Vect2 {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    };
    /**
     * Divides current Vect2 with another Vect2
     * @param  {Vect2} v Second vector
     * @return {Vect2} a new Vect2
     */
    public div(v: Vect2): Vect2 {
        this.x /= v.x;
        this.y /= v.y;

        return this;
    };
    /**
     * Scales a Vect2 by a scalar number
     * @param  {number} value Amount to scale the vector by
     * @param  {Vect2 = null} dest Destiny Vect2 (optional)
     * @return {Vect2} a new Vect2
     */
    public scale(value: number, dest: Vect2 = null): Vect2 {
        if (!dest) dest = this;

        dest.x *= value;
        dest.y *= value;

        return dest;
    };
    /**
     * Add two Vect2 after scaling the Vect2 given by a scalar value
     * @param  {Vect2} v Second vector
     * @param  {number} scale Amount to scale v by before adding
     * @param  {Vect2 = null} dest Destiny Vect2 (optional)
     * @return {Vect2} a new Vect2
     */
    public scaleAndAdd(v: Vect2, scale: number, dest: Vect2 = null): Vect2 {
        if (!dest) dest = this;

        dest.x = this.x + (v.x * scale);
        dest.y = this.y + (v.y * scale);

        return dest;
    };
    /**
     * Calculate the euclidian distance between two Vect2s
     * @param  {Vect2}  v First Vect2 operand
     * @param  {Vect2}  v2 Second Vect2 operand
     * @return {number} Distance between Vect2s
     */
    static distance(v: Vect2, v2: Vect2): number {
        return Math.sqrt(this.squaredDistance(v, v2));
    };
    /**
     * Calculate the squared euclidian distance between two Vect2s
     * @param  {Vect2}  v First Vect2 operand
     * @param  {Vect2}  v2 Second Vect2 operand
     * @return {number} Distance between Vect2s
     */
    static squaredDistance(v: Vect2, v2: Vect2): number {
        const
            x = v2.x - v.x,
            y = v2.y - v.y;

        return (x * x + y * y);
    };
    /**
     * Negates the components of current Vect2
     * @param  {Vect2 = null} dest Destiny Vect2 (optional)
     * @return {Vect2} a new Vect2
     */
    public negate(dest: Vect2 = null): Vect2 {
        if (!dest) dest = this;

        dest.x = -this.x;
        dest.y = -this.y;

        return dest;
    };
    /**
     * Inverse of the components of current Vect2
     * @param  {Vect2 = null} dest Destiny Vect2 (optional)
     * @return {Vect2} a new Vect2
     */
    public inverse(dest: Vect2 = null): Vect2 {
        if (!dest) dest = this;

        dest.x = 1 / this.x;
        dest.y = 1 / this.y;

        return dest;
    };
    /**
     * Normalize current Vect2
     * @param  {Vect2 = null} dest Destiny Vect2 (optional)
     * @return {Vect2} a new Vect2
     */
    public normalize(dest: Vect2 = null): Vect2 {
        if (!dest) dest = this;

        let len = this.x * this.x + this.y * this.y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            dest.x = this.x * len;
            dest.y = this.y * len;
        }

        return dest;
    };
    /**
     * Calculate the dot product of two Vect2´s
     * @param  {Vect2}  v  First Vect2 operand
     * @param  {Vect2}  v2 Second Vect2 operand
     * @return {number} a new Vect2
     */
    public static dot(v: Vect2, v2: Vect2): number {
        return (v.x * v2.x + v.y * v2.y);
    };
    /**
     * Return a string representation of Vect2
     * @return {String} String representation of Vect2
     */
    public toString = () : string => {
        return `Vect2(${this.x}, ${this.y})`;
    };
    /**
     * Get internal values of Vect2
     * @return {Float32Array} Interval Vect2 values
     */
    get value(): Float32Array {
        return this._value;
    };
    /**
     * Return x component of Vect2
     * @return {number} First component of Vect2
     */
    get x(): number { return this._value[0]; };
    /**
     * Return y component of Vect2
     * @return {number} Second component of Vect2
     */
    get y(): number { return this._value[1]; };
    /**
     * Set x component of Vect2
     * @param {number} value New first component value
     */
    set x(value: number) {
        this._value[0] = value;
    };
    /**
     * Set y component of Vect2
     * @param {number} value New second component value
     */
    set y(value: number) {
        this._value[1] = value;
    };
    /**
     * Returns whether or not current Vect2 and another Vect2 have exactly the same elements in the same position
     * @param  {Vect2}   other The second vector
     * @return {boolean} True if the vectors are equals, false otherwise
     */
    public exactEquals(other: Vect2): boolean {
        return this.x === other.x && this.y === other.y;
    }
    /**
     * Returns whether or not current Vect2 and another Vect2 have approximately the same elements in the same position.
     * @param  {Vect2}   other The second vector
     * @param  {boolean} Enable or disable threshold epsilon in values comparison
     * @return {boolean} True if the vectors are equals, false otherwise
     */
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
