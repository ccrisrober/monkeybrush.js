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

namespace Loaders {
    /**
     * Get alias from src resource
     * @param  {string} src: Src name
     * @param  {string = ""} alias: Optional alias
     * @return {string}: Src if alias undefined. Otherwise, alias.
     */
    function _getAlias(src: string, alias: string = ""): string {
        return (alias.length < 1) ? src : alias;
    };
    export function loadVideo(videoSrc: string, alias: string = "") {
        /*alias = _getAlias(videoSrc, alias);
        if (!ResourceMap.isAssetLoaded(alias)) {
            // Update resources in load counter
            ResourceMap.asyncLoadRequested(alias);

            // Async request the data from server
            let request = new XMLHttpRequest();
            request.open("GET", videoSrc, true);

            request.responseType = "arraybuffer";

            request.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                var video: HTMLVideoElement = <HTMLVideoElement> document.createElement(alias);
                video.src = videoSrc;
                ResourceMap.asyncLoadCompleted(alias, video);
            }.bind(this);

            request.send();
        }*/
        /*// Create HTML Video Element to play the video
        var video = document.createElement('video');
        video.addEventListener('canplay', function (e) {
            videoTexture.setSource(video);
        });
        video.src = this.videoUrl;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.play();*/
    };
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
    };
    /**
     * @param {string}
     */
    export function unloadImage(imageSrc: string) {
        ResourceMap.unloadAsset(imageSrc);
    };
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
    };
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
    };
    export function xhrLoader(url: string, sync: boolean = true,
        responseType: string = "arraybuffer", onLoad, onError = () => { /**/ }) {
        let request = new XMLHttpRequest();

        request.open("GET", url, sync);

        request.responseType = responseType;

        request.onload = onLoad;
        request.onerror = onError;

        request.send();
    };
};

export { Loaders };
