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

// Code based on https://github.com/mikolalysenko/orbit-camera/blob/master/orbit.js

/// <reference path="Camera.ts" />
import { Camera } from "./Camera";

"use strict";

/**
 * OrbitCamera camera class
 * @class OrbitCamera
 */
class OrbitCamera { // extends Camera {
    protected _rotation: Float32Array;
    protected _center: Float32Array;
    protected _distance: number;
    constructor(eye: Float32Array = new Float32Array([0, 0, -1]),
        center: Float32Array = new Float32Array([0,0,0]),
        up: Float32Array = new Float32Array([0,1,0])) {

        this._rotation = quat.create();
        this._center = vec3.create();
        this._distance = 1;

        this._scratch0 = new Float32Array(16);
        this._scratch1 = new Float32Array(16);

        this.lookAt(eye, center, up);
    }

    protected _view: Float32Array;
    protected _projection: Float32Array;
    protected _scratch0: Float32Array;
    protected _scratch1: Float32Array;

    /**
     * Update view and projection matrix
     */
    public update() {
        this._scratch1[0] = this._scratch1[1] = 0.0;
        this._scratch1[2] = -this._distance;
        this._view = mat4.create();
        mat4.fromRotationTranslation(this._view,
            quat.conjugate(this._scratch0, this._rotation),
            this._scratch1);
        mat4.translate(this._view, this._view, vec3.negate(this._scratch0, this._center));
        mat4.perspective(this._projection, Math.PI/4.0, /*shell.width/shell.height*/1.0, 0.1, 1000.0);
    }

    public lookAt(eye: Float32Array, center: Float32Array, up: Float32Array) {
        mat4.lookAt(this._scratch0, eye, center, up);
        mat3.fromMat4(this._scratch0, this._scratch0);
        quat.fromMat3(this._rotation, this._scratch0);
        vec3.copy(this._center, center);
        this._distance = vec3.distance(eye, center);
    }

    public pan(translation) {
        var d = this._distance
        this._scratch0[0] = -d * (translation[0] || 0);
        this._scratch0[1] =  d * (translation[1] || 0);
        this._scratch0[2] =  d * (translation[2] || 0);
        vec3.transformQuat(this._scratch0, this._scratch0, this._rotation);
        vec3.add(this._center, this._center, this._scratch0);
    }

    public rotate(cur, prev) {

        function quatFromVec(out, da) {
            const x = da[0];
            const y = da[1];
            const z = da[2];
            let s = x * x + y * y;
            if (s > 1.0) {
               s = 1.0;
            }
            out[0] = -da[0];
            out[1] =  da[1];
            out[2] =  da[2] || Math.sqrt(1.0 - s);
            out[3] =  0.0;
        }

        quatFromVec(this._scratch0, cur);
        quatFromVec(this._scratch1, prev);
        quat.invert(this._scratch1, this._scratch1);
        quat.multiply(this._scratch0, this._scratch0, this._scratch1);
        if (quat.length(this._scratch0) < 1e-6) {
            return
        }
        quat.multiply(this._rotation, this._rotation, this._scratch0);
        quat.normalize(this._rotation, this._rotation);
    }

    public zoom(delta) {
        this._distance += delta;
        if(this._distance < 0.0) {
            this._distance = 0.0;
        }
    }
};

export { OrbitCamera };
