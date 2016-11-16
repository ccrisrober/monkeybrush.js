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
    // type InterpolationMode = "catmullRom" | "linear" | "bezier";
    export namespace Interpolation {
        // Code based on https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
        /**
         * Linear interpolation.
         * @param  {number} p0 [description]
         * @param  {number} p1 [description]
         * @param  {number} t  [description]
         * @return {number}    [description]
         */
        export function linear(p0: number, p1: number, t: number): number {
            return (p1 - p0) * t + p0;
        };
        /**
         * Bezier interpolation.
         * @param  {number} x1 [description]
         * @param  {number} y1 [description]
         * @param  {number} x2 [description]
         * @param  {number} y2 [description]
         * @param  {number} t  [description]
         * @return {number}    [description]
         */
        export function bezier(x1: number, y1: number, x2: number, y2: number, t: number): number {
            const f0 = 1 - 3 * x2 + 3 * x1;
            const f1 = 3 * x2 - 6 * x1;
            const f2 = 3 * x1;

            let rt = t;
            for (let i = 0; i < 5; ++i) {
                const rt2 = rt * rt;
                const rt3 = rt2 * rt;

                const x = f0 * rt3 + f1 * rt2 + f2 * rt;
                const slope = 1.0 / (3.0 * f0 * rt2 + 2.0 * f1 * rt + f2);
                rt -= (x - t) * slope;
                rt = Math.min(1, Math.max(0, rt));

            }

            // Resolve cubic bezier
            return 3 * Math.pow(1 - rt, 2) * rt * y1 +
                3 * (1 - rt) * Math.pow(rt, 2) * y2 +
                Math.pow(rt, 3);

        };
        /**
         * Catmull rom interpolation.
         * @param  {number} p0 [description]
         * @param  {number} p1 [description]
         * @param  {number} p2 [description]
         * @param  {number} p3 [description]
         * @param  {number} t  [description]
         * @return {number}    [description]
         */
        export function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
            const
                v0 = (p2 - p0) * 0.5,
                v1 = (p3 - p1) * 0.5,
                t2 = t * t,
                t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
                (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        };
    };
};
