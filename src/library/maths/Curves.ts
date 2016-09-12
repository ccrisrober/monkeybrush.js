
import { Vect2 } from "./Vect2";
import { Vect3 } from "./Vect3";

namespace Curves {
    export abstract class Curve {
        // TODO
    }
    export class CircleCurve {
        constructor() {
            // TODO
        }
    };
    /**
     * Ellipse class.
     * @class Ellipse
     * Create an ellipse to the path which is centered at (x, y)
     * position with the radius starting at startAngle and ending
     * at endAngle going in the given direction by anticlockwise.
     */
    export class Ellipse {
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
        public interpolate(t: number): Vect2 {
            const TWOPI = Math.PI * 2;
            var deltaAngle = this._endAngle - this._startAngle;
            if (deltaAngle < 0) deltaAngle += TWOPI;
            if (deltaAngle > TWOPI) deltaAngle -= TWOPI;
            var angle = this._isClockwise ? this._endAngle + (1 - t) * (TWOPI - deltaAngle) : this._startAngle + t * deltaAngle;
            var tx = this._center.x + this._radius.x * Math.cos(angle);
            var ty = this._center.y + this._radius.y * Math.sin(angle);
            return new Vect2(tx, ty);
        }
    };
    /**
     * LineCurve2D class.
     * @class LineCurve2D
     * Create an line from first 2D point to second.
     */
    export class Line2D {
        protected _p1: Vect2;
        protected _p2: Vect2;
        /**
         * Line2D constructor.
         * @param {Vect2} x Minimum point.
         * @param {Vect2} y Maximum point.
         */
        constructor(x: Vect2, y: Vect2) {
            this._p1 = x;
            this._p2 = y;
        };
        /**
         * Return interpolate position based on 2D line definition.
         * @param  {number} t Interpolation value [0, 1].
         * @return {Vect2}    A new Vect2 interpolated position.
         */
        public interpolate(t: number): Vect2 {
            return Vect2.add(Vect2.sub(this._p2, this._p1).multByScalar(t), this._p1);
        };
    };
    /**
     * LineCurve3D class.
     * @class LineCurve3D
     * Create an line from first 3D point to second.
     */
    export class Line3D {
        protected _p1: Vect3;
        protected _p2: Vect3;
        /**
         * Line3D constructor.
         * @param {Vect3} x Minimum point.
         * @param {Vect3} y Maximum point.
         */
        constructor(x: Vect3, y: Vect3) {
            this._p1 = x;
            this._p2 = y;
        };
        /**
         * Return interpolate position based on 3D line definition.
         * @param  {number} t Interpolation value [0, 1].
         * @return {Vect3}    A new Vect3 interpolated position.
         */
        public interpolate(t: number): Vect3 {
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
    export class CubicBezier {
        public _list: Array<Vect2>;
        public _curves = [];
        /**
         * CubicBezier constructor
         * @param {Vect2} cpi  Starting point
         * @param {Vect2} cpp1 First control point
         * @param {Vect2} cpp2 Second control point
         * @param {Vect2} cpe  Ending point
         */
        constructor(cpi: Vect2, cpp1: Vect2, cpp2: Vect2, cpe: Vect2) {
            this._list = [cpi, cpp1, cpp2, cpe];
        };
        protected bezierCurveInterpolation(p0: number, p1: number,
            p2: number, p3: number, t: number) {
            return (p0 * Math.pow(1 - t, 3)) +
                    (3 * p1 * Math.pow(1 - t, 2) * t) +
                    (3 * p2 * t * t * (1 - t)) +
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
        public getPoints(subdivisions: number) {
            // TODO
        };
    };
    export class CatmullRomCurve {
        constructor(points: Array<Vect3>) {
            // TODO
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
    export class QuadraticBezier {
        public _list: Array<Vect2>;
        public _curves = [];
        /**
         * QuadraticBezier constructor.
         * @param {Vect2} cpi  Starting point.
         * @param {Vect2} cpp  Middle control point.
         * @param {Vect2} cpe  Ending point.
         */
        constructor(cpi: Vect2, cpp: Vect2, cpe: Vect2) {
            this._list = [cpi, cpp, cpe];
        };
        protected bezierCurveInterpolation(p0: number, p1: number,
            p2: number, t: number): number {

            return  (p0 * Math.pow((1 - t), 2)) +
                    (2 * p1 * (1 - t) * t) +
                    (p2 * Math.pow(t, 2));
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
    }
};

export { Curves };
