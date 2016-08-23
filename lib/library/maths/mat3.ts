/// <reference path="../../typings/gl-matrix.d.ts" />
/// <reference path="mat2.ts" />
/// <reference path="mat4.ts" />

import Mat2 from "./mat2";
import Mat4 from "./mat4";

"use strict";

/**
 * Mat3 class
 * @class Mat3
 */
class Mat3 {
    protected _value: Float32Array;
    constructor(v: Float32Array) {
        if (!v) {
            this._value = v;
        } else {
            this._value = mat3.create();
        }
    }
    public toString = () : string => {
        return mat3.str(this._value);
    }
    public toMat2(): Mat2 {
        const auxView = new Float32Array([
            this._value[0], this._value[1],
            this._value[3], this._value[4]
        ]);
        return new Mat2(auxView);
    }
    public toMat4(): Mat4 {
        const auxView = new Float32Array([
            this._value[0], this._value[1], this._value[2],         0.0,
            this._value[3], this._value[4], this._value[5],         0.0,
            this._value[6], this._value[7], this._value[8],         0.0,
                       0.0,            0.0,            0.0,         0.0
        ]);
        return new Mat4(auxView);
    }
};

export default Mat3;
