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
     * Drawable abstract class
     * @class Drawable
     */
    export abstract class Drawable {
        protected _indicesLen: number;
        protected _handle: Array<MB.VertexBuffer>;
        protected _vao: MB.VertexArray;

        protected _geometry: MB.VertexBufferGeometry;

        protected _context: GLContext;

        /**
         * Drawable constructor
         */
        // TODO: DOC
        constructor(context: GLContext) {
            this._context = context;
            this._vao = new MB.VertexArray();
            this._geometry = new MB.VertexBufferGeometry();
        };

        createWireframe() {
            // TODO: FAIL!!
            let newcells = [];
            let el0 = this._geometry.indices;
            for (let i = 0; i < el0.length; i += 3) {
                const a = el0[i + 0];
                const b = el0[i + 1];
                const c = el0[i + 2];
                if (a !== null && b !== null) newcells.push(a, b);
                if (b !== null && c !== null) newcells.push(b, c);
                if (a !== null && c !== null) newcells.push(c, a);
            }

            this._geometry.setIndex(new Uint16Array(newcells));
        }

        /**
         * Add Element buffer object.
         * @param {Uint16Array} data [description]
         * @param {MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw} type [description]
         */
        protected addElementArray(data: Uint16Array, type: MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw) {
            let vb: MB.VertexBuffer = new MB.VertexBuffer(MB.ctes.BufferType.ElementArray);
            vb.bufferData(new Uint16Array(data), type);
            this._handle.push(vb);
            return vb;
        };

        /**
         * Add Vertex buffer object.
         * @param  {number} attribLocation [description]
         * @param  {Float32Array} data [description]
         * @param  {number} numElems [description]
         * @param  {MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw} type [description]
         * @return {VertexBuffer} [description]
         */
        protected addBufferArray(attribLocation: number,
            data: Float32Array, numElems: number,
            type: MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw): MB.VertexBuffer {

            const gl: WebGL2RenderingContext = this._context.gl;
            let vb: MB.VertexBuffer = new MB.VertexBuffer(MB.ctes.BufferType.Array);
            vb.bufferData(data, type);
            vb.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
            this._handle.push(vb);
            return vb;
        };

        /**
         * Normal render
         */
        public render() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderMode.Triangles, this._indicesLen, gl.UNSIGNED_SHORT, 0);
            this._vao.unbind();
        };

        public render2() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderMode.Lines, this._indicesLen, gl.UNSIGNED_SHORT, 0);
            this._vao.unbind();
        };

        public render3() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderMode.Points, this._indicesLen, gl.UNSIGNED_SHORT, 0);
            this._vao.unbind();
        };

        /**
         * Render with element instance mode
         * @param {number} numInstances: Instances to render
         */
        public renderElementInstance(numInstances: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawElementsInstanced(
                    gl.TRIANGLES,
                    this._indicesLen,
                    gl.UNSIGNED_SHORT,
                    0,
                    numInstances
              );
            } else {
                const ext = MB.Extensions.get("ANGLE_instanced_arrays");
                if (ext) {
                    ext.drawElementsInstancedANGLE(
                        gl.TRIANGLES,
                        this._indicesLen,
                        gl.UNSIGNED_SHORT,
                        0,
                        numInstances
                  );
                } else {
                    throw new Error("Instance array undefined");
                }
            }
            this._vao.unbind();
        };

        /**
         * Render with array instance mode
         * @param {number} numInstances: Instances to render
         */
        public renderArrayInstance(numInstances: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawArraysInstanced(
                    gl.TRIANGLES,
                    0,
                    this._indicesLen,
                    numInstances
              );
            } else {
                const ext = MB.Extensions.get("ANGLE_instanced_arrays");
                if (ext) {
                    ext.drawArraysInstancedANGLE(
                        gl.TRIANGLES,
                        0,
                        this._indicesLen,
                        numInstances
                  );
                } else {
                    throw new Error("Instance array undefined");
                }
            }
            this._vao.unbind();
        };

    };
};
