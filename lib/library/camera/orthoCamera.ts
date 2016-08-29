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


/// <reference path="camera.ts" />
import { Camera } from "./camera";
import { Mat4 } from "../maths/mat4";
import { Vect3 } from "../maths/vect3";

"use strict";

/**
 * Orthograhic camera class
 * @class OrthoCamera
 */
class OrthoCamera extends Camera {
    /**
     * Update view and projection matrix based on orthographic projection
     */
    public update() {
        const yMin = -this._near * Math.tan(this._fov * Math.PI / 360.0);
        const yMax = -yMin;
        const xMin = yMin + this.aspRatio;
        const xMax = yMax + this.aspRatio;
        this._projection = Mat4.orthographic(xMin, xMax, yMin, yMax, this._near, this._far);
        this._view = Mat4.lookAt(Vect3.create(this._position), Vect3.create(this._look), Vect3.create(this._up));
        // target: vec3.add(vec3.create(), this.position, this._front) /*
    }
};

export { OrthoCamera };
