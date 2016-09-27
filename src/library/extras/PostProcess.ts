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
    * This class wrap PostProcess effects
    * @class PostProcess
    */
    export class PostProcess {
        protected _context: GLContext;
        /**
         * [initialize description]
         */
        // TODO: DOC
        constructor(context: GLContext) {
            this._context = context;
            const gl: WebGL2RenderingContext = this._context.gl;
            const positions = [
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                 1.0,  1.0
            ];
            this._planeVAO = new MB.VertexArray(this._context);
            // Unnecesary gl.bindVertexArray(PostProcess._planeVAO);
            this._planeVertexVBO = new MB.VertexBuffer(this._context, MB.ctes.BufferType.Array);
            // Unnecesary gl.bindBuffer(gl.ARRAY_BUFFER, this._planeVertexVBO);
            this._planeVertexVBO.bufferData(new Float32Array(positions), MB.ctes.UsageType.StaticDraw);
            this._planeVertexVBO.vertexAttribPointer(0, 2, gl.FLOAT);
            this._planeVAO.unbind();
        }
        /**
         *
         */
        public bind() {
            this._planeVAO.bind();
        }
        /**
         *
         */
        public render() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._planeVAO.bind();
            gl.drawArrays(MB.ctes.RenderMode.TriangleStrip, 0, 4);
            this._planeVAO.unbind();
        }
        /**
         * [_planeVAO description]
         * @type {VertexArray}
         */
        protected _planeVAO: MB.VertexArray = null;
        /**
         * [_planeVertexVBO description]
         * @type {VertexBuffer}
         */
        protected _planeVertexVBO: MB.VertexBuffer = null;
    };
};
