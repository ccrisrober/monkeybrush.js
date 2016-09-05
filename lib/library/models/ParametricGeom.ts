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


import { Vect3 } from "../maths/Vect3";


"use strict";


class ParametricGeom {
    public verts = [];
    public normals = [];
    public indices = [];
    public uvs = [];
    constructor(func: (u: number, v: number) => Vect3, slices: number, stacks: number) {

        let evalVect3;
        let u, v;

        const count = slices + 1;

        for (let i = 0; i <= stacks; ++i) {
            v = i / stacks;
            for (let j = 0; j <= slices; ++j) {
                u = j / slices;

                evalVect3 = func(u, v);
                this.verts.push(evalVect3.x, evalVect3.y, evalVect3.z);
            }
        }

        let pA, pB, pC, pD;
        let uva, uvb, uvc, uvd;

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

                this.indices.push(pA, pB, pD);
                this.uvs.push(
                    uva[0], uva[1],
                    uvb[0], uvb[1],
                    uvd[0], uvd[1]
                );

                this.indices.push(pB, pC, pD);
                this.uvs.push(
                    uvb[0], uvb[1],
                    uvc[0], uvc[1],
                    uvd[0], uvd[1]
                );
            }
        }

        // TODO: NORMALS

        console.log({
            vertices: this.verts,
            indices: this.indices,
            uvs: this.uvs
        });
    }
};

export { ParametricGeom };
