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


/// <reference path="drawable.ts" />

import Drawable from "./drawable";

"use strict";

/**
 * CustomModel class
 * @class CustomModel
 */
class CustomModel extends Drawable {
    /**
     * CustomModel constructor
     * @param {Array<number> = null} indices [description]
     * @param {Array<number>} vertices [description]
     * @param {Array<number> = null} normals [description]
     * @param {Array<number> = null} texcoords [description]
     */
    constructor(indices: Array<number>, vertices: Array<number>, normals: Array<number> = null,
        texcoords: Array<number> = null) {
        super();

        this._handle = [];
        this._vao.bind();

        if (indices && indices.length) {
            this.addElementArray(new Uint16Array(indices));
        } else {
            throw new Error("Indices undefined");
        }
        if (vertices && vertices.length && vertices.length % 3 === 0) {
            this.addBufferArray(0, new Float32Array(vertices), 3);
        } else {
            throw new Error("Vertices undefined");
        }
        if (normals && normals.length && normals.length % 3 === 0) {
            this.addBufferArray(1, new Float32Array(normals), 3);
        }
        if (texcoords && texcoords.length && texcoords.length % 2 === 0) {
            this.addBufferArray(2, new Float32Array(texcoords), 2);
        }

        this._indicesLen = indices.length;
    }
};

export default CustomModel;
