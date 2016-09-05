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


import { Drawable } from "./Drawable";

"use strict";

/**
 * Quad class
 * @class Quad
 */
class Plane extends Drawable {
    /**
     * Plane constructor
     * @param {number} xsize: Width plane size
     * @param {number} zsize: Height plane size
     * @param {number} xdivs: Width plane subdivisions
     * @param {number} zdivs: Height plane subdivisions
     * @param {number = 1.0} smax: Width texCoord subdivision
     * @param {number = 1.0} tmax  Height texCoord subdivision
     */
    constructor(xsize: number, zsize: number, xdivs: number, zdivs: number,
        smax: number = 1.0, tmax: number = 1.0) {
        super();

        let verts = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let norms = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let el = new Array(6 * xdivs * zdivs);

        let x2 = xsize / 2.0;
        let z2 = zsize / 2.0;

        let iFactor = zsize / zdivs;
        let jFactor = xsize / xdivs;
        let texi = smax / zdivs;
        let texj = tmax / xdivs;
        let x, z;
        let vidx = 0, tidx = 0;
        for (let i = 0; i <= zdivs; ++i) {
            z = iFactor * i - z2;
            for (let j = 0; j <= xdivs; ++j) {
                x = jFactor * j - x2;
                verts[vidx] = x;
                verts[vidx + 1] = 0.0;
                verts[vidx + 2] = z;
                norms[vidx] = 0.0;
                norms[vidx + 1] = 1.0;
                norms[vidx + 2] = 0.0;
                vidx += 3;
                tex[tidx] = j * texi;
                tex[tidx + 1] = i * texj;
                tidx += 2;
            }
        }

        let rowStart, nextRowStart;
        let idx = 0;
        for (let i = 0; i < zdivs; ++i) {
            rowStart = i * (xdivs + 1);
            nextRowStart = (i + 1) * (xdivs + 1);
            for (let j = 0; j < xdivs; ++j) {
                el[idx] = rowStart + j;
                el[idx + 1] = nextRowStart + j;
                el[idx + 2] = nextRowStart + j + 1;
                el[idx + 3] = rowStart + j;
                el[idx + 4] = nextRowStart + j + 1;
                el[idx + 5] = rowStart + j + 1;
                idx += 6;
            }
        }

        /*
        WIREFRAME!!
        var newcells = []

        for (var i = 0; i < el.length; i+=3) {
            var a = el[i + 0];
            var b = el[i + 1];
            var c = el[i + 2];
            if (a !== null && b !== null) newcells.push(a, b);
            if (b !== null && c !== null) newcells.push(b, c);
            if (a !== null && c !== null) newcells.push(c, a);
        }

        el = newcells;*/

        this._handle = [];

        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(verts), 3);
        this.addBufferArray(1, new Float32Array(norms), 3);
        this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    }
};

export { Plane };
