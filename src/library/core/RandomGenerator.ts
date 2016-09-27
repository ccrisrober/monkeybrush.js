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
// Code based in https://gist.github.com/banksean/300494

namespace MB {
    /**
     * RandomGenerator namespace
     * @namespace RandomGenerator
     *
     * Examples:
     *
     *     // Real random [0, 1) (Same interval as Math.random)
     *     - RandomGenerator.random();
     *     // [0, 4294967295]
     *     - RandomGenerator.randomInt();
     *     // [0,1]
     *     - RandomGenerator.randomIncl();
     *     // (0,1)
     *     - RandomGenerator.randomExcl();
     *     // [0,1) with 53-bit resolution
     *     - RandomGenerator.randomLong();
     *     // [0, 2147483647]
     *     - RandomGenerator.randomInt31();
     */
    export namespace RandomGenerator {
        const seed = new Date().getTime();

        // Period parameters
        const N: number = 624;
        const M: number = 397;
        const MATRIX_A: number = 0x9908b0df;   // constant vector a
        const UPPER_MASK: number = 0x80000000; // most significant w-r bits
        const LOWER_MASK: number = 0x7fffffff; // least significant r bits

        let mt: Array<number> = new Array(N); // the array for the state vector
        let mti: number = N + 1; // mti==N+1 means mt[N] is not initialized

        setSeed(seed);

        /**
         * Init RandomGenerator with custom seed
         * @param {number} seed New seed number generator
         */
        export function setSeed(seed: number) {
            mt[0] = seed >>> 0;
            for (mti = 1; mti < N; ++mti) {
                const s = mt[mti - 1] ^ (mt[mti - 1] >>> 30);
                mt[mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
                    (s & 0x0000ffff) * 1812433253) + mti;
                // See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier.
                // In the previous versions, MSBs of the seed affect
                // only MSBs of the array mt[].
                // 2002/01/09 modified by Makoto Matsumoto
                mt[mti] >>>= 0;
                // for >32 bit machines
            }
        };
        /**
         * Generates a random number on [0, 0xffffffff]-interval
         * @return {number}
         */
        export function randomInt(): number {
            let y;
            let mag01 = new Array(0x0, MATRIX_A);
            // mag01[x] = x * MATRIX_A  for x=0,1

            if (mti >= N) { // generate N words at one time
                let kk;

                if (mti === N + 1)  // if init_seed() has not been called,
                    this.init_seed(5489);  // a default initial seed is used

                for (kk = 0; kk < N - M; ++kk) {
                    y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
                    mt[kk] = mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1];
                }
                for (; kk < N - 1; ++kk) {
                    y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
                    mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1];
                }
                y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
                mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

                mti = 0;
            }

            y = mt[mti++];

            // Tempering
            y ^= (y >>> 11);
            y ^= (y << 7) & 0x9d2c5680;
            y ^= (y << 15) & 0xefc60000;
            y ^= (y >>> 18);

            return y >>> 0;
        };
        /**
         * Generates a random number on [0, 0x7fffffff]-interval
         * @return {number}
         */
        export function randomInt31(): number {
            return (randomInt() >>> 1);
        };
        /**
         * Generates a random number on [0, 1]-real-interval
         * @return {number}
         */
        export function randomIncl(): number {
            return randomInt() * (1.0 / 4294967295.0);
            // divided by 2^32-1
        }

        // generates a random number on [0,1)-real-interval
        export function random(): number {
            return randomInt() * (1.0 / 4294967296.0);
            // divided by 2^32
        };
        /**
         * Generates a random number on (0,1)-real-interval
         * @return {number}
         */
        export function randomExcl(): number {
            return (randomInt() + 0.5) * (1.0 / 4294967296.0);
            // divided by 2^32
        };
        /**
         * Generates a random number on [0,1) with 53-bit resolution
         * @return {number}
         */
        export function randomLong(): number {
            const a = randomInt() >>> 5,
                  b = randomInt() >>> 6;
            return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
        };
    };
};
