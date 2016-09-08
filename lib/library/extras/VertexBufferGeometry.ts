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


import { Box3D } from "../maths/Box3D";


"use strict";


class BufferAttribute {
    protected _arr: ArrayLike<number>;
    protected _size: number;
    constructor(arr: ArrayLike<number>, size: number) {
        this._arr = arr;
        this._size = size;
    }
    get array(): ArrayLike<number> {
        return this._arr;
    }
    get size(): number {
        return this._size;
    }
    get count(): number {
        return this._arr.length / this._size;
    }
    public getX(index: number): number {
        return this.array[index * this._size];
    }
    public setX(index: number, value: number) {
        this.array[index * this._size] = value;
    }
    public getY(index: number): number {
        return this.array[index * this._size + 1];
    }
    public setY(index: number, value: number) {
        this.array[index * this._size + 1] = value;
    }
    public getZ(index: number): number {
        return this.array[index * this._size + 2];
    }
    public setZ(index: number, value: number) {
        this.array[index * this._size + 2] = value;
    }
    public setXY(index: number, xValue: number, yValue: number) {
        index *= this._size;
        this.array[index] = xValue;
        this.array[index + 1] = yValue;
    }
    public getXY(index: number): Array<number> {
        index *= this._size;
        return [this.array[index], this.array[index + 1]];
    }
    public getXYZ(index: number): Array<number> {
        index *= this._size;
        return [
            this.array[index],
            this.array[index + 1],
            this.array[index + 2]
        ];
    }
    public setXYZ(index: number, xValue: number, yValue: number, zValue: number) {
        this.array[index] = xValue;
        this.array[index + 1] = yValue;
        this.array[index + 2] = zValue;
    }
};

class InstancedBufferAttribute extends BufferAttribute {
    protected _meshPerAttr: number;
    constructor(arr: ArrayLike<number>, size: number, meshPerAttr: number = 1) {
        super(arr, size);
        this._meshPerAttr = meshPerAttr;
    }
    get meshPerAttr(): number { return this._meshPerAttr; };
};

class InstancedInterleavedBuffer extends BufferAttribute {
    protected _meshPerAttr: number;
    constructor(arr: ArrayLike<number>, stride: number, meshPerAttr: number = 1) {
        super(arr, stride);
        this._meshPerAttr = meshPerAttr;
    }
    get meshPerAttr(): number { return this._meshPerAttr; };
};

class VertexBufferGeometry {
    protected _indices: Uint16Array = null;
    protected _attrs: { [ key: string ]: BufferAttribute; } = {};
    public addAttr(type: string, attribute: BufferAttribute) {
        this._attrs[type] = attribute;
    };
    public getAttr(name: string) {
        return this._attrs[name];
    };
    public removeAttr(type: string) {
        delete this._attrs[type];
    };
    public setIndex(indices) {
        this._indices = indices;
    };
    get indices(): Uint16Array { return this._indices; };
    public normalizeNormals() {
        if (this._attrs["normals"]) {
            let normals: ArrayLike<number> = this._attrs["normals"].array;
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

                normals[i] *= n;
                normals[i + 1] *= n;
                normals[i + 2] *= n;
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
                attr1.array[j] = attr2.array[i];
            }
        }
        return this;
    };
    public computingBoundingBox(): Box3D {
        let box: Box3D;
        if (!this._attrs["positions"]) {
            box = new Box3D();
        } else {
            box = Box3D.createFromArray(this._attrs["positions"].array);
        }
        return box;
    }
};

export { BufferAttribute, VertexBufferGeometry };
