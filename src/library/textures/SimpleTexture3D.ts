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

    export class SimpleTexture3D extends Texture {
        protected _offsets_: Array<number>;
        /**
         * [constructor description]
         * @param {GLContext} context [description]
         * @param {[type]}        data [description]
         * @param {MB.Vect3}         size [description]
         * @param {TexOptions =    {}}        options [description]
         * @param {() => void = null} onSuccess Optional callback that runs when creating SimpleTexture3D.
         */
        constructor(context: GLContext, data, size: MB.Vect3, options: TexOptions = {}, onSuccess: () => void = null) {
            super(context, MB.ctes.TextureTarget.Texture3D, options);

            const gl: WebGL2RenderingContext = this._context.gl;
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            this._offsets_ = options.offsets;
            // TODO: WRAP

            /*

            const gl = MB.this._context.gl;

            var SIZE = 32;
            var data = new Uint8Array(SIZE * SIZE * SIZE);
            for (var k = 0; k < SIZE; ++k) {
                for (var j = 0; j < SIZE; ++j) {
                    for (var i = 0; i < SIZE; ++i) {
                        data[i + j * SIZE + k * SIZE * SIZE] = MB.Noise.perlin.noise(i, j, k) * 256;
                    }
                }
            }
            var texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_3D, texture);
            gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_BASE_LEVEL, 0);
            gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, Math.log2(SIZE));
            gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texImage3D(
                gl.TEXTURE_3D,  // target
                0,              // level
                gl.R8,        // internalformat
                SIZE,           // width
                SIZE,           // height
                SIZE,           // depth
                0,              // border
                gl.RED,         // format
                gl.UNSIGNED_BYTE,       // type
                data            // pixel
           );
            gl.generateMipmap(gl.TEXTURE_3D);
            gl.bindTexture(gl.TEXTURE_3D, null);*/

            if (this._offsets_ && this._offsets_.length === 3) {
                if (this._compressed) {
                    gl.compressedTexSubImage3D(
                        this._target,
                        this._level,
                        this._offsets_[0],
                        this._offsets_[1],
                        this._offsets_[2],
                        size.x,
                        size.y,
                        size.z,
                        this._format,
                        data
                   );
                } else {
                    gl.texSubImage3D(
                        this._target,
                        this._level,
                        this._offsets_[0],
                        this._offsets_[1],
                        this._offsets_[2],
                        size.x,
                        size.y,
                        size.z,
                        this._format,
                        this._type,
                        data
                   );
                }
            } else {
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
            }

            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge
            ]);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY === true ? 1 : 0);

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        };
    };
};
