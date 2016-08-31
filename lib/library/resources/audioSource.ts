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


/// <reference path="ResourceMap.ts" />

import { ResourceMap } from "./ResourceMap";

"use strict";

class AudioSource {
    /**
     * [_audioContext description]
     * @type {AudioContext}
     */
    protected _audioContext: AudioContext;
    /**
     * [_bgAudioNode description]
     * @type {AudioBufferSourceNode}
     */
    protected _bgAudioNode: AudioBufferSourceNode = null;
    /**
     *
     */
    constructor() {
        this.initAudioContext();
    }
    /**
     *
     */
    public initAudioContext() {
        this._audioContext = new (window["AudioContext"] || window["webkitAudioContext"])();
    }
    /**
     *
     */
    public stopBackgroundAudio() {
        // Check if the audio is playing
        if (this._bgAudioNode !== null) {
            this._bgAudioNode.stop(0);
            this._bgAudioNode = null;
        }
    }
    /**
     * @param {string}
     */
    public playSound(clipName: string) {
        const clip = ResourceMap.retrieveAsset(clipName);
        if (clip) {
            let sourceNode = this._audioContext.createBufferSource();
            sourceNode.buffer = clip;
            sourceNode.connect(this._audioContext.destination);
            // TODO: Volume!!
            // let gain = this._audioContext.createGain();
            // gain.connect(sourceNode);
            sourceNode.start(0);
        }
    }
    /**
     * @return {boolean}
     */
    public isBackgroundAudioPlaying(): boolean {
        return this._bgAudioNode !== null;
    }
    /**
     * @param {string}
     */
    public playBackgroundAudio(clipName: string) {
        const clipInfo = ResourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // Stop audio if playing.
            this._stopBackgroundAudio();

            this._bgAudioNode = this._audioContext.createBufferSource();
            this._bgAudioNode.buffer = clipInfo;
            this._bgAudioNode.connect(this._audioContext.destination);
            this._bgAudioNode.loop = true;
            this._bgAudioNode.start(0);
        }
    }
    /**
     *
     */
    protected _stopBackgroundAudio() {
        // Check if audio is playing
        if (this._bgAudioNode !== null) {
            this._bgAudioNode.stop(0);
            this._bgAudioNode = null;
        }
    }
};

export { AudioSource };
