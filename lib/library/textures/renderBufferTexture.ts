/// <reference path="../maths/vector2.ts" />
/// <reference path="../core/Core.ts" />

import Core from "../core/core"
import Vector2 from "../maths/vector2"

"use strict";

const gl = Core.getInstance().getGL();

class RenderBufferTexture {
    protected _handle: WebGLRenderbuffer;
    constructor(size: Vector2<number>, format: number, attachment: number) {
        this._handle = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
        gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, this._handle);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }
    public destroy() {
        gl.deleteTexture(this._handle);
    }
};

export default RenderBufferTexture;