/// <reference path="core.ts" />
/// <reference path="../textures/texture.ts" />
/// <reference path="../extras/vector2.ts" />

class Framebuffer {
	protected _size: vector2<number>;
	protected _handle: WebGLFramebuffer;
	protected _attachments: Array<number>;
	protected _depth: Texture;
	protected _renderBuffer;//: Texture;
	//protected _colorBuffer: Texture;

	protected _colors: Array<Texture>;

	constructor(textures: Array<Texture>, size: vector2<number>, depth: boolean = false, stencil: boolean = false, options = {}) {
		var gl = Core.getInstance().getGL();

		var numColors = textures.length;
		if(numColors < 0) {
			throw new Error('must specify >= 0 color attachments');
		} else if(numColors > 1) {
			if(numColors > gl.getParameter((<any>gl).MAX_COLOR_ATTACHMENTS)) {
				throw new Error(`GL context doesn´t support ${numColors} color attachments`);
			}
		}

		options = options || {};

		this._colors = textures;

		this._handle = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);

		// Each textures to fbo
		textures.forEach((texture: /*TODO: Texture*/any, i: number) => {
			texture.bind();

			// Only supported simple textures
			// TODO: Cubemap or texture3D
			var target = texture.target;

			gl.framebufferTexture2D(gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0 + i,
				target,
				texture.handle, 0);
		});


		// Attachment indices
		this._attachments = textures.map((texture: /*TODO: Texture*/ any, i: number) => {
			return gl.COLOR_ATTACHMENT0 + i;
		});

		// TODO: Check no texture attachments (default render buffer storage)

		/**
		if(depth && stencil) {
				// TODO options.floatDepth ??
			this._depth = initTexture2D(size, gl.UNSIGNED_INT_24_8, gl.DEPTH_STENCIL, gl.DEPTH_STENCIL_ATTACHMENT);
		} else if(depth && !stencil) {
			this._depth = initTexture2D(size, gl.UNSIGNED_SHORT, gl.DEPTH_ATTACHMENT, gl.DEPTH_ATTACHMENT);
		} else if (!depth && stencil) {
			this._renderBuffer = this.createRenderBuffer(size, gl.STENCIL_INDEX, gl.STENCIL_ATTACHMENT);
		}
		/**/

		// Check status
		var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if(status !== gl.FRAMEBUFFER_COMPLETE) {
			this.destroy();
			this._throwFBOError(status);
		}
	}

	private _throwFBOError(status: number) {
		var gl = Core.getInstance().getGL();
		switch(status) {
			case gl.FRAMEBUFFER_UNSUPPORTED:
				throw new Error('framebuffer: Framebuffer unsupported')
			case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
				throw new Error('framebuffer: Framebuffer incomplete attachment')
			case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
				throw new Error('framebuffer: Framebuffer incomplete dimensions')
			case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
				throw new Error('framebuffer: Framebuffer incomplete missing attachment')
			default:
				throw new Error('framebuffer: Framebuffer failed for unspecified reason')
		}
	}

	public bind() {
		var gl = Core.getInstance().getGL();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
		if(this._attachments.length > 1) {
			// Draw buffers de los attachments
		}
	}

	public unbind() {
		var gl = Core.getInstance().getGL();
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	public rebuild(size: vector2<number>) {
		if(!size.isEqual(this._size)) {

		}
	}

	public destroy() {
		var gl = Core.getInstance().getGL();
		var oldBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);

		if(oldBinding === this._handle) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}

		this._colors.forEach((texture: Texture) => {
			texture.destroy();
		});

		gl.deleteFramebuffer(this._handle);

		if(this._depth) {
			this._depth.destroy();
			this._depth = null;
		}

		// Destroy depth/stencil
		if(this._renderBuffer) {
			//this._renderBuffer.destroy();
			//gl.deleteRenderbuffer(this._renderBuffer)
			this._renderBuffer = null
		}

		// Color buffer default TODO
	}

	protected createRenderBuffer(size: vector2<number>, format: number, attachment: number): WebGLRenderbuffer {
		var gl = Core.getInstance().getGL();
		var res = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, res);
		gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, null);
		return res;
	}
}