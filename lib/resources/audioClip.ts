/// <reference path="resourceMap.ts" />
class AudioClip {
	protected _audioContext: AudioContext;
	protected _bgAudioNode: AudioBufferSourceNode = null;

	constructor() {
		this.initAudioContext();
	}
	public initAudioContext() {
		this._audioContext = new (window["AudioContext"] || window["webkitAudioContext"])();
	}
	public loadAudio(clipName: string) {
		if (!(ResourceMap.isAssetLoaded(clipName))) {
			// Update resources in load counter
			ResourceMap.asyncLoadRequested(clipName);

			// Async request the data from server
			var request = new XMLHttpRequest();
			request.open("GET", clipName, true);

            // Specify that the request retrieves binary data.
			request.responseType = "arraybuffer";

			request.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                this._audioContext.decodeAudioData(request.response,
                    function (buffer) {
                        ResourceMap.asyncLoadCompleted(clipName, buffer);
                    }
                );
            }.bind(this);
            request.send();
		}
	}
	public unloadAudio(clipName: string) {
		ResourceMap.unloadAsset(clipName);
	}
	public stopBackgroundAudio() {
		// Check if the audio is playing
		if(this._bgAudioNode !== null) {
			this._bgAudioNode.stop(0);
			this._bgAudioNode = null;
		}
	}
	public playSound(clipName: string) {
		var clip = ResourceMap.retrieveAsset(clipName);
		if(clip) {
			var sourceNode = this._audioContext.createBufferSource();
			sourceNode.buffer = clip;
			sourceNode.connect(this._audioContext.destination);
			// TODO: Volume!!
			sourceNode.start(0);
		}
	}
	public isBackgroundAudioPlaying(): boolean {
		return this._bgAudioNode !== null;
	}
	public playBackgroundAudio(clipName: string) {
		var clipInfo = ResourceMap.retrieveAsset(clipName);
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
	protected _stopBackgroundAudio() {
		// Check if audio is playing
		if (this._bgAudioNode !== null) {
			this._bgAudioNode.stop(0);
			this._bgAudioNode = null;
		}
	}
}