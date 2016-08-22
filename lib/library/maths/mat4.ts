/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";

/**
 * Mat4 class
 * @class Mat4
 */
class Mat4 {
    protected _value: Float32Array;
    constructor() {
        this._value = mat4.create();
    }
    public toString = () : string => {
        return mat4.str(this._value);
    }
}