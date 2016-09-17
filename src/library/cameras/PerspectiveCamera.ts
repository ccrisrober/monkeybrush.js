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
	export namespace cameras {
		export abstract class PerspectiveCamera /*extends Camera*/ {
		    protected _view: Float32Array;
		    protected _projection: Float32Array;
		    protected _fov: number;
		    protected _ar: number;
		    protected _near: number;
		    protected _far: number;
		    protected _isDirty: boolean;

		    constructor(width: number, height: number, 
		    	fov: number, near: number, far: number) {
        		this._projection = mat4.create();
		    	this._isDirty = true;
		    };
		    /**
		     * Returns true if the state of the projection matrix 
		     * has changed since last call to "getProjectionMatrix".
		     * @return {boolean}
		     */
		    get isDirty(): boolean {
		    	return this._isDirty;
		    }
            /**
             * Returns current projection matrix from camera.
             * @return {Float32Array}
             */
            public getProjectionMatrix(): Float32Array {
            	if (this._isDirty) {
            		mat4.perspective(this._projection, this._fov, this._ar, this._near, this._far);
            		this._isDirty = false;
            	}
                return this._projection;
            };
            /**
             * Get current near of view from camera
             * @return {number}
             */
            get near(): number { return this._near; };
            /**
             * Get current far of view from camera
             * @return {number}
             */
            get far(): number { return this._far; };
            /**
             * Get current field of view from camera
             * @return {number}
             */
            get fov(): number { return this._fov; };
            /**
             * Get current aspect radio from camera
             * @return {number}
             */
            get aspRatio(): number { return this._ar; };
            /**
             * Sets near clip plane distance.
             * @param {number} near: New near value
             */
            set near(near: number) {
            	if (this._near !== near) {
            		this._near = near;
            		this._isDirty = true;
            	}};
            /**
             * Sets far clip plane distance.
             * @param {number} far: New far value
             */
            set far(far: number) {
            	if (this._far !== far) {
            		this._far = far;
            		this._isDirty = true;
            	}
            };
            /**
             * Set camera field of view
             * @param {number} fovy: New field of view value
             */
            set fov(fovy: number) {
            	if (this._fov !== fovy) {
            		this._fov = fovy;
            		this._isDirty = true;
            	}
            };
            /**
             * Set aspect ratio
             * @param {number} ar: New aspect ratio value
             */
            set aspRatio(ar: number) {
            	if (this._ar !== ar) {
            		this._ar = ar;
            		this._isDirty = true;
            	}
            };
		}
	}; // namespace cameras
}; // namespace MB
