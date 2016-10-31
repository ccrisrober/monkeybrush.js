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
    export interface ITexture3D extends ITexture2D {
        depth: number;
    };
    export class Texture3D extends Texture {
        /**
         * [constructor description]
         * @param {GLContext} context [description]
         * @param {[type]}        data [description]
         * @param {MB.Vect3}         size [description]
         * @param {TexOptions =    {}}        options [description]
         * @param {() => void = null} onSuccess Optional callback that runs when creating Texture3D.
         */
        constructor(context: GLContext, data: ITexture3D, options: TexOptions = {}, onSuccess: () => void = null) {
            const gl = context.gl;
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            super(context, ctes.TextureTarget.Texture3D, options);
            this.bind();
            gl.texImage3D(
                this._target,
                this._level,
                this._internalFormat,
                data.width,
                data.height,
                data.depth,
                0,
                this._format,
                this._type,
                data.pixels || null
            );
            // set the texture parameters
            // gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP);
            // gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP);
            // gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MIN_FILTER,
                options.minFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MAG_FILTER,
                options.magFilter || MB.ctes.TextureFilter.Linear);

            // Set the mipmap levels (base and max)
            gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_BASE_LEVEL, 0);
            gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, 4);

            if (options.autoMipMap) {
                gl.generateMipmap(gl.TEXTURE_3D);
            }

            this.unbind();
        };
        public setSubImage(offsetX: number, offsetY: number, offsetZ: number, data: ITexture3D) {
            const gl = this._context.gl;
            this.bind();
            gl.texSubImage3D(
                this._target,
                this._level,
                offsetX,
                offsetY,
                offsetZ,
                data.width,
                data.height,
                data.depth,
                this._format,
                this._type,
                data.pixels || null
            );
            this.unbind();
        };
    };
};
