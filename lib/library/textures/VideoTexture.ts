import { Core } from "../core/Core";

import { Texture } from "./Texture";
import { TextureFormat } from "../constants/TextureFormat";
import { TextureType, TextureTarget } from "../constants/TextureType";

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
