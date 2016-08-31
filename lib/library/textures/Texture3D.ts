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


/// <reference path="../maths/Vect3.ts" />
/// <reference path="Texture.ts" />

import { Core } from "../core/Core";
import { Vect3 } from "../maths/Vect3";

import { TexOptions, Texture } from "./Texture";
import { TextureFormat } from "../constants/TextureFormat";
import { TextureType, TextureTarget } from "../constants/TextureType";

"use strict";

declare var WebGL2RenderingContext: any;

class Texture3D extends Texture {
    constructor (data, size: Vect3, options: TexOptions = {}, onSuccess: () => void = null) {
        const gl = Core.getInstance().getGL();
        if (!(gl instanceof WebGL2RenderingContext)) {
            throw new Error("Must provide a WebGL2 context ...");
        }
        super(TextureTarget.Texture3D);

        this._flipY_ = Boolean(options.flipY || false);
        this._handle_ = gl.createTexture();

        this._internalformat_ = options.internalFormat || TextureFormat.RGBA;
        this._format_ = options.format || TextureFormat.RGBA;
        this._type_ = options.type || TextureFormat.UnsignedByte;
        this._level_ = options.level || 0;

        this._compressed_ = Boolean(options.compressed || false);
        // TODO: WRAP

        this.bind();

        if (this._compressed_) {
            /*gl.compressedTexImage3D(
                this._target,
                0,  // level
                format,
                size.x,
                size.y,
                size.z,
                0,
                data);*/
        } else {
            /*gl.texSubImage3D(
                this._target,
                0,  // level
                _internalformat,    // Internal format A GLenum specifying the format of the texel data
                size.x,
                size.y,
                size.z,
                0,
                _format,    // Format2
                _type,  // A GLenum specifying the data type of the texel data
                data
            );*/
            gl.texImage3D(
                this._target_,
                this._level_,
                this._internalformat_,
                size.x,
                size.y,
                size.z,
                0,
                this._format_,
                this._type_,
                data
            );
        }

        this.minFilter(options.minFilter || TextureType.Nearest);
        this.magFilter(options.minFilter || TextureType.Nearest);

        this.wrap([
            options.wrapS || TextureType.Clamp2Edge,
            options.wrapT || TextureType.Clamp2Edge,
            options.wrapR || TextureType.Clamp2Edge
        ]);

        if (this._flipY_) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
        }

        this.unbind();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        if (onSuccess) {
            onSuccess();
        }
    };
};

export { Texture3D };
