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
        /**
         * [constructor description]
         * @param {Array<any>}    images [description]
         * @param {TexOptions =      {}}        options [description]
         * @param {() => void = null} onSuccess Optional callback that runs when creating Texture2DArray.
         */
        constructor(images: Array<any>, options: TexOptions = {}, onSuccess: () => void = null) {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            super(MB.ctes.TextureTarget.Texture2DArray, options);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

            this._layer_ = 0;

            // TODO: WRAP

            this.bind();

            // TODO: Poner mejor
            gl.texParameteri(this._target_, gl.TEXTURE_BASE_LEVEL, 0);
            gl.texParameteri(this._target_, gl.TEXTURE_MAX_LEVEL, 0);

            this._numTex_ = images.length;
            // TODO: Hardcoded
            gl.texImage3D(
                gl.TEXTURE_2D_ARRAY, 0, gl.RGB8,
                this._numTex_, this._numTex_, 16, 0,
                gl.RGB, gl.UNSIGNED_BYTE, null
           );

            images.forEach((image: any, i: number) => {
                gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0,
                    0, 0, i,
                    this._numTex_, this._numTex_, 1,
                    gl.RGB, gl.UNSIGNED_BYTE, image);
            });


            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);

            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge
            ]);

            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }

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
