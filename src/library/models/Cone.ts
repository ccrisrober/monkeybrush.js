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
     * Cone class
     * @class Cone
     */
    export class Cone extends Drawable {
        /**
         * Cone constructor
         * @param {number} bottomRadius: Cone bottom radius
         * @param {number} topRadius: Cone top radius
         * @param {number} height: Cone height
         * @param {number = 3.0} radialSubDiv: Radial subdivisions around Cone
         * @param {number = 1.0} heightSubDiv Height subdivisions
         * @param {boolean = true} createTopBase: Create top base
         * @param {boolean = true} createBottomBase: Create bottom base
         */
        constructor(bottomRadius: number, topRadius: number,
            height: number, radialSubDiv: number = 3.0, heightSubDiv: number = 1.0,
            createTopBase: boolean = true, createBottomBase: boolean = true) {
            super();

            if (radialSubDiv < 3) {
                throw Error("radialSubDiv must be 3 or greater");
            }

            if (heightSubDiv < 1) {
                throw Error("heightSubDiv must be 1 or greater");
            }

            const extra = (createTopBase ? 2 : 0) + (createBottomBase ? 2 : 0);

            const nv = (radialSubDiv + 1) * (heightSubDiv + 1 + extra);

            this._geometry.addAttr(VBType.VBVertices, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            this._geometry.addAttr(VBType.VBNormals, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            this._geometry.addAttr(VBType.VBTexCoord, new MB.BufferAttribute(new Float32Array(2 * nv), 2));
            let el = new Uint16Array(3 * radialSubDiv * (heightSubDiv + extra) * 2);

            const vertsAroundEdge = radialSubDiv + 1;

            // Slant: Distance from the top of a Cone, down the side to a point on the edge of the base.
            const slantH = Math.atan2(bottomRadius - topRadius, height);
            const cSlantH = Math.cos(slantH);
            const sSlantH = Math.sin(slantH);

            const start = createTopBase ? -2 : 0;
            const end = heightSubDiv + (createBottomBase ? 2 : 0);

            let NVIDX = 0;
            let NNIDX = 0;
            let NTIDX = 0;
            for (let yy = start; yy <= end; ++yy) {
                let v = yy / heightSubDiv;
                let y = height * v;
                let ringRadius;
                if (yy < 0) {
                    y = 0;
                    v = 1;
                    ringRadius = bottomRadius;
                } else if (yy > heightSubDiv) {
                    y = height;
                    v = 1;
                    ringRadius = topRadius;
                } else {
                    ringRadius = bottomRadius +
                        (topRadius - bottomRadius) * (yy / heightSubDiv);
                }
                if (yy === -2 || yy === heightSubDiv + 2) {
                    ringRadius = 0;
                    v = 0;
                }
                y -= height / 2;

                for (let ii = 0; ii < vertsAroundEdge; ++ii) {
                    let sin = Math.sin(ii * Math.PI * 2 / radialSubDiv);
                    let cos = Math.cos(ii * Math.PI * 2 / radialSubDiv);

                    this._geometry.getAttr(VBType.VBVertices).setXYZ(NVIDX++, sin * ringRadius, y, cos * ringRadius);
                    this._geometry.getAttr(VBType.VBNormals).setXYZ(NNIDX++,
                        (yy < 0 || yy > heightSubDiv) ? 0 : (sin * cSlantH),
                        (yy < 0) ? -1 : (yy > heightSubDiv ? 1 : sSlantH),
                        (yy < 0 || yy > heightSubDiv) ? 0 : (cos * cSlantH));
                    this._geometry.getAttr(VBType.VBTexCoord).setXY(NTIDX++, (ii / radialSubDiv), 1.0 - v);
                }
            }

            // Generate the element list
            let idx = 0;
            for (let yy = 0; yy < heightSubDiv + extra; ++yy) {
                for (let ii = 0; ii < radialSubDiv; ++ii) {
                    el[idx++] = vertsAroundEdge * (yy + 0) + 0 + ii;
                    el[idx++] = vertsAroundEdge * (yy + 0) + 1 + ii;
                    el[idx++] = vertsAroundEdge * (yy + 1) + 1 + ii;

                    el[idx++] = vertsAroundEdge * (yy + 0) + 0 + ii;
                    el[idx++] = vertsAroundEdge * (yy + 1) + 1 + ii;
                    el[idx++] = vertsAroundEdge * (yy + 1) + 0 + ii;
                }
            }

            this._handle = [];
            this._vao.bind();

            this.addElementArray(el);

            this.addBufferArray(0, <Float32Array>this._geometry.getAttr(VBType.VBVertices).array, 3);
            this.addBufferArray(1, <Float32Array>this._geometry.getAttr(VBType.VBNormals).array, 3);
            this.addBufferArray(2, <Float32Array>this._geometry.getAttr(VBType.VBTexCoord).array, 2);

            this._indicesLen = el.length;
        }
    };
};
