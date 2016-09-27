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

    /**
     * VertexUBO class
     * @class VertexUBO
     *
     * Such buffers can send information to programs (in block form)
     * more efficiently than variables uniform manner.
     */
    export class VertexUBO {
        /**
         * Uniform Buffer Object handler.
         * @type {WebGLBuffer}
         */
        protected _handle: WebGLBuffer;
        protected _context: GLContext;
        protected _index: number;
        // TODO: A futuro usar el Program y no
        //         WebGLProgram (cachear ubo también en Program ...)
        // TODO: DOC
        constructor(context: GLContext, prog: WebGLProgram, name: string, blockBindIdx: number) {
            if (!VertexUBO.isSupported(context)) {
                throw new Error("VertexUBO undefined with current context");
            }
            this._context = context;
            const gl: WebGL2RenderingContext = this._context.gl;
            this._handle = gl.createBuffer();
            const index = gl.getUniformBlockIndex(prog, name);
            if (index === 4294967295) {
                throw new Error("UBO undefined");
            }
            gl.uniformBlockBinding(prog, index, blockBindIdx);
            this._index = blockBindIdx;
        };
        /**
         * Bind Uniform Buffer Object.
         */
        public bind() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bindBuffer(gl.UNIFORM_BUFFER, this._handle);
        };
        /**
         * Update UBO values.
         * @param {Float32Array} data [description]
         */
        public update(data: Float32Array) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bindBuffer(gl.UNIFORM_BUFFER, this._handle);
            gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);
            gl.bindBuffer(gl.UNIFORM_BUFFER, null);
            gl.bindBufferBase(gl.UNIFORM_BUFFER, this._index, this._handle);
        };
        /**
         * Unbind Uniform Buffer Object.
         */
        public unbind() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bindBuffer(gl.UNIFORM_BUFFER, null);
        };
        /**
         * Destroy UBO object.
         */
        public destroy() {
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.deleteBuffer(this._handle);
        };
        /**
         * Returns if the current context allows use UBO.
         * @return {boolean} True if allows use UBO.
         */
        // TODO: DOC
        public static isSupported(context: GLContext): boolean {
            const gl: WebGL2RenderingContext = context.gl;
            return gl instanceof WebGL2RenderingContext;
        };
    };
};
