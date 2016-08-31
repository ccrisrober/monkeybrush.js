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

/// <reference path="../constants/TextureFormat.ts" />
/// <reference path="../constants/TextureType.ts" />

import { Core } from "../core/Core";
import { Texture, TexOptions } from "./Texture";
import { Vect2 } from "../maths/Vect2";

import { TextureFormat } from "../constants/TextureFormat";
import { TextureType, TextureTarget } from "../constants/TextureType";

"use strict";

class SimpleTexture2D extends Texture {
    protected _size: Vect2;

    public getWidth(): number {
        return this._size.x;
    }
    public getHeight(): number {
        return this._size.y;
    }
    /**
     * SimpleTexture2D constructor
     * @param {Vect2} size: Texture size
     * @param {TexOptions = {}} options: Texture options
     * @param {() => void = null} onSuccess: Optional callback is called at the end.
     */
    constructor(size: Vect2, options: TexOptions = {}, onSuccess: () => void = null) {
        super(TextureTarget.Texture2D);

        this._size = size;

        const gl = Core.getInstance().getGL();
        this._handle_ = gl.createTexture();

        // TODO: Support compression

        this._flipY_ = options.flipY === true;

        this._internalformat_ = options.internalFormat || TextureFormat.RGBA;
        this._format_ = options.format || gl.RGBA;
        this._type_ = options.type || TextureFormat.UnsignedByte;
        this._level_ = options.level || 0;

        this.bind();

        gl.texImage2D(
            this._target_,
            this._level_, // Level of details
            this._internalformat_, // Internal format
            this.getWidth(),
            this.getHeight(),
            0,
            this._format_, // Format
            this._type_, // Size of each channel
            null
        );

        this.minFilter(options.minFilter || TextureType.Nearest);
        this.magFilter(options.minFilter || TextureType.Nearest);

        this.wrap([
            options.wrapS || TextureType.Clamp2Edge,
            options.wrapT || TextureType.Clamp2Edge
        ]);

        if (this._flipY_) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
        }

        this.unbind();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        if (onSuccess) {
            onSuccess();
        }
    }

    public setInmutable(size: Vect2 = this._size) {
        this.bind();
        const gl = Core.getInstance().getGL();
        gl.texStorage2D(this.target, 1, gl.RGB8, size.x, size.y);
        this.unbind();
    }

    public resize(size: Vect2) {
        if (!size.isEqual(this._size)) {
            const gl = Core.getInstance().getGL();
            gl.bindTexture(this.target, this._handle_);
            gl.texImage2D(
                this._target_,
                this._level_, // Level of details
                this._internalformat_, // Internal format
                size.x,
                size.y,
                0,
                this._format_, // Format
                this._type_, // Size of each channel
                null
            );
        }
    }
};

export { SimpleTexture2D };
