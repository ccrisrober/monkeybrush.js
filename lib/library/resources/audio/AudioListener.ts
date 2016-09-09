
import { AudioContext2 } from "./AudioContext_";

class AudioListener {
    public _gain: GainNode;
    constructor() {
        this._gain = AudioContext2.getContext().createGain();
        this._gain.connect(AudioContext2.getContext().destination);
    };
    get volume(): number { return this._gain.gain.value; };
    set volume(v: number) {
        this._gain.gain.value = v;
    }
};

export { AudioListener };
