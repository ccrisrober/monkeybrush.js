/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";

/**
 * Mat2 class
 * @class Mat2
 */
class Mat2 {
    protected _value: Float32Array;
    constructor() {
        this._value = mat2 .create();
    }
    public identity() {
        mat2.identity(this._value);
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
};

export default Mat2;