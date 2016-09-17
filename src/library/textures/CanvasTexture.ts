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
        /**
         * CanvasTexture class
         * @class CanvasTexture
         *
         * This class uses an image of a canvas like texture
         */
        export class CanvasTexture extends Texture {
            /**
             * Canvas that contains the image texture
             * @type {HTMLCanvasElement}
             */
            protected _domCanvas: HTMLCanvasElement;
            /**
             * CanvasTexture constructor
             * @param {MB.maths.Vect2} size: Texture size
             * @param {TexOptions = {}} options: Texture options
             * @param {() => void = null} onSuccess Optional callback that runs when creating CanvasTexture.
             */
            constructor(domCanvas: HTMLCanvasElement, options: TexOptions = {}, onSuccess: () => void = null) {
                super(MB.ctes.TextureTarget.Texture2D);
                // TODO: Al constructor sería mejor mandarle el tipo y las options (para ahorrar código)
                // Luego el propio constructor sube las texturas que sea (que el padre solo lea las opciones
                // y rellene los datos de turno)

                const gl: WebGL2RenderingContext = MB.core.Core.getInstance().getGL();
                this._handle_ = gl.createTexture();

                this._flipY_ = options.flipY === true;
                this._domCanvas = domCanvas;

                this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
                this._format_ = options.format || gl.RGBA;
                this._type_ = options.type || gl.UNSIGNED_BYTE;
                this._level_ = options.level || 0;
                this._compressed_ = Boolean(options.compressed || false);

                this.bind();

                gl.texImage2D(
                    this._target_,
                    this._level_,
                    this._internalformat_,
                    this._format_, // Format
                    this._type_, // Size of each channel
                    this._domCanvas
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
            };
            /**
             * Updates the texture based on the current image of the canvas
             * that was referenced in the class constructor
             */
            public update() {
                this.bind();
                const gl: WebGL2RenderingContext = MB.core.Core.getInstance().getGL();
                gl.texImage2D(
                    this._target_,
                    this._level_,
                    this._internalformat_,
                    this._format_,
                    this._type_,
                    this._domCanvas
               );
                this.unbind();
            };
        };
    };
};
