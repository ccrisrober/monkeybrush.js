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
     * Capsule class
     * @class Capsule
     */
    export class Capsule extends Drawable {
        /**
         * Capsule constructor
         * @param {number = 0.5} radius Capsule radius
         * @param {number = radius * 2} height Capsule height
         * @param {number = 12} subHeight Capsule height subdivision
         * @param {number = 12} numSegm Capsule num segments
         */
        constructor(radius: number = 0.5, height: number = radius * 2,
            subHeight: number = 12, numSegm: number = 12) {

            super();

            const ringsBody = subHeight + 1;
            const ringsTotal = subHeight + ringsBody;

            const bodyIncr = 1.0 / (ringsBody - 1);
            const ringIncr = 1.0 / (subHeight - 1);
            const nv = ((Math.round(subHeight / 2) * numSegm) +
                (ringsBody * numSegm) + Math.round(subHeight / 2) * numSegm);

            let verts = new MB.BufferAttribute(new Float32Array(3 * nv), 3);
            let norms = new MB.BufferAttribute(new Float32Array(3 * nv), 3);
            let texCoords = new MB.BufferAttribute(new Float32Array(2 * nv), 2);

            let cells = new Uint16Array((ringsTotal - 1) * (numSegm - 1) * 2 * 3);

            let NVIDX = 0;
            let NNIDX = 0;
            let NTIDX = 0;
            function calcNewRing(segments: number, r: number, y: number, dy: number) {
                let segIncr = 1.0 / (segments - 1);

                for (let s = 0; s < segments; ++s) {
                    const val: number = (Math.PI * 2) * s * segIncr;
                    const x = Math.cos(val) * r;
                    const z = Math.sin(val) * r;

                    verts.setXYZ(NVIDX++,
                        radius * x,
                        radius * y + height * dy,
                        radius * z
                    );

                    norms.setXYZ(NNIDX++,
                        x,
                        y,
                        z
                    );

                    texCoords.setXY(NTIDX++,
                        1.0 - (s * segIncr),
                        0.5 - ((radius * y + height * dy) / (2.0 * radius + height))
                    );
                }
            }

            let r;
            for (r = 0; r < subHeight / 2; ++r) {
                calcNewRing(numSegm, Math.sin(Math.PI * r * ringIncr),
                    Math.sin(Math.PI * (r * ringIncr - 0.5)), -0.5);
            }

            for (r = 0; r < ringsBody; ++r) {
                calcNewRing(numSegm, 1.0, 0.0, r * bodyIncr - 0.5);
            }

            for (r = subHeight / 2; r < subHeight; ++r) {
                calcNewRing(numSegm, Math.sin(Math.PI * r * ringIncr),
                    Math.sin(Math.PI * (r * ringIncr - 0.5)), +0.5);
            }

            let idx = 0;
            for (let r = 0; r < ringsTotal - 1; ++r) {
                for (let s = 0; s < numSegm - 1; ++s) {
                    cells[idx++] = r * numSegm + (s + 1);
                    cells[idx++] = r * numSegm + (s + 0);
                    cells[idx++] = (r + 1) * numSegm + (s + 1);
                    cells[idx++] = (r + 1) * numSegm + (s + 0);
                    cells[idx++] = (r + 1) * numSegm + (s + 1);
                    cells[idx++] = r * numSegm + s;
                }
            };

            this._geometry.addAttr(VBType.VBVertices, verts);
            this._geometry.addAttr(VBType.VBNormals, norms);
            this._geometry.addAttr(VBType.VBTexCoord, texCoords);

            this._handle = [];
            this._vao.bind();

            this.addElementArray(cells);

            this.addBufferArray(0, <Float32Array>this._geometry.getAttr(VBType.VBVertices).array, 3);
            this.addBufferArray(1, <Float32Array>this._geometry.getAttr(VBType.VBNormals).array, 3);
            this.addBufferArray(2, <Float32Array>this._geometry.getAttr(VBType.VBTexCoord).array, 2);

            this._indicesLen = cells.length;

        }
    };
};
