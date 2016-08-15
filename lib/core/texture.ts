/// <reference path="core.ts" />

"use strict";

class _Texture {
	public loadTexture(textureName: string) {
		// Create texture object
		var img = new Image();

		img.onload = () => {
			this._processLoadedImage(textureName, img);
		}
		img.src = textureName;
	}
	public unloadTexture(textureName: string) {
		var gl = Core.getInstance().getGL();
		//gl.deleteTexture()
	}
	public activateTexture() {}
	public deactivateTexture() {}

	protected _processLoadedImage(textureName: string, img: any) { // TODO: img will be image
		var gl: WebGLRenderingContext = Core.getInstance().getGL();

		// Generate a texture reference to webgl ctx
		var textureID = gl.createTexture();

        // bind the texture reference with the current texture functionality in the webGL
        gl.bindTexture(gl.TEXTURE_2D, textureID);
	}
}