import { Box3D } from "../maths/Box3D";

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
    public toNotIndexed(): BufferGeometry {
        if (!this._indices) {
            return;
        }
        let geom2 = new BufferGeometry();

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
    public merge(geom2: BufferGeometry, offset: number = 0): BufferGeometry {
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

export { VertexBufferGeometry };
