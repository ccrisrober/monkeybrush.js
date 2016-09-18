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
    export class SimpleTexture2D extends Texture {
        protected _size: MB.Vect2;

        public getWidth(): number {
            return this._size.x;
        }
        public getHeight(): number {
            return this._size.y;
        }
        protected _offsets_: Array<number>;
        /**
         * SimpleTexture2D constructor
         * @param {MB.Vect2} size: Texture size
         * @param {TexOptions = {}} options: Texture options
         * @param {() => void = null} onSuccess Optional callback that runs when creating SimpleTexture2D.
         */
        constructor(size: MB.Vect2, options: TexOptions = {}, onSuccess: () => void = null) {
            super(MB.ctes.TextureTarget.Texture2D, options);

            this._size = size;

            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            this._offsets_ = options.offsets;

            // TODO: Support compression

            this.bind();

            if (this._offsets_ && this._offsets_.length === 2) {
                if (this._compressed_) {
                    gl.compressedTexSubImage2D(
                        this._target_,
                        this._level_,
                        this._offsets_[0],
                        this._offsets_[1],
                        this.getWidth(),
                        this.getHeight(),
                        this._format_, // Format
                        null
                   );
                } else {
                    gl.texSubImage2D(
                        this._target_,
                        this._level_,
                        this._offsets_[0],
                        this._offsets_[1],
                        this.getWidth(),
                        this.getHeight(),
                        this._format_, // Format
                        this._type_, // Size of each channel
                        null
                   );
                }
            } else {
                if (this._compressed_) {
                    gl.compressedTexImage2D(
                        this._target_,
                        this._level_,
                        this._format_, // Format
                        this.getWidth(),
                        this.getHeight(),
                        0,
                        null
                   );
                } else {
                    gl.texImage2D(
                        this._target_,
                        this._level_,
                        this._internalformat_,
                        this.getWidth(),
                        this.getHeight(),
                        0,
                        this._format_, // Format
                        this._type_, // Size of each channel
                        null
                   );
                }
            }

            /*gl.texImage2D(
                this._target_,
                this._level_, // Level of details
                this._internalformat_, // Internal format
                this.getWidth(),
                this.getHeight(),
                0,
                this._format_, // Format
                this._type_, // Size of each channel
                null
           );*/

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

        public setInmutable(size: MB.Vect2 = this._size) {
            this.bind();
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            gl.texStorage2D(this.target, 1, gl.RGB8, size.x, size.y);
            this.unbind();
        }

        public resize(size: MB.Vect2) {
            if (!size.exactEquals(this._size)) {
                const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
                gl.bindTexture(this.target, this._handle_);
                gl.texImage2D(
                    this._target_,
                    this._level_, // Level of details
                    this._internalformat_, // Internal format
                    size.x,
                    size.y,
                    0,
                    this._format_, // Format
                    this._type_, // Size of each channel
                    null
               );
            }
        }
    };
};
