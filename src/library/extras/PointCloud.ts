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
     * PointCloud class
     * @class PointCloud
     */
    export class PointCloud {
        protected _points: Array<number>;
        protected _size: number;
        protected _vb: MB.VertexBuffer;
        constructor() {
            this._points = [];
            this._size = 0;
            /*this._vb = this.addBufferArray(0, new Float32Array([
                  0.0,  0.5, 0.0,
                 -0.5, -0.5, 0.0,
                  0.5, -0.5, 0.0,
                  1.5, -0.0, 0.0,
            ]), 3);
            this._size = 4;*/

            const range = 50;
            for (let i = 0; i < 500; ++i) {
                let particle = new MB.Vect3(
                    Math.random() * range - range / 2,
                    Math.random() * range - range / 2,
                    Math.random() * range - range / 2
                );
                this._points.push(particle.x, particle.y, particle.z);
            }
            this._size = 500;
        };
        protected addBufferArray(attribLocation: number,
            data: Float32Array, numElems: number,
            type: MB.ctes.UsageType = MB.ctes.UsageType.StaticDraw): MB.VertexBuffer {

            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            let vb: MB.VertexBuffer = new MB.VertexBuffer(MB.ctes.BufferType.Array);
            vb.bufferData(data, type);
            vb.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
            return vb;
        };
        public addPoint(point: MB.Vect3) {
            // this._points.push(point.x, point.y, point.z);
            // ++this._size;
        };
        public render() {
            if (!this._vb) {
                this._vb = this.addBufferArray(0, new Float32Array(this._points), 3);
            }
            let buffer = this._vb.getBuffer();
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            gl.enableVertexAttribArray(0);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

            gl.drawArrays(gl.POINTS, 0, this._size);
            this._vb.unbind();
        };
    };
};
