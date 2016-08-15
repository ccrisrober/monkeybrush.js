/// <reference path="../extras/vec2.ts" />
/// <reference path="../core/Core.ts" />

class RenderBufferTexture {
	protected _handle : WebGLRenderbuffer;
	constructor(size: vec2<number>, format: number, attachment: number) {
		var gl = Core.getInstance().getGL();
		this._handle = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
		gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, null);
	}
}