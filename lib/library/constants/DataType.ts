/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Data type
enum DataType {
    Byte = gl.BYTE,
    UByte = gl.UNSIGNED_BYTE,
    Short = gl.SHORT,
    UShort = gl.UNSIGNED_SHORT,
    Int = gl.INT,
    UInt = gl.UNSIGNED_INT,
    Float = gl.FLOAT
};

export default DataType;
