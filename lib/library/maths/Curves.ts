
import { Vect2 } from "./Vect2";
import { Vect3 } from "./Vect3";

namespace Curves {
    export abstract class Curve {

    }
    export class CircleCurve {
        constructor() {}
    };
    export class EllipseCurve {
        constructor() {}
    };
    export class Line {
        constructor(x: Vect2, y: Vect2) {

        };
    };
    // Separate in cubic and cuadratic bezier curve
    export class BezierCurve {
        public _list: Array<Vect2>;
        public _curves = [];
        /**
         * [constructor description]
         * @param {Vect2} cpi  Starting point
         * @param {Vect2} cpp1 First control point
         * @param {Vect2} cpp2 Second control point
         * @param {Vect2} cpe  Ending point
         */
        constructor(cpi: Vect2, cpp1: Vect2, cpp2: Vect2, cpe: Vect2) {
            this._list = [cpi, cpp1, cpp2, cpe];
        };
        protected bezierCurveInterpolation(p0: number, p1: number, p2: number,
            p3: number, t: number) {
            return (p0 * Math.pow(1 - t, 3)) +
                    (3 * p1 * Math.pow(1 - t, 2) * t) +
                    (3 * p2 * t * t * (1 - t)) +
                    (p3 * t * t * t);
        };
        public evaluate(t: number): Vect2 {
            return new Vect2(
                this.bezierCurveInterpolation(
                    this._list[0].x, this._list[1].x, this._list[2].x, this._list[3].x, t),
                this.bezierCurveInterpolation(
                    this._list[0].y, this._list[1].y, this._list[2].y, this._list[3].y, t)
            );
        };
        public getPoints(subdivisions: number) {

        };
    };
    export class CatmullRomCurve {
        constructor(points: Array<Vect3>) {

        };
    };
    export class QuadraticBezierCurve {
        public _list: Array<Vect2>;
        public _curves = [];
        /**
         * [constructor description]
         * @param {Vect2} cpi  Starting point
         * @param {Vect2} cpp Middle control point
         * @param {Vect2} cpe  Ending point
         */
        constructor(cpi: Vect2, cpp: Vect2, cpe: Vect2) {
            this._list = [cpi, cpp, cpe];
        };
    }
};

export { Curves };
