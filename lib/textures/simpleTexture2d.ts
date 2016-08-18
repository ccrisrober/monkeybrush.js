/// <reference path="texture.ts" />

class SimpleTexture2D extends Texture {
	protected _flipY: boolean;
	protected _minFilter: number;
	protected _magFilter: number;
	protected _wraps: Array<number>;

	constructor(size: Vector2<number>, options = {}) {
		const gl = Core.getInstance().getGL();
		super(gl.TEXTURE_2D);
		options = options || {};

		// Support compression

		this._flipY = options["flipY"] === true;
		this._handle = gl.createTexture();

		let _internalformat = options["internalformat"] || gl.RGBA;
		let _format = options["format"] || gl.RGBA;
		let _type = options["type"] || gl.UNSIGNED_BYTE;

		this._minFilter = options["minFilter"] || gl.NEAREST;
		this._magFilter = options["magFilter"] || gl.NEAREST;
		let wraps = options["wrap"] || [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];

		if (!Array.isArray(wraps)) {
			wraps = [wraps, wraps];
		} else {
			this._wraps = wraps;
		}

		this.bind();

		gl.texImage2D(
			this._target, 
			0, // Level of details
			_internalformat, // Internal format
			size.x, 
			size.y, 
			0, 
			_format, // Format
			_type, // Size of each channel
			null
		);

		gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, this._minFilter);
		gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, this._magFilter);
		this.wrap(wraps);
		
		/*// Prevent NPOT textures
		// gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
		gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		// Prevents s-coordinate wrapping (repeating).
		gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		// Prevents t-coordinate wrapping (repeating).
		gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
	}
	public genMipMap() {
		const gl = Core.getInstance().getGL();
		this.bind();
		// TODO: Check NPOT??
		gl.generateMipmap(this.target);
	}
	public wrap(modes: Array<number>) {
		if (modes.length !== 2) {
			throw new Error("Must specify wrapS, wrapT modes");
		}
		const gl = Core.getInstance().getGL();
		this.bind();
		gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, modes[0]);
		gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, modes[1]);
		this._wraps = modes;
	}
	public minFilter(filter: number) {
		const gl = Core.getInstance().getGL();
		this.bind();
		gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, filter);
		this._minFilter = filter;
	}
	public magFilter(filter: number) {
		const gl = Core.getInstance().getGL();
		this.bind();
		gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, filter);
		this._magFilter = filter;
	}
	public bind(slot?: number) {
		const gl = Core.getInstance().getGL();
		if (typeof slot === "number") {
			gl.activeTexture(gl.TEXTURE0 + slot);
		}
		gl.bindTexture(this.target, this._handle);
	}
	public unbind() {
		const gl = Core.getInstance().getGL();
		gl.bindTexture(this.target, null);
	}
	public destroy() {
		const gl = Core.getInstance().getGL();
		gl.deleteTexture(this._handle);
		this._handle = null;
	}
	/*public setPixelStorage() {
		const gl = Core.getInstance().getGL();
	    //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha)
	    //gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment)
	    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY)
	}*/
}