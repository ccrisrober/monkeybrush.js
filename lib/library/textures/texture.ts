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


/// <reference path="../core/core.ts" />
/// <reference path="../maths/vector2.ts" />

// TODO: hacer unbind al crear textura!!

import { Core } from "../core/core";
import { Vect2 } from "../maths/vect2";
import { TextureType, TextureTarget } from "../constants/TextureType";
import { TextureFormat } from "../constants/TextureFormat";
import { extensions } from "../extras/extensions";

"use strict";

interface TexOptions {
    internalFormat?: TextureFormat;
    type?: TextureFormat;
    level?: number;
    minFilter?: TextureType;
    magFilter?: TextureType;
    flipY?: boolean;
    wrap?: TextureType;
    wrapS?: TextureType;
    wrapT?: TextureType;
    wrapR?: TextureType;
    autoMipMap?: boolean;
    format?: TextureFormat;
    border?: number;
};

declare var WebGL2RenderingContext: any;

abstract class Texture {

    protected _anisotropy_: number = 1;
    protected _internalformat_: TextureFormat = TextureFormat.RGBA;
    protected _format_: TextureFormat = TextureFormat.RGBA;

    protected _wrapS_: TextureType = TextureType.Nearest;
    protected _wrapT_: TextureType = TextureType.Nearest;
    protected _wrapR_: TextureType = TextureType.Nearest;

    protected _minFilter_: TextureType = TextureType.Linear;
    protected _magFilter_: TextureType = TextureType.Linear;

    protected _type_: TextureFormat = TextureFormat.UnsignedByte;
    protected _flipY_: boolean = true;
    protected _generateMipMaps_: boolean = false;
    protected _premultiplyAlpha_: boolean = false;

    protected _unpackAlignment_: number = 4;
    protected _target_: TextureTarget;
    protected _minLOD_: number;
    protected _maxLOD_: number;

    protected _level_: number = 0;

    public minFilter(filter: TextureType) {
        this.bind();
        const gl = Core.getInstance().getGL();
        gl.texParameteri(this._target_, gl.TEXTURE_MIN_FILTER, filter);
        this._minFilter_ = filter;
    }
    public magFilter(filter: TextureType) {
        this.bind();
        const gl = Core.getInstance().getGL();
        gl.texParameteri(this._target_, gl.TEXTURE_MAG_FILTER, filter);
        this._magFilter_ = filter;
    }
    public wrap(modes: Array<number>) {
        if (modes.length < 2) {
            throw new Error("Must specify wrapS, wrapT modes");
        }
        const gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(this._target_, gl.TEXTURE_WRAP_S, modes[0]);
        gl.texParameteri(this._target_, gl.TEXTURE_WRAP_T, modes[1]);
        if (modes.length > 2) {
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_R, modes[2]);
            this._wrapR_ = modes[2];
        }
        this._wrapS_ = modes[0];
        this._wrapT_ = modes[1];
    }
    public generateMipMap() {
        const gl = Core.getInstance().getGL();
        this.bind();
        this._generateMipMaps_ = true;
        // TODO: Check NPOT??
        gl.generateMipmap(this._target_);
    }
    /**
     * Set texture anisotropic level
     * @param {number = 0} level: Anisotropic level
     */
    public setAnisotropic(level: number = 0) {
        const gl = Core.getInstance().getGL();
        level = Math.floor(level);
        const ext = extensions.get("EXT_texture_filter_anisotropic");
        const max_anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        if (max_anisotropy < level) {
            this._anisotropy_ = level;
            gl.texParameterf(this._target_, ext.TEXTURE_MAX_ANISOTROPY_EXT, level);
        }
    };
    public bind(slot?: number) {
        const gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this._target_, this._handle_);
    }
    public unbind() {
        const gl = Core.getInstance().getGL();
        gl.bindTexture(this._target_, null);
    }
    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle_);
        this._handle_ = null;
    }
    public preventNPOT() {
        this.wrap([
            // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
            TextureType.Linear,
            // Prevents s-coordinate wrapping (repeating).
            TextureType.Clamp2Edge,
            // Prevents t-coordinate wrapping (repeating).
            TextureType.Clamp2Edge
        ]);
    }



    protected _handle_: WebGLTexture;
    constructor(target: TextureTarget) {
        this._target_ = target;
    }
    get target(): number { return this._target_; }

    public handle(): WebGLTexture {
        return this._handle_;
    }

    public resize(size: Vect2) {
        // Nothing to do here
    }

    public setLOD(minLOD: number, maxLOD: number) {
        const gl = Core.getInstance().getGL();
        if (gl instanceof WebGL2RenderingContext) {
            this._minLOD_ = minLOD;
            this._maxLOD_ = maxLOD;
            gl.texParameterf(this._target_, gl.TEXTURE_MIN_LOD, this._minLOD_);
            gl.texParameterf(this._target_, gl.TEXTURE_MAX_LOD, this._maxLOD_);
        } else {
            console.log("TEXTURE LOD isn´t supported");
        }
    }

    // TODO: Move to abstract methods
    public getWidth(): number { return -1; }
    public getHeight(): number { return -1; }
    public getDepth(): number { return -1; }
};

export { Texture, TexOptions };
