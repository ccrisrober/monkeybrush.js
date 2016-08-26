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
/// <reference path="../maths/vector3.ts" />
/// <reference path="texOptions.ts" />

import Vector3 from "../maths/vector3";
import Texture from "./texture";
import Core from "../core/core";
import TexOptions from "./texOptions";

"use strict";

declare var WebGL2RenderingContext: any;

class Texture3D extends Texture {
    constructor (data, size: Vector3<number>, options: TexOptions = {}) {
        const gl = Core.getInstance().getGL();
        if (!(gl instanceof WebGL2RenderingContext)) {
            throw new Error("Must provide a WebGL2 context ...");
        }
        super(gl.TEXTURE_3D);
        options = options || {};

        this._handle = gl.createTexture();

        let compressed = options["compressed"] === true;

        let _internalformat = options.internalFormat || gl.RGBA;
        let _format = options.format || gl.RGBA;
        let _type = options.type || gl.UNSIGNED_BYTE;
        const _level = options.level || 0;

        // TODO: WRAP

        this.bind();

        if (compressed) {
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
                this._target,
                _level,
                _internalformat,
                size.x,
                size.y,
                size.z,
                0,
                _format,
                _type,
                data
            );
        }
    };
    public bind(slot?: number) {
        const gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this._target, this._handle);
    };
    public unbind() {
        const gl = Core.getInstance().getGL();
        gl.bindTexture(this._target, null);
    };
    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
};

export default Texture3D;
