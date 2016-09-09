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
                this.verts.push(new Vect3(evalVect3.x, evalVect3.y, evalVect3.z));
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

                this.indices.push(new Vect3(pA, pB, pD));
                /*this.uvs.push(
                    uva[0], uva[1],
                    uvb[0], uvb[1],
                    uvd[0], uvd[1]
                );*/

                this.indices.push(new Vect3(pB, pC, pD));
                /*this.uvs.push(
                    uvb[0], uvb[1],
                    uvc[0], uvc[1],
                    uvd[0], uvd[1]
                );*/
            }
        }

        for (let i = 0; i < this.verts.length; ++i) {
            this.normals.push(new Vect3());
        }

        for (let i = 0; i < this.indices.length; ++i) {
            const ia: Vect3 = this.verts[this.indices[i].x];
            const ib: Vect3 = this.verts[this.indices[i].y];
            const ic: Vect3 = this.verts[this.indices[i].z];

            const e1: Vect3 = Vect3.sub(ia, ib);
            const e2: Vect3 = Vect3.sub(ic, ib);
            const no: Vect3 = Vect3.cross(e1, e2);

            this.normals[this.indices[i].x] = this.normals[this.indices[i].x].add(no);
            this.normals[this.indices[i].y] = this.normals[this.indices[i].y].add(no);
            this.normals[this.indices[i].z] = this.normals[this.indices[i].z].add(no);
        }

        for (let i = 0; i < this.normals.length; ++i) {
            this.normals[i] = this.normals[i].normalize();
        }

        let verts: Array<number> = [];
        for (let i = 0; i < this.verts.length; ++i) {
            verts.push(this.verts[i].x, this.verts[i].y, this.verts[i].z);
        }
        this.verts = verts;
        let normals: Array<number> = [];
        for (let i = 0; i < this.normals.length; ++i) {
            normals.push(this.normals[i].x, this.normals[i].y, this.normals[i].z);
        }
        this.normals = normals;
        let indices: Array<number> = [];
        for (let i = 0; i < this.indices.length; ++i) {
            indices.push(this.indices[i].x, this.indices[i].y, this.indices[i].z);
        }
        this.indices = indices;

        console.log({
            vertices: this.verts,
            indices: this.indices,
            normals: this.normals,
            uvs: this.uvs
        });
    }
};

export { ParametricGeom };
