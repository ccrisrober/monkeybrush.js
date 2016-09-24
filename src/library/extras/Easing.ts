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

namespace MBX {
    /**
     * Easing namespace
     * @namespace Easing
     */
    export namespace Easing {
        const PI_2 = Math.PI / 2.0;
        // Sine functions
        export namespace sine {
            /**
             * Easing equation for a sinusoidal (sin(t)) ease-in,
             * accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                return Math.sin(PI_2 * t);
            };
            /**
             * Easing equation for a sinusoidal (sin(t)) ease-out,
             *     decelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                return 1.0 + Math.sin(PI_2 * (--t));
            };
            /**
             * Easing equation for a sinusoidal (sin(t)) ease-in/out,
             *     accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                return 0.5 * (1.0 + Math.sin(Math.PI * (t - 0.5)));
            };
        };

        // Quad functions
        export namespace quad {
            /**
             * Easing equation for a quadratic (t^2) ease-in,
             *     accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                return t * t;
            };
            /**
             * Easing equation for a quadratic (t^2) ease-out,
             *     decelerating to zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                return t * (2.0 - t);
            };
            /**
             * Easing equation for a quadratic (t^2) ease-in/out,
             *     accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */

            export function easeInOut(t: number): number {
                return t < 0.5 ? 2.0 * t * t : t * (4.0 - 2.0 * t) - 1;
            };
        };

