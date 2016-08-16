/// <reference path="texture.ts" />
/// <reference path="../extras/vector3.ts" />

class Texture3D extends Texture {
	constructor(data, size: vector3<number>, options = {}) {
		var gl = Core.getInstance().getGL();
		super((<any>gl).TEXTURE_3D);
		options = options || {};

		console.log(this.target);

		var compressed = options["compressed"] === true;
		
		var _internalformat = options["internalformat"] || gl.RGBA;
		var _format = options["format"] || gl.RGBA;
		var _type = options["type"] || gl.UNSIGNED_BYTE;

		if(compressed) {
      		/*gl.compressedTexImage3D(
      			this.target,
				0,  // level
      			format,
        		size.x,
        		size.y,
        		size.z,
        		0,
        		data);*/
		} else {
			(<any>gl).texSubImage3D(
				this.target, 
				0,  // level
				_internalformat,	// Internal format A GLenum specifying the format of the texel data
	        	size.x,
	        	size.y,
	        	size.z,
	        	0,
	        	_format,	// Format2
	        	_type,	// A GLenum specifying the data type of the texel data
	        	data
			);
		}
	}
	public bind(slot?: number) {
		var gl = Core.getInstance().getGL();
		if(typeof slot === "number") {
			gl.activeTexture(gl.TEXTURE0 + slot);
		}
		gl.bindTexture(this.target, this._handle);
	}

	public destroy() {

	}
}
