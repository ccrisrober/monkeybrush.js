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
    export interface ITexture2DArray {
        pixels: Array<any>;
        width: number;
        height: number;
    };
    export class Texture2DArray extends Texture {
        /**
         * [constructor description]
         * @param {GLContext} context [description]
         * @param {Vector2<number>} size   [description]
         * @param {Array<any>}    images [description]
         * @param {TexOptions =      {}}        options [description]
         * @param {() => void = null} onSuccess Optional callback that runs when creating Texture2DArray.
         */
        constructor(context: GLContext, data: ITexture2DArray, options: TexOptions = {}, onSuccess: () => void = null) {
            const gl = context.gl;
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            super(context, ctes.TextureTarget.Texture2DArray, options);
            this.bind();
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

            gl.texImage3D(
                this.target, this._level, this._internalFormat,
                data.width, data.height, data.pixels.length, 0,
                this._format, this._type, null
            );

            data.pixels.forEach((image: any, i: number) => {
                gl.texSubImage3D(
                    this.target, 0, 0, 0, i, data.width, data.height, 1,
                        this._format, this._type, image);
            });

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
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_R,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge);


            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            this.unbind();
        }
    };
};
