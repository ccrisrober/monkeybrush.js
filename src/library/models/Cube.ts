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


import { Drawable } from "./Drawable";
import { BufferAttribute } from "../extras/VertexBufferGeometry";

"use strict";

/**
 * Cube class
 * @class Cube
 */
class Cube extends Drawable {
    /**
     * Cube constructor
     * @param {number = 1.0} side: Size length
     */
    constructor(side: number = 1.0) {
        super();
        const side2 = side / 2.0;

        this._geometry.addAttr("vertices", new BufferAttribute(new Float32Array([
            // Front
           -side2, -side2, side2,
            side2, -side2, side2,
            side2,  side2, side2,
           -side2,  side2, side2,
           // Right
            side2, -side2, side2,
            side2, -side2, -side2,
            side2,  side2, -side2,
            side2,  side2, side2,
           // Back
           -side2, -side2, -side2,
           -side2,  side2, -side2,
            side2,  side2, -side2,
            side2, -side2, -side2,
           // Left
           -side2, -side2, side2,
           -side2,  side2, side2,
           -side2,  side2, -side2,
           -side2, -side2, -side2,
           // Bottom
           -side2, -side2, side2,
           -side2, -side2, -side2,
            side2, -side2, -side2,
            side2, -side2, side2,
           // Top
           -side2,  side2, side2,
            side2,  side2, side2,
            side2,  side2, -side2,
           -side2,  side2, -side2
        ]), 3));

        this._geometry.addAttr("normals", new BufferAttribute(new Float32Array([
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            // Right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            // Back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            // Left
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            // Top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ]), 3));

        this._geometry.addAttr("texCoords", new BufferAttribute(new Float32Array([
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ]), 2));

        this._geometry.setIndex(new Uint16Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ]));

        this.createWireframe();

        this._handle = [];
        this._vao.bind();

        this.addElementArray(this._geometry.indices);

        this.addBufferArray(0, <Float32Array>this._geometry.getAttr("vertices").array, 3);
        this.addBufferArray(1, <Float32Array>this._geometry.getAttr("normals").array, 3);
        this.addBufferArray(2, <Float32Array>this._geometry.getAttr("texCoords").array, 2);

        this._indicesLen = this._geometry.indices.length;
    }
};

export { Cube };
