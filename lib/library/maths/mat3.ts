/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";

/**
 * Mat3 class
 * @class Mat3
 */
class Mat3 {
    protected _value: Float32Array;
    constructor() {
        this._value = mat3.create();
    }
    public toString = () : string => {
        return mat3.str(this._value);
    }
}