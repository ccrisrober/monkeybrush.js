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

/// <reference path="../constants/TextureFormat.ts" />
/// <reference path="../constants/TextureType.ts" />

import Core from "../core/core";
import Texture from "./texture";
import Vector2 from "../maths/vector2";
import TexOptions from "./texOptions";

import TextureFormat from "../constants/TextureFormat";
import TextureType from "../constants/TextureType";

"use strict";

const gl = Core.getInstance().getGL();

class SimpleTexture2D extends Texture {
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<TextureType>;

    protected _internalformat: TextureFormat;
    protected _format: TextureFormat;
    protected _type: TextureFormat;
    protected _level: number;
    protected _size: Vector2<number>;
    constructor(size: Vector2<number>, options: TexOptions = {}) {
        super(gl.TEXTURE_2D);
        options = options || {};

        this._size = size;

        this._handle = gl.createTexture();

        // TODO: Support compression

        this._flipY = options.flipY === true;

        this._internalformat = options.internalFormat || gl.RGBA;
        this._format = options.format || gl.RGBA;
        this._type = options.type || gl.UNSIGNED_BYTE;
        this._level = options.level || 0;

        this._minFilter = options.minFilter || gl.NEAREST;
        this._magFilter = options.magFilter || gl.NEAREST;
        const wraps = [
            options.wrapS || options.wrap || gl.CLAMP_TO_EDGE,
            options.wrapT || options.wrap || gl.CLAMP_TO_EDGE,
        ];

        this.bind();

        gl.texImage2D(
            this._target,
            this._level, // Level of details
            this._internalformat, // Internal format
            size.x,
            size.y,
            0,
            this._format, // Format
            this._type, // Size of each channel
            null
        );

        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        this.wrap(wraps);

        /*// Prevent NPOT textures
        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
    }
    public genMipMap() {
        const gl = Core.getInstance().getGL();
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

    public resize(size: Vector2<number>) {
        if (!size.isEqual(this._size)) {
            gl.bindTexture(this.target, this._handle);
            gl.texImage2D(
                this._target,
                this._level, // Level of details
                this._internalformat, // Internal format
                size.x,
                size.y,
                0,
                this._format, // Format
                this._type, // Size of each channel
                null
            );
        }
    }
};

export default SimpleTexture2D;
