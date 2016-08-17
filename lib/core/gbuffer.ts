/// <reference path="../extras/Vector2.ts" />
/// <reference path="core.ts" />

enum gbuffer_type {
	position,
	normal,
	diffuse,
	num_textures
}

class GBuffer {
	protected _fbo: WebGLFramebuffer;

	protected _depthTexture;
	protected _textures: Array<WebGLTexture>;
	constructor(size: Vector2<number>) {
		const gl = Core.getInstance().getGL();

		this._textures = new Array(3);

		this._fbo = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);

		for (let i = 0; i < gbuffer_type.num_textures; ++i) {
			this._textures[i] = gl.createTexture();
		}

		const width = size.x;
		const height = size.y;

		// Position color buffer
		gl.bindTexture(gl.TEXTURE_2D, this._textures[gbuffer_type.position]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, 
			gl.RGBA, gl.FLOAT, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, 
			gl.TEXTURE_2D, this._textures[gbuffer_type.position], 0);

		// Normal color buffer
		gl.bindTexture(gl.TEXTURE_2D, this._textures[gbuffer_type.normal]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		/**
		gl.texImage2D(gl.TEXTURE_2D, 0, (<any>gl).RGB16F, width, height, 0, 
			gl.RGB, gl.FLOAT, null);
		/**/
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.FLOAT, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, (<any>gl).COLOR_ATTACHMENT1, 
			gl.TEXTURE_2D, this._textures[gbuffer_type.normal], 0);

		// Color + Specular color buffer
		gl.bindTexture(gl.TEXTURE_2D, this._textures[gbuffer_type.diffuse]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, 
			gl.FLOAT, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, (<any>gl).COLOR_ATTACHMENT2, 
			gl.TEXTURE_2D, this._textures[gbuffer_type.diffuse], 0);

		// create a renderbuffer object to store depth info
		this._depthTexture = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, this._depthTexture);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER,
								  gl.DEPTH_ATTACHMENT,
								  gl.RENDERBUFFER,
								  this._depthTexture);

		(<any>gl).drawBuffers([
			(<any>gl).COLOR_ATTACHMENT0,
			(<any>gl).COLOR_ATTACHMENT1,
			(<any>gl).COLOR_ATTACHMENT2
		]);
		let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

		if (status !== gl.FRAMEBUFFER_COMPLETE) {
			// console.log(`Framebuffer error. Status: ${status}`);
			switch (status) {
				case gl.FRAMEBUFFER_UNSUPPORTED:
					throw new Error("framebuffer: Framebuffer unsupported");
				case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
					throw new Error("framebuffer: Framebuffer incomplete attachment");
				case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
					throw new Error("framebuffer: Framebuffer incomplete dimensions");
				case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
					throw new Error("framebuffer: Framebuffer incomplete missing attachment");
				default:
					throw new Error("framebuffer: Framebuffer failed for unspecified reason");
			}
			// throw new Error("GBuffer error");
		}
		console.log("done");

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	public bindForReading() {
		const gl = Core.getInstance().getGL();

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		for (let i = 0; i < gbuffer_type.num_textures; ++i) {
			gl.activeTexture(gl.TEXTURE0 + i);
			gl.bindTexture(gl.TEXTURE_2D, this._textures[i]);
		}
	}

	public bindForWriting() {
		const gl = Core.getInstance().getGL();

		gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
	}

	public destroy() {
		const gl = Core.getInstance().getGL();
		if (this._fbo) {
			gl.deleteFramebuffer(this._fbo);
		}
		if (this._textures) {
			for (let i = 0; i < gbuffer_type.num_textures; ++i) {
				if (this._textures[i]) {
					gl.deleteTexture(this._textures[i]);
				}
			}
		}
		if (this._depthTexture) {
			gl.deleteRenderbuffer(this._depthTexture);
		}
	}
}