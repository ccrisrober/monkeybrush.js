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


import { Core } from "../core/Core";
import { Texture, TexOptions } from "./Texture";
import { Vect2 } from "../maths/Vect2";

import { TextureFormat, WrapMode, TextureType, TextureTarget }
    from "../constants/Constants";

"use strict";

class SimpleTexture2D extends Texture {
    protected _size: Vect2;

    public getWidth(): number {
        return this._size.x;
    }
    public getHeight(): number {
        return this._size.y;
    }
    protected _offsets_: Array<number>;
    /**
     * SimpleTexture2D constructor
     * @param {Vect2} size: Texture size
     * @param {TexOptions = {}} options: Texture options
     * @param {() => void = null} onSuccess Optional callback that runs when creating SimpleTexture2D.
     */
    constructor(size: Vect2, options: TexOptions = {}, onSuccess: () => void = null) {
        super(TextureTarget.Texture2D);

        this._size = size;

        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        this._handle_ = gl.createTexture();

        // TODO: Support compression

        this._flipY_ = options.flipY === true;

        this._internalformat_ = options.internalFormat || TextureFormat.RGBA;
        this._format_ = options.format || gl.RGBA;
        this._type_ = options.type || gl.UNSIGNED_BYTE;
        this._level_ = options.level || 0;
        this._compressed_ = Boolean(options.compressed || false);
        this._offsets_ = options.offsets;

        this.bind();

        if (this._offsets_ && this._offsets_.length === 2) {
            if (this._compressed_) {
                gl.compressedTexSubImage2D(
                    this._target_,
                    this._level_,
                    this._offsets_[0],
                    this._offsets_[1],
                    this.getWidth(),
                    this.getHeight(),
                    this._format_, // Format
                    null
                );
            } else {
                gl.texSubImage2D(
                    this._target_,
                    this._level_,
                    this._offsets_[0],
                    this._offsets_[1],
                    this.getWidth(),
                    this.getHeight(),
                    this._format_, // Format
                    this._type_, // Size of each channel
                    null
                );
            }
        } else {
            if (this._compressed_) {
                gl.compressedTexImage2D(
                    this._target_,
                    this._level_,
                    this._format_, // Format
                    this.getWidth(),
                    this.getHeight(),
                    0,
                    null
                );
            } else {
                gl.texImage2D(
                    this._target_,
                    this._level_,
                    this._internalformat_,
                    this.getWidth(),
                    this.getHeight(),
                    0,
                    this._format_, // Format
                    this._type_, // Size of each channel
                    null
                );
            }
        }

        /*gl.texImage2D(
            this._target_,
            this._level_, // Level of details
            this._internalformat_, // Internal format
            this.getWidth(),
            this.getHeight(),
            0,
            this._format_, // Format
            this._type_, // Size of each channel
            null
        );*/

        this.minFilter(options.minFilter || TextureType.Nearest);
        this.magFilter(options.minFilter || TextureType.Nearest);

        this.wrap([
            options.wrapS || WrapMode.Clamp2Edge,
            options.wrapT || WrapMode.Clamp2Edge
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
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.texStorage2D(this.target, 1, gl.RGB8, size.x, size.y);
        this.unbind();
    }

    public resize(size: Vect2) {
        if (!size.exactEquals(this._size)) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
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
