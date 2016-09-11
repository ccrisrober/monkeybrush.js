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


import { Core } from "../core/Core";

import { Texture } from "./Texture";
import { TextureFormat, TextureType, TextureTarget }
    from "../constants/Constants";

class VideoTexture extends Texture {
    protected _video: HTMLVideoElement;
    constructor(video: HTMLVideoElement, loop: boolean = true, onSuccess: () => void = null) {
        super(TextureTarget.Texture2D);

        const gl = Core.getInstance().getGL();

        this._video = video;
        this._video.muted = true;
        this._video.loop = loop;

        // TODO: Support compression

        this._flipY_ = Boolean(true);
        this._handle_ = gl.createTexture();

        this._internalformat_ = TextureFormat.RGBA;
        this._format_ = TextureFormat.RGBA;
        this._type_ = gl.UNSIGNED_BYTE;
        this._level_ = 0;

        this.bind();

        this.update();

        this.minFilter(TextureType.LinearMMNearest);
        this.magFilter(TextureType.Linear);

        // this.wrap([TextureType.Linear, TextureType.Clamp2Edge]);

        if (this._flipY_) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
        }

        this.unbind();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

        if (onSuccess) {
            onSuccess();
        }

        this._video.play();

        setInterval(function() {
            this.update();
        }.bind(this), 15);
    };
    public update() {
        if (this._video.readyState !== this._video.HAVE_ENOUGH_DATA) return;

        // Update texture
        this.bind();
        const gl = Core.getInstance().getGL();
        gl.texImage2D(
            this._target_,
            this._level_, // Level of details
            this._internalformat_, // Internal format
            this._format_, // Format
            this._type_, // Size of each channel
            this._video
        );
        gl.generateMipmap(gl.TEXTURE_2D);
        this.unbind();
    };
    public destroy() {
        super.destroy();
        this._video.pause();
    }
};

export { VideoTexture };
