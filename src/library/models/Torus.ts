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
     * Torus class
     * @class Torus
     */
    export class Torus extends Drawable {
        /**
         * Torus constructor
         * @param {number = 1.0} outerRadius: Outer ring radius
         * @param {number = 0.5} innerRadius: Inner ring radius
         * @param {number = 4}   sides: Number of sides
         * @param {number = 10}  rings: Number of rings
         */
        constructor(outerRadius: number = 1.0, innerRadius: number = 0.5,
            sides: number = 4, rings: number = 10) {
            super();
            let faces = sides * rings;
            let nVerts  = sides * (rings + 1);   // One extra ring to duplicate first ring

            let verts = new Array(3 * nVerts);
            let norms = new Array(3 * nVerts);
            let tex = new Array(2 * nVerts);
            let el = new Array(6 * faces);

            // Generate the vertex data

            let ringFactor = (Math.PI * 2.0) / rings;
            let sideFactor = (Math.PI * 2.0) / sides;
            let idx = 0, tidx = 0;
            for (let ring = 0; ring <= rings; ring++) {
                let u = ring * ringFactor;
                let cu = Math.cos(u);
                let su = Math.sin(u);
                for (let side = 0; side < sides; side++) {
                    let v = side * sideFactor;
                    let cv = Math.cos(v);
                    let sv = Math.sin(v);
                    let r = (outerRadius + innerRadius * cv);
                    verts[idx] = r * cu;
                    verts[idx + 1] = r * su;
                    verts[idx + 2] = innerRadius * sv;
                    norms[idx] = cv * cu * r;
                    norms[idx + 1] = cv * su * r;
                    norms[idx + 2] = sv * r;
                    tex[tidx] = u / (Math.PI * 2.0);
                    tex[tidx + 1] = v / (Math.PI * 2.0);
                    tidx += 2;
                    // Normalize
                    let len = Math.sqrt(norms[idx] * norms[idx] +
                                      norms[idx + 1] * norms[idx + 1] +
                                      norms[idx + 2] * norms[idx + 2]);
                    norms[idx] /= len;
                    norms[idx + 1] /= len;
                    norms[idx + 2] /= len;
                    idx += 3;
                }
            }

            idx = 0;
            for (let ring = 0; ring < rings; ring++) {
                let ringStart = ring * sides;
                let nextRingStart = (ring + 1) * sides;
                for (let side = 0; side < sides; side++) {
                    let nextSide = (side + 1) % sides;
                    // The quad
                    el[idx] = (ringStart + side);
                    el[idx + 1] = (nextRingStart + side);
                    el[idx + 2] = (nextRingStart + nextSide);
                    el[idx + 3] = ringStart + side;
                    el[idx + 4] = nextRingStart + nextSide;
                    el[idx + 5] = (ringStart + nextSide);
                    idx += 6;
                }
            }

            this._handle = [];
            this._vao.bind();

            this.addElementArray(new Uint16Array(el));

            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(tex), 2);

            this._indicesLen = el.length;
        };
    };
};
