/// <reference path="texture.ts" />
/// <reference path="../extras/Vector3.ts" />

class Texture2DArray extends Texture {
	constructor() {
		super((<any>gl).TEXTURE_2D_ARRAY);
		this._handle = gl.createTexture();
		this.bind();
	}
	public bind(slot?: number) {
		const gl = Core.getInstance().getGL();
		if (typeof slot === "number") {
			gl.activeTexture(gl.TEXTURE0 + slot);
		}
		gl.bindTexture(this.target, this._handle);
	}

	public destroy() {
		const gl = Core.getInstance().getGL();
		gl.deleteTexture(this._handle);
		this._handle = null;
	}
}