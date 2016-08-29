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
 * Vect3 class
 * @class Vect3
 */
class Vect3 {
    public _value: Float32Array;
    static create(value: Float32Array): Vect3 {
        return new Vect3(value[0], value[1], value[2]);
    };
    static xAxis = new Vect3(1.0, 0.0, 0.0);
    static yAxis = new Vect3(0.0, 1.0, 0.0);
    static zAxis = new Vect3(0.0, 0.0, 1.0);
    /**
     * Creates a new vect3
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this._value = new Float32Array([x, y, z]);
    };
    public toString = () : string => {
        return "NULL";
    };
    static scaleAndAdd(a: Vect3, b: Vect3, scale: number, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = a.x + (b.x * scale);
        dest.y = a.y + (b.y * scale);
        dest.z = a.z + (b.z * scale);

        return dest;
    }
    public reset(v: Vect3): Vect3 {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;
    }
    public add(v: Vect3): Vect3 {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    };
    public sub(v: Vect3): Vect3 {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
    };
    public mult(v: Vect3): Vect3 {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;

        return this;
    };
    public div(v: Vect3): Vect3 {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.y;

        return this;
    };
    public negate(dest: Vect3 = null): Vect3 {
        if (!dest) dest = this;

        dest.x = -this.x;
        dest.y = -this.y;
        dest.z = -this.z;

        return dest;
    }
    public scale(value: number, dest: Vect3 = null): Vect3 {
        if (!dest) dest = this;

        dest.x *= value;
        dest.y *= value;
        dest.z *= value;

        return dest;
    }
    static distance(v: Vect3, v2: Vect3): number {
        var x = v2.x - v.x,
            y = v2.y - v.y,
            z = v2.z - v.z;

        return Math.sqrt(this.squaredDistance(v, v2));
    }
    static squaredDistance(v: Vect3, v2: Vect3): number {
        var x = v2.x - v.x,
            y = v2.y - v.y,
            z = v2.z - v.z;

        return (x * x + y * y + z * z);
    }
    get x(): number { return this._value[0]; };
    get y(): number { return this._value[1]; };
    get z(): number { return this._value[2]; };
    set x(value: number) {
        this._value[0] = value;
    };
    set y(value: number) {
        this._value[1] = value;
    };
    set z(value: number) {
        this._value[2] = value;
    };
    static dot(v: Vect3, v2: Vect3): number {
        var x = v.x,
            y = v.y,
            z = v.z;

        var x2 = v2.x,
            y2 = v2.y,
            z2 = v2.z;

        return (x * x2 + y * y2 + z * z2);
    }
    public isEquals(vec: Vect3, threshold: boolean = false): boolean {
        for (let i = 0; i < 3; ++i) {
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
    public length(): number {
        return Math.sqrt(this.squaredLength());
    }
    public squaredLength(): number {
        var x = this.x,
            y = this.y,
            z = this.z;

        return (x * x + y * y + z * z);
    }
    public normalize(dest: Vect3 = null): Vect3 {
        if (!dest) dest = this;

        let length = this.length();

        if (length === 1) {
            return this;
        }

        if (length === 0) {
            dest.x = 0;
            dest.y = 0;
            dest.z = 0;

            return dest;
        }

        length = 1.0 / length;

        dest.x *= length;
        dest.y *= length;
        dest.z *= length;

        return dest;
    };
    static cross(v: Vect3, v2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        const
            x = v.x,
            y = v.y,
            z = v.z;

        const
            x2 = v2.x,
            y2 = v2.y,
            z2 = v2.z;

        dest.x = y * z2 - z * y2;
        dest.y = z * x2 - x * z2;
        dest.z = x * y2 - y * x2;

        return dest;
    };
    static sum(v: Vect3, v2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = v.x + v2.x;
        dest.y = v.y + v2.y;
        dest.z = v.z + v2.z;

        return dest;
    };

    static rem(v: Vect3, v2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = v.x - v2.x;
        dest.y = v.y - v2.y;
        dest.z = v.z - v2.z;

        return dest;
    }

    static diff(v: Vect3, v2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = v.x - v2.x;
        dest.y = v.y - v2.y;
        dest.z = v.z - v2.z;

        return dest;
    }

    static mult(v: Vect3, v2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = v.x * v2.x;
        dest.y = v.y * v2.y;
        dest.z = v.z * v2.z;

        return dest;
    }

    static div(v: Vect3, v2: Vect3, dest: Vect3 = null): Vect3 {
        if (!dest) dest = new Vect3();

        dest.x = v.x / v2.x;
        dest.y = v.y / v2.y;
        dest.z = v.z / v2.z;

        return dest;
    }
};

export { Vect3 };
