/// <reference path="../core/core.ts" />
/// <reference path="vector2.ts" />
/// <reference path="../core/program.ts" />
/// <reference path="../core/blend.ts" />
/// <reference path="../core/cull.ts" />
/// <reference path="../core/depth.ts" />

class Woit {
	constructor() {
		const gl = Core.getInstance().getGL();
		this.fbo = gl.createFramebuffer();
		this.accBufTexId = gl.createTexture();
		this.depthBuffTexId = gl.createTexture();
		this.revealBuffId = gl.createTexture();

		this.initPlane();

		this.color0 = new Float32Array([0.0, 0.0, 0.0, 0.0]);
		this.color1 = new Float32Array([1.0, 0.0, 0.0, 0.0]);
	}
	public resize(size: Vector2<number>) {
		var w: number = size.x;
		var h: number = size.y;

		const gl = Core.getInstance().getGL();
		gl.bindTexture(gl.TEXTURE_2D, this.accBufTexId);
		gl.texImage2D(gl.TEXTURE_2D, 0, (<any>gl).RGBA16F, w, h, 0, gl.RGBA, gl.FLOAT, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);

		gl.bindTexture(gl.TEXTURE_2D, this.depthBuffTexId);
		gl.texImage2D(gl.TEXTURE_2D, 0, (<any>gl).DEPTH_COMPONENT24, w, h, 0, 
			gl.DEPTH_COMPONENT, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		gl.bindTexture(gl.TEXTURE_2D, this.revealBuffId);
		gl.texImage2D(gl.TEXTURE_2D, 0, (<any>gl).R16F, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, 
			this.accBufTexId, 0);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, 
			this.depthBuffTexId, 0);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, (<any>gl).COLOR_ATTACHMENT1, gl.TEXTURE_2D, 
			this.revealBuffId, 0);

		/*const GLenum buffs[2] = { gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1 };
		glDrawBuffers(2, buffs);

		if (gl.FRAMEBUFFER_COMPLETE != glCheckFramebufferStatus(gl.FRAMEBUFFER))
		{
			std::cerr << "Error configurando el FBO" << std::endl;
			exit(-1);
		}*/

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}
	public firstStep(prog: Program, near: number, far: number, 
		cullFace: boolean, alfa: number, w: number) {
		if (cullFace) {
			Cull.enable();
		}
		else {
			Cull.disable();
		}
		this.clearBuffers();
		const gl = Core.getInstance().getGL();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
		Core.getInstance().clearColorAndDepth();
		//fwShader.add_uniform("near");
		//fwShader.add_uniform("far");
		//fwShader.add_uniform("alfa");
		//fwShader.add_uniform("ww");
		//glUniform1f(fwShader.uniform("near"), near_);
		//glUniform1f(fwShader.uniform("far"), far_);
		//glUniform1f(fwShader.uniform("alfa"), alfa);
		//glUniform1f(fwShader.uniform("ww"), ww);

		Depth.unuse();
		Blend.enable();

		//glBlendFunci(0, GL_ONE, GL_ONE);
		//glBlendFunci(1, GL_ZERO, GL_ONE_MINUS_SRC_ALPHA);
	}
	public secondStep(prog: Program, near, far) {
		const gl = Core.getInstance().getGL();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
		Blend.disable();
		Blend.func(BlendingType.OneMinusSrcAlpha, BlendingType.SrcAlpha);

		//postShader.use();
		//postShader.add_uniform("accumTexture");
		//postShader.add_uniform("revealageTexture");
		//postShader.add_uniform("near");
		//postShader.add_uniform("far");

		//if (postShader.uniform("accumTexture") != -1) {
		//	glActiveTexture(GL_TEXTURE0);
		//	glBindTexture(GL_TEXTURE_2D, accumBuffTexId);
		//	glUniform1i(postShader.uniform("accumTexture"), 0);
		//}

		//if (postShader.uniform("revealageTexture") != -1) {
		//	glActiveTexture(GL_TEXTURE1);
		//	glBindTexture(GL_TEXTURE_2D, revealageBuffTexId);
		//	glUniform1i(postShader.uniform("revealageTexture"), 1);
		//}

		//glUniform1f(postShader.uniform("near"), near_);
		//glUniform1f(postShader.uniform("far"), far_);

		Cull.disable();
		Blend.disable();

		//glBindVertexArray(planeVAO);
		//glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);

		//glDepthMask(GL_TRUE);
		//glDisable(GL_BLEND);

		////glEnable(GL_CULL_FACE);	// TODO: Activar/desactivar cullface
		//postShader.unuse();

	}
	protected clearBuffers() {
		const gl = Core.getInstance().getGL();
		(<any>gl).clearBufferfv((<any>gl).COLOR, 0, this.color0);
		(<any>gl).clearBufferfv((<any>gl).COLOR, 1, this.color1);
	}
	protected initPlane() {

	}

	public fbo;
	public accBufTexId;
	public depthBuffTexId;
	public revealBuffId;

	public planeVAO;
	public planeVBO;
	public color0;
	public color1;
}