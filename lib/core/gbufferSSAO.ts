/// <reference path="../extras/Vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/texture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="core.ts" />
/// <reference path="../gl-matrix.d.ts" />

// https://bitbucket.org/masterurjc/practica1/src/2a06c91942814954c1a1ae489d78705a5b5317e1/RenderingAvanzado1/GBufferSSAO.h?at=FINISH&fileviewer=file-view-default

enum gbufferssao_type {
	position,
	normal,
	diffuse,
	num_textures
}

// TODO: Find a good random uniform number generator

class GBufferSSAO {
	protected _fbo: WebGLFramebuffer;

	protected kernelSize: number;
	protected ssaoKernel: Array<Float32Array> = [];
	protected ssaoNoise: Array<number> = [];

	protected _depthTexture; RenderBufferTexture;
	protected _textures: Array<SimpleTexture2D> = new Array(gbufferssao_type.num_textures);
	constructor(size: Vector2<number>) {
		const gl = Core.getInstance().getGL();

		this._textures = new Array(3);

		this._fbo = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);

		const width = size.x;
		const height = size.y;

		// Position color buffer
		(this._textures[gbufferssao_type.position] = new SimpleTexture2D(size, {
			"internalformat": (gl).RGBA,
			"format": gl.RGBA,
			"type": gl.FLOAT,
			"minFilter": gl.NEAREST,
			"maxFilter": gl.NEAREST,
			"wrap": [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
		})).unbind();
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, 
			gl.TEXTURE_2D, this._textures[gbufferssao_type.position].handle(), 0);

		// Normal color buffer
		(this._textures[gbufferssao_type.normal] = new SimpleTexture2D(size, {
			"internalformat": gl.RGB,
			"format": gl.RGB,
			"type": gl.FLOAT,
			"minFilter": gl.NEAREST,
			"maxFilter": gl.NEAREST
		})).unbind();
		this._textures[gbufferssao_type.normal].unbind();
		gl.framebufferTexture2D(gl.FRAMEBUFFER, (<any>gl).COLOR_ATTACHMENT1, 
			gl.TEXTURE_2D, this._textures[gbufferssao_type.normal].handle(), 0);

		// Color + Specular color buffer
		(this._textures[gbufferssao_type.diffuse] = new SimpleTexture2D(size, {
			"internalformat": gl.RGBA,
			"format": gl.RGBA,
			"type": gl.FLOAT,
			"minFilter": gl.NEAREST,
			"maxFilter": gl.NEAREST
		})).unbind();
		gl.framebufferTexture2D(gl.FRAMEBUFFER, (<any>gl).COLOR_ATTACHMENT2, 
			gl.TEXTURE_2D, this._textures[gbufferssao_type.diffuse].handle(), 0);

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


		function lerp(a: number, b: number, f: number): number {
			return a + f * (b - a);
		}

		this.kernelSize = 128;

		function randomFloats(min, max) {
    		return Math.random() * (max - min) + min;
		}

		for (let i = 0; i < this.kernelSize; i++) {
			let sample = vec3.fromValues(
				randomFloats(0.0, 1.0) * 2.0 - 1.0,
				randomFloats(0.0, 1.0) * 2.0 - 1.0,
				randomFloats(0.0, 1.0)
			);
			vec3.normalize(sample, sample);
			sample[0] *= randomFloats(0.0, 1.0);
			sample[1] *= randomFloats(0.0, 1.0);
			sample[2] *= randomFloats(0.0, 1.0);

			// Scale samples s.t. they're more aligned to center of kernel
			let scale = (i * 1.0) / (this.kernelSize * 1.0);
			sample[0] *= scale;
			sample[1] *= scale;
			sample[2] *= scale;

			this.ssaoKernel.push(sample);
		}

		// Noise texture
		for (let i = 0; i < 16; ++i) {
			// rotate around z-axis (in tangent space)
			let noise = vec3.fromValues(
				randomFloats(0.0, 1.0) * 2.0 - 1.0,
				randomFloats(0.0, 1.0) * 2.0 - 1.0,
				0.0
			);
			this.ssaoNoise.push(noise[0]);
			this.ssaoNoise.push(noise[1]);
			this.ssaoNoise.push(noise[2]);
		}
		/*let noiseTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, /*gl.RGB16F*/ /*gl.RGBA, 
			4, 4, 0, gl.RGB, gl.FLOAT, new Float32Array(this.ssaoNoise));
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
			gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, 
			gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, 
			gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, 
			gl.REPEAT);*/

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

	public bindForSSAO() {

	}
	public sendSamplesSSAOTexture(progName: string) {

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