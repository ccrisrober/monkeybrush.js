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
    /**
     * FreeCamera class
     * @class FreeCamera
     */
    export class FreeCamera extends Camera {
        protected _keys: InputKeysCamera;
        protected _speed: number = 1.0;
        protected _movSpeed: number = 0.05;
        protected _right: MB.Vect3;
        protected _updateKeyboard: boolean = false;
        constructor(pos: MB.Vect3, keys: InputKeysCamera) {
            super(pos);
            this._keys = keys;
        }
        public update(dt: number, cb?: Function) {
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.Left_Shift)) {
                this._speed = 2.5;
            }
            this._updateKeyboard = false;
            if (MB.Input.isKeyPressed(this._keys.moveUp)) {
                const velocity = this._movSpeed * dt * this._speed;
                this.position = MB.Vect3.scaleAndAdd(this.position, this._up, velocity);
                this._updateKeyboard = true;
            }
            if (MB.Input.isKeyPressed(this._keys.moveLeft)) {
                const velocity = this._movSpeed * dt * this._speed;
                this.position = MB.Vect3.scaleAndAdd(this.position, this._right, -velocity);
                this._updateKeyboard = true;
            }
            if (MB.Input.isKeyPressed(this._keys.moveRight)) {
                const velocity = this._movSpeed * dt * this._speed;
                this.position = MB.Vect3.scaleAndAdd(this.position, this._right, velocity);
                this._updateKeyboard = true;
            }
            if (MB.Input.isKeyPressed(this._keys.moveDown)) {
                const velocity = this._movSpeed * dt * this._speed;
                this.position = MB.Vect3.scaleAndAdd(this.position, this._up, -velocity);
                this._updateKeyboard = true;
            }
            if (this._updateKeyboard === true) {
                this._isDirty = true;
            }

            if (this._isDirtyProj) {
                this._projection = MB.Mat4.perspective(this._fov, this._ar, this._near, this._far);
                this._isDirtyProj = false;
            }
            if (this._isDirty) {
                this._view = MB.Mat4.lookAt(
                    this._position,
                    MB.Vect3.add(
                        this._position,
                        this._front
                    ),
                    this._up);

                this._isDirty = false;
            }

            if (this._updateKeyboard && cb) cb();
            // Restore speed
            this._speed = 1.0;
        }
        /*public updateCameraVectors() {
            const front: MB.Vect3 = new MB.Vect3(
                Math.cos(Math["toRadian"](this.yaw)) * Math.cos(Math["toRadian"](this.pitch)),
                Math.sin(Math["toRadian"](this.pitch)),
                Math.sin(Math["toRadian"](this.yaw)) * Math.cos(Math["toRadian"](this.pitch))
            );
            this.front = front.normalize();

            // Recalculate right and up vector
            this.right = MB.Vect3.cross(this.front, this.worldUp).normalize();
            this.up = MB.Vect3.cross(this.right, this.front).normalize();
        }*/
        public getViewMatrix(): MB.Mat4 {
            return this._view;
        }
        public getProjectionMatrix(): MB.Mat4 {
            return this._projection;
        }
    };
};
