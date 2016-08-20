/// <reference path="core.ts" />
/// <reference path="../textures/texture.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="../extras/Vector2.ts" />

// TODO: Redimension
// TODO: Blit FBO (https://www.opengl.org/wiki/Framebuffer#Blitting)
class Framebuffer {
	protected _size: Vector2<number>;
	protected _handle: WebGLFramebuffer;
	protected _attachments: Array<number>;
	//protected _depth: Texture;
	public _renderBuffer : RenderBufferTexture;
	// protected _colorBuffer: Texture;

	public _colors: Array<Texture>;

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

		if(depth) {
			this._renderBuffer = new RenderBufferTexture(
				size,
				gl.DEPTH_COMPONENT16,
				gl.DEPTH_ATTACHMENT
			);
		}

		/**
		if (depth && stencil) {
				// TODO options.floatDepth ??
			this._depth = initTexture2D(size, gl.UNSIGNED_INT_24_8, gl.DEPTH_STENCIL, gl.DEPTH_STENCIL_ATTACHMENT);
		} else if (depth && !stencil) {
			this._depth = initTexture2D(size, gl.UNSIGNED_SHORT, gl.DEPTH_ATTACHMENT, gl.DEPTH_ATTACHMENT);
		} else if (!depth && stencil) {
			this._renderBuffer = this.createRenderBuffer(size, gl.STENCIL_INDEX, gl.STENCIL_ATTACHMENT);
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
			this._throwFBOError(status);
		}
		this.unbind();
	}

	private _throwFBOError(status: number) {
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

		/*if (this._depth) {
			this._depth.destroy();
			this._depth = null;
		}*/

		// Destroy depth/stencil
		if (this._renderBuffer) {
			this._renderBuffer.destroy();
			this._renderBuffer = null;
		}

		// Color buffer default TODO
	}
}