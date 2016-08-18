/// <reference path="resourceMap.ts" />

class AudioClip {
	protected _audioContext: AudioContext;

	constructor() {
		this.initAudioContext();
	}
	public initAudioContext() {
		this._audioContext = new (window["AudioContext"] || window["webkitAudioContext"])();
	}
}