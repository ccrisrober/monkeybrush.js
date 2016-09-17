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
        /**
         * Camera abstract class
         * @class Camera
         */
        abstract class Camera {
            protected _position: MB.maths.Vect3;
            protected _view: MB.maths.Mat4;
            protected _projection: MB.maths.Mat4;
            protected _fov: number;
            protected _ar: number;
            protected _near: number;
            protected _far: number;

            protected _up: MB.maths.Vect3;
            protected _look: MB.maths.Vect3;
            /**
             * Camera constructor
             * @param {MB.maths.Vect3}
             * @param {number = 45.0}
             * @param {number = 0.01}
             * @param {number = 1000.0}
             * @param {number = 1.0}
             * @param {MB.maths.Vect3 = new MB.maths.Vect3([0.0, 0.0, -1.0])}
             * @param {MB.maths.Vect3 = new MB.maths.Vect3([0.0, 1.0, 0.0])}
             */
            constructor(pos: MB.maths.Vect3, fovy: number = 45.0,
                near: number = 0.01, far: number = 1000.0,
                aspRatio: number = 1.0,
                target: MB.maths.Vect3 = new MB.maths.Vect3(0.0, 0.0, -1.0),
                up: MB.maths.Vect3 = new MB.maths.Vect3(0.0, 1.0, 0.0)) {

                this._position = pos;
                this._projection = new MB.maths.Mat4();
                this._view = new MB.maths.Mat4();

                this._up = up;
                this._look = target;
                this._fov = fovy;
                this._ar = aspRatio;
                this._near = near;
                this._far = far;

                this.update();
            };
            /**
             * Update view and projection matrix
             */
            abstract update();
            /**
             * Get current camera position
             * @return {MB.maths.Vect3}
             */
            get position(): MB.maths.Vect3 { return this._position; };
            /**
             * Set camera position
             * @param {MB.maths.Vect3}
             */
            set position(pos: MB.maths.Vect3) { this._position = pos; };
            /**
             * Get current view matrix from camera
             * @return {MB.maths.Mat4}
             */
            public getViewMatrix(): MB.maths.Mat4 {
                return this._view;
            };
            /**
             * Get current projection matrix from camera
             * @return {MB.maths.Mat4}
             */
            public getProjectionMatrix(): MB.maths.Mat4 {
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
             * Set near
             * @param {number} near: New near value
             */
            set near(near: number) { this._near = near; };
            /**
             * Set far
             * @param {number} far: New far value
             */
            set far(far: number) { this._far = far; };
            /**
             * Set field of view
             * @param {number} fovy: New field of view value
             */
            set fov(fovy: number) { this._fov = fovy; };
            /**
             * Set aspect ratio
             * @param {number} ar: New aspect ratio value
             */
            set aspRatio(ar: number) { this._ar = ar; };
        };
    };
};
