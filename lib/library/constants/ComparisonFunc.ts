/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


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

export default ComparisonFunc;
