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


/// <reference path="drawable.ts" />

import { Drawable } from "./drawable";

"use strict";

/**
 * Icosphere class
 * @class Icosphere
 */
class Icosphere extends Drawable {
    /**
     * Icosphere constructor
     * @param {number} subdivisions: Disc base subdivison (num. of triangles)
     */
    /**
     * Icosphere constructor
     * @param {number} radius: [description]
     * @param {number} subdivisions: [description]
     */
    constructor(radius: number, subdivisions: number = 1) {
        super();

        subdivisions = Math.trunc(subdivisions);

        // create 12 vertices of a Icosahedron
        // let t = (1 + Math.sqrt(5)) / 2;

        let verts = [];
        /*    -1.0,  0.0,  0.0,
             0.0,  1.0,  0.0,

             0.0,  0.0, -1.0,
             0.0,  0.0,  1.0,

             0.0, -1.0,  0.0,
             1.0,  0.0,  0.0
        ];*/
        let norms = new Array();
        let tex = new Array();
        let el = [];
        /*    3, 4, 5,
            3, 5, 1,
            3, 1, 0,
            3, 0, 4,
            4, 0, 2,
            4, 2, 5,
            2, 0, 1,
            5, 2, 1
        ];*/


        this._handle = [];
        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(verts), 3);
        this.addBufferArray(1, new Float32Array(norms), 3);
        this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    }
};

export { Icosphere };
