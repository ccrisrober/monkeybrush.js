/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Comparison function
enum ComparisonFunc {
    Never = gl.NEVER,                       ///< Comparison always fails
    Always = gl.ALWAYS,                     ///< Comparison always succeeds
    Less = gl.LESS,                         ///< Passes if source is less than the destination
    Equal = gl.EQUAL,                       ///< Passes if source is equal to the destination
    NotEqual = gl.NOTEQUAL,                 ///< Passes if source is not equal to the destination
    LessEqual = gl.LEQUAL,                  ///< Passes if source is less than or equal to the destination
    Greater = gl.GREATER,                   ///< Passes if source is greater than to the destination
    GreaterEqual = gl.GEQUAL                ///< Passes if source is greater than or equal to the destination
};
console.log(ComparisonFunc);
export default ComparisonFunc;
