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
         * [loadWebCam description]
         */
        export function loadWebCam() {
            const alias: string = "webcam";
            if (!ResourceMap.isAssetLoaded(alias)) {
                // Update resources in load counter
                ResourceMap.asyncLoadRequested(alias);

                let video = document.createElement("video");
                video.autoplay = true;

                video.muted = true;
                video.loop = true;

                if (navigator["webkitGetUserMedia"]) {
                    navigator["webkitGetUserMedia"]({video: true}, function(stream) {
                        video.src = URL.createObjectURL(stream);
                        video.addEventListener("loadeddata", function() {
                            // Video is loaded and can be played
                            ResourceMap.asyncLoadCompleted(alias, video);
                        }, false);
                    }.bind(this), function(err) {
                        alert("You got no WebRTC webcam ...");
                    });
                } else if (navigator["mozGetUserMedia"]) {
                    navigator["mozGetUserMedia"]({video: true}, function(stream) {
                        video.src = URL.createObjectURL(stream);
                        video.addEventListener("loadeddata", function() {
                            // Video is loaded and can be played
                            ResourceMap.asyncLoadCompleted(alias, video);
                        }, false);
                    }.bind(this), function(error) {
                        alert("You got no WebRTC webcam ...");
                    });
                } else {
                    console.assert(false);
                }
            }
        };
    };
};
