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


import { Core } from "../core/Core";
import { Vect2 } from "../maths/Vect2";
import { SimpleTexture2D } from "../textures/SimpleTexture2D";
import { TexOptions } from "../textures/Texture";
import { Framebuffer } from "../core/Framebuffer";

import { TextureFormat, TextureType } from "../constants/Constants";

"use strict";

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
     * GBuffer constructor
     * @param {Vect2} size GBuffer size
     */
    constructor(size: Vect2) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();

        const configTex: TexOptions = {
            internalFormat: TextureFormat.RGB,
            format: TextureFormat.RGB,
            type: gl.FLOAT,
            minFilter: TextureType.Nearest,
            magFilter: TextureType.Nearest
        };

        this.Framebuffer = new Framebuffer([
            // Position color buffer
            new SimpleTexture2D(size, configTex),
            // Normal color buffer
            new SimpleTexture2D(size, configTex),
            // Color + Specular color buffer
            new SimpleTexture2D(size, configTex)
        ], size, true, true, {});

        console.log("done");
    };
    /**
     * Bind GBuffer for reading (pospass)
     */
    public bindForReading() {
        this.Framebuffer.onlyBindTextures();
    };
    /**
     * Bind GBuffer for writing (prepass)
     */
    public bindForWriting() {
        this.Framebuffer.bind();
    };
    /**
     * Destroy GBuffer
     */
    public destroy() {
        if (this.Framebuffer) {
            this.Framebuffer.destroy();
        }
    };
    /**
     * Rebuild GBuffer
     * @param {Vect2} size New GBuffer size
     */
    public rebuild(size: Vect2) {
        this.Framebuffer.rebuild(size);
    };
};

export { GBuffer };
