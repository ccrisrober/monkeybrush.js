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
    export class Texture2D extends Texture {
        /**
         * Texture2D constructor
         * @param {HTMLImageElement} data: Image data
         * @param {TexOptions = {}} options: Texture options
         * @param {() => void = null} onSuccess Optional callback that runs when creating Texture2D.
         */
        constructor(data: any, options: TexOptions = {}, onSuccess: () => void = null) {
            super(MB.ctes.TextureTarget.Texture2D, options);

            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();

            this.bind();

            gl.texImage2D(
                this._target,
                this._level,
                this._internalformat,
                this._format,
                this._type,
                data
            );

            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge
            ]);
            
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY === true ? 1 : 0);

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        }
    };
};
