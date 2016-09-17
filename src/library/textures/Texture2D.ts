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
    export namespace textures {
        export class Texture2D extends Texture {
            /**
             * Texture2D constructor
             * @param {HTMLImageElement} data: Image data
             * @param {TexOptions = {}} options: Texture options
             * @param {() => void = null} onSuccess Optional callback that runs when creating Texture2D.
             */
            constructor(data: any, options: TexOptions = {}, onSuccess: () => void = null) {
                super(MB.ctes.TextureTarget.Texture2D);

                const gl: WebGL2RenderingContext = MB.core.Core.getInstance().getGL();

                // TODO: Support compression

                this._flipY_ = Boolean(options.flipY || false);
                this._handle_ = gl.createTexture();

                this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
                this._format_ = options.format || MB.ctes.TextureFormat.RGBA;
                this._type_ = options.type || gl.UNSIGNED_BYTE;
                this._level_ = options.level || 0;

                this.bind();

                gl.texImage2D(
                    this._target_,
                    this._level_, // Level of details
                    this._internalformat_, // Internal format
                    this._format_, // Format
                    this._type_, // Size of each channel
                    data
               );

                this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
                this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);

                this.wrap([
                    options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                    options.wrapT || MB.ctes.WrapMode.Clamp2Edge
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
        };
    };
};
