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


/// <reference path="texture.ts" />

import Texture from "./texture";
import Core from "../core/core";

"use strict";

// TODO: https://ferransole.wordpress.com/2014/06/09/array-textures/
// TODO: https://www.opengl.org/wiki/Example/Texture_Array_Creation
// TODO: http://stackoverflow.com/questions/12372058/how-to-use-gl-texture-2d-array-in-opengl-3-2
class Texture2DArray extends Texture {
    constructor(images: Array<HTMLImageElement>) {
        const gl = Core.getInstance().getGL();
        super(gl.TEXTURE_2D_ARRAY);
        this._handle = gl.createTexture();

        gl.bindTexture(this._target, this._handle);

        const width = 512;
        const height = width;
        const count = images.length;

        gl.pixelStorei(gl.UNPACK_ROW_LENGTH, width);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, width, height, count, 0, gl.RGBA, gl.UNSIGNED_INT, null);

        images.forEach((image: HTMLImageElement, i: number) => {
            gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, width, height, 1, gl.RGBA, gl.UNSIGNED_BYTE, image);
        });

        this.unbind();
    }
    public bind(slot?: number) {
        const gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this._target, this._handle);
    };
    public unbind() {
        const gl = Core.getInstance().getGL();
        gl.bindTexture(this._target, null);
    };
    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
};

export default Texture2DArray;
