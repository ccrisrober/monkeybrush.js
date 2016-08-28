/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


/// <reference path="core.ts" />
/// <reference path="../textures/texture.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="..//maths/vector2.ts" />
///
import { Core } from "./core";
import { Texture } from "../textures/texture";
import { SimpleTexture2D } from "../textures/simpleTexture2D";
import { RenderBufferTexture } from "../textures/renderBufferTexture";
import { Vector2 } from "../maths/vector2";

"use strict";

const gl = Core.getInstance().getGL();

// TODO: Blit FBO (https://www.opengl.org/wiki/Framebuffer#Blitting)
class Framebuffer {
    protected _size: Vector2<number>;
    protected _handle: WebGLFramebuffer;
    protected _attachments: Array<Texture>;
    public _renderBuffer: RenderBufferTexture;
    public _depth: SimpleTexture2D;

    // TODO: Stencil unused
    constructor(textures: Array<Texture>, size: Vector2<number>, depth: boolean = false,
        stencil: boolean = false, options = {}) {
        let numColors = textures.length;
        if (numColors < 0) {
            throw new Error("must specify >= 0 color attachments");
        } else if (numColors > 1) {
            if (numColors > gl.getParameter(gl.MAX_COLOR_ATTACHMENTS)) {
                throw new Error(`GL context doesn´t support ${numColors} color attachments`);
            }
        }

        options = options || {};

        this._attachments = textures;
        this._size = size;

        this._handle = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);

        // Each textures to fbo
        this._attachments.forEach((texture: Texture, i: number) => {
            texture.bind();

            // Only supported simple textures
            let target = texture.target;

            gl.framebufferTexture2D(gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0 + i,
                target,
                texture.handle(), 0);

            (<any>texture).unbind();    // TODO: Unbind debería ser un abstract de texture
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
                type: gl.UNSIGNED_INT_24_8,
                format: gl.DEPTH_STENCIL
            });
            let target = this._depth.target;

            gl.framebufferTexture2D(gl.FRAMEBUFFER,
                gl.DEPTH_STENCIL_ATTACHMENT,
                target,
                this._depth.handle(), 0);
        } else if (depth && !stencil) {
            this._depth = new SimpleTexture2D(size, {
                type: gl.UNSIGNED_SHORT,
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
            for (let i = 0; i < numColors; ++i) {
                drawBuffs.push(gl.COLOR_ATTACHMENT0 + i);
            }
            gl.drawBuffers(drawBuffs);
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
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
    }

    public onlyBindTextures() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._attachments.forEach((tex: Texture, idx: number) => {
            tex.bind(idx);
        });
    };
    public unbind() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    public rebuild(size: Vector2<number>) {
        if (!size.isEqual(this._size)) {
            // TODO
            this._attachments.forEach((tex: Texture) => {
                tex.resize(size);
            });
            if (this._depth) {
                // TODO
            }
            if (this._renderBuffer) {
                this._renderBuffer.resize(size);
            }
        }
    };
    public destroy() {
        let oldBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);

        if (oldBinding === this._handle) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        this._attachments.forEach((texture: Texture) => {
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
    };
    public blit(fbo: Framebuffer) {
        // TODO: gl.blitFramebuffer()
    }
};

export { Framebuffer };
