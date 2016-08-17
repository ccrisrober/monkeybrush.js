/// <reference path="texture.ts" />
// TODO: Es necesario realmente el tamaño??
class CubeMapTexture extends Texture {
	protected _flipY : boolean;
	protected _minFilter: number;
	protected _magFilter: number;
	protected _wraps: Array<number>;

	protected finished: boolean;

	constructor(options = {}) {
		var gl = Core.getInstance().getGL();
		super(gl.TEXTURE_CUBE_MAP);
		options = options || {};

		console.log(this.target);


		this.finished = false;


		this._handle = gl.createTexture();
	}
	public addImage(i: number, data) {
		var gl = Core.getInstance().getGL();
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, 
			gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
	}
	public bind(slot?: number) {
		var gl = Core.getInstance().getGL();
		if(typeof slot === "number") {
			gl.activeTexture(gl.TEXTURE0 + slot);
		}
		gl.bindTexture(this.target, this._handle);
	}
	public unbind() {
		var gl = Core.getInstance().getGL();
		gl.bindTexture(this.target, null);
	}
	public destroy() {
		var gl = Core.getInstance().getGL();
		gl.deleteTexture(this._handle);
		this._handle = null;
	}
	public finishTex() {
		var gl = Core.getInstance().getGL();
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, (<any>gl).TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
		this.finished = true;
	}
}