/// <reference path="texture3d.ts" />

class SimpleTexture3D extends Texture3D {
	constructor(size: Vector3<number>, options = {}) {
		super(null, size, options);
	}
}