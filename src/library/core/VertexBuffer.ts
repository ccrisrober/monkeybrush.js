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
    /**
     * VertexBuffer class
     * @class VertexBuffer
     */
    export class VertexBuffer {
        /**
         * VertexBuffer internal buffer handler.
         * @type {WebGLBuffer}
         */
        protected _handler: WebGLBuffer;
        protected _context: GLContext;
        /**
         * VertexBuffer internal type.
         * @type {ctes.BufferType}
         */
        protected _type: ctes.BufferType = ctes.BufferType.Array;
        /**
         * Vertex buffer constructor.
         * @param {GLContext} context [description]
         * @param {ctes.BufferType = ctes.BufferType.Array}
         */
        constructor(context: GLContext, type: ctes.BufferType = ctes.BufferType.Array) {
            this._context = context;
            const gl: WebGL2RenderingContext = this._context.gl;
            this._handler = gl.createBuffer();
            this._type = type;
            this.bind();
        }
        /**
         * Bind vertex buffer.
         * @param {MB.ctes.BufferType} type
         */
        public bind(type?: MB.ctes.BufferType) {
            if (type !== undefined) {
                this._type = type;
            }
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bindBuffer(this._type, this._handler);
        }
        public bufferSubData(offset: number, data: Float32Array | Uint16Array) {
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bufferSubData(this._type, offset, data);
        }
        /**
         * Unbind vertex buffer.
         */
        public unbind() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bindBuffer(this._type, null);
        }
        /**
         * Returns interla buffer type.
         * @return {ctes.BufferType}
         */
        public getBufferType(): ctes.BufferType {
            return this._type;
        }
        /**
         * Returns internal buffer handler.
         * @return {WebGLBuffer}
         */
        public getBuffer(): WebGLBuffer {
            return this._handler;
        }
        /**
         * [destroy description]
         */
        public destroy() {
            this.unbind();
            if (!this._handler) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.deleteBuffer(this._handler);
            }
            this._handler = null;
        }
        /**
         * [data description]
         * @param {Float32Array | Uint16Array | number}          data  [description]
         * @param {ctes.UsageType =B.ctes.UsageType.StaticDraw} usage [description]
         */
        public data(data: Float32Array | Uint16Array | number,
            usage: MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw) {

            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bufferData(this._type, data, usage);
        };
        public getSubData(size: number, offset: number = 0): ArrayBuffer {
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            let arrBuffer = new ArrayBuffer(size * Float32Array.BYTES_PER_ELEMENT);
            gl.getBufferSubData(this._type, offset, arrBuffer);
            return arrBuffer;
        };
        /**
         * [attribDivisor description]
         * @param {number}    position [description]
         * @param {number}    length   [description]
         * @param {number}    divisor  [description]
         * @param {number =        0}           stride [description]
         */
        public attribDivisor(position: number, length: number, divisor: number, stride: number = 0) {
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.enableVertexAttribArray(position);
            gl.vertexAttribPointer(position,
                length,
                MB.ctes.DataType.Float,
                false,
                length * Float32Array.BYTES_PER_ELEMENT,
                0);
            gl.vertexAttribDivisor(position, divisor);
        }
        /**
         * [vertexAttribPointer description]
         * @param {number}     attribLocation [description]
         * @param {number}     numElems       [description]
         * @param {MB.ctes.DataType}     type           [description]
         * @param {boolean =              false}       normalized [description]
         * @param {number  =              0}           offset     [description]
         */
        public vertexAttribPointer(attribLocation: number, numElems: number, type: MB.ctes.DataType,
            normalized: boolean = false, offset: number = 0) {
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.enableVertexAttribArray(attribLocation);
            gl.vertexAttribPointer(
                attribLocation, // Attribute location
                numElems, // Number of elements per attribute
                type, // Type of elements
                normalized,
                numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
                offset // Offset from the beginning of a single vertex to this attribute
           );
        };
        /**
         * [copySub description]
         * @param {number}     readTarget [description]
         * @param {number}     writeTarget [description]
         * @param {number}     readOffset [description]
         * @param {number}     writeOffset [description]
         * @param {number}     size [description]
         */
        public copySub(readTarget: number, writeTarget: number, readOffset: number,
            writeOffset: number, size: number) {
            // https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/copyBufferSubData
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.copyBufferSubData(readTarget, writeTarget, readOffset, writeOffset, size);
        };


        public bindBufferBase(target: number, index: number = 0) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.bindBufferBase(target, index, this._handler);
        };

        public render(mode: MB.ctes.RenderMode, size: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.drawArrays(mode, 0, size);
        };
    };
};
