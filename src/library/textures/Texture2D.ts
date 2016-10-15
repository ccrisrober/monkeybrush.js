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
    export interface ITexture2D {
        pixels?: any;
        width: number;
        height: number;
    };
    // TODO: Support update setSubImage
    export class Texture2D extends Texture {
        constructor(context: GLContext, data: string, options: TexOptions, onSuccess?: () => void);
        constructor(context: GLContext, data: HTMLImageElement, options: TexOptions, onSuccess?: () => void);
        constructor(context: GLContext, data: ITexture2D, options: TexOptions, onSuccess?: () => void);
        /**
         * Texture2D constructor.
         * @param {GLContext}           context [description]
         * @param {string | HTMLImageElement |       ITexture2D}  data      [description]
         * @param {TexOptions = {}} options: Texture options
         * @param {() => void = null} onSuccess Optional callback that runs when creating Texture2D.
         */
        constructor(context: GLContext, data: string | HTMLImageElement | ITexture2D, options: TexOptions = {},
            onSuccess: () => void) {
            super(context, ctes.TextureTarget.Texture2D, options);
            const gl = context.gl;
            this.bind();
            console.log("lol");
            if ((typeof data === "string") || data instanceof HTMLImageElement) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, options.flipY ? options.flipY : 0);
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, this._unpackAlignment);
                let auxData: HTMLImageElement;
                if (typeof data === "string") {
                    auxData = MB.ResourceMap.retrieveAsset(<string>data);
                } else {
                    auxData = data;
                }
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    this._format,
                    this._type,
                    auxData
                );
            } else {
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    data.width,
                    data.height,
                    this._border,
                    this._format,
                    this._type,
                    data.pixels || null
                );
            };
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MIN_FILTER,
                options.minFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MAG_FILTER,
                options.magFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_S,
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_T,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge);
            if (options.autoMipMap === true) {
                gl.generateMipmap(this._target);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        };
        public update(data: HTMLImageElement);
        public update(data: ITexture2D);
        public update(data: HTMLImageElement | ITexture2D) {
            // Update texture
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            this.bind();
            if (data instanceof HTMLImageElement) {
                // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    this._format,
                    this._type,
                    data
                );
            } else {
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    data.width,
                    data.height,
                    this._border,
                    this._format,
                    this._type,
                    data.pixels || null
                );
            };
            // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            // gl.generateMipmap(gl.TEXTURE_2D);
            this.unbind();
        }
    }
};
