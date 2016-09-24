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

    export class Texture3D extends Texture {
        /**
         * [constructor description]
         * @param {[type]}        data [description]
         * @param {MB.Vect3}         size [description]
         * @param {TexOptions =    {}}        options [description]
         * @param {() => void = null} onSuccess Optional callback that runs when creating Texture3D.
         */
        constructor (data, size: MB.Vect3, options: TexOptions = {}, onSuccess: () => void = null) {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            super(MB.ctes.TextureTarget.Texture3D, options);
            this.bind();

            // TODO: gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

            if (this._compressed) {
                gl.compressedTexImage3D(
                    this._target,
                    this._level,
                    this._format,
                    size.x,
                    size.y,
                    size.z,
                    0,
                    data
               );
            } else {
                gl.texImage3D(
                    this._target,
                    this._level,
                    this._internalformat,
                    size.x,
                    size.y,
                    size.z,
                    0,
                    this._format,
                    this._type,
                    data
                );
            }

            // TODO: FAILED TEX IF USED!! this.wrap([
            // TODO: FAILED TEX IF USED!!     options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
            // TODO: FAILED TEX IF USED!!     options.wrapT || MB.ctes.WrapMode.Clamp2Edge,
            // TODO: FAILED TEX IF USED!!     options.wrapR || MB.ctes.WrapMode.Clamp2Edge
            // TODO: FAILED TEX IF USED!! ]);
            gl.generateMipmap(gl.TEXTURE_3D);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY === true ? 1 : 0);

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        };
    };
};
