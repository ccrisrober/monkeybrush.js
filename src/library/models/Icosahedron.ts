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
// Code based on: http://bLog.andreaskahler.com/2009/06/creating-icosphere-mesh-in-code.html

namespace MB {
    /**
     * Icosahedron class
     * @class Icosahedron
     */
    export class Icosahedron extends Polyhedron {
        /**
         * Icosahedron constructor
         * @param {number} radius: Icosahedron radius
         * @param {number} subdivisions: Icosahedron subdivisions from base icosphere
         */
        constructor(radius: number = 1.0, subdivisions: number = 1) {
            // TODO: subdivisions = Math.trunc(subdivisions);
            subdivisions = Math.floor(subdivisions);
            if (subdivisions > 10) {
                MB.Log.warn("Please, don´t use more than 8 subdivisions");
                return;
            }

            const t = (1 + Math.sqrt(5)) / 2;

            let verts = [
                -1,  t,  0,
                 1,  t,  0,
                -1, -t,  0,
                 1, -t,  0,

                 0, -1,  t,
                 0,  1,  t,
                 0, -1, -t,
                 0,  1, -t,

                 t,  0, -1,
                 t,  0,  1,
                -t,  0, -1,
                -t,  0,  1
            ];
            let el = [
                 0, 11,  5,
                 0,  5,  1,
                 0,  1,  7,
                 0,  7, 10,
                 0, 10, 11,
                 1,  5,  9,
                 5, 11,  4,
                11, 10,  2,
                10,  7,  6,
                 7,  1,  8,
                 3,  9,  4,
                 3,  4,  2,
                 3,  2,  6,
                 3,  6,  8,
                 3,  8,  9,
                 4,  9,  5,
                 2,  4, 11,
                 6,  2, 10,
                 8,  6,  7,
                 9,  8,  1
            ];
            console.log(subdivisions);
            super(verts, el, radius, subdivisions);
        };
    };
};
