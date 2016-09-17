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

namespace MB {
    export namespace extras {
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
            protected Framebuffer: MB.core.Framebuffer;
            /**
             * GBuffer constructor
             * @param {MB.maths.Vect2} size GBuffer size
             */
            constructor(size: MB.maths.Vect2) {
                const gl: WebGL2RenderingContext = MB.core.Core.getInstance().getGL();

                const configTex: MB.textures.TexOptions = {
                    internalFormat: MB.ctes.TextureFormat.RGB,
                    format: MB.ctes.TextureFormat.RGB,
                    type: gl.FLOAT,
                    minFilter: MB.ctes.TextureType.Nearest,
                    magFilter: MB.ctes.TextureType.Nearest
                };

                this.Framebuffer = new MB.core.Framebuffer([
                    // Position color buffer
                    new MB.textures.SimpleTexture2D(size, configTex),
                    // Normal color buffer
                    new MB.textures.SimpleTexture2D(size, configTex),
                    // Color + Specular color buffer
                    new MB.textures.SimpleTexture2D(size, configTex)
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
            public rebuild(size: MB.maths.Vect2) {
                this.Framebuffer.rebuild(size);
            };
        };
    };
};
