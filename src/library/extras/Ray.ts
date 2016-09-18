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
    export namespace extras {
        /**
         * Ray class
         * @class Ray
         */
        export class Ray {
            protected _origin: MB.maths.Vect3;
            protected _direction: MB.maths.Vect3;
            /**
             * Ray constructor.
             * @param {MB.maths.Vect3 = new MB.maths.Vect3()} origin: Ray origin point.
             * @param {MB.maths.Vect3 = new MB.maths.Vect3()} direction: Ray direction.
             */
            constructor(origin: MB.maths.Vect3 = new MB.maths.Vect3(),
                direction: MB.maths.Vect3 = new MB.maths.Vect3()) {
                this._origin = origin;
                this._direction = direction;
            };
            /**
             * Get ray origin point.
             * @return {MB.maths.Vect3}
             */
            get origin(): MB.maths.Vect3 {
                return this._origin;
            };
            /**
             * Set ray origin point.
             * @param {MB.maths.Vect3} origin New origin point.
             */
            set origin(origin: MB.maths.Vect3) {
                this._origin = origin;
            };
            /**
             * Get ray direction.
             * @return {MB.maths.Vect3}
             */
            get direction(): MB.maths.Vect3 {
                return this._direction;
            };
            /**
             * Set ray direction.
             * @param {MB.maths.Vect3} origin New direction point.
             */
            set direction(direction: MB.maths.Vect3) {
                this._direction = direction;
            };
            /**
             * Evaluate ray at t position.
             * @param  {number} t Position to evaluate.
             * @return {MB.maths.Vect3}    New position at t.
             */
            public at(t: number): MB.maths.Vect3 {
                return new MB.maths.Vect3(
                    this._origin.x + t * this._direction.x,
                    this._origin.y + t * this._direction.y,
                    this._origin.z + t * this._direction.z
                );
            };
            /**
             * Change the viewing direction of the ray.
             * @param {MB.maths.Vect3} v Object to look.
             */
            public lookAt(v: MB.maths.Vect3) {
                this._direction = MB.maths.Vect3.sub(v, this._origin).normalize();
            };
            /*public intersectPlane(plane: PlaneModel): boolean {
                return false;
            };
            public intersectSphere(sphere: SphereModel): boolean {
                return false;
            };
            public intersectTriangle(triangle: TriangleModel): boolean {
                return false;
            };
            public intersectBox(box): boolean {
                return false;
            };*/
        };
    };
};
