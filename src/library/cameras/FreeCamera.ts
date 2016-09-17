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
		export class FreeCamera extends PerspectiveCamera {

            protected _position: Float32Array;
            protected _rotation: Float32Array;
            protected _positionSpeed: number;
            protected _rotationSpeed: number;

			constructor(position: Float32Array = vec3.create(),
				rotation: Float32Array = vec3.create()) {
				super(0, 0, 0, 0, 0);
				this._position = position;
				this._rotation = rotation;
				this._positionSpeed = 10;
				this._rotationSpeed = 0.01;
			};
			public move(dir: Float32Array) {
				if (dir[0] !== 0 || dir[1] !== 0 || dir[2] !== 0) {
					var cam = mat4.create();
					mat4.rotateY(cam, cam, this.rotation[1]);
					vec3.transformMat4(dir, dir, cam);
					vec3.add(this._position, this._position, dir);
				}
			};
			public pointer(mouse: Array<number>, 
				prevMouse: Array<number>) {
				const dt = [
					mouse[0] - prevMouse[0], 
					mouse[1]- prevMouse[1]];
				let rot = this.rotation;
				rot[1] += dt[0] * this._rotationSpeed;
				if (rot[1] < 0) {
					rot[1] += Math.PI * 2;
				}
				if (rot[1] >= Math.PI * 2) {
					rot[1] -= Math.PI * 2;
				}
				rot[0] += dt[1] * this._rotationSpeed;
				if (rot[0] < -Math.PI * 0.5) {
					rot[0] = -Math.PI * 0.5;
				}
				if (rot[0] > Math.PI * 0.5) {
					rot[0] = Math.PI * 0.5;
				}
			};
            public getViewMatrix(): Float32Array {
        		let out = mat4.create();
        		mat4.rotateX(out, out, this.rotation[0]);
        		mat4.rotateY(out, out, this.rotation[1]);
        		mat4.rotateZ(out, out, this.rotation[2] - Math.PI);

        		mat4.translate(out, out, new Float32Array([
        			-this._position[0], 
					-this._position[1], 
					-this._position[2]
    			]));

    			this._view = out;
                return this._view;
            };
            get position(): Float32Array {
            	return this._position;
            };
            get rotation(): Float32Array {
            	return this._rotation;
            };
		};
	}
}