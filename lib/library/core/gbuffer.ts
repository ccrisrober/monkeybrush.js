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


/// <reference path="../maths/Vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="Core.ts" />
/// <reference path="Framebuffer.ts" />

import { Core } from "./Core";
import { Vect2 } from "../maths/Vect2";
import { TextureType } from "../constants/TextureType";
import { TextureFormat } from "../constants/TextureFormat";
import { SimpleTexture2D } from "../textures/SimpleTexture2D";
import { Framebuffer } from "./Framebuffer";

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
     * [Framebuffer description]
     * @type {Framebuffer}
     */
    protected Framebuffer: Framebuffer;
    /**
     * [constructor description]
     * @param {Vect2} size [description]
     */
    constructor(size: Vect2) {
        const gl = Core.getInstance().getGL();

        this.Framebuffer = new Framebuffer([
            // Position color buffer
            new SimpleTexture2D(size, {
                internalFormat: TextureFormat.RGBA,
                format: TextureFormat.RGBA,
                type: gl.FLOAT,
                minFilter: TextureType.Nearest,
                magFilter: TextureType.Nearest
            }),
            // Normal color buffer
            new SimpleTexture2D(size, {
                internalFormat: TextureFormat.RGB,
                format: TextureFormat.RGB,
                type: gl.FLOAT,
                minFilter: TextureType.Nearest,
                magFilter: TextureType.Nearest
            }),
            // Color + Specular color buffer
            new SimpleTexture2D(size, {
                internalFormat: TextureFormat.RGB,
                format: TextureFormat.RGB,
                type: gl.FLOAT,
                minFilter: TextureType.Nearest,
                magFilter: TextureType.Nearest
            })
        ], size, true, true, {});

        console.log("done");
    }
    /**
     * [bindForReading description]
     */
    public bindForReading() {
        this.Framebuffer.onlyBindTextures();
    }
    /**
     * [bindForWriting description]
     */
    public bindForWriting() {
        this.Framebuffer.bind();
    }
    /**
     * [destroy description]
     */
    public destroy() {
        if (this.Framebuffer) {
            this.Framebuffer.destroy();
        }
    }
    public rebuild(size: Vect2) {
        this.Framebuffer.rebuild(size);
    }
};

export { GBuffer };
