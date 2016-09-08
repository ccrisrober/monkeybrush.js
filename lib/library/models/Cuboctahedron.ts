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


import { Polyhedron } from "./Polyhedron";

"use strict";
// TODO: NO FUNCIONA
/**
 * Cuboctahedron class
 * @class Cuboctahedron
 */
class Cuboctahedron extends Polyhedron {
    /**
     * Cuboctahedron constructor
     */
    constructor(radius: number, subdivisions: number) {
        const t: number = ( 1 + Math.sqrt( 5 ) ) / 2;
        const r: number = 1 / t;

        let verts = [
            -2.0,  0.0,    0.0,
            -1.0, -1.0, -1.414,
            -1.0, -1.0,  1.414,
            -1.0,  1.0, -1.414,
            -1.0,  1.0,  1.414,
             0.0, -2.0,    0.0,
             0.0,  2.0,    0.0,
             1.0, -1.0, -1.414,
             1.0, -1.0,  1.414,
             1.0,  1.0, -1.414,
             1.0,  1.0,  1.414,
             2.0,  0.0,    0.0
        ];

        let el = [
             3,  9,  7,
             1,  2,  8,
            10,  4,  8,
             5,  7, 11,
             2,  0,  1,
             5,  4,  6,
             3,  0, 10,
            11,  9,  6,
            11, 10,  8,
             2,  4,  0,
             5,  8,  2,
             4, 10,  6,
             7,  9, 11,
             0,  3,  1,
             1,  7,  5,
             6,  9,  3
        ];


        super(verts, el, radius, subdivisions);
    };
};

export { Cuboctahedron };
