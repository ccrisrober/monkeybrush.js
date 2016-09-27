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
        protected _outerRadius: number;
        protected _innerRadius: number;
        protected _sides: number;
        protected _rings: number;
        /**
         * Torus constructor.
         * @param {GLContext} context [description]
         * @param {number = 1.0} outerRadius: Outer ring radius
         * @param {number = 0.5} innerRadius: Inner ring radius
         * @param {number = 4}   sides: Number of sides
         * @param {number = 10}  rings: Number of rings
         */
        constructor(context: GLContext, outerRadius: number = 1.0, innerRadius: number = 0.5,
            sides: number = 4, rings: number = 10) {
            super(context);

            this._outerRadius = outerRadius;
            this._innerRadius = innerRadius;
            this._sides = sides;
            this._rings = rings;

            let faces = sides * rings;
            let nv  = sides * (rings + 1);   // One extra ring to duplicate first ring

            this._geometry.addAttr(VBType.VBVertices, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            this._geometry.addAttr(VBType.VBNormals, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            this._geometry.addAttr(VBType.VBTexCoord, new MB.BufferAttribute(new Float32Array(2 * nv), 2));
            let el = new Uint16Array(6 * faces);

            // Generate the vertex data
            let NVIDX = 0;
            let NNIDX = 0;
            let NTIDX = 0;

            let ringFactor = (Math.PI * 2.0) / rings;
            let sideFactor = (Math.PI * 2.0) / sides;
            let norms = new Array(3);
            for (let ring = 0; ring <= rings; ring++) {
                let u = ring * ringFactor;
                let cu = Math.cos(u);
                let su = Math.sin(u);
                for (let side = 0; side < sides; side++) {
                    let v = side * sideFactor;
                    let cv = Math.cos(v);
                    let sv = Math.sin(v);
                    let r = (outerRadius + innerRadius * cv);



                    norms[0] = cv * cu * r;
                    norms[1] = cv * su * r;
                    norms[2] = sv * r;
                    // Normalize
                    let len = Math.sqrt(norms[0] * norms[0] +
                                        norms[1] * norms[1] +
                                        norms[2] * norms[2]);
                    norms[0] /= len;
                    norms[1] /= len;
                    norms[2] /= len;

                    this._geometry.getAttr(VBType.VBVertices).setXYZ(NVIDX++, r * cu, r * su, innerRadius * sv);
                    this._geometry.getAttr(VBType.VBNormals).setXYZ(NNIDX++, norms[0], norms[1], norms[2]);
                    this._geometry.getAttr(VBType.VBTexCoord).setXY(NTIDX++, u / (Math.PI * 2.0), v / (Math.PI * 2.0));
                }
            }

            let idx = 0;
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

            this.addElementArray(el);

            this.addBufferArray(0, <Float32Array>this._geometry.getAttr(VBType.VBVertices).array, 3);
            this.addBufferArray(1, <Float32Array>this._geometry.getAttr(VBType.VBNormals).array, 3);
            this.addBufferArray(2, <Float32Array>this._geometry.getAttr(VBType.VBTexCoord).array, 2);

            this._indicesLen = el.length;
        };
    };
};
