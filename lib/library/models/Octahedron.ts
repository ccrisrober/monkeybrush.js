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
 * Octahedron class
 * @class Octahedron
 */
class Octahedron extends Drawable {
    /**
     * Teapot constructor
     */
    constructor(radius: number, subdivisions: number) {
        super();
        /*super({
            vertices: [1, 0, 0,   - 1, 0, 0,    0, 1, 0,    0, - 1, 0,    0, 0, 1,    0, 0, - 1],
            indices: [0, 2, 4,    0, 4, 3,    0, 3, 5,    0, 5, 2,    1, 2, 5,    1, 5, 3,    1, 3, 4,    1, 4, 2]
        });*/

        let verts = [1, 0, 0,   - 1, 0, 0,    0, 1, 0,    0, - 1, 0,    0, 0, 1,    0, 0, - 1];
        // let norms = new Array();
        // let tex = new Array();
        let el = [0, 2, 4,    0, 4, 3,    0, 3, 5,    0, 5, 2,    1, 2, 5,    1, 5, 3,    1, 3, 4,    1, 4, 2];

        /*// Normalize
        for (let i = 0, size = verts.length; i < size; i += 3) {
            let mod = Math.sqrt(verts[i] * verts[i] + verts[i + 1] * verts[i + 1] +
                verts[i + 2] * verts[i + 2]);
            let nX = verts[i] / mod;
            let nY = verts[i + 1] / mod;
            let nZ = verts[i + 2] / mod;
            norms.push(nX, nY, nZ);
            tex.push(Math.atan2(nX, nZ), Math.acos(nY));
            verts[i] *= radius / mod;
            verts[i + 1] *= radius / mod;
            verts[i + 2] *= radius / mod;
        }

        let pointsCache = {};

        function midPoint(A: number, B: number) {
            let key = el[A] < el[B] ? el[A] + ":" + el[B] : el[B] + ":" + el[A];
            let r = pointsCache[key];
            if (r) {
                return r;
            }
            let index = verts.length / 3;
            verts.push((verts[el[A] * 3] + verts[el[B] * 3]) * 0.5,
                        (verts[el[A] * 3 + 1] + verts[el[B] * 3 + 1]) * 0.5,
                        (verts[el[A] * 3 + 2] + verts[el[B] * 3 + 2]) * 0.5);

            let mod = Math.sqrt(verts[index * 3] *
                verts[index * 3] + verts[index * 3 + 1] *
                verts[index * 3 + 1] + verts[index * 3 + 2] * verts[index * 3 + 2]);
            let nX = verts[index * 3] / mod;
            let nY = verts[index * 3 + 1] / mod;
            let nZ = verts[index * 3 + 2] / mod;
            norms.push(nX, nY, nZ);
            tex.push((Math.atan2(nX, nZ) / Math.PI) * 0.5,
                (Math.acos(nY) / Math.PI));
            verts[index * 3] *= radius / mod;
            verts[index * 3 + 1] *= radius / mod;
            verts[index * 3 + 2] *= radius / mod;

            pointsCache[key] = index;
            return index;
        }

        // Regenerate indices
        for (let ir = 0; ir < subdivisions; ++ir) {
            let new_el = [];
            for (let i = 0, size = el.length; i < size; i += 3) {
                let midA = midPoint(i, i + 1);
                let midB = midPoint(i + 1, i + 2);
                let midC = midPoint(i + 2, i);
                new_el.push(el[i], midA, midC);
                new_el.push(el[i + 1], midB, midA);
                new_el.push(el[i + 2], midC, midB);
                new_el.push(midA, midB, midC);
            }
            el = new_el;
        }*/

        this._handle = [];
        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(verts), 3);
        // this.addBufferArray(1, new Float32Array(norms), 3);
        // this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    };
};

export { Octahedron };
