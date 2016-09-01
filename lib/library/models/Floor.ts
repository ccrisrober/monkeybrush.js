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


/// <reference path="Drawable.ts" />

import { Core } from "../core/Core.ts";
import { Drawable } from "./Drawable";

"use strict";

class Floor extends Drawable {
    constructor(dim: number = 80, e: number = 2) {
        super();
        const lines = 2 * dim / e;
        const inc = 2 * dim / lines;

        let verts = [];
        let el = [];

        for (let l = 0; l <= lines; ++l) {
            verts[6 * l] = -dim;
            verts[6 * l + 1] = 0;
            verts[6 * l + 2] = -dim + (l * inc);

            verts[6 * l + 3] = dim;
            verts[6 * l + 4] = 0;
            verts[6 * l + 5] = -dim + (l * inc);

            verts[6 * (lines + 1) + 6 * l] = -dim + (l * inc);
            verts[6 * (lines + 1) + 6 * l + 1] = 0;
            verts[6 * (lines + 1) + 6 * l + 2] = -dim;

            verts[6 * (lines + 1) + 6 * l + 3] = -dim + (l * inc);
            verts[6 * (lines + 1) + 6 * l + 4] = 0;
            verts[6 * (lines + 1) + 6 * l + 5] = dim;

            el[2 * l] = 2 * l;
            el[2 * l + 1] = 2 * l + 1;
            el[2 * (lines + 1) + 2 * l] = 2 * (lines + 1) + 2 * l;
            el[2 * (lines + 1) + 2 * l + 1] = 2 * (lines + 1) + 2 * l + 1;
        }

        this._handle = [];
        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(verts), 3);

        this._indicesLen = el.length;
    };
    public render() {
        const gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElements(gl.LINES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        this._vao.unbind();
    };
};

export { Floor };
