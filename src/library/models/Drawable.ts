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
         * Drawable constructor.
         * @param {GLContext} context [description]
         */
        constructor(context: GLContext) {
            this._context = context;
            this._vao = new MB.VertexArray(this._context);
            this._geometry = new MB.VertexBufferGeometry();
        };

        /**
         * Add Element buffer object.
         * @param {Uint16Array} data [description]
         * @param {MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw} type [description]
         */
        protected addElementArray(data: Uint16Array, type: MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw) {
            let vb: MB.VertexBuffer = new MB.VertexBuffer(this._context, MB.ctes.BufferType.ElementArray);
            vb.data(new Uint16Array(data), type);
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

            let vb: MB.VertexBuffer = new MB.VertexBuffer(this._context, MB.ctes.BufferType.Array);
            vb.data(data, type);
            vb.vertexAttribPointer(attribLocation, numElems, MB.ctes.DataType.Float);
            this._handle.push(vb);
            return vb;
        };

        /**
         * Normal render
         */
        public render() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderMode.Triangles, this._indicesLen,
                MB.ctes.DataType.UnsignedShort, 0);
            this._vao.unbind();
        };
        public renderInstanced(nInstances: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElementsInstanced(MB.ctes.RenderMode.Triangles, this._indicesLen,
                MB.ctes.DataType.UnsignedShort, 0, nInstances);
            this._vao.unbind();
        }
        public renderFan() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderMode.TriangleFan, this._indicesLen,
                MB.ctes.DataType.UnsignedShort, 0);
            this._vao.unbind();
        };

        public render2() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderMode.Lines, this._indicesLen,
                MB.ctes.DataType.UnsignedShort, 0);
            this._vao.unbind();
        };

        public render3() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderMode.Points, this._indicesLen,
                MB.ctes.DataType.UnsignedShort, 0);
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
                    MB.ctes.RenderMode.Triangles,
                    this._indicesLen,
                    MB.ctes.DataType.UnsignedShort,
                    0,
                    numInstances
                );
            } else {
                const ext = MB.Extensions.get(this._context, "ANGLE_instanced_arrays");
                if (ext) {
                    ext.drawElementsInstancedANGLE(
                        MB.ctes.RenderMode.Triangles,
                        this._indicesLen,
                        MB.ctes.DataType.UnsignedShort,
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
                    MB.ctes.RenderMode.Triangles,
                    0,
                    this._indicesLen,
                    numInstances
                );
            } else {
                const ext = MB.Extensions.get(this._context, "ANGLE_instanced_arrays");
                if (ext) {
                    ext.drawArraysInstancedANGLE(
                        MB.ctes.RenderMode.Triangles,
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

        protected computeNormals(): MB.BufferAttribute {
            let vertices: BufferAttribute = this._geometry.getAttr(VBType.VBVertices);
            let indices = this._geometry.indices;

            let normals = new MB.BufferAttribute(new Float32Array(vertices.count * 3), 3);

            for (let i = 0, len = indices.length; i < len; i += 3) {
                let i1 = indices[i],
                    i2 = indices[i + 1],
                    i3 = indices[i + 2];
                let v1 = vertices.getXYZ(i1),
                    v2 = vertices.getXYZ(i2),
                    v3 = vertices.getXYZ(i3);

                let dir1 = new MB.Vect3(
                    v3[0] - v2[0],
                    v3[1] - v2[1],
                    v3[1] - v2[2]
                ),
                dir2 = new MB.Vect3(
                    v1[0] - v2[0],
                    v1[1] - v2[1],
                    v1[2] - v2[2]
                );

                let norm = MB.Vect3.cross(dir1, dir2).normalize();
                normals.setXYZ(i1, norm.x, norm.y, norm.z);
                normals.setXYZ(i2, norm.x, norm.y, norm.z);
                normals.setXYZ(i3, norm.x, norm.y, norm.z);
            }
            return normals;
        }

    };
};
