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


/// <reference path="texture2d.ts" />
/// <reference path="texOptions.ts" />

import Texture2D from "./texture2d";
import Core from "../core/core";
import TexOptions from "./texOptions";

"use strict";
// TODO: https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample8/webgl-demo.js
class VideoTexture extends Texture2D {
    public _videoElem: HTMLVideoElement;
    public intervalID: number;
    constructor(videoElem: HTMLVideoElement, options: TexOptions = {}) {
        const gl = Core.getInstance().getGL();
        options.minFilter = gl.LINEAR;
        options.magFilter = gl.LINEAR;
        options.wrapS = gl.CLAMP_TO_EDGE;
        options.wrapT = gl.CLAMP_TO_EDGE;
        super(null, options);
        this._videoElem = videoElem;
        let self = this;
        this._videoElem.addEventListener("canplaythrough", function() {
            self._videoElem.play();
            self._videoElem.muted = true;
            self._videoElem.loop = true;
            self.intervalID = setInterval(self.updateTexture, 15);
        }, true);
        this._videoElem.addEventListener("ended", function() {
            clearInterval(self.intervalID);
        }, true);
        this._videoElem.play();
    }
    public updateTexture() {
        const gl = Core.getInstance().getGL();
        /*gl.bindTexture(this._target, this._handle);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(
            this._target,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            this._videoElem // TODO: videoElement
        );*/

        gl.bindTexture(gl.TEXTURE_2D, this._handle);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
            gl.UNSIGNED_BYTE, this._videoElem);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
};

export default VideoTexture;
