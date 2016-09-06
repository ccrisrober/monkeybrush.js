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
        /*this.normals = function(indices, vertices) {
          function hypot(x, y, z) {
            return Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
          }

          function weight(s, r, a) {
            return Math.atan2(r, (s - a))
          }

          function mulAdd(dest, s, x, y, z) {
            dest[0] += s * x
            dest[1] += s * y
            dest[2] += s * z
          }

          function angleNormals(cells, positions) {
            var numVerts = positions.length / 3;
            var numCells = cells.length;

            //Allocate normal array
            var normals = new Array(numVerts);
            for(var i=0; i<numVerts; i++) {
              normals[i] = [0,0,0]
            }

            //Scan cells, and
            for(var i=0; i<numCells; i+=3) {
              var cell = [cells[i], cells[i+1], cells[i+2]]
              var a = [
                positions[cell[0] * 3],
                positions[cell[0] * 3 + 1],
                positions[cell[0] * 3 + 2]];
              var b = [
                positions[cell[1] * 3],
                positions[cell[1] * 3 + 1],
                positions[cell[1] * 3 + 2]];
              var c = [
                positions[cell[2] * 3],
                positions[cell[2] * 3 + 1],
                positions[cell[2] * 3 + 2]];

              var abx = a[0] - b[0]
              var aby = a[1] - b[1]
              var abz = a[2] - b[2]
              var ab = hypot(abx, aby, abz)

              var bcx = b[0] - c[0]
              var bcy = b[1] - c[1]
              var bcz = b[2] - c[2]
              var bc = hypot(bcx, bcy, bcz)

              var cax = c[0] - a[0]
              var cay = c[1] - a[1]
              var caz = c[2] - a[2]
              var ca = hypot(cax, cay, caz)

              if(Math.min(ab, bc, ca) < 1e-6) {
                continue
              }

              var s = 0.5 * (ab + bc + ca)
              var r = Math.sqrt((s - ab)*(s - bc)*(s - ca)/s)

              var nx = aby * bcz - abz * bcy
              var ny = abz * bcx - abx * bcz
              var nz = abx * bcy - aby * bcx
              var nl = hypot(nx, ny, nz)
              nx /= nl
              ny /= nl
              nz /= nl

              mulAdd(normals[cell[0]], weight(s, r, bc), nx, ny, nz)
              mulAdd(normals[cell[1]], weight(s, r, ca), nx, ny, nz)
              mulAdd(normals[cell[2]], weight(s, r, ab), nx, ny, nz)
            }

            var nn = [];
            //Normalize all the normals
            for(var i=0; i<numVerts; ++i) {
              var n = normals[i]
              var l = Math.sqrt(
                Math.pow(n[0], 2) +
                Math.pow(n[1], 2) +
                Math.pow(n[2], 2))
              if(l < 1e-8) {
                n[0] = 1
                n[1] = 0
                n[2] = 0
                continue
              }
              n[0] /= l;
              n[1] /= l;
              n[2] /= l;
            }

            for(var i = 0; i < normals.length; i++) {
              nn.push(normals[i][0], normals[i][1], normals[i][2]);
            }

            return nn;
          }

          return angleNormals(indices, vertices);
        }(this.indices, this.verts);*/

        /*
        void Mesh_normalize( Mesh *myself ) {
            Vert     *vert = myself->vert;
            Triangle *face = myself->face;

            for( int i=0; i < myself->mNumVerts; i++ ) vert[i].normal = vec3(0.0f);

            for( int i=0; i < myself->mNumFaces; i++ )
            {
                const int ia = face[i].v[0];
                const int ib = face[i].v[1];
                const int ic = face[i].v[2];

                const vec3 e1 = vert[ia].pos - vert[ib].pos;
                const vec3 e2 = vert[ic].pos - vert[ib].pos;
                const vec3 no = cross( e1, e2 );

                vert[ia].normal += no;
                vert[ib].normal += no;
                vert[ic].normal += no;
            }

            for( i=0; i < myself->mNumVerts; i++ ) verts[i].normal = normalize( verts[i].normal );
        }
         */

        console.log({
            vertices: this.verts,
            indices: this.indices,
            normals: this.normals,
            uvs: this.uvs
        });
    }
};

export { ParametricGeom };
