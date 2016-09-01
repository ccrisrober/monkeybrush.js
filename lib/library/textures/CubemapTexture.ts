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


/// <reference path="Texture.ts" />

import { Texture, TexOptions } from "./Texture";
import { Core } from "../core/Core";
import { TextureType, TextureTarget } from "../constants/TextureType";

"use strict";

class CubeMapTexture extends Texture {

    protected finished: boolean;

    /**
     * CubeMapTexture constructor
     * @param {TexOptions = {}} options: Texture options
     */
    constructor(options: TexOptions = {}) {
        const gl = Core.getInstance().getGL();
        super(TextureTarget.TextureCubeMap);

        this.finished = false;

        // TODO: Faltan todo el tema de filtrados o wrap de las opciones
            // que me he saltado por falta de tiempo :(
        this._handle_ = gl.createTexture();
    }
    public addImage(i: number, data) {
        const gl = Core.getInstance().getGL();
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0,
            gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, data);
    }
    public finishTex() {
        const gl = Core.getInstance().getGL();
        gl.texParameteri(this._target_, gl.TEXTURE_MAG_FILTER, TextureType.Linear);
        gl.texParameteri(this._target_, gl.TEXTURE_MIN_FILTER, TextureType.Linear);
        gl.texParameteri(this._target_, gl.TEXTURE_WRAP_S, TextureType.Clamp2Edge);
        gl.texParameteri(this._target_, gl.TEXTURE_WRAP_T, TextureType.Clamp2Edge);

        if (gl.TEXTURE_WRAP_R) {
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_R, TextureType.Clamp2Edge);
        }

        this.finished = true;
    }
};

export { CubeMapTexture };
