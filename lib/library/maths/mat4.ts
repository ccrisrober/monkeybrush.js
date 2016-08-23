/// <reference path="../../typings/gl-matrix.d.ts" />
/// <reference path="mat3.ts" />

import Mat3 from "./mat3"

"use strict";

/**
 * Mat4 class
 * @class Mat4
 */
class Mat4 {
    protected _value: Float32Array;
    constructor(v: Float32Array) {
    	if (!v) {
    		this._value = v;
    	} else {
        	this._value = mat4.create();
    	}
    }
    public toString = () : string => {
        return mat4.str(this._value);
    }
};

export default Mat4;