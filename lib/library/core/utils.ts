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


/// <reference path="core.ts" />

import Core from "./core.ts";

"use strict";

namespace utils {
    export function Uint8Concat(first, second) {
        var firstLength = first.length,
            result = new Uint8Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Uint16Concat(first, second) {
        var firstLength = first.length,
            result = new Uint16Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Uint32Concat(first, second) {
        var firstLength = first.length,
            result = new Uint32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };


    export function Int8Concat(first, second) {
        var firstLength = first.length,
            result = new Int8Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Int16Concat(first, second) {
        var firstLength = first.length,
            result = new Int16Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Int32Concat(first, second) {
        var firstLength = first.length,
            result = new Int32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };

    export function Float32Concat(first, second) {
        var firstLength = first.length,
            result = new Float32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Float64Concat(first, second) {
        var firstLength = first.length,
            result = new Float64Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
};

export default utils;
