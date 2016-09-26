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
    /**
     * CubeMapTexture class
     * @class CubeMapTexture
     */
    export class CubeMapTexture extends Texture {

        protected _finished: boolean;
        /**
         * Returns if the cubemap is completed.
         * @return {boolean}
         */
        public isFinished(): boolean {
            return this._finished;
        };

        /**
         * CubeMapTexture constructor
         * @param {TexOptions = {}} options: Texture options
         */
        // TODO: DOC
        constructor(context: GLContext, options: TexOptions = {}) {
            super(context, MB.ctes.TextureTarget.TextureCubeMap, options);

            this._finished = false;

            // TODO: Faltan todo el tema de filtrados o wrap de las opciones
                // que me he saltado por falta de tiempo :(
        };
        /**
         * Add new image to cubemap
         * @param {number} i    Index
         * @param {[type]} data Image or buffer data.
         */
        public addImage(i: number, data) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.texImage2D(0x8515 /*TEXTURE_CUBE_MAP_POSITIVE_X*/ + i, 0,
                MB.ctes.PixelFormat.RGB, MB.ctes.PixelFormat.RGB, MB.ctes.DataType.UnsignedByte, data);
        };
        /**
         * Finalize cubemap texture
         */
        public finishTex() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, MB.ctes.TextureFilter.Linear);
            gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, MB.ctes.TextureFilter.Linear);
            gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, MB.ctes.WrapMode.Clamp2Edge);

            if (gl.TEXTURE_WRAP_R) {
                gl.texParameteri(this._target, gl.TEXTURE_WRAP_R, MB.ctes.WrapMode.Clamp2Edge);
            }

            this._finished = true;
        }
    };
};
