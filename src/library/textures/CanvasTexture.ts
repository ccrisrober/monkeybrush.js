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

namespace MBX {
    /**
     * CanvasTexture class
     * @class CanvasTexture
     *
     * This class uses an canvas image like texture
     */
    export class CanvasTexture extends MB.Texture {
        /**
         * Canvas that contains the image texture
         * @type {HTMLCanvasElement}
         */
        protected _domCanvas: HTMLCanvasElement;
        /**
         * CanvasTexture constructor.
         * @param {GLContext} context [description]
         * @param {MB.Vect2} size: Texture size
         * @param {TexOptions = {}} options: Texture options
         * @param {() => void = null} onSuccess Optional callback that runs when creating CanvasTexture.
         */
        constructor(context: MB.GLContext, domCanvas: HTMLCanvasElement,
            options: MB.TexOptions = {}, onSuccess: () => void = null) {
            super(context, MB.ctes.TextureTarget.Texture2D, options);

            const gl: WebGL2RenderingContext = this._context.gl;

            this._domCanvas = domCanvas;
            this.bind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

            gl.texImage2D(
                this._target,
                this._level,
                this._internalFormat,
                this._format,
                this._type,
                this._domCanvas
            );

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

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        };
        /**
         * Updates the texture based on the current image of the canvas
         *     that was referenced in the class constructor.
         */
        public update() {
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(
                this._target,
                this._level,
                this._internalFormat,
                this._format,
                this._type,
                this._domCanvas
            );
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        };
    };
};
