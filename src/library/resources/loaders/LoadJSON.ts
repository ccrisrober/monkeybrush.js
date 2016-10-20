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
         * [loadJSON description]
         * @param {string}    jsonSrc [description]
         * @param {string =        ""}          alias [description]
         */
        export function loadJSON(jsonSrc: string, alias: string = "") {
            alias = _getAlias(jsonSrc, alias);
            if (!(ResourceMap.isAssetLoaded(alias))) {
                // Update resources in load counter
                ResourceMap.asyncLoadRequested(alias);

                // Async request the data from server
                let request = new XMLHttpRequest();
                request.open("GET", jsonSrc, true);

                // Specify that the request retrieves json data.
                request.responseType = "json";

                request.onload = function () {
                    ResourceMap.asyncLoadCompleted(alias, JSON.parse(request.response));
                }.bind(this);
                request.send();
            }
        };
    };
};