        // Cubic functions
        export namespace cubic {
            /**
             * Easing equation function for a cubic (t^3) ease-in,
             *     accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                return t * t * t;
            };
            /**
             * Easing equation for a cubic (t^3) ease-out,
             * decelerating to zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                return 1 + (--t) * t * t;
            };
            /**
             * Easing equation for a cubic (t^3) ease-in/out,
             *     accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                return t < 0.5 ? 4.0 * t * t * t : 1.0 + (--t) *
                        (2.0 * (--t)) * (2.0 * t);
            };
        };

        // Quart functions
        export namespace quart {
            /**
             * Easing equation for a quartic (t^4) ease-in,
             * accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                t *= t;
                return t * t;
            };
            /**
             * Easing equation for a quartic (t^4) ease-out,
             *     decelerating to zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                t = (--t) * t;
                return 1.0 - t * t;
            };
            /**
             * Easing equation for a quartic (t^4) ease-in/out,
             * accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                if (t < 0.5) {
                    t *= t;
                    return 8.0 * t * t;
                } else {
                    t = (--t) * t;
                    return 1.0 - 8.0 * t * t;
                }
            };
        };

        // Quint functions
        export namespace quint {
            /**
             * Easing equation function for a quintic (t^5) ease-in,
             *     accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                const t2: number = t * t;
                return t * t2 * t2;
            };
            /**
             * Easing equation for a quintic (t^5) ease-out,
             *     decelerating to zero velocity..
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                const t2: number = (--t) * t;
                return 1.0 + t * t2 * t2;
            };
            /**
             * Easing equation for a quintic (t^5) ease-in/out,
             *     accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                let t2: number;
                if (t < 0.5) {
                    t2 = t * t;
                    return 16.0 * t * t2 * t2;
                } else {
                    t2 = (--t) * t;
                    return 1 + 16 * t * t2 * t2;
                }
            };
        };

        // Expo functions
        export namespace expo {
            /**
             * Easing equation for an exponential (2^t) ease-in,
             *     accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                return (Math.pow(2.0, 8.0 * t) - 1.0) / 255.0;
            };
            /**
             * Easing equation for an exponential (2^t) ease-out,
             *     decelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                return 1 - Math.pow(2.0, -8.0 * t);
            };
            /**
             * Easing equation for an exponential (2^t) ease-in/out,
             *     accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                if (t < 0.5) {
                    return (Math.pow(2.0, 16.0 * t) - 1.0) / 510.0;
                } else {
                    return 1.0 - 0.5 * Math.pow(2.0, -16.0 * (t - 0.5));
                }
            };
        };

        // Circ functions
        export namespace circ {
            /**
             * Easing equation for a circular (sqrt(1-t^2)) ease-in,
             *     accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                return 1.0 - Math.sqrt(1.0 - t);
            };
            /**
             * Easing equation for a circular (sqrt(1-t^2)) ease-out,
             *     decelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                return Math.sqrt(t);
            };
            /**
             * Easing equation for a circular (sqrt(1-t^2)) ease-in/out,
             *     accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                if (t < 0.5) {
                    return (1.0 - Math.sqrt(1.0 - 2.0 * t)) * 0.5;
                } else {
                    return (1.0 + Math.sqrt(2.0 * t - 1.0)) * 0.5;
                }
            };
        };

        // Back functions
        export namespace back {
            /**
             * Easing equation for a back (overshooting cubic easing:
             *     (s+1)*t^3 - s*t^2) ease-in, accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                return t * t * (2.70158 * t - 1.70158);
            };
            /**
             * Easing equation for a back (overshooting cubic easing:
             *     (s+1)*t^3 - s*t^2) ease-out, decelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                return 1.0 + (--t) * t * (2.70158 * t + 1.70158);
            };
            /**
             *  Easing equation for a back (overshooting cubic easing:
             *      (s+1)*t^3 - s*t^2) ease-in/out, accelerating until halfway,
             *      then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                if (t < 0.5) {
                    return t * t * (7.0 * t - 2.5) * 2.0;
                } else {
                    return 1.0 + (--t) * t * 2.0 * (7.0 * t + 2.5);
                }
            };
        };

        // Elastic functions
        export namespace elastic {
            /**
             * Easing equation for an elastic (exponentially decaying
             *     sine wave) ease-in, accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                const t2: number = t * t;
                return t2 * t2 * Math.sin(t * Math.PI * 4.5);
            };
            /**
             * Easing equation for an elastic (exponentially decaying
             *     sine wave) ease-out, decelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                const t2: number = (t - 1.0) * (t - 1.0);
                return 1.0 - t2 * t2 * Math.cos(t * Math.PI * 4.5);
            };
            /**
             * Easing equation for an elastic (exponentially decaying
             *     sine wave) ease-out/in, decelerating until halfway,
             *     then accelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                let t2: number;
                if (t < 0.45) {
                    t2 = t * t;
                    return 8.0 * t2 * t2 * Math.sin(t * Math.PI * 9.0);
                } else if (t < 0.55) {
                    return 0.5 + 0.75 * Math.sin(t * Math.PI * 4.0);
                } else {
                    t2 = (t - 1.0) * (t - 1.0);
                    return 1.0 - 8.0 * t2 * t2 * Math.sin(t * Math.PI * 9.0);
                }
            };
        };

        // Bounce functions
        export namespace bounce {
            /**
             * Easing equation for a bounce (exponentially decaying parabolic
             *     bounce) ease-in, accelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeIn(t: number): number {
                return Math.pow(2.0, 6.0 * (t - 1.0)) * Math.abs(Math.sin(t * Math.PI * 3.5));
            };
            /**
             * Easing equation for a bounce (exponentially decaying parabolic
             *     bounce) ease-out, decelerating from zero velocity.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeOut(t: number): number {
                return 1.0 - Math.pow(2.0, -6.0 * t) * Math.abs(Math.cos(t * Math.PI * 3.5));
            };
            /**
             * Easing equation for a bounce (exponentially decaying parabolic
             *     bounce) ease-in/out, accelerating until halfway, then decelerating.
             * @param  {number} t Time
             * @return {number}
             */
            export function easeInOut(t: number): number {
                if (t < 0.5) {
                    return 8.0 * Math.pow(2.0, 8.0 * (t - 1.0)) * Math.abs(Math.sin(t * Math.PI * 7.0));
                } else {
                    return 1.0 - 8.0 * Math.pow(2.0, -8.0 * t) * Math.abs(Math.sin(t * Math.PI * 7.0));
                }
            };
        };
    };
};
