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
    export namespace models {
        /**
         * Octahedron class
         * @class Octahedron
         */
        export class Octahedron extends Polyhedron {
            /**
             * Octahedron constructor
             * @param {number} radius: Octahedron radius
             * @param {number} subdivisions: Octahedron subdivisions from base octahedron.
             */
            constructor(radius: number, subdivisions: number) {
                let verts = [
                     1,  0,  0,
                    -1,  0,  0,
                     0,  1,  0,
                     0, -1,  0,
                     0,  0,  1,
                     0,  0, -1];
                let el = [
                    0, 2, 4,
                    0, 4, 3,
                    0, 3, 5,
                    0, 5, 2,
                    1, 2, 5,
                    1, 5, 3,
                    1, 3, 4,
                    1, 4, 2
                ];


                super(verts, el, radius, subdivisions);
            };
        };
    };
};
