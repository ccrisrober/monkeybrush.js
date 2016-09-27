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
    export namespace VBType {
        export const VBVertices: string = "vertices";
        export const VBNormals: string = "normals";
        export const VBTexCoord: string = "texCoords";
    };
    // "" | "" | "colors" | "tangents" | "bitangents" | "offset";
    /**
     * VertexBufferGeometry class
     * @class VertexBufferGeometry
     */
    export class VertexBufferGeometry {
        protected _indices: Uint16Array = null;
        /**
         * Hashmap with key as attribute ID and value a BufferGeometry instance
         * @type {string[BufferAttribute]}
         */
        protected _attrs: { [ key: string ]: BufferAttribute; } = {};
        /**
         * Add an attribute to this VertexBufferGeometry.
         * @param {string}          type      [description]
         * @param {BufferAttribute} attribute [description]
         */
        public addAttr(type: string, attribute: BufferAttribute) {
            this._attrs[type] = attribute;
        };
        /**
         * Return attribute with given specified name
         * @param {string} name Attribute name
         */
        public getAttr(name: string) {
            return this._attrs[name];
        };
        /**
         * Remove attribute with given specified name
         * @param {string} type [description]
         */
        public removeAttr(type: string) {
            delete this._attrs[type];
        };
        public setIndex(indices: Uint16Array) {
            this._indices = indices;
        };
        get indices(): Uint16Array { return this._indices; };
        public normalizeNormals() {
            if (this._attrs["normals"]) {
                let normals = this._attrs["normals"].array;
                let
                    x: number,
                    y: number,
                    z: number,
                    n: number;
                for (let i = 0; i < normals.length; i += 3) {
                    x = normals[i];
                    y = normals[i + 1];
                    z = normals[i + 2];

                    n = 1.0 / Math.sqrt(x * x + y * y + z * z);

                    (<any>normals)[i] *= n;
                    (<any>normals)[i + 1] *= n;
                    (<any>normals)[i + 2] *= n;
                }
            }
        };
        public toNotIndexed(): VertexBufferGeometry {
            if (!this._indices) {
                return;
            }
            let geom2 = new VertexBufferGeometry();

            for (let attrName in this._attrs) {
                let attribute = this._attrs[attrName];
                const itemSize: number = attribute.size;

                let arr = new Float32Array(this._indices.length * itemSize);

                let index = 0, index2 = 0;

                for (let i = 0, idxSize = this._indices.length; i < idxSize; ++i) {
                    index = this._indices[i] * itemSize;
                    for (let j = 0; j < itemSize; ++j) {
                        arr[index2++] = attribute[index++];
                    }
                }
                geom2.addAttr(attrName, new BufferAttribute(arr, itemSize));
            }
            return geom2;
        };
        public merge(geom2: VertexBufferGeometry, offset: number = 0): VertexBufferGeometry {
            for (let name in this._attrs) {
                // Only merging exists attributes
                if (!geom2._attrs[name]) continue;

                let attr1 = this._attrs[name];
                let attr2 = geom2._attrs[name];

                const attrSize = attr1.size;

                for (let i = 0, j = attrSize * offset;
                    i < attr2.array.length; ++i, ++j) {
                    (<any>attr1).array[j] = (<any>attr2).array[i];
                }
            }
            return this;
        };
        /**
         * Compute the bounding box of the geometry
         * @return {MB.Box3D} BoundingBox
         */
        public computingBoundingBox(): MB.Box3D {
            let box: MB.Box3D;
            if (!this._attrs["positions"]) {
                box = new MB.Box3D();
            } else {
                box = MB.Box3D.createFromArray(this._attrs["positions"].array);
            }
            return box;
        }
    };
};
