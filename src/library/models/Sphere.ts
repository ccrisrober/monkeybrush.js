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
     * Sphere class
     * @class Sphere
     */
    export class Sphere extends Drawable {
        protected _radius: number;
        protected _slices: number;
        protected _stacks: number;
        /**
         * Sphere constructor
         * @param {number} radius [description]
         * @param {number} slices: Number of steps around sphere.
         * @param {number} stacks: Number of vertically on the sphere.
         */
        constructor(radius: number, slices: number, stacks: number) {
            super();

            this._radius = radius;
            this._slices = slices;
            this._stacks = stacks;

            slices = Math["trunc"](slices);
            stacks = Math["trunc"](stacks);

            let nv = (slices + 1) * (stacks + 1);
            let elements = (slices * 2 * (stacks - 1)) * 3;

            this._geometry.addAttr(VBType.VBVertices, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            this._geometry.addAttr(VBType.VBNormals, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            this._geometry.addAttr(VBType.VBTexCoord, new MB.BufferAttribute(new Float32Array(2 * nv), 2));
            let el = new Uint16Array(elements);

            // Generate the vertex data
            // Generate positions and normals
            let theta, phi;
            let thetaFac = Math.PI * 2.0 / slices;
            let phiFac = Math.PI / stacks;
            let nx, ny, nz, s, t;

            let NVIDX = 0;
            let NNIDX = 0;
            let NTIDX = 0;
            for (let i = 0; i <= slices; ++i) {
                theta = i * thetaFac;
                        s = i / slices;
                for (let j = 0; j <= stacks; ++j) {
                    phi = j * phiFac;
                    t = j / stacks;
                    nx = Math.sin(phi) * Math.cos(theta);
                    ny = Math.sin(phi) * Math.sin(theta);
                    nz = Math.cos(phi);

                    this._geometry.getAttr(VBType.VBVertices).setXYZ(NVIDX++, radius * nx, radius * ny, radius * nz);
                    this._geometry.getAttr(VBType.VBNormals).setXYZ(NNIDX++, nx, ny, nz);
                    this._geometry.getAttr(VBType.VBTexCoord).setXY(NTIDX++, s, t);
                }
            }

            // Generate the element list
            let idx = 0;
            for (let i = 0; i < slices; ++i) {
                let stackStart = i * (stacks + 1);
                let nextStackStart = (i + 1) * (stacks + 1);
                for (let j = 0; j < stacks; ++j) {
                    if (j === 0) {
                        el[idx] = stackStart;
                        el[idx + 1] = stackStart + 1;
                        el[idx + 2] = nextStackStart + 1;
                        idx += 3;
                    } else if (j === stacks - 1) {
                        el[idx] = stackStart + j;
                        el[idx + 1] = stackStart + j + 1;
                        el[idx + 2] = nextStackStart + j;
                        idx += 3;
                    } else {
                        el[idx] = stackStart + j;
                        el[idx + 1] = stackStart + j + 1;
                        el[idx + 2] = nextStackStart + j + 1;
                        el[idx + 3] = nextStackStart + j;
                        el[idx + 4] = stackStart + j;
                        el[idx + 5] = nextStackStart + j + 1;
                        idx += 6;
                    }
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
