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


import { Camera } from "./Camera";

"use strict";

/**
 * FreeCamera camera class
 * @class FreeCamera
 */
class FreeCamera extends Camera {
    /**
     * Update view and projection matrix
     */
    public update() {
        this._view._value = mat4.create();
        // mat4.rotateX(this._view._value, this._view._value, this._rotation[0]);
        // mat4.rotateY(this._view._value, this._view._value, this._rotation[1]);
        // mat4.rotateZ(this._view._value, this._view._value, this._rotation[2] - Math.PI);
        // mat4.translate(this._view._value, this._view._value, [-this._position])
    }

};

export { FreeCamera };
