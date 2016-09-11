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

/**
 * CanvasTexture class
 * @class CanvasTexture
 *
 * This class uses an image of a canvas like texture
 */
class CanvasTexture extends Texture {
    /**
     * Canvas that contains the image texture
     * @type {HTMLCanvasElement}
     */
    protected _domCanvas: HTMLCanvasElement;
    /**
     * CanvasTexture constructor
     * @param {Vect2} size: Texture size
     * @param {TexOptions = {}} options: Texture options
     * @param {() => void = null} onSuccess Optional callback that runs when creating CanvasTexture.
     */
    constructor(domCanvas: HTMLCanvasElement, options: TexOptions = {}, onSuccess: () => void = null) {
        super(TextureTarget.Texture2D);

        const gl = Core.getInstance().getGL();
        this._handle_ = gl.createTexture();

        this._flipY_ = options.flipY === true;

        this._internalformat_ = options.internalFormat || TextureFormat.RGBA;
        this._format_ = options.format || gl.RGBA;
        this._type_ = options.type || gl.UNSIGNED_BYTE;
        this._level_ = options.level || 0;
        this._compressed_ = Boolean(options.compressed || false);

        this.bind();

        gl.texImage2D(
            this._target_,
            this._level_,
            this._internalformat_,
            this._format_, // Format
            this._type_, // Size of each channel
            this._domCanvas
        );

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
    };
    /**
     * Updates the texture based on the current image of the canvas
     * that was referenced in the class constructor
     */
    public update() {
        this.bind();
        const gl = Core.getInstance().getGL();
        gl.texImage2D(
            this._target_,
            this._level_,
            this._internalformat_,
            this._format_,
            this._type_,
            this._domCanvas
        );
        this.unbind();
    };
};

export { CanvasTexture };
