/// <reference path="texture2d.ts" />

import Texture2D from "./texture2d";
import Core from "../core/core";

"use strict";

class VideoTexture extends Texture2D {
    public _videoElem: HTMLVideoElement;
    constructor(data, options = {}) {
        const gl = Core.getInstance().getGL();
        options["minFilter"] = gl.LINEAR;
        options["magFilter"] = gl.LINEAR;
        options["wrap"] = [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];
        super(data, options);
        this._videoElem.play();
    }
    public updateTexture() {
        const gl = Core.getInstance().getGL();
        gl.bindTexture(this._target, this._handle);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(
            this._target,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            this._videoElem // TODO: videoElement
        );
    }
};

export default VideoTexture;