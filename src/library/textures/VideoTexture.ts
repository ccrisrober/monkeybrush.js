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
     * VideoTexture class
     * @class VideoTexture
     */
    export class VideoTexture extends MB.Texture {
        protected _video: HTMLVideoElement;
        /**
         * [constructor description]
         * @param {GLContext} context [description]
         * @param {HTMLVideoElement} video [description]
         * @param {boolean = true} loop [description]
         * @param {number = 15} frameTime [description]
         * @param {() => void = null} onSuccess Optional callback that runs when creating VideoTexture.
         */
        constructor(context: MB.GLContext, video: HTMLVideoElement, loop: boolean = true,
            frameTime: number = 15, onSuccess: () => void = null) {
            super(context, MB.ctes.TextureTarget.Texture2D, {
                internalFormat: MB.ctes.PixelFormat.RGBA,
                format: MB.ctes.PixelFormat.RGBA,
                type: MB.ctes.DataType.UnsignedByte,
                flipY: 1
            });

            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MIN_FILTER, MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MAG_FILTER, MB.ctes.TextureFilter.Linear);

            this._video = video;
            this._video.muted = true;
            this._video.loop = loop;

            this.update();

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

            if (onSuccess) {
                onSuccess();
            }

            this._video.play();

            setInterval(function() {
                this.update();
            }.bind(this), frameTime);
        };
        public update() {
            if (this._video.readyState !== this._video.HAVE_ENOUGH_DATA) return;

            // Update texture
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(
                this._target,
                this._level,
                this._internalFormat,
                this._format,
                this._type,
                this._video
            );
            //gl.generateMipmap(gl.TEXTURE_2D);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            this.unbind();
        };
        public destroy() {
            super.destroy();
            this._video.pause();
        }
    };
};
