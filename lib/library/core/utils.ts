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

namespace Utils {
    class RNG {
        private _seed: number;

        constructor(seed: number) {
            this._seed = seed;
        };
        private _next(min: number, max: number): number {
            max = max || 0;
            min = min || 0;

            this._seed = (this._seed * 9301 + 49297) % 233280;
            let rnd = this._seed / 233281;

            return min + rnd * (max - min);
        };
        public nextInt(min: number, max: number): number {
            return Math.floor(this._next(min, max));
        };
        public next(): number {
            return this._next(0, 1);
        };
    }

    export let random: RNG = new RNG(new Date().getTime());

    export function Uint8Concat(first: Uint8Array, second: Uint8Array): Uint8Array {
        let firstLength = first.length,
            result = new Uint8Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Uint16Concat(first: Uint16Array, second: Uint16Array): Uint16Array {
        let firstLength = first.length,
            result = new Uint16Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Uint32Concat(first: Uint32Array, second: Uint32Array): Uint32Array {
        let firstLength = first.length,
            result = new Uint32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };


    export function Int8Concat(first: Int8Array, second: Int8Array): Int8Array {
        let firstLength = first.length,
            result = new Int8Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Int16Concat(first: Int16Array, second: Int16Array): Int16Array {
        let firstLength = first.length,
            result = new Int16Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Int32Concat(first: Int32Array, second: Int32Array): Int32Array {
        let firstLength = first.length,
            result = new Int32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };

    export function Float32Concat(first: Float32Array, second: Float32Array): Float32Array {
        let firstLength = first.length,
            result = new Float32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };
    export function Float64Concat(first: Float64Array, second: Float64Array): Float64Array {
        let firstLength = first.length,
            result = new Float64Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    };

    export function lerp(x: number, x1: number, x2: number,
        q00: number, q01: number): number {
        return ((x2 - x) / (x2 - x1)) * q00 + ((x - x1) / (x2 - x1)) * q01;
    }

    export function biLerp(x: number, y: number, q11: number,
        q12: number, q21: number, q22: number, x1: number, x2: number,
        y1: number, y2: number): number {
        const r1 = lerp(x, x1, x2, q11, q21);
        const r2 = lerp(x, x1, x2, q12, q22);

        return lerp(y, y1, y2, r1, r2);
    }

    export function triLerp(x: number, y: number, z: number, q000: number,
        q001: number, q010: number, q011: number, q100: number, q101: number,
        q110: number, q111: number, x1: number, x2: number, y1: number, y2: number,
        z1: number, z2: number): number {
        const x00 = lerp(x, x1, x2, q000, q100);
        const x10 = lerp(x, x1, x2, q010, q110);
        const x01 = lerp(x, x1, x2, q001, q101);
        const x11 = lerp(x, x1, x2, q011, q111);
        const r0 = lerp(y, y1, y2, x00, x01);
        const r1 = lerp(y, y1, y2, x10, x11);

        return lerp(z, z1, z2, r0, r1);
    };

    export const Deg2Rad: number = Math.PI / 180;
    export const Rad2Deg: number = 180 / Math.PI;

    export function nearestPOT(v: number): number {
        return Math.pow(2, Math.round(Math.log(v) / Math.LN2));
    }
    export function degToRad ( degs ): number {
        return degs * this.Deg2Rad;
    }
    export function radToDeg ( rads ): number {
        return rads * this.Rad2Deg;
    }
    export function isPowerOfTwo ( v ): boolean {
        return (v & (v - 1)) === 0 && v !== 0;
    }
    export function clamp(v: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, v));
    }
    export function smoothstep(x: number, min: number, max: number): number {
        if (x <= min) return 0;
        if (x >= max) return 1;

        x = (x - min) / (max - min);

        return x * x * (3 - 2 * x);

    }
    export function smootherstep(x: number, min: number, max: number): number {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return Math.pow(x, 3) * (x * (x * 6 - 15) + 10);
    };
    // TODO: Not best solution ...
    // https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
    export function getConvexHull(points: number[][]): Array<any> {
        points.sort(function(a, b) {
            return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
        });

        function cross(o, a, b) {
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
        }

        let lower = [];
        for (let i = 0; i < points.length; i++) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
                lower.pop();
            }
            lower.push(points[i]);
        }

        let upper = [];
        for (let i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }

        upper.pop();
        lower.pop();
        return lower.concat(upper);
    }
};

export { Utils };
