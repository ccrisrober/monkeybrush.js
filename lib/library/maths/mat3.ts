/// <reference path="../../typings/gl-matrix.d.ts" />
/// <reference path="vect2.ts" />
/// <reference path="mat2.ts" />
/// <reference path="mat4.ts" />

import Vect2 from "./vect2";
import mat2 from "./mat2";
import mat4 from "./mat4";

"use strict";

/**
 * Mat3 class
 * @class Mat3
 */
class Mat3 {
    protected _value: Float32Array = new Float32Array(9);
    constructor(values: number[] = null) {
        if (values) {
            this.init(values);
        }
    };
    init(values: number[]): Mat3 {
        for (let i = 0; i < 9; ++i) {
            this._value[i] = values[i];
        }
        return this;
    };
    isEquals(mat: Mat3, threshold: boolean = false): boolean {
        for (let i = 0; i < 9; ++i) {
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
    transpose(): Mat3 {
        const t01 = this._value[1],
            t02 = this._value[2],
            t12 = this._value[5];

        this._value[1] = this._value[3];
        this._value[2] = this._value[6];
        this._value[3] = t01;
        this._value[5] = this._value[7];
        this._value[6] = t02;
        this._value[7] = t12;

        return this;
    };
    determinant(): number {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];

        const det01 = a22 * a11 - a12 * a21,
            det11 = -a22 * a10 + a12 * a20,
            det21 = a21 * a10 - a11 * a20;

        return a00 * det01 + a01 * det11 + a02 * det21;
    };
    invert(): Mat3 {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];

        const
            det01 = a22 * a11 - a12 * a21,
            det11 = -a22 * a10 + a12 * a20,
            det21 = a21 * a10 - a11 * a20;

        let det = a00 * det01 + a01 * det11 + a02 * det21;

        if (!det)
            return null;

        det = 1.0 / det;

        this._value[0] = det01 * det;
        this._value[1] = (-a22 * a01 + a02 * a21) * det;
        this._value[2] = (a12 * a01 - a02 * a11) * det;
        this._value[3] = det11 * det;
        this._value[4] = (a22 * a00 - a02 * a20) * det;
        this._value[5] = (-a12 * a00 + a02 * a10) * det;
        this._value[6] = det21 * det;
        this._value[7] = (-a21 * a00 + a01 * a20) * det;
        this._value[8] = (a11 * a00 - a01 * a10) * det;

        return this;
    };
    add(m: Mat3): Mat3 {
        for (let i = 0; i < 9; ++i) {
            this._value[i] += m._value[i];
        }
        return this;
    };
    sub(m: Mat3): Mat3 {
        for (let i = 0; i < 9; ++i) {
            this._value[i] -= m._value[i];
        }
        return this;
    };
    mult(m: Mat3): Mat3 {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];

        const
            b00 = this._value[0], b01 = this._value[1], b02 = this._value[2],
            b10 = this._value[3], b11 = this._value[4], b12 = this._value[5],
            b20 = this._value[6], b21 = this._value[7], b22 = this._value[8];

        this._value[0] = b00 * a00 + b01 * a10 + b02 * a20;
        this._value[1] = b00 * a01 + b01 * a11 + b02 * a21;
        this._value[2] = b00 * a02 + b01 * a12 + b02 * a22;

        this._value[3] = b10 * a00 + b11 * a10 + b12 * a20;
        this._value[4] = b10 * a01 + b11 * a11 + b12 * a21;
        this._value[5] = b10 * a02 + b11 * a12 + b12 * a22;

        this._value[6] = b20 * a00 + b21 * a10 + b22 * a20;
        this._value[7] = b20 * a01 + b21 * a11 + b22 * a21;
        this._value[8] = b20 * a02 + b21 * a12 + b22 * a22;

        return this;
    };
    identify(): Mat3 {
        this._value[0] = 1;
        this._value[1] = 0;
        this._value[2] = 0;

        this._value[3] = 0;
        this._value[4] = 1;
        this._value[5] = 0;

        this._value[6] = 0;
        this._value[7] = 0;
        this._value[8] = 1;

        return this;
    };
    toString(): string {
        return `Mat3(
            ${this._value[0]}, ${this._value[1]},  ${this._value[2]},
            ${this._value[3]}, ${this._value[4]},  ${this._value[5]},
            ${this._value[6]}, ${this._value[7]},  ${this._value[8]}
        )`;
    };
    translate(v: Vect2): Mat3 {
        const
            a00 = this._value[0], a01 = this._value[1], a02 = this._value[2],
            a10 = this._value[3], a11 = this._value[4], a12 = this._value[5],
            a20 = this._value[6], a21 = this._value[7], a22 = this._value[8],
            x = v[0], y = v[1];

        this._value[6] = x * a00 + y * a10 + a20;
        this._value[7] = x * a01 + y * a11 + a21;
        this._value[8] = x * a02 + y * a12 + a22;

        return this;
    };
    rotate(angle: number): Mat3 {
        return null;
    };
    scale(v: Vect2): Mat3 {
        const x = v[0], y = v[1];

        this._value[0] *= x;
        this._value[1] *= x;
        this._value[2] *= x;
        this._value[3] *= y;
        this._value[4] *= y;
        this._value[5] *= y;

        return this;
    };
};

export default Mat3;
