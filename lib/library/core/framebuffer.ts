/// <reference path="core.ts" />
/// <reference path="../textures/texture.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="..//maths/vector2.ts" />

"use strict";

// TODO: Redimension
// TODO: Blit FBO (https://www.opengl.org/wiki/Framebuffer#Blitting)
class Framebuffer {
	protected _size: Vector2<number>;
	protected _handle: WebGLFramebuffer;
	protected _attachments: Array<number>;
	public _renderBuffer: RenderBufferTexture;
	public _depth: SimpleTexture2D;

	public _colors: Array<Texture>;
	
	// TODO: Stencil unused
	constructor(textures: Array<Texture>, size: Vector2<number>, depth: boolean = false, stencil: boolean = false, options = {}) {
		const gl = Core.getInstance().getGL();

		let numColors = textures.length;
		if (numColors < 0) {
			throw new Error("must specify >= 0 color attachments");
		} else if (numColors > 1) {
			if (numColors > gl.getParameter((<any>gl).MAX_COLOR_ATTACHMENTS)) {
				throw new Error(`GL context doesn´t support ${numColors} color attachments`);
			}
		}

		options = options || {};

		this._colors = textures;
		this._size = size;

		this._handle = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);

		// Each textures to fbo
		textures.forEach((texture: Texture, i: number) => {
			texture.bind();

			// Only supported simple textures
			// TODO: Cubemap or texture3D
			let target = texture.target;

			gl.framebufferTexture2D(gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0 + i,
				target,
				texture.handle(), 0);

			(<any>texture).unbind();	// TODO: Unbind debería ser un abstract de texture
		});

		// TODO: Check no texture attachments (default render buffer storage)

		if (depth) {
			this._renderBuffer = new RenderBufferTexture(
				size,
				gl.DEPTH_COMPONENT16,
				gl.DEPTH_ATTACHMENT
			);
		}

		/**
		// TODO
		if (depth && stencil) {
			this._depth = new SimpleTexture2D(size, {
				type: (<any>gl).UNSIGNED_INT_24_8,
				format: gl.DEPTH_STENCIL
			});
			let target = this._depth.target;

			gl.framebufferTexture2D(gl.FRAMEBUFFER,
				gl.DEPTH_STENCIL_ATTACHMENT,
				target,
				this._depth.handle(), 0);
		} else if (depth && !stencil) {
			this._depth = new SimpleTexture2D(size, {
				type: (<any>gl).UNSIGNED_SHORT,
				format: gl.DEPTH_COMPONENT
			});
			let target = this._depth.target;

			gl.framebufferTexture2D(gl.FRAMEBUFFER,
				gl.DEPTH_ATTACHMENT,
				target,
				this._depth.handle(), 0);
		} else {
			this._renderBuffer = new RenderBufferTexture(
				size,
				gl.STENCIL_INDEX,
				gl.STENCIL_ATTACHMENT
			);
		}
		/**/

		if (numColors > 1) {
			let drawBuffs = [];
			for (let i = 0; i < numColors; i++) {
				drawBuffs.push(gl.COLOR_ATTACHMENT0 + i);
			}
			(<any>gl).drawBuffers(drawBuffs);
		}

		// Check status
		let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if (status !== gl.FRAMEBUFFER_COMPLETE) {
			this.destroy();
			this.checkStatus(status);
		}
		this.unbind();
	}

	private checkStatus(status: number) {
		const gl = Core.getInstance().getGL();
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
	}

	public bind() {
		const gl = Core.getInstance().getGL();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
	}

	public onlyBindTextures() {
		const gl = Core.getInstance().getGL();

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		this._colors.forEach((tex: Texture, idx: number) => {
			tex.bind(idx);
		});
	}

	public unbind() {
		const gl = Core.getInstance().getGL();
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	public rebuild(size: Vector2<number>) {
		if (!size.isEqual(this._size)) {

		}
	}

	public destroy() {
		const gl = Core.getInstance().getGL();
		let oldBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);

		if (oldBinding === this._handle) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}

		this._colors.forEach((texture: Texture) => {
			texture.destroy();
		});

		gl.deleteFramebuffer(this._handle);

		// Destroy depth/stencil
		if (this._renderBuffer) {
			this._renderBuffer.destroy();
			this._renderBuffer = null;
		}

		// Destroy depth
		if (this._depth) {
			this._depth.destroy();
			this._depth = null;
		}
	}
}