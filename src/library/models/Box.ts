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
     * Box class
     * @class Box
     */
    export class Box extends Drawable {
        /**
         * Box constructor.
         * @param {GLContext} context [description]
         * @param {number =       1.0}         width     [description]
         * @param {number =       1.0}         height    [description]
         * @param {number =       1.0}         depth     [description]
         * @param {number =       1}           widthSub  [description]
         * @param {number =       1}           heightSub [description]
         * @param {number =       1}           depthSub  [description]
         */
        constructor(context: GLContext, width: number = 1.0, height: number = 1.0, depth: number = 1.0,
            widthSub: number = 1, heightSub: number = 1, depthSub: number = 1) {
            super(context);

            widthSub = Math.floor(widthSub);
            heightSub = Math.floor(heightSub);
            depthSub = Math.floor(depthSub);


            const nv: number = (width + 1) * (height + 1) * 2
                             + (width + 1) * (depth + 1) * 2
                             + (depth + 1) * (height + 1) * 2;
            /*const nidx: number =  (width * height * 2)
                                + (width * depth * 2)
                                + (depth * height * 2) * 6;*/


            this._geometry.addAttr(VBType.VBVertices, new MB.BufferAttribute(new Float32Array(nv * 3), 3));
            this._geometry.addAttr(VBType.VBNormals, new MB.BufferAttribute(new Float32Array(nv * 3), 3));
            this._geometry.addAttr(VBType.VBTexCoord, new MB.BufferAttribute(new Float32Array(nv * 2), 2));

            this._geometry.setIndex(new Uint16Array([

            ]));

            // this.createWireframe();

            this._handle = [];
            this._vao.bind();

            this.addElementArray(this._geometry.indices);

            this.addBufferArray(0, <Float32Array>this._geometry.getAttr(VBType.VBVertices).array, 3);
            this.addBufferArray(1, <Float32Array>this._geometry.getAttr(VBType.VBNormals).array, 3);
            this.addBufferArray(2, <Float32Array>this._geometry.getAttr(VBType.VBTexCoord).array, 2);

            this._indicesLen = this._geometry.indices.length;
        }
    };
};

