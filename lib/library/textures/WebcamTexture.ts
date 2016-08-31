import { Core } from "../core/Core";

import { VideoTexture } from "./VideoTexture";
import { ResourceMap } from "../resources/ResourceMap";
import { TextureFormat } from "../constants/TextureFormat";
import { TextureType, TextureTarget } from "../constants/TextureType";

class WebcamTexture extends VideoTexture {
    constructor(onSuccess: () => void = null) {
        super(ResourceMap.retrieveAsset("webcam"));

        this._video.width = 320;
        this._video.height = 320;
    }
};

export { WebcamTexture };
