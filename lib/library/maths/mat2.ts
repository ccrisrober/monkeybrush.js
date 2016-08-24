/// <reference path="../../typings/gl-matrix.d.ts" />
/// <reference path="vect2.ts" />
/// <reference path="mat3.ts" />
/// <reference path="mat4.ts" />

import Vect2 from "./vect2";
import mat3 from "./mat3";
import mat4 from "./mat4";

"use strict";

/**
 * mat2 class
 * @class mat2
 */
class mat2 {
    protected _value: Float32Array = new Float32Array(4);
    constructor(values: number[] = null) {
        if(values) {
            this.init(values);
        }
    };
    init(values: number[]): mat2 {
        for (let i = 0; i < 4; ++i) {
            this._value[i] = values[i];
        }
        return this;
    };
    isEquals(mat: mat2, threshold: boolean = false): boolean {
        for (let i = 0; i < 4; ++i) {
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
    transpose(): mat2 {
        const t = this._value[1];

        this._value[1] = this._value[2];
        this._value[2] = t;

        return this;
    };
    determinant(): number {
        return this._value[0] * this._value[3] - this._value[2] * this._value[1];
    };
    invert(): mat2 {
        let det = this.determinant();

        if (!det)
            return null;

        this._value[0] = det * this._value[3];
        this._value[1] = det * -this._value[1];
        this._value[2] = det * -this._value[2];
        this._value[3] = det * this._value[0];

        return this;
    };
    add(m: mat2): mat2 {
        for (let i = 0; i < 4; ++i) {
            this._value[i] += m._value[i];
        }
        return this;
    }
    sub(m: mat2): mat2 {
        for (let i = 0; i < 4; ++i) {
            this._value[i] -= m._value[i];
        }
        return this;
    }
    mult(m: mat2): mat2 {
        const a11 = this._value[0],
            a12 = this._value[1],
            a21 = this._value[2],
            a22 = this._value[3];

        this._value[0] = a11 * this._value[0] + a12 * this._value[2];
        this._value[1] = a11 * this._value[1] + a12 * this._value[3];
        this._value[2] = a21 * this._value[0] + a22 * this._value[2];
        this._value[3] = a21 * this._value[1] + a22 * this._value[3];

        return this;
    };
    identity(): mat2 {
        this._value[0] = 1;
        this._value[1] = 0;
        this._value[2] = 0;
        this._value[3] = 1;

        return this;
    };
    toString(): string {
        return `mat2(
            ${this._value[0]}, ${this._value[1]},
            ${this._value[2]}, ${this._value[3]}
        )`;
    };
    rotate(angle: number): mat2 {
        const a11 = this._value[0],
            a12 = this._value[1],
            a21 = this._value[2],
            a22 = this._value[3],

            s = Math.sin(angle),
            c = Math.cos(angle);

        this._value[0] = a11 * c + a12 * s;
        this._value[1] = a11 * -s + a12 * c;
        this._value[2] = a21 * c + a22 * s;
        this._value[3] = a21 * -s + a22 * c;

        return this;
    };
    scale(v: Vect2): mat2 {
        const a11 = this._value[0],
            a12 = this._value[1],
            a21 = this._value[2],
            a22 = this._value[3];

        const x = v.value()[0],
            y = v.value()[1];

        this._value[0] = a11 * x;
        this._value[1] = a12 * y;
        this._value[2] = a21 * x;
        this._value[3] = a22 * y;

        return this;
    };
};

export default mat2;
