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
    export class DOMElement {
        protected _domElem: HTMLElement;
        protected _matrix: Float32Array;
        constructor(domElem: HTMLElement = document.createElement("div")) {
            this._domElem = domElem;
            this._domElem.style.overflow = "hidden";
            this._domElem.style["WebkitTransformStyle"] = "preserve-3d";
            this._domElem.style["MozTransformStyle"] = "preserve-3d";
            this._domElem.style["oTransformStyle"] = "preserve-3d";
            this._domElem.style.transformStyle = "preserve-3d";
        }

        public render(camera: Camera2) {
            const fov = 45.0 * 3.14 / 360.0;
            // Only change perspective if camera changed (more eficient)
            this._domElem.style["WebkitPerspective"] = fov + "px";
            this._domElem.style["MozPerspective"] = fov + "px";
            this._domElem.style["oPerspective"] = fov + "px";
            this._domElem.style.perspective = fov + "px";

            // const style = "translate3d(0, 0,";
        }
    };
};
