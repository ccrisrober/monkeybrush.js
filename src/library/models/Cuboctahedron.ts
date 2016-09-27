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
     * Cuboctahedron class
     * @class Cuboctahedron
     */
    export class Cuboctahedron extends Polyhedron {
        /**
         * Cuboctahedron constructor
         * @param {number} radius: Cuboctahedron radius
         * @param {number} subdivisions: Cuboctahedron subdivisions from base icosphere
         */
        // TODO: DOC
        constructor(context: GLContext, radius: number = 1.0, subdivisions: number = 1) {
            subdivisions = Math.floor(subdivisions);

            if (subdivisions > 10) {
                MB.Log.warn("Please, don´t use more than 8 subdivisions");
                return;
            }

            super(context, [
                 // Front
               -radius, -radius, radius,
                radius, -radius, radius,
                radius,  radius, radius,
               -radius,  radius, radius,
               // Right
                radius, -radius, radius,
                radius, -radius, -radius,
                radius,  radius, -radius,
                radius,  radius, radius,
               // Back
               -radius, -radius, -radius,
               -radius,  radius, -radius,
                radius,  radius, -radius,
                radius, -radius, -radius,
               // Left
               -radius, -radius, radius,
               -radius,  radius, radius,
               -radius,  radius, -radius,
               -radius, -radius, -radius,
               // Bottom
               -radius, -radius, radius,
               -radius, -radius, -radius,
                radius, -radius, -radius,
                radius, -radius, radius,
               // Top
               -radius,  radius, radius,
                radius,  radius, radius,
                radius,  radius, -radius,
               -radius,  radius, -radius
            ], [
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23
            ], radius, subdivisions);
        };
    };
};
