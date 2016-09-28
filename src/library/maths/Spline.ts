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
     * Spline2D class
     * Create a smooth 2D spline curve from a points list.
     *
     * @class Spline2D
     */
    export class Spline2D {
        protected controlPoints: Array<Vect2> = [];
        protected _intpMode: string /*InterpolationMode*/;
        constructor(intpMode: string /*InterpolationMode*/ = "catmullRom", points: Array<Vect2> = []) {
            this._intpMode = intpMode;
            this.controlPoints = points;
        };
        /**
         * Return interpolate point at t.
         * @param  {number} t Interpolation value [0, 1].
         * @return {Vect2}     Interpolated position.
         */
        public evaluate(t: number): Vect2 {
            const point = (this.controlPoints.length - 1) * t;
            const intPoint = Math.floor(point);
            const w = point - intPoint;

            let p0: Vect2 = this.controlPoints[intPoint === 0 ? intPoint : intPoint - 1];
            let p1: Vect2 = this.controlPoints[intPoint];
            let p2: Vect2 = this.controlPoints[intPoint > this.controlPoints.length - 2 ?
                                            this.controlPoints.length - 1 : intPoint + 1];
            let p3: Vect2 = this.controlPoints[intPoint > this.controlPoints.length - 3 ?
                                            this.controlPoints.length - 1 : intPoint + 2];

            return new Vect2(
                Interpolation[this._intpMode](
                    p0.x, p1.x, p2.x, p3.x, w
               ),
                Interpolation[this._intpMode](
                    p0.y, p1.y, p2.y, p3.y, w
               )
           );
        };
    };
    /**
     * Spline3D class
     * Create a smooth 3D spline curve from a points list.
     *
     * @class Spline3D
     */
    export class Spline3D {
        protected controlPoints: Array<Vect3> = [];
        protected _intpMode: string /*InterpolationMode*/;
        protected _oldDT: number = 0;
        protected _currentDT: number = 0;
        constructor(intpMode: string /*InterpolationMode*/ = "catmullRom", points: Array<Vect3> = []) {
            this._intpMode = intpMode;
            this.controlPoints = points;
        };
        /**
         * Return interpolate point at t.
         * @param  {number} t Interpolation value [0, 1].
         * @return {Vect3}     Interpolated position.
         */
        public evaluate(t: number): Vect3 {
            const point = (this.controlPoints.length - 1) * t;
            const intPoint = Math.floor(point);
            const w = point - intPoint;

            let p0: Vect3 = this.controlPoints[intPoint === 0 ? intPoint : intPoint - 1];
            let p1: Vect3 = this.controlPoints[intPoint];
            let p2: Vect3 = this.controlPoints[intPoint > this.controlPoints.length - 2 ?
                                            this.controlPoints.length - 1 : intPoint + 1];
            let p3: Vect3 = this.controlPoints[intPoint > this.controlPoints.length - 3 ?
                                            this.controlPoints.length - 1 : intPoint + 2];

            return new Vect3(
                Interpolation[this._intpMode](
                    p0.x, p1.x, p2.x, p3.x, w
               ),
                Interpolation[this._intpMode](
                    p0.y, p1.y, p2.y, p3.y, w
               ),
                Interpolation[this._intpMode](
                    p0.z, p1.z, p2.z, p3.z, w
               )
           );
        };
        public getTangent(oldDT: number = this._oldDT,
            currentDT: number = this._currentDT): Vect3 {

            const p0: Vect3 = this.evaluate(oldDT);
            const p1: Vect3 = this.evaluate(currentDT);

            return Vect3.sub(p1, p0).normalize();
        };
        public angleBetweenPoints(oldDT: number = this._oldDT,
            currentDT: number = this._currentDT): number {
            const p0: Vect3 = this.evaluate(oldDT);
            const p1: Vect3 = this.evaluate(currentDT);

            const angle = Math.atan2(p1.z - p0.z, p1.x - p0.x);
            return Mathf.degToRad(angle);
        };
    };
};
