
import { AudioContext_ } from "./AudioContext_";

class AudioListener {
    public _gain: GainNode;
    constructor() {
        this._gain = AudioContext_.getContext().createGain();
        this._gain.connect(AudioContext_.getContext().destination);
    };
    get volume(): number { return this._gain.gain.value; };
    set volume(v: number) {
        this._gain.gain.value = v;
    }
};

export { AudioListener };
