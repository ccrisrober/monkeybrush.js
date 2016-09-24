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
// Code based on http://prideout.net/blog/?p=44 ideas

// TODO: http://paulbourke.net/geometry/verrill/
namespace MB {
    /**
     * ParametricGeom class
     * @class ParametricGeom
     */
    export class ParametricGeom extends Drawable {
        protected _slices: number;
        protected _stacks: number;
        protected _func: (u: number, v: number) => MB.Vect3;
        /**
         * ParametricGeom
         * @param {number) => MB.Vect3} func Function generator (u, v) => MB.Vect3
         * @param {number} slices Number of slices
         * @param {number} stacks Number of stacks
         */
        constructor(func: (u: number, v: number) => MB.Vect3, slices: number, stacks: number) {
            super();

            this._func = func;
            this._slices = slices;
            this._stacks = stacks;

            let vertices = [];
            let normals = [];
            let indices = [];
            let uvs = [];


            let evalVect3;
            let u, v;

            const count = slices + 1;

            for (let i = 0; i <= stacks; ++i) {
                v = i / stacks;
                for (let j = 0; j <= slices; ++j) {
                    u = j / slices;

                    evalVect3 = func(u, v);
                    vertices.push(new MB.Vect3(evalVect3.x, evalVect3.y, evalVect3.z));
                }
            }

            let pA, pB, pC, pD;
            let uva, uvb, uvc, uvd;
            // TODO: UVs error :(
            for (let i = 0; i < stacks; ++i) {
                for (let j = 0; j < slices; ++j) {
                    pA = i * count + j;
                    pB = i * count + j + 1;
                    pC = (i + 1) * count + j + 1;
                    pD = (i + 1) * count + j;

                    uva = new Array([j / slices, i / stacks]);
                    uvb = new Array([(j + 1) / slices, i / stacks]);
                    uvc = new Array([(j + 1) / slices, (i + 1) / stacks]);
                    uvd = new Array([j / slices, (i + 1) / stacks]);

                    indices.push(new MB.Vect3(pA, pB, pD));
                    uvs.push(new MB.Vect2(uva[0], uva[1]));
                    uvs.push(new MB.Vect2(uvb[0], uvb[1]));
                    uvs.push(new MB.Vect2(uvd[0], uvd[1]));

                    indices.push(new MB.Vect3(pB, pC, pD));
                    uvs.push(new MB.Vect2(uvb[0], uvb[1]));
                    uvs.push(new MB.Vect2(uvc[0], uvc[1]));
                    uvs.push(new MB.Vect2(uvd[0], uvd[1]));
                }
            }

            for (let i = 0; i < vertices.length; ++i) {
                normals.push(new MB.Vect3());
            }

            for (let i = 0; i < indices.length; ++i) {
                const ia: MB.Vect3 = vertices[indices[i].x];
                const ib: MB.Vect3 = vertices[indices[i].y];
                const ic: MB.Vect3 = vertices[indices[i].z];

                const e1: MB.Vect3 = MB.Vect3.sub(ia, ib);
                const e2: MB.Vect3 = MB.Vect3.sub(ic, ib);
                const no: MB.Vect3 = MB.Vect3.cross(e1, e2);

                normals[indices[i].x] = normals[indices[i].x].add(no);
                normals[indices[i].y] = normals[indices[i].y].add(no);
                normals[indices[i].z] = normals[indices[i].z].add(no);
            }

            for (let i = 0; i < normals.length; ++i) {
                normals[i] = normals[i].normalize();
            }

            let vertices2: Array<number> = [];
            for (let i = 0; i < vertices.length; ++i) {
                vertices2.push(vertices[i].x, vertices[i].y, vertices[i].z);
            }
            vertices = vertices2;
            let normals2: Array<number> = [];
            for (let i = 0; i < normals.length; ++i) {
                normals2.push(normals[i].x, normals[i].y, normals[i].z);
            }
            normals = normals2;
            let indices2: Array<number> = [];
            for (let i = 0; i < indices.length; ++i) {
                indices2.push(indices[i].x, indices[i].y, indices[i].z);
            }
            indices = indices2;
            let uvs2: Array<number> = [];
            for (let i = 0; i < uvs.length; ++i) {
                uvs2.push(uvs[i].x, uvs[i].y);
            }
            uvs = uvs2;


            this._handle = [];
            this._vao.bind();

            this.addElementArray(new Uint16Array(indices));

            this.addBufferArray(0, new Float32Array(vertices), 3);
            this.addBufferArray(1, new Float32Array(normals), 3);
            this.addBufferArray(2, new Float32Array(uvs), 2);

            this._indicesLen = indices.length;
        };
    };
};
