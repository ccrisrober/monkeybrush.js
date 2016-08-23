/// <reference path="../../typings/gl-matrix.d.ts" />
/// <reference path="vect2.ts" />
/// <reference path="mat3.ts" />
/// <reference path="mat4.ts" />

import Vect2 from "./vect2";
import Mat3 from "./mat3";
import Mat4 from "./mat4";

"use strict";

/**
 * Mat2 class
 * @class Mat2
 */
class Mat2 {
    protected _value: Float32Array;
    constructor(v: Float32Array) {
        if (!v) {
            this._value = v;
        } else {
            this._value = mat2.create();
        }
    }
    public identity() {
        mat2.identity(this._value);
    }
    public invert() {
        mat2.invert(this._value, this._value);
    }
    public transpose() {
        mat2.transpose(this._value, this._value);
    }
    public toString = () : string => {
        return mat2.str(this._value);
    }
    public isExactEqual(other: Mat2): boolean {
        return this._value[0] === this._value[0] &&
                this._value[1] === this._value[1] &&
                this._value[2] === this._value[2] &&
                this._value[3] === this._value[3];
    }
    public isEqual(other: Mat2): boolean {
        return false; // this.x == other.x && this.y == other.y;
    }
    public toMat3(): Mat3 {
        const auxView = new Float32Array([
            this._value[0], this._value[1],            0.0,
            this._value[3], this._value[4],            0.0,
                       0.0,            0.0,            0.0
        ]);
        return new Mat3(auxView);
    }
    public toMat4(): Mat4 {
        const auxView = new Float32Array([
            this._value[0], this._value[1],            0.0,         0.0,
            this._value[3], this._value[4],            0.0,         0.0,
                       0.0,            0.0,            0.0,         0.0,
                       0.0,            0.0,            0.0,         0.0
        ]);
        return new Mat4(auxView);
    }
    public add(m: Mat2) {
        for (let i = 0; i < 4; ++i) {
            this._value[i] += m._value[i];
        }
    }
    public sub(m: Mat2) {
        for (let i = 0; i < 4; ++i) {
            this._value[i] -= m._value[i];
        }
    }
    public mult(other: Mat2) {
        mat2.multiply(this._value, this._value, other._value);
    }
    public rotate(rad: number) {
        mat2.rotate(this._value, this._value, rad);
    }
    public scale(v: Vect2) {
        mat2.scale(this._value, this._value, v.value());
    }
};

export default Mat2;
