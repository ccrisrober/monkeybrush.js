/// <reference path="resourceMap.ts" />

namespace loaders {
	export function loadImage(imageSrc: string) {
	    if (!ResourceMap.isAssetLoaded(imageSrc)) {
	        let img = new Image();
	        ResourceMap.asyncLoadRequested(imageSrc);
	        img.onload = function() {
	            // setTimeout(function() {
	                ResourceMap.asyncLoadCompleted(imageSrc, img);
	            // }, 2500);
	        };
	        img.onerror = function(err) {
	            ResourceMap.asyncLoadFailed(imageSrc);
	        };
	        img.src = imageSrc;
	    } else {
	        ResourceMap.incAssetRefCount(imageSrc);
	    }
	}
	export function unloadImage(imageSrc: string) {
		ResourceMap.unloadAsset(imageSrc);
	}
	export function loadAudio(clipName: string) {
		if (!(ResourceMap.isAssetLoaded(clipName))) {
			// Update resources in load counter
			ResourceMap.asyncLoadRequested(clipName);

			// Async request the data from server
			let request = new XMLHttpRequest();
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
	export function unloadAudio(clipName: string) {
		ResourceMap.unloadAsset(clipName);
	}
}