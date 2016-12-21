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
     * This namespace includes different types of curves are available in standard 2D Canvas api.
     * @namespace curves
     */
    export namespace curves {
        export abstract class Curve2D {
            public abstract evaluate(t: number): Vect2;
        };
        export abstract class Curve3D {
            public abstract evaluate(t: number): Vect3;
        };
        /**
         * Ellipse class.
         * @class Ellipse
         * Create an ellipse to the path which is centered at (x, y)
         * position with the radius starting at startAngle and ending
         * at endAngle going in the given direction by anticlockwise.
         */
        export class Ellipse extends Curve2D {
            protected _center: Vect2;
            protected _radius: Vect2;
            protected _startAngle: number;
            protected _endAngle: number;
            protected _isClockwise: boolean;
            /**
             * Ellipse constructor
             * @param {Vect2}   center      The center of the ellipse.
             * @param {Vect2}   radius      Ellipse major and minux radius.
             * @param {number}  startAngle  [description]
             * @param {number}  endAngle    [description]
             * @param {boolean} isClockwise if true, draws the ellipse
             *                              anticlockwise (counter-clockwise),
             *                              otherwise in a clockwise direction.
             */
            constructor(center: Vect2, radius: Vect2, startAngle: number, endAngle: number, isClockwise: boolean) {
                super();
                this._center = center;
                this._radius = radius;
                this._startAngle = startAngle;
                this._endAngle = endAngle;
                this._isClockwise = isClockwise;
            };
            /**
             * Return interpolate position based on ellipse definition.
             * @param  {number} t Interpolation value [0, 1].
             * @return {Vect2}    A new Vect2 interpolated position.
             */
            public evaluate(t: number): Vect2 {
                const TWOPI = Math.PI * 2.0;
                let deltaAngle = this._endAngle - this._startAngle;
                if (deltaAngle < 0.0) deltaAngle += TWOPI;
                if (deltaAngle > TWOPI) deltaAngle -= TWOPI;
                let angle = this._isClockwise ? this._endAngle + (1.0 - t) *
                    (TWOPI - deltaAngle) : this._startAngle + t * deltaAngle;

                const tx = this._center.x + this._radius.x * Math.cos(angle);
                const ty = this._center.y + this._radius.y * Math.sin(angle);
                return new Vect2(tx, ty);
            }
        };
        /**
         * LineCurve2D class.
         * @class LineCurve2D
         * Create an line from first 2D point to second.
         */
        export class Line2D extends Curve2D {
            protected _p1: Vect2;
            protected _p2: Vect2;
            /**
             * Line2D constructor.
             * @param {Vect2} x Minimum point.
             * @param {Vect2} y Maximum point.
             */
            constructor(x: Vect2, y: Vect2) {
                super();
                this._p1 = x;
                this._p2 = y;
            };
            /**
             * Return interpolate position based on 2D line definition.
             * @param  {number} t Interpolation value [0, 1].
             * @return {Vect2}    A new Vect2 interpolated position.
             */
            public evaluate(t: number): Vect2 {
                return Vect2.add(Vect2.sub(this._p2, this._p1).multByScalar(t), this._p1);
            };
        };
        /**
         * LineCurve3D class.
         * @class LineCurve3D
         * Create an line from first 3D point to second.
         */
        export class Line3D extends Curve3D {
            protected _p1: Vect3;
            protected _p2: Vect3;
            /**
             * Line3D constructor.
             * @param {Vect3} x Minimum point.
             * @param {Vect3} y Maximum point.
             */
            constructor(x: Vect3, y: Vect3) {
                super();
                this._p1 = x;
                this._p2 = y;
            };
            /**
             * Return interpolate position based on 3D line definition.
             * @param  {number} t Interpolation value [0, 1].
             * @return {Vect3}    A new Vect3 interpolated position.
             */
            public evaluate(t: number): Vect3 {
                return Vect3.add(Vect3.sub(this._p2, this._p1).multByScalar(t), (this._p1));
            };
        };
        /**
         * BezierCurve class
         * @class BezierCurve
         *
         * Create a cubic Bézier curve to the path. It requires
         * three points. The first two points are control points
         * and the third one is the end point.
         */
        export class CubicBezier extends Curve2D {
            public _list: Array<Vect2>;
            /**
             * CubicBezier constructor
             * @param {Vect2} cpi  Starting point
             * @param {Vect2} cpp1 First control point
             * @param {Vect2} cpp2 Second control point
             * @param {Vect2} cpe  Ending point
             */
            constructor(cpi: Vect2, cpp1: Vect2, cpp2: Vect2, cpe: Vect2) {
                super();
                this._list = [cpi, cpp1, cpp2, cpe];
            };
            protected bezierCurveInterpolation(p0: number, p1: number,
                p2: number, p3: number, t: number): number {
                return (p0 * Math.pow(1.0 - t, 3.0)) +
                        (3.0 * p1 * Math.pow(1.0 - t, 2.0) * t) +
                        (3.0 * p2 * t * t * (1.0 - t)) +
                        (p3 * t * t * t);
            };
            /**
             * Return interpolate position based on cubic bezier definition.
             * @param  {number} t Interpolation value [0, 1].
             * @return {Vect2}    A new Vect2 interpolated position.
             */
            public evaluate(t: number): Vect2 {
                return new Vect2(
                    this.bezierCurveInterpolation(
                        this._list[0].x, this._list[1].x, this._list[2].x, this._list[3].x, t),
                    this.bezierCurveInterpolation(
                        this._list[0].y, this._list[1].y, this._list[2].y, this._list[3].y, t)
               );
            };
        };
        export class CubicBezier3D extends Curve3D {
            public _list: Array<Vect3>;
            /**
             * CubicBezier constructor
             * @param {Vect3} cpi  Starting point
             * @param {Vect3} cpp1 First control point
             * @param {Vect3} cpp2 Second control point
             * @param {Vect3} cpe  Ending point
             */
            constructor(cpi: Vect3, cpp1: Vect3, cpp2: Vect3, cpe: Vect3) {
                super();
                this._list = [cpi, cpp1, cpp2, cpe];
            };
            protected bezierCurveInterpolation(p0: number, p1: number,
                p2: number, p3: number, t: number): number {
                return (p0 * Math.pow(1.0 - t, 3.0)) +
                        (3.0 * p1 * Math.pow(1.0 - t, 2.0) * t) +
                        (3.0 * p2 * t * t * (1.0 - t)) +
                        (p3 * t * t * t);
            };
            /**
             * Return interpolate position based on cubic bezier definition.
             * @param  {number} t Interpolation value [0, 1].
             * @return {Vect3}    A new Vect3 interpolated position.
             */
            public evaluate(t: number): Vect3 {
                return new Vect3(
                    this.bezierCurveInterpolation(
                        this._list[0].x, this._list[1].x, this._list[2].x, this._list[3].x, t),
                    this.bezierCurveInterpolation(
                        this._list[0].y, this._list[1].y, this._list[2].y, this._list[3].y, t),
                    this.bezierCurveInterpolation(
                        this._list[0].z, this._list[1].z, this._list[2].z, this._list[3].z, t)
               );
            };
        };
        /**
         * QuadraticBezier class
         * @class QuadraticBezier
         *
         * Create a quadratic Bézier curve to the path.
         * It requires two points. The first point is a
         * control point and the second one is the end point.
         */
        export class QuadraticBezier2D extends Curve2D {
            public _list: Array<Vect2>;
            /**
             * QuadraticBezier constructor.
             * @param {Vect2} cpi  Starting point.
             * @param {Vect2} cpp  Middle control point.
             * @param {Vect2} cpe  Ending point.
             */
            constructor(cpi: Vect2, cpp: Vect2, cpe: Vect2) {
                super();
                this._list = [cpi, cpp, cpe];
            };
            protected bezierCurveInterpolation(p0: number, p1: number,
                p2: number, t: number): number {

                return  (p0 * Math.pow((1.0 - t), 2.0)) +
                        (2.0 * p1 * (1.0 - t) * t) +
                        (p2 * Math.pow(t, 2.0));
            };
            /**
             * Return interpolate position based on cubic bezier definition.
             * @param  {number} t Interpolation value [0, 1].
             * @return {Vect2}    A new Vect2 interpolated position.
             */
            public evaluate(t: number): Vect2 {
                return new Vect2(
                    this.bezierCurveInterpolation(
                        this._list[0].x, this._list[1].x, this._list[2].x, t),
                    this.bezierCurveInterpolation(
                        this._list[0].y, this._list[1].y, this._list[2].y, t)
               );
            };
        };
        export class QuadraticBezier3D extends Curve3D {
            public _list: Array<Vect3>;
            /**
             * QuadraticBezier constructor.
             * @param {Vect3} cpi  Starting point.
             * @param {Vect3} cpp  Middle control point.
             * @param {Vect3} cpe  Ending point.
             */
            constructor(cpi: Vect3, cpp: Vect3, cpe: Vect3) {
                super();
                this._list = [cpi, cpp, cpe];
            };
            protected bezierCurveInterpolation(p0: number, p1: number,
                p2: number, t: number): number {

                return  (p0 * Math.pow((1.0 - t), 2.0)) +
                        (2.0 * p1 * (1.0 - t) * t) +
                        (p2 * Math.pow(t, 2.0));
            };
            /**
             * Return interpolate position based on cubic bezier definition.
             * @param  {number} t Interpolation value [0, 1].
             * @return {Vect3}    A new Vect3 interpolated position.
             */
            public evaluate(t: number): Vect3 {
                return new Vect3(
                    this.bezierCurveInterpolation(
                        this._list[0].x, this._list[1].x, this._list[2].x, t),
                    this.bezierCurveInterpolation(
                        this._list[0].y, this._list[1].y, this._list[2].y, t),
                    this.bezierCurveInterpolation(
                        this._list[0].z, this._list[1].z, this._list[2].z, t)
               );
            };
        };
    };
};
