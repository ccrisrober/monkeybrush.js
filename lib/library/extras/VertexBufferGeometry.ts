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


/**
 * BufferAttribute class
 * @class BufferAttribute
 */
class BufferAttribute {
    protected _arr: ArrayLike<number>;
    protected _size: number;
    /**
     * BufferAttribute constructor
     * @param {ArrayLike<number>} arr  [description]
     * @param {number}            size [description]
     */
    constructor(arr: ArrayLike<number>, size: number) {
        this._arr = arr;
        this._size = size;
    }
    /**
     * Return buffer attribute inner array
     * @return {ArrayLike<number>} [description]
     */
    get array(): ArrayLike<number> {
        return this._arr;
    };
    /**
     * Return how many items of the inner array are
     *     associated with a particular vect[size].
     * @return {number} [description]
     */
    get size(): number {
        return this._size;
    };
    /**
     * Return total buffer number of elements in the inner array.
     * @return {number} [description]
     */
    get count(): number {
        return this._arr.length / this._size;
    };
    /**
     * Return x value from specifies vect[size] index
     * @param  {number} index [description]
     * @return {number}       [description]
     */
    public getX(index: number): number {
        if (this.size < 1) throw new Error("X value is not defined");
        return this.array[index * this._size];
    };
    /**
     * Return y value from specifies vect[size] index
     * @param  {number} index [description]
     * @return {number}       [description]
     */
    public getY(index: number): number {
        if (this.size < 2) throw new Error("Y value is not defined");
        return this.array[index * this._size + 1];
    };
    /**
     * Return z value from specifies vect[size] index
     * @param  {number} index [description]
     * @return {number}       [description]
     */
    public getZ(index: number): number {
        if (this.size < 3) throw new Error("Z value is not defined");
        return this.array[index * this._size + 2];
    };
    /**
     * Return w value from specifies vect[size] index
     * @param  {number} index [description]
     * @return {number}       [description]
     */
    public getW(index: number): number {
        if (this.size < 4) throw new Error("W value is not defined");
        return this.array[index * this._size + 3];
    };
    /**
     * Return [x, y] values from specifies vect[size] index
     * @param  {number}        index [description]
     * @return {ArrayLike<number>}       [description]
     */
    public getXY(index: number): ArrayLike<number> {
        if (this.size < 2) throw new Error("Y value is not defined");
        index *= this._size;
        return [
            this.array[index],
            this.array[index + 1]
        ];
    };
    /**
     * Return [x, y, z] values from specifies vect[size] index
     * @param  {number}        index [description]
     * @return {ArrayLike<number>}       [description]
     */
    public getXYZ(index: number): ArrayLike<number> {
        if (this.size < 3) throw new Error("Z value is not defined");
        index *= this._size;
        return [
            this.array[index],
            this.array[index + 1],
            this.array[index + 2]
        ];
    };
    /**
     * Return [x, y, z, w] values from specifies vect[size] index
     * @param  {number}        index [description]
     * @return {ArrayLike<number>}       [description]
     */
    public getXYZW(index: number): ArrayLike<number> {
        if (this.size < 3) throw new Error("Z value is not defined");
        index *= this._size;
        return [
            this.array[index],
            this.array[index + 1],
            this.array[index + 2],
            this.array[index + 3]
        ];
    };



    /**
     * Sets the x value from specifies vect[size] index
     * @param {number} index [description]
     * @param {number} value [description]
     */
    public setX(index: number, value: number) {
        if (this.size < 1) throw new Error("X value is not defined");
        this.array[index * this._size] = value;
    };
    /**
     * Sets the y value from specifies vect[size] index
     * @param {number} index [description]
     * @param {number} value [description]
     */
    public setY(index: number, value: number) {
        if (this.size < 2) throw new Error("Y value is not defined");
        this.array[index * this._size + 1] = value;
    };
    /**
     * Sets the z value from specifies vect[size] index
     * @param {number} index [description]
     * @param {number} value [description]
     */
    public setZ(index: number, value: number) {
        if (this.size < 3) throw new Error("Z value is not defined");
        this.array[index * this._size + 2] = value;
    };
    /**
     * Sets the w value from specifies vect[size] index
     * @param {number} index [description]
     * @param {number} value [description]
     */
    public setW(index: number, value: number) {
        if (this.size < 4) throw new Error("W value is not defined");
        this.array[index * this._size + 3] = value;
    };
    /**
     * Sets the x and y values from specifies vect[size] index
     * @param {number} index  [description]
     * @param {number} xValue [description]
     * @param {number} yValue [description]
     */
    public setXY(index: number, xValue: number, yValue: number) {
        if (this.size < 2) throw new Error("Y value is not defined");
        index *= this._size;
        this.array[index] = xValue;
        this.array[index + 1] = yValue;
    };
    /**
     * Sets the x, y and z values from specifies vect[size] index
     * @param {number} index  [description]
     * @param {number} xValue [description]
     * @param {number} yValue [description]
     * @param {number} zValue [description]
     */
    public setXYZ(index: number, xValue: number, yValue: number, zValue: number) {
        if (this.size < 3) throw new Error("Z value is not defined");
        this.array[index] = xValue;
        this.array[index + 1] = yValue;
        this.array[index + 2] = zValue;
    };
    /**
     * Sets the x, y, z and w values from specifies vect[size] index
     * @param {number} index  [description]
     * @param {number} xValue [description]
     * @param {number} yValue [description]
     * @param {number} zValue [description]
     * @param {number} wValue [description]
     */
    public setXYZW(index: number, xValue: number, yValue: number, zValue: number, wValue: number) {
        if (this.size < 4) throw new Error("W value is not defined");
        this.array[index] = xValue;
        this.array[index + 1] = yValue;
        this.array[index + 2] = zValue;
        this.array[index + 3] = wValue;
    };
};
/**
 * InstancedBufferAttribute class
 * @class InstancedBufferAttribute
 */
class InstancedBufferAttribute extends BufferAttribute {
    protected _meshPerAttr: number;
    constructor(arr: ArrayLike<number>, size: number, meshPerAttr: number = 1) {
        super(arr, size);
        this._meshPerAttr = meshPerAttr;
    }
    get meshPerAttr(): number { return this._meshPerAttr; };
};
/**
 * InstancedInterleavedBuffer class
 * @class InstancedInterleavedBuffer
 */
class InstancedInterleavedBuffer extends BufferAttribute {
    protected _meshPerAttr: number;
    constructor(arr: ArrayLike<number>, stride: number, meshPerAttr: number = 1) {
        super(arr, stride);
        this._meshPerAttr = meshPerAttr;
    }
    get meshPerAttr(): number { return this._meshPerAttr; };
};
// type VBAttribute = "vertices" | "normals" | "texCoords"; // | "colors" | "tangents" | "bitangents" | "offset";
/**
 * VertexBufferGeometry class
 * @class VertexBufferGeometry
 */
class VertexBufferGeometry {
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
    /**
     * Compute the bounding box of the geometry
     * @return {Box3D} BoundingBox
     */
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

export {
    BufferAttribute,
    InstancedBufferAttribute,
    InstancedInterleavedBuffer,
    VertexBufferGeometry
};
