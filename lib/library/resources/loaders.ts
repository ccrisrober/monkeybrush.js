/// <reference path="resourceMap.ts" />

import ResourceMap from "./resourceMap";

"use strict";

namespace loaders {
    function _getAlias(imageSrc: string, alias: string): string {
        return (alias.length < 1) ? imageSrc : alias;
    }

    /**
     * @param {string}
     * @param {string = ""}
     */
    export function loadImage(imageSrc: string, alias: string = "") {
        alias = _getAlias(imageSrc, alias);
        if (!ResourceMap.isAssetLoaded(alias)) {
            let img = new Image();
            ResourceMap.asyncLoadRequested(alias);
            img.onload = function() {
                // setTimeout(function() {
                    ResourceMap.asyncLoadCompleted(alias, img);
                // }, 2500);
            };
            img.onerror = function(err) {
                ResourceMap.asyncLoadFailed(alias);
            };
            img.src = imageSrc;
        } else {
            ResourceMap.incAssetRefCount(alias);
        }
    }
    /**
     * @param {string}
     */
    export function unloadImage(imageSrc: string) {
        ResourceMap.unloadAsset(imageSrc);
    }
    /**
     * @param {string}
     */
    export function loadAudio(clipName: string, alias: string = "") {
        alias = _getAlias(clipName, alias);
        if (!(ResourceMap.isAssetLoaded(alias))) {
            // Update resources in load counter
            ResourceMap.asyncLoadRequested(alias);

            // Async request the data from server
            let request = new XMLHttpRequest();
            request.open("GET", clipName, true);

            // Specify that the request retrieves binary data.
            request.responseType = "arraybuffer";

            request.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                this._audioContext.decodeAudioData(request.response,
                    function (buffer) {
                        ResourceMap.asyncLoadCompleted(alias, buffer);
                    }
                );
            }.bind(this);
            request.send();
        }
    }
    /**
     * @param {string}
     */
    export function unloadAudio(clipName: string) {
        ResourceMap.unloadAsset(clipName);
    }
    /**
     * @param {string}
     * @param {number}
     * @param {number}
     * @param {string = ""}
     */
    export function loadHDRImage(imageSrc: string, width: number, height: number, alias: string = "") {
        alias = _getAlias(imageSrc, alias);
        if (!ResourceMap.isAssetLoaded(alias)) {
            ResourceMap.asyncLoadRequested(alias);
            // Async request the data from server
            let request = new XMLHttpRequest();
            request.open("GET", imageSrc, true);

            // Specify that the request retrieves binary data.
            request.responseType = "arraybuffer";

            request.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                
                const arrayBuffer = request.response;
                if ( arrayBuffer ) {
                    let bytes = new Uint8Array( arrayBuffer );
                    let data = new Float32Array( width * height * 3 );

                    let byteIdx = 0;

                    // skip the main header (we already assume the format, width and height)
                    for ( ; byteIdx < bytes.length; byteIdx++ ) {
                        if ( bytes[byteIdx] === 0x0A && bytes[byteIdx + 1] === 0x0A ) {
                            byteIdx = byteIdx + 2;
                            break;
                        }
                    }
                    // skip the resolution bit
                    for ( ; byteIdx < bytes.length; byteIdx++ ) {
                        if ( bytes[byteIdx] === 0x0A ) {
                            byteIdx = byteIdx + 1;
                            break;
                        }
                    }

                    let idx = 0;
                    for ( let row = 0; row < height; row++ ) {
                        for ( let col = 0; col < width; col++ ) {
                            const r = bytes[byteIdx++];
                            const g = bytes[byteIdx++];
                            const b = bytes[byteIdx++];
                            const e = bytes[byteIdx++];
                            const expFactor = Math.pow( 2, e - 128 );
                            data[idx++] = ( r / 256 ) * expFactor;
                            data[idx++] = ( g / 256 ) * expFactor;
                            data[idx++] = ( b / 256 ) * expFactor;
                        }
                    }
                    ResourceMap.asyncLoadCompleted(alias, data);
                }

            }.bind(this);
            request.send();
        } else {
            ResourceMap.incAssetRefCount(alias);
        }
    }
    /**
     * @param {string}
     */
    export function unloadHDRImage(imageSrc: string) {
        ResourceMap.unloadAsset(imageSrc);
    }
};

export default loaders;