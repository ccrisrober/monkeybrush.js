/// <reference path="texture.ts" />

class Texture2D extends Texture {
	protected _handle: WebGLTexture;
	protected _flipY : boolean;
	protected _minFilter: number;
	protected _magFilter: number;
	protected _wraps: Array<number>;

	constructor(image, size: vector2<number>, options = {}) {
		var gl = Core.getInstance().getGL();
		super(gl.TEXTURE_2D);
		options = options || {};



		// TODO: REplace gl.TEXTURE_2D TO this.target = gl.TEXTURE_2D;


		this._flipY = options["flipY"] === true;
		this._handle = gl.createTexture();

		this._minFilter = options["minFilter"] || gl.NEAREST;
		this._magFilter = options["magFilter"] || gl.NEAREST;
		var wraps = options["wrap"] || [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];

		if(!Array.isArray(wraps)) {
			wraps = [wraps, wraps];
		} else {
			this._wraps = wraps;
		}

		//this.minFilter();
		//this.magFilter();
		//this.wrap();
		this.bind();




		gl.texImage2D(
			gl.TEXTURE_2D,
			0, // Level of details
			gl.RGBA, // Format
			gl.RGBA,
			gl.UNSIGNED_BYTE, // Size of each channel
			image
		);




		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._magFilter);
		this.wrap(wraps);
	}
	public genMipMap() {
		var gl = Core.getInstance().getGL();
		this.bind();
		// TODO: Check NPOT??
		gl.generateMipmap(gl.TEXTURE_2D);
	}
	public wrap(modes: Array<number>) {
		if(modes.length !== 2) {
			throw new Error("Must specify wrapS, wrapT modes");
		}
		var gl = Core.getInstance().getGL();
		this.bind();
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, modes[0]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, modes[1]);
		this._wraps = modes;
	}
	public minFilter(filter: number) {
		var gl = Core.getInstance().getGL();
		this.bind();
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
		this._minFilter = filter;
	}
	public magFilter(filter: number) {
		var gl = Core.getInstance().getGL();
		this.bind();
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
		this._magFilter = filter;
	}
	public bind(slot?: number) {
		var gl = Core.getInstance().getGL();
		if(typeof slot === "number") {
			gl.activeTexture(gl.TEXTURE0 + slot);
		}
		gl.bindTexture(gl.TEXTURE_2D, this._handle);
	}
	public unbind() {
		var gl = Core.getInstance().getGL();
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	public destroy() {
		var gl = Core.getInstance().getGL();
		gl.deleteTexture(this._handle);
		this._handle = null;
	}
	public setPixelStorage() {
		var gl = Core.getInstance().getGL();
	    //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha)
	    //gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment)
	    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY)
	}
}