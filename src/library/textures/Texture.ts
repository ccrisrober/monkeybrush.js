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

"use strict";

namespace MB {
    declare var WebGL2RenderingContext: any;
    export interface TexOptions {
        internalFormat?: ctes.PixelFormat;
        format?: ctes.PixelFormat;
        minFilter?: ctes.TextureFilter;
        magFilter?: ctes.TextureFilter;
        type?: ctes.DataType;
        level?: number;
        flipY?: number;
        wrapS?: ctes.WrapMode;
        wrapT?: ctes.WrapMode;
        wrapR?: ctes.WrapMode;
        minLOD?: number;
        maxLOD?: number;
        autoMipMap?: boolean;
        border?: number;
        compressed?: boolean;
        anisotropic?: number;

        offsets?: Array<number>;
    };
    export abstract class Texture {
        protected _handler: WebGLTexture;
        protected _target: ctes.TextureTarget;
        protected _context: GLContext;

        protected _level: number;
        protected _border: number;
        protected _internalFormat: MB.ctes.PixelFormat;
        protected _format: MB.ctes.PixelFormat;
        protected _type: MB.ctes.DataType;

        protected _wrapS: MB.ctes.WrapMode;
        protected _wrapT: MB.ctes.WrapMode;
        protected _wrapR: MB.ctes.WrapMode;

        protected _minFilter: MB.ctes.TextureFilter;
        protected _magFilter: MB.ctes.TextureFilter;

        protected _flipY: number = 0;

        constructor(context: GLContext, target: ctes.TextureTarget, options: TexOptions = {}) {
            this._context = context;
            this._target = target;
            const gl = this._context.gl;
            this._handler = gl.createTexture();

            this._level = options.level || 0;
            this._border = options.border || 0;
            this._internalFormat = options.internalFormat || MB.ctes.PixelFormat.RGBA;
            this._format = options.format || MB.ctes.PixelFormat.RGBA;
            this._type = options.type || MB.ctes.DataType.UnsignedByte;

            this._wrapS = options.wrapS || MB.ctes.WrapMode.Clamp2Edge;
            this._wrapT = options.wrapT || MB.ctes.WrapMode.Clamp2Edge;
            this._wrapR = options.wrapR || MB.ctes.WrapMode.Clamp2Edge;

            this._minFilter = options.minFilter || MB.ctes.TextureFilter.Linear;
            this._magFilter = options.magFilter || MB.ctes.TextureFilter.Linear;

            this._flipY = options.flipY || 0;

        };
        public bind(slot?: number) {
            const gl = this._context.gl;
            if (typeof slot === "number" && slot >= 0) {
                gl.activeTexture(gl.TEXTURE0 + slot);
            }
            gl.bindTexture(this._target, this._handler);
        };
        public unbind() {
            const gl = this._context.gl;
            gl.bindTexture(this._target, null);
        };
        public destroy() {
            const gl = this._context.gl;
            gl.deleteTexture(this._handler);
            this._handler = null;
        };
        get target(): ctes.TextureTarget {
            return this._target;
        };
        get handler(): WebGLTexture {
            return this._handler;
        };

        public resize(size: MB.Vect2) {
            // TODO
        }
    };
};
