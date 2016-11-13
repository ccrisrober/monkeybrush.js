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
     * GeometryFunctions namespace
     * @namespace GeometryFunctions
     */
    export namespace GeometryFunctions {
        /**
         * Returns triangle centroid (geometry center).
         * @param  {Float32Array} v1 First triangle vertex.
         * @param  {Float32Array} v2 Second triangle vertex.
         * @param  {Float32Array} v3 Third triangle vertex.
         * @return {Float32Array}    Centroid position of given triangle
         */
        export function triangleCentroid(
            v1: Float32Array, v2: Float32Array, v3: Float32Array): Float32Array {

            const dim = v1.length;
            let res = new Float32Array(dim);
            for (let i = 0; i < dim; ++i) {
                const t0 = v1[i];
                const t1 = v2[i];
                const t2 = v3[i];
                res[i] = (t0 + t1 + t2) / 3;
            }

            return res;
        };
        /**
         * Returns triangle incenter.
         * @param  {Float32Array} v1 First triangle vertex.
         * @param  {Float32Array} v2 Second triangle vertex.
         * @param  {Float32Array} v3 Third triangle vertex.
         * @return {Float32Array}    Incenter position of given triangle
         */
        export function triangleIncenter(
            v1: Float32Array, v2: Float32Array, v3: Float32Array): Float32Array {

            const dim = v1.length;

            function sub(tmp: Float32Array, a: Float32Array, b: Float32Array): Float32Array {
                for (let i = 0; i < tmp.length; ++i) {
                    tmp[i] = a[i] - b[i];
                }
                return tmp;
            };

            function length(vec: Float32Array): number {
                let res = 0;
                for (let n = 0; n < vec.length; ++n) {
                    res += vec[n] * vec[n];
                }
                return Math.sqrt(res);
            };

            let tmp = new Float32Array(dim);
            const d1 = length(sub(tmp, v3, v2));
            const d2 = length(sub(tmp, v1, v3));
            const d3 = length(sub(tmp, v2, v1));
            const p = d1 + d2 + d3;

            for (let i = 0; i < dim; ++i) {
                tmp[i] = (v1[i] * d1 + v2[i] * d2 + v3[i] * d3) / p;
            }

            return tmp;
        };
        /**
         * Returns a new vertices and indices list removed orphan vertices
         * @param  {Array<Array<number>>} indices   Indices list
         * @param  {Array<Array<number>>} positions Positions list
         * @return {Object}                         New indices (indices)
         *                                              and positions (positions)
         */
        export function removeOrphanVertices(indices: Array<Array<number>>,
            positions: Array<Array<number>>): Object {

            let newPositions = [];
            let indexLookUp = {};

            let newIndices = indices.map((indice) => {
                return indice.map((function(index) {
                    if (indexLookUp[index] === undefined) {
                        indexLookUp[index] = newPositions.length;
                        newPositions.push(positions[index]);
                    }
                    return indexLookUp[index];
                }));
            });

            return {
                indices: newIndices,
                positions: newPositions
            };
        };
        /**
         * Export quad faces to triangle faces
         * @param  {Array<Array<number>>} faces [description]
         * @return {Array}                      [description]
         */
        export function triangulateQuadFace(faces: Array<Array<number>>): Array<Array<number>> {
            let triangles: Array<Array<number>> = [];
            faces.forEach(function(face) {
                triangles.push([face[0], face[1], face[2]]);
                for (let j = 2; j < face.length - 1; ++j) {
                  triangles.push([face[0], face[j], face[j + 1]]);
                }
            });
            return triangles;
        };

        export function removeDegerateIndices(indices: number[][]) {
            function equ(a: number, b: number) {
                return a === b;
            };

            return indices.filter(function(indice) {
                for (let i = 0; i < indice.length; ++i) {
                    for (let j = 0; j < indice.length; ++j) {
                        if (i !== j && equ(indice[i], indice[j])) {
                            return false;
                        }
                    }
                }
                return true;
            });
        };
        export function removeDegerateIndicesWithVertices(
            indices: number[][], vertices: number[][]) {
            function equ(a: number[], b: number[]) {
                if (a.length !== b.length) {
                    return false;
                }

                for (let i = 0; i < a.length; ++i) {
                    if (a[i] !== b[i]) {
                        return false;
                    }
                }

                return true;
            };

            return indices.filter(function(indice) {
                let indice2 = indice.map(function(idx) {
                    return vertices[idx];
                });
                for (let i = 0; i < indice2.length; i++) {
                    for (let j = 0; j < indice2.length; j++) {
                        if (i !== j && equ(indice2[i], indice2[j])) {
                            return false;
                        }
                    }
                }
                return true;
            });
        };
    };
};
