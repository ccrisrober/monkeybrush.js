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


/// <reference path="../maths/vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="core.ts" />
/// <reference path="framebuffer.ts" />

import { Core } from "./core";
import { Vector2 } from "../maths/vector2";
import { SimpleTexture2D } from "../textures/simpleTexture2d";
import { Framebuffer } from "./framebuffer";

"use strict";

enum gbuffer_type {
    position,
    normal,
    diffuse,
    num_textures
}
/**
 * GBuffer class
 * @class GBuffer
 */
class GBuffer {
    /**
     * [framebuffer description]
     * @type {Framebuffer}
     */
    protected framebuffer: Framebuffer;
    /**
     * [constructor description]
     * @param {Vector2<number>} size [description]
     */
    constructor(size: Vector2<number>) {
        const gl = Core.getInstance().getGL();

        this.framebuffer = new Framebuffer([
            // Position color buffer
            new SimpleTexture2D(size, {
                internalFormat: gl.RGB,
                format: gl.RGB,
                type: gl.FLOAT,
                minFilter: gl.NEAREST,
                magFilter: gl.NEAREST
            }),
            // Normal color buffer
            new SimpleTexture2D(size, {
                internalFormat: gl.RGB,
                format: gl.RGB,
                type: gl.FLOAT,
                minFilter: gl.NEAREST,
                magFilter: gl.NEAREST
            }),
            // Color + Specular color buffer
            new SimpleTexture2D(size, {
                internalFormat: gl.RGB,
                format: gl.RGB,
                type: gl.FLOAT,
                minFilter: gl.NEAREST,
                magFilter: gl.NEAREST
            })
        ], size, true, true, {});

        console.log("done");
    }
    /**
     * [bindForReading description]
     */
    public bindForReading() {
        this.framebuffer.onlyBindTextures();
    }
    /**
     * [bindForWriting description]
     */
    public bindForWriting() {
        this.framebuffer.bind();
    }
    /**
     * [destroy description]
     */
    public destroy() {
        if (this.framebuffer) {
            this.framebuffer.destroy();
        }
    }
    public rebuild(size: Vector2<number>) {
        this.framebuffer.rebuild(size);
    }
};

export { GBuffer };
