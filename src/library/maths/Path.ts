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
    export class Path {
        protected _currentPoint: Vect2;
        protected _curves: Array<any>;

        constructor(points: Array<Vect2> = []) {
            this._currentPoint = new Vect2();
            this._curves = new Array(0);
            if (points.length) {
                this.moveTo(points[0].x, points[0].y);
                for (let i = 1, size = points.length; i < size; ++i) {
                    this.lineTo(points[i].x, points[i].y);
                }
            }
        };
        /**
         * Moves the path to the specified point in the canvas, without creating a line.
         * @param {number} x The x-coordinate of where to move the path to.
         * @param {number} y The y-coordinate of where to move the path to.
         */
        public moveTo(x: number, y: number) {
            this._currentPoint.setXY(x, y);
        };
        /**
         * Adds a new point and creates a line to that point from the last specified
         *     point in the canvas.
         * @param {number} x The x-coordinate of where to create the line to.
         * @param {number} y The y-coordinate of where to create the line to.
         */
        public lineTo(x: number, y: number) {
            let curve = new curves.Line2D(
                this._currentPoint.clone(),
                new Vect2(x, y)
           );
            this._curves.push(curve);
            this._currentPoint.setXY(x, y);
        };
        /**
         * Adds a point to the current path by using the specified control points that represent
         * a quadratic Bézier curve.
         * @param  {number} cpx: number    The x-coordinate of the Bézier control point.
         * @param  {number} cpy: number    The y-coordinate of the Bézier control point.
         * @param  {number} x:   number    The x-coordinate of the ending point.
         * @param  {number} y:   number    The y-coordinate of the ending point.
         */
        public quadraticCurveTo(cpx: number,  cpy: number, x: number, y: number) {
            let curve = new curves.QuadraticBezier2D(
                this._currentPoint.clone(),
                new Vect2(cpx, cpy),
                new Vect2(x, y)
           );
            this._curves.push(curve);
            this._currentPoint.setXY(x, y);
        };
        /**
         * Adds a point to the current path by using the specified control points
         *     that represent a cubic Bézier curve.
         * @param {number} cpx1 The x-coordinate of the first Bézier control point.
         * @param {number} cpy1 The y-coordinate of the first Bézier control point.
         * @param {number} cpx2 The x-coordinate of the second Bézier control point.
         * @param {number} cpy2 The y-coordinate of the second Bézier control point.
         * @param {number} x    The x-coordinate of the ending point.
         * @param {number} y    The y-coordinate of the ending point.
         */
        public bezierCurveTo(cpx1: number, cpy1: number,
            cpx2: number, cpy2: number, x: number, y: number) {
            let curve = new curves.CubicBezier(
                this._currentPoint.clone(),
                new Vect2(cpx1, cpy1),
                new Vect2(cpx2, cpy2),
                new Vect2(x, y)
           );
            this._curves.push(curve);
            this._currentPoint.setXY(x, y);
        };
    };
};
