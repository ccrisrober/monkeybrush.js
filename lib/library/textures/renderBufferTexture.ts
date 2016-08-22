/// <reference path="..//maths/vector2.ts" />
/// <reference path="../core/Core.ts" />

"use strict";

class RenderBufferTexture {
    protected _handle: WebGLRenderbuffer;
    constructor(size: Vector2<number>, format: number, attachment: number) {
        const gl = Core.getInstance().getGL();
        this._handle = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
        gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, this._handle);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }
    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
    }
}