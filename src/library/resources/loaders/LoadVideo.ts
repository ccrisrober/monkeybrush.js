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

"use strict";

namespace MB {
    export namespace Loaders {
        /**
         * [loadVideo description]
         * @param {string}    videoSrc [description]
         * @param {string =        ""}          alias [description]
         */
        export function loadVideo(videoSrc: string, alias: string = "") {
            alias = _getAlias(videoSrc, alias);
            if (!ResourceMap.isAssetLoaded(alias)) {
                // Update resources in load counter
                ResourceMap.asyncLoadRequested(alias);

                // xhrLoader(videoSrc, true, "arraybuffer", function(ev: ProgressEvent) {
                    // Asynchronously decode, then call the function in parameter.
                    let video: HTMLVideoElement = <HTMLVideoElement> document.createElement(alias);
                    video.src = videoSrc;
                    video.addEventListener("loadeddata", function() {
                        // Video is loaded and can be played
                        ResourceMap.asyncLoadCompleted(alias, video);
                    }, false);
                // }.bind(this));
            }
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
         * [unloadVideo description]
         * @param {string} imageSrc [description]
         */
        export function unloadVideo(videoSrc: string) {
            ResourceMap.unloadAsset(videoSrc);
        };
    };
};
