/// <reference path="resourceMap.ts" />

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
}