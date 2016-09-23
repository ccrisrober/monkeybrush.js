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
    export abstract class RenderBuffer {
        /**
         * Renderbuffer interla handler
         * @type {WebGLRenderbuffer}
         */
        protected _handler: WebGLRenderbuffer;
        /**
         * Renderbuffer size (width and height).
         * @type {MB.Vect2}
         */
        protected _size: MB.Vect2;
        /**
         * Rendebuffer samples
         * @type {number}
         */
        protected _samples: number;
        /**
         * Renderbuffer internal format.
         * @type {number}
         */
        protected _format: number;
        /**
         * Renderbuffer attachment point (p.e. COLOR_ATTACHMENT or DEPTH_STENCL_ATTACHMENT)
         * @type {number}
         */
        protected _attachment: number;
        constructor(size: MB.Vect2, format: number, attachment: number, samples: number = 4) {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            this._handler = gl.createRenderbuffer();
            this._size = size;
            this._format = format;
            this._samples = samples;
            this._attachment = attachment;
        };
        /**
         * Bind renderbuffer.
         */
        public bind() {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._handler);
        };
        /**
         * Unbind render buffer.
         */
        public unbind() {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        /**
         * Destroy renderbuffer texture.
         */
        public destroy() {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            gl.deleteTexture(this._handler);
        };
        public abstract resize(size: MB.Vect2);
    };
};
