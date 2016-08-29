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

"use strict";

/**
 * Quaternion class
 * @class Quaternion
 */
class Quaternion {
    protected _value: Float32Array;

    get x(): number { return this._value[0]; };
    get y(): number { return this._value[1]; };
    get z(): number { return this._value[2]; };
    get w(): number { return this._value[3]; };
    set x(v: number) { this._value[0] = v; };
    set y(v: number) { this._value[1] = v; };
    set z(v: number) { this._value[2] = v; };
    set w(v: number) { this._value[3] = v; };

    static create(values: Float32Array): Quaternion {
        return new Quaternion(values[0], values[1], values[2], values[3]);
    };

    public reset() {
        for (let i = 0; i < 4; ++i) {
            this._value[i] = 0.0;
        }
    }

    /**
     * Creates a new quaternion
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 0.0) {
        this._value = quat.fromValues(x, y, z, w);
    }
    /**
     * Set quaternion value to identity
     */
    public setIdentity(): Quaternion {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

        return this;
    }
    public add(q: Quaternion) : Quaternion {
        for (let i = 0; i < 4; ++i) {
            this._value[i] += q._value[i];
        }
        return this;
    }
    public rem(q: Quaternion) : Quaternion {
        for (let i = 0; i < 4; ++i) {
            this._value[i] -= q._value[i];
        }
        return this;
    }
    static add(q: Quaternion, q2: Quaternion, dest: Quaternion = null) : Quaternion {
        if (!dest) dest = new Quaternion();

        dest.x = q.x + q2.x;
        dest.y = q.y + q2.y;
        dest.z = q.z + q2.z;
        dest.w = q.w + q2.w;

        return dest;
    }
    static rem(q: Quaternion, q2: Quaternion, dest: Quaternion = null) : Quaternion {
        if (!dest) dest = new Quaternion();

        dest.x = q.x - q2.x;
        dest.y = q.y - q2.y;
        dest.z = q.z - q2.z;
        dest.w = q.w - q2.w;

        return dest;
    }
    public roll(): number {
        var x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;

        return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
    }
    public pitch(): number {
        var x = this.x,
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
     * @return {Quaternion}
     */
    public clone(): Quaternion {
        return new Quaternion(
            this._value[0],
            this._value[1],
            this._value[2],
            this._value[3]
        );
    }
    /**
     * Calculate dot product with another quaternion
     */
    static dot(q1: Quaternion, q2: Quaternion): number {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
    }
    /**
     * Calculate multiplication with another quaternion
     */
    public mult(q: Quaternion): Quaternion {
        var q1x = this._value[0],
            q1y = this._value[1],
            q1z = this._value[2],
            q1w = this._value[3];

        var q2x = q.x,
            q2y = q.y,
            q2z = q.z,
            q2w = q.w;

        this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
        this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
        this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

        return this;
    }
    /**
     * Normalize quaternion
     */
    public normalize(dest: Quaternion = null): Quaternion {
        if (!dest) dest = this;

        var x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;

        var length = Math.sqrt(x * x + y * y + z * z + w * w);

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
    public inverse() : Quaternion {
        var dot = Quaternion.dot(this, this);

        if (!dot) {
            this.reset();

            return this;
        }

        var invDot = dot ? 1.0 / dot : 0;

        this.x *= -invDot;
        this.y *= -invDot;
        this.z *= -invDot;
        this.w *= invDot;

        return this;
    }
    conjugate(): Quaternion {
        this._value[0] = -this._value[0];
        this._value[1] = -this._value[1];
        this._value[2] = -this._value[2];

        return this;
    }
};

export { Quaternion };
