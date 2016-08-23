/// <reference path="texture.ts" />

import Core from "../core/core";
import Texture from "./texture";
import Vector2 from "../maths/vector2";

"use strict";

const gl = Core.getInstance().getGL();

class SimpleTexture2D extends Texture {
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;

    constructor(size: Vector2<number>, options = {}) {
        super(gl.TEXTURE_2D);
        options = options || {};

        // Support compression

        this._flipY = options["flipY"] === true;
        this._handle = gl.createTexture();

        let _internalformat = options["internalformat"] || gl.RGBA;
        let _format = options["format"] || gl.RGBA;
        let _type = options["type"] || gl.UNSIGNED_BYTE;
        const _level = options["level"] || 0;

        this._minFilter = options["minFilter"] || gl.NEAREST;
        this._magFilter = options["magFilter"] || gl.NEAREST;
        let wraps = options["wrap"] || [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];

        if (!Array.isArray(wraps)) {
            wraps = [wraps, wraps];
        } else {
            this._wraps = wraps;
        }

        this.bind();

        gl.texImage2D(
            this._target, 
            _level, // Level of details
            _internalformat, // Internal format
            size.x, 
            size.y, 
            0, 
            _format, // Format
            _type, // Size of each channel
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
};

export default SimpleTexture2D;