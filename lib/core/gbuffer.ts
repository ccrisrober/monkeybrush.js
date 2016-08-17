/// <reference path="../extras/Vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="core.ts" />

enum gbuffer_type {
	position,
	normal,
	diffuse,
	num_textures
}

class GBuffer {
	protected _fbo: WebGLFramebuffer;

	protected _depthTexture; RenderBufferTexture;
	protected _textures: Array<SimpleTexture2D> = new Array(gbuffer_type.num_textures);
	constructor(size: Vector2<number>) {
		const gl = Core.getInstance().getGL();

		this._textures = new Array(3);

		this._fbo = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);

		const width = size.x;
		const height = size.y;

		// Position color buffer
		(this._textures[gbuffer_type.position] = new SimpleTexture2D(size, {
			"internalformat": gl.RGB,
			"format": gl.RGB,
			"type": gl.FLOAT,
			"minFilter": gl.NEAREST,
			"maxFilter": gl.NEAREST
		})).unbind();
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, 
			gl.TEXTURE_2D, this._textures[gbuffer_type.position].handle(), 0);

		// Normal color buffer
		(this._textures[gbuffer_type.normal] = new SimpleTexture2D(size, {
			"internalformat": gl.RGB,
			"format": gl.RGB,
			"type": gl.FLOAT,
			"minFilter": gl.NEAREST,
			"maxFilter": gl.NEAREST
		})).unbind();
		this._textures[gbuffer_type.normal].unbind();
		gl.framebufferTexture2D(gl.FRAMEBUFFER, (<any>gl).COLOR_ATTACHMENT1, 
			gl.TEXTURE_2D, this._textures[gbuffer_type.normal].handle(), 0);

		// Color + Specular color buffer
		(this._textures[gbuffer_type.diffuse] = new SimpleTexture2D(size, {
			"internalformat": gl.RGBA,
			"format": gl.RGBA,
			"type": gl.FLOAT,
			"minFilter": gl.NEAREST,
			"maxFilter": gl.NEAREST
		})).unbind();
		gl.framebufferTexture2D(gl.FRAMEBUFFER, (<any>gl).COLOR_ATTACHMENT2, 
			gl.TEXTURE_2D, this._textures[gbuffer_type.diffuse].handle(), 0);

		// create a renderbuffer object to store depth info

		this._depthTexture = new RenderBufferTexture(
			size,
			gl.DEPTH_COMPONENT16,
			gl.DEPTH_ATTACHMENT
		);

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
		this._textures.forEach((tex: SimpleTexture2D, idx: number) => {
			tex.bind(idx);
		});
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
			this._textures.forEach((tex: SimpleTexture2D) => {
				tex.destroy();
			});
		}
		if (this._depthTexture) {
			this._depthTexture.destroy();
		}
	}
}