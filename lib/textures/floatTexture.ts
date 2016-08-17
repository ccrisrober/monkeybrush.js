/// <reference path="texture2d.ts" />
 class FloatTexture extends Texture2D {
 	constructor(image, size: vector2<number>, options = {}) {
 		options = options || {};
 		// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.FLOAT, null);
 		super(image, options);
 	}
 }