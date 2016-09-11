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
import { TextureFormat, WrapMode, TextureType, TextureTarget }
    from "../constants/Constants";

"use strict";

declare var WebGL2RenderingContext: any;

class SimpleTexture3D extends Texture {
    protected _offsets_: Array<number>;
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
        this._type_ = options.type || gl.UNSIGNED_BYTE;
        this._level_ = options.level || 0;

        this._compressed_ = Boolean(options.compressed || false);
        this._offsets_ = options.offsets;
        // TODO: WRAP

        this.bind();

        /*

        const gl = MB.Core.getInstance().getGL();

        var SIZE = 32;
        var data = new Uint8Array(SIZE * SIZE * SIZE);
        for (var k = 0; k < SIZE; ++k) {
            for (var j = 0; j < SIZE; ++j) {
                for (var i = 0; i < SIZE; ++i) {
                    data[i + j * SIZE + k * SIZE * SIZE] = MB.Noise.perlin.noise(i, j, k) * 256;
                }
            }
        }
        var texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_3D, texture);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_BASE_LEVEL, 0);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, Math.log2(SIZE));
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage3D(
            gl.TEXTURE_3D,  // target
            0,              // level
            gl.R8,        // internalformat
            SIZE,           // width
            SIZE,           // height
            SIZE,           // depth
            0,              // border
            gl.RED,         // format
            gl.UNSIGNED_BYTE,       // type
            data            // pixel
        );
        gl.generateMipmap(gl.TEXTURE_3D);
        gl.bindTexture(gl.TEXTURE_3D, null);*/

        if (this._offsets_ && this._offsets_.length === 3) {
            if (this._compressed_) {
                gl.compressedTexSubImage3D(
                    this._target_,
                    this._level_,
                    this._offsets_[0],
                    this._offsets_[1],
                    this._offsets_[2],
                    size.x,
                    size.y,
                    size.z,
                    this._format_,
                    data
                );
            } else {
                gl.texSubImage3D(
                    this._target_,
                    this._level_,
                    this._offsets_[0],
                    this._offsets_[1],
                    this._offsets_[2],
                    size.x,
                    size.y,
                    size.z,
                    this._format_,
                    this._type_,
                    data
                );
            }
        } else {
            if (this._compressed_) {
                gl.compressedTexImage3D(
                    this._target_,
                    this._level_,
                    this._format_,
                    size.x,
                    size.y,
                    size.z,
                    0,
                    data
                );
            } else {
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
        }

        this.minFilter(options.minFilter || TextureType.Nearest);
        this.magFilter(options.minFilter || TextureType.Nearest);

        this.wrap([
            options.wrapS || WrapMode.Clamp2Edge,
            options.wrapT || WrapMode.Clamp2Edge,
            options.wrapR || WrapMode.Clamp2Edge
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

export { SimpleTexture3D };
