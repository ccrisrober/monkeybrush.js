import { Core } from "../core/Core";

import { Texture } from "./Texture";
import { ResourceMap } from "../resources/ResourceMap";
import { TextureFormat } from "../constants/TextureFormat";
import { TextureType, TextureTarget } from "../constants/TextureType";

class WebcamTexture extends Texture {
    protected _video: HTMLVideoElement;
    constructor( onSuccess: () => void = null) {
        super(TextureTarget.Texture2D);
        this._video = ResourceMap.retrieveAsset("webcam");
        this._video.autoplay = true;

        this._video.width = 320;
        this._video.height = 320;

        this._video.muted = true;
        this._video.loop = true;


        const gl = Core.getInstance().getGL();
        // TODO: Support compression

        this._flipY_ = Boolean(true);
        this._handle_ = gl.createTexture();

        this._internalformat_ = TextureFormat.RGBA;
        this._format_ = TextureFormat.RGBA;
        this._type_ = TextureFormat.UnsignedByte;
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

export { WebcamTexture };
