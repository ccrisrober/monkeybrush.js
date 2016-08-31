
import { VideoTexture } from "./VideoTexture";
import { ResourceMap } from "../resources/ResourceMap";

class WebcamTexture extends VideoTexture {
    constructor(onSuccess: () => void = null) {
        super(ResourceMap.retrieveAsset("webcam"));

        this._video.width = 320;
        this._video.height = 320;
    }
};

export { WebcamTexture };
