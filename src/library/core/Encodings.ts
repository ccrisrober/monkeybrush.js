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

"use strict";

namespace MB {
    /**
     * Encodings namespace
     * @namespace Encodings
     */
    export namespace Encodings {
        export function RGBByte2Float(srcArr, srcOff, dstArr, dstOff) {
            const e = srcArr[srcOff + 3];
            const scale = Math.pow(2.0, e - 128.0) / 255.0;

            dstArr[dstOff + 0] = srcArr[srcOff + 0] * scale;
            dstArr[dstOff + 1] = srcArr[srcOff + 1] * scale;
            dstArr[dstOff + 2] = srcArr[srcOff + 2] * scale;
        };
        export function RGBByte2Half(srcArr, srcOff, dstArr, dstOff) {
            const e = srcArr[srcOff + 3];
            const scale = Math.pow(2.0, e - 128.0) / 255.0;

            dstArr[dstOff + 0] = toHalf(srcArr[srcOff + 0] * scale);
            dstArr[dstOff + 1] = toHalf(srcArr[srcOff + 1] * scale);
            dstArr[dstOff + 2] = toHalf(srcArr[srcOff + 2] * scale);
        };

        const floatView = new Float32Array(1);
        const int32View = new Int32Array(floatView.buffer);
        // http://gamedev.stackexchange.com/a/17410
        function toHalf(val: number): number {
            // val to int32_t
            floatView[0] = val;
            let x = int32View[0];

            let bits = (x >> 16) & 0x8000; // Get the sign
            let m = (x >> 12) & 0x07ff; // Keep one extra bit for rounding
            let e = (x >> 23) & 0xff; // Using int is faster here

            // If zero, or denormal, or exponent underflows too much for a denormal
            //     half, return signed zero.
            if (e < 103) {
                return bits;
            }

            // If NaN, return NaN. If Inf or exponent overflow, return Inf.
            if (e > 142) {
                bits |= 0x7c00;
                // If exponent was 0xff and one mantissa bit was set, it means NaN,
                //    not Inf, so make sure we set one mantissa bit too.
                bits |= ((e === 255) ? 0 : 1) && (x & 0x007fffff);
                return bits;
            }

            // If exponent underflows but not too much, return a denormal
            if (e < 113) {
                m |= 0x0800;
                // Extra rounding may overflow and set mantissa to 0 and exponent
                //     to 1, which is OK.
                bits |= (m >> (114 - e)) + ((m >> (113 - e)) & 1);
                return bits;
            }

            bits |= ((e - 112) << 10) | (m >> 1);
            // Extra rounding. An overflow will set mantissa to 0 and increment
            //     the exponent, which is OK.
            bits += m & 1;
            return bits;
        }
    };
};
