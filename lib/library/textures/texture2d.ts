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
/// <reference path="texOptions.ts" />
/// <reference path="../extras/extensions.ts" />

import { Core } from "../core/core";
import { Texture } from "./texture";
import { TexOptions } from "./texOptions";
import { extensions } from "../extras/extensions";

"use strict";

const gl = Core.getInstance().getGL();

class Texture2D extends Texture {
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;
    // TODO: Add onSuccess a todas las texturas ...
    constructor(data: HTMLImageElement, options: TexOptions = {}, onSuccess: () => void = null) {
        super(gl.TEXTURE_2D);
        // options = options || {};

        // TODO: Support compression

        this._flipY = Boolean(options.flipY);
        this._handle = gl.createTexture();

        let _internalformat = options.internalFormat || gl.RGBA;
        let _format = options.format || gl.RGBA;
        let _type = options.type || gl.UNSIGNED_BYTE;
        const _level = options.level || 0;

        this._minFilter = options.minFilter || gl.NEAREST;
        this._magFilter = options.magFilter || gl.NEAREST;
        let wraps = [
            options.wrapS || options.wrap || gl.CLAMP_TO_EDGE,
            options.wrapT || options.wrap || gl.CLAMP_TO_EDGE,
        ];

        this.bind();

        gl.texImage2D(
            this._target,
            _level, // Level of details
            _internalformat, // Internal format
            _format, // Format
            _type, // Size of each channel
            data
        );

        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        this.wrap(wraps);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY === true ? 1 : 0);

        /*// Prevent NPOT textures
        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/

        if (onSuccess) {
            onSuccess();
        }
    }
    public genMipMap() {
        this.bind();
        // TODO: Check NPOT??
        gl.generateMipmap(this._target);
    }
    public wrap(modes: Array<number>) {
        if (modes.length !== 2) {
            throw new Error("Must specify wrapS, wrapT modes");
        }
        this.bind();
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, modes[0]);
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, modes[1]);
        this._wraps = modes;
    }
    public minFilter(filter: number) {
        this.bind();
        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, filter);
        this._minFilter = filter;
    }
    public magFilter(filter: number) {
        this.bind();
        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, filter);
        this._magFilter = filter;
    }
    public bind(slot?: number) {
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this._target, this._handle);
    }
    public unbind() {
        gl.bindTexture(this._target, null);
    }
    public destroy() {
        gl.deleteTexture(this._handle);
        this._handle = null;
    }
    /*public setPixelStorage() {
        //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha)
        //gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment)
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY)
    }*/

    /**
     * Set texture anisotropic level
     * @param {number = 0} level: Anisotropic level
     */
    public setAnisotropic(level: number = 0) {
        level = Math.floor(level);
        const ext = extensions.get("EXT_texture_filter_anisotropic");
        const max_anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        if (max_anisotropy < level) {
            gl.texParameterf(this._target, ext.TEXTURE_MAX_ANISOTROPY_EXT, level);
        }
    }
};

export { Texture2D };
