
import {Vect3} from "./vect3";

namespace Interpolation {
    // export function linear(v, k) {
    //
    // };
    // export function bezier(v, k) {
    //
    // };
    export function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
        const
            v0 = (p2 - p0) * 0.5,
            v1 = (p3 - p1) * 0.5,
            t2 = t * t,
            t3 = t * t2;
        return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
            (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    };
};

class Spline {
    protected _points: Array<Vect3> = [];
    constructor(points: Array<Vect3> = []) {
        this._points = points;
    }
    public getPoint(it: number): Vect3 {

        const point = (this._points.length - 1) * it;
        const intPoint = Math.floor(point);
        const weight = point - intPoint;

        let pa: Vect3 = this._points[intPoint === 0 ? intPoint : intPoint - 1];
        let pb: Vect3 = this._points[intPoint];
        let pc: Vect3 = this._points[intPoint > this._points.length - 2 ?
                                        this._points.length - 1 : intPoint + 1];
        let pd: Vect3 = this._points[intPoint > this._points.length - 3 ?
                                        this._points.length - 1 : intPoint + 2];

        return new Vect3(
            Interpolation.catmullRom(pa.x, pb.x, pc.x, pd.x, weight),
            Interpolation.catmullRom(pa.y, pb.y, pc.y, pd.y, weight),
            Interpolation.catmullRom(pa.z, pb.z, pc.z, pd.z, weight)
        );
    }
};

export { Interpolation, Spline };
