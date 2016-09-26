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

    declare var WebGL2RenderingContext: any;

    export class VertexArray {
        protected _context: GLContext;
        /**
         * [_handler description]
         * @type {WebGLVertexArrayObject}
         */
        protected _handler: WebGLVertexArrayObject;
        /**
         * Vertex array constructor
         * @param {WebGLVertexArrayObject} vao [description]
         */
        // TODO: DOC
        constructor(context: GLContext) {
            this._context = context;
            const gl: WebGL2RenderingContext = this._context.gl;
            if (gl instanceof WebGL2RenderingContext) {
                this._handler = gl.createVertexArray();
            } else {
                const ext = Extensions.get(this._context, "OES_vertex_array_object");
                if (ext) {
                    this._handler = ext.createVertexArrayOES();
                }
            }
            this.bind();
        }
        /**
         * [wrap description]
         * @param {WebGLVertexArrayObject} vao [description]
         */
        public static wrap(vao: any /*WebGLVertexArrayObject*/) {
            return new VertexArray(vao);
        }
        /**
         * [bind description]
         */
        public bind() {
            const gl: WebGL2RenderingContext = this._context.gl;
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindVertexArray(this._handler);
                return;
            }
            const ext = Extensions.get(this._context, "OES_vertex_array_object");
            if (ext) {
                ext.bindVertexArrayOES(this._handler);
            }
        }
        /**
         * [unbind description]
         */
        public unbind() {
            const gl: WebGL2RenderingContext = this._context.gl;
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindVertexArray(null);
                return;
            }
            const ext = Extensions.get(this._context, "OES_vertex_array_object");
            if (ext) {
                ext.bindVertexArrayOES(null);
            }
        }
        /**
         * Destroy vertex array
         */
        public destroy() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this.bind();
            if (gl instanceof WebGL2RenderingContext) {
                gl.deleteVertexArray(this._handler);
                return;
            }
            const ext = Extensions.get(this._context, "OES_vertex_array_object");
            if (ext) {
                ext.deleteVertexArrayOES(this._handler);
            }
        }
        /**
         * Check if current context supports VertexArray
         * @return {boolean} True if current context supports VertexArray
         */
        // TODO: DOC
        public static isSupported(context: GLContext): boolean {
            const gl: WebGL2RenderingContext = context.gl;
            return gl instanceof WebGL2RenderingContext ||
                Extensions.get(context, "OES_vertex_array_object");
        }
    };
};
