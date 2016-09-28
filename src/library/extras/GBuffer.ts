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

"use strict";

namespace MBX {
    /**
     * GBuffer class
     * This class lets you use deferred shading technique.
     * @class GBuffer
     */
    export class GBuffer {
        /**
         * Framebuffer handler
         * @type {Framebuffer}
         */
        protected Framebuffer: MB.Framebuffer;
        /**
         * GBuffer constructor.
         * @param {GLContext} context [description]
         * @param {MB.Vect2} size GBuffer size
         */
        constructor(context: MB.GLContext, size: MB.Vect2) {

            const configTex: MB.TexOptions = {
                internalFormat: MB.ctes.PixelFormat.RGB,
                format: MB.ctes.PixelFormat.RGB,
                type: MB.ctes.DataType.Float,
                minFilter: MB.ctes.TextureFilter.Nearest,
                magFilter: MB.ctes.TextureFilter.Nearest
            };

            this.Framebuffer = new MB.Framebuffer(context, [
                // Position color buffer
                new MB.SimpleTexture2D(context, null, size, {
                    internalFormat: MB.ctes.PixelFormat.RGBA,
                    format: MB.ctes.PixelFormat.RGBA,
                    type: MB.ctes.DataType.Float,
                    minFilter: MB.ctes.TextureFilter.Nearest,
                    magFilter: MB.ctes.TextureFilter.Nearest
                }),
                // Normal color buffer
                new MB.SimpleTexture2D(context, null, size, configTex),
                // Color + Specular color buffer
                new MB.SimpleTexture2D(context, null, size, configTex)
            ], size, true, true, {});

            MB.Log.debug("GBuffer created");
        };
        /**
         * Bind GBuffer for reading (postpass)
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
        public rebuild(size: MB.Vect2) {
            this.Framebuffer.rebuild(size);
        };
    };
};
