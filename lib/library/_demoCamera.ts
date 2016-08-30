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


/// <reference path="core/input.ts" />






import { Input } from "./core/input";
import { Mat4 } from "./maths/mat4";
import { Vect3 } from "./maths/vect3";

"use strict";

class Camera2 {
    // Camera attrs
    protected position: Vect3;
    protected front: Vect3;
    protected up: Vect3;
    protected right: Vect3;
    protected worldUp: Vect3;

    // Euler angles
    protected yaw: number;
    protected pitch: number;

    // Camera options
    protected movSpeed: number = 0.05;
    protected mouseSensivity: number = 0.25;
    protected _updateCamera: boolean = false;
    public timeElapsed: number;

    public GetPos(): Vect3 {
        return this.position;
    }

    constructor(position: Vect3 = new Vect3(0, 0, 0),
        up: Vect3 = new Vect3(0, 1, 0), yaw: number = -90.0, pitch: number = 0.0) {
        this.front = new Vect3(0, 0, -1);
        this.position = position;
        this.worldUp = up;
        this.yaw = yaw;
        this.pitch = pitch;

        this.right = new Vect3();
        this.up = new Vect3();

        this.updateCameraVectors();
    }
    public update(callback: Function) {
        this._updateCamera = false;

        let speed = 1.0;

        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Left_Shift)) {
            speed = 2.5;
        }

        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Z)) {
            if (this.fov > 30.0) {
                this.fov -= 0.5;
                this._updateCamera = true;
            }
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.X)) {
            if (this.fov < 90.0) {
                this.fov += 0.5;
                this._updateCamera = true;
            }
        }

        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.W)) {
            this.processKeyboard(4, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.S)) {
            this.processKeyboard(5, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.A)) {
            this.processKeyboard(2, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.D)) {
            this.processKeyboard(3, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.E)) {
            this.processKeyboard(0, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Q)) {
            this.processKeyboard(1, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(38)) {
            this.processMouseMovement(0.0, 2.5);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(40)) {
            this.processMouseMovement(0.0, -2.5);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(37)) {
            // this.processMouseMovement(2.5, 0.0);
            this.processMouseMovement(-2.5, 0.0);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(39)) {
            // this.processMouseMovement(-2.5, 0.0);
            this.processMouseMovement(2.5, 0.0);
            this._updateCamera = true;
        }
        if (this._updateCamera && callback) {
            callback();
        }
    }

    public processKeyboard(direction: number, speed: number = 1.0) {
        if (this.timeElapsed > 25) {
            return;
        }
        const velocity = this.movSpeed * this.timeElapsed * speed;
        // console.log(direction);
        if (direction === 0) {
            this.position = Vect3.scaleAndAdd(this.position, this.front, velocity);
        } else if (direction === 1) {
            this.position = Vect3.scaleAndAdd(this.position, this.front, -velocity);
        } else if (direction === 2) {
            this.position = Vect3.scaleAndAdd(this.position, this.right, -velocity);
        } else if (direction === 3) {
            this.position = Vect3.scaleAndAdd(this.position, this.right, velocity);
        } else if (direction === 4) {
            this.position = Vect3.scaleAndAdd(this.position, this.up, velocity);
        } else if (direction === 5) {
            this.position = Vect3.scaleAndAdd(this.position, this.up, -velocity);
        }
    }

    public processMouseMovement(xOffset: number, yOffset: number) {
        xOffset *= this.movSpeed * 2.0 * this.timeElapsed;
        yOffset *= this.movSpeed * 2.0 * this.timeElapsed;

        this.yaw += xOffset;
        this.pitch += yOffset;

        if (this.pitch > 89.0) {
            this.pitch = 89.0;
        }
        if (this.pitch < -89.0) {
            this.pitch = -89.0;
        }
        this.updateCameraVectors();
    }

    public updateCameraVectors() {
        const front: Vect3 = new Vect3(
            Math.cos(Math["toRadian"](this.yaw)) * Math.cos(Math["toRadian"](this.pitch)),
            Math.sin(Math["toRadian"](this.pitch)),
            Math.sin(Math["toRadian"](this.yaw)) * Math.cos(Math["toRadian"](this.pitch))
        );
        this.front = front.normalize();

        // Recalculate right and up vector
        this.right = Vect3.cross(this.front, this.worldUp).normalize();
        this.up = Vect3.cross(this.right, this.front).normalize();
    }

    public GetViewMatrix(): Mat4 {
        return Mat4.lookAt(
            this.position,
            Vect3.sum(
                this.position,
                this.front
            ),
            this.up
        );
    }
    public GetOrthoProjectionMatrix(w: number, h: number): Mat4 {
        const ymax = 0.001 * Math.tan(45.0 * Math.PI / 360);
        const ymin = -ymax;
        const xmin = ymin * (w * 1.0) / (h * 1.0);
        const xmax = ymax * (w * 1.0) / (h * 1.0);

        return Mat4.orthographic(xmin, xmax, ymin, ymax, 0.001, 1000.0);
    }
    public GetProjectionMatrix(w: number, h: number): Mat4 {
        return Mat4.perspective(this.fov, (w * 1.0) / (h * 1.0), 0.0001, 1000.0);
    }

    public fov: number = 45.0;
};

export { Camera2 };
