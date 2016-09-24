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

    // TODO: https://ferransole.wordpress.com/2014/06/09/array-textures/
    // TODO: https://www.opengl.org/wiki/Example/Texture_Array_Creation
    // TODO: http://stackoverflow.com/questions/12372058/how-to-use-gl-texture-2d-array-in-opengl-3-2
    //
    //
    // https://github.com/g-truc/ogl-samples/blob/master/tests/gl-320-texture-float.cpp
    export class Texture2DArray extends Texture {
        protected _layer_: number;
        protected _numTex_: number;
        protected _size_: Vector2<number>;
        /**
         * [constructor description]
         * @param {Vector2<number>} size   [description]
         * @param {Array<any>}    images [description]
         * @param {TexOptions =      {}}        options [description]
         * @param {() => void = null} onSuccess Optional callback that runs when creating Texture2DArray.
         */
        constructor(size: Vector2<number>, images: Array<any>, options: TexOptions = {}, onSuccess: () => void = null) {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            super(ctes.TextureTarget.Texture2DArray, options);

            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

            this._size_ = size;

            this._layer_ = 0;

            // TODO: WRAP

            // TODO: Poner mejor
            gl.texParameteri(this._target, gl.TEXTURE_BASE_LEVEL, 0);
            gl.texParameteri(this._target, gl.TEXTURE_MAX_LEVEL, 0);

            this._numTex_ = images.length;

            // TODO: Hardcoded
            gl.texImage3D(
                this.target, this._level, this._internalformat,
                this._size_.x, this._size_.y, this._numTex_, 0,
                this._format, this._type, null
           );

            images.forEach((image: any, i: number) => {
                gl.texSubImage3D(
                    this.target, 0, 0, 0, i, this._size_.x, this._size_.y, 1,
                        this._format, this._type, image);
            });

            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge
            ]);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY === true ? 1 : 0);

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
            if (onSuccess) {
                onSuccess();
            }
        };
        get layer(): number { return this._layer_; };
        set layer(layer: number) {
            this._layer_ = layer;
            if (this._numTex_ >= this._layer_) {
                this._layer_ = 0;
            }
        };
        public incLayer() {
            this._layer_++;
            if (this._numTex_ <= this._layer_) {
                this._layer_ = 0;
            }
        }
    };
};
