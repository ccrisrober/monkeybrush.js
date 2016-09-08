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


import { Vect2 } from "./Vect2";
import { Vect3 } from "./Vect3";


"use strict";

type InterpolationMode = "catmullRom" | "linear" | "bezier";
namespace Interpolation {
    // Code based on https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
    export function linear(p0: number, p1: number, t: number): number {
        return (p1 - p0) * t + p0;
    };
    export function bezier(n: number, i: number): number {
        return Factorial(n) / Factorial(i) / Factorial(n - i);
    };
    function Factorial(n: number) {
        let a = [1];
        return function (n: number) {
            let s = 1;
            if (a[n]) {
                return a[n];
            }

            for (let i = n; i > 1; --i) {
                s *= i;
            }

            a[n] = s;
            return s;
        }(n);
    };
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
class Spline2D {
    protected controlPoints: Array<Vect2> = [];
    protected intpMode: InterpolationMode;
    constructor(intpMode: InterpolationMode ="catmullRom", points: Array<Vect2> = []) {
        this.intpMode = intpMode;
        this.controlPoints = points;
    }
    public evaluate(dt: number): Vect2 {
        const point = (this.controlPoints.length - 1) * dt;
        const intPoint = Math.floor(point);
        const w = point - intPoint;

        let p0: Vect2 = this.controlPoints[intPoint === 0 ? intPoint : intPoint - 1];
        let p1: Vect2 = this.controlPoints[intPoint];
        let p2: Vect2 = this.controlPoints[intPoint > this.controlPoints.length - 2 ?
                                        this.controlPoints.length - 1 : intPoint + 1];
        let p3: Vect2 = this.controlPoints[intPoint > this.controlPoints.length - 3 ?
                                        this.controlPoints.length - 1 : intPoint + 2];

        return new Vect2(
            Interpolation[this.intpMode](
                p0.x, p1.x, p2.x, p3.x, w
            ),
            Interpolation[this.intpMode](
                p0.y, p1.y, p2.y, p3.y, w
            )
        );
    }
};

class Spline3D {
    protected controlPoints: Array<Vect3> = [];
    protected intpMode: InterpolationMode;
    protected _oldDT: number = 0;
    protected _currentDT: number = 0;
    constructor(intpMode: InterpolationMode ="catmullRom", points: Array<Vect3> = []) {
        this.intpMode = intpMode;
        this.controlPoints = points;
    }
    public evaluate(dt: number): Vect3 {
        const point = (this.controlPoints.length - 1) * dt;
        const intPoint = Math.floor(point);
        const w = point - intPoint;

        let p0: Vect3 = this.controlPoints[intPoint === 0 ? intPoint : intPoint - 1];
        let p1: Vect3 = this.controlPoints[intPoint];
        let p2: Vect3 = this.controlPoints[intPoint > this.controlPoints.length - 2 ?
                                        this.controlPoints.length - 1 : intPoint + 1];
        let p3: Vect3 = this.controlPoints[intPoint > this.controlPoints.length - 3 ?
                                        this.controlPoints.length - 1 : intPoint + 2];

        return new Vect3(
            Interpolation[this.intpMode](
                p0.x, p1.x, p2.x, p3.x, w
            ),
            Interpolation[this.intpMode](
                p0.y, p1.y, p2.y, p3.y, w
            ),
            Interpolation[this.intpMode](
                p0.z, p1.z, p2.z, p3.z, w
            )
        );
    }
    public getTangent(oldDT: number = this._oldDT,
        currentDT: number = this._currentDT): Vect3 {

        const p0: Vect3 = this.evaluate(oldDT);
        const p1: Vect3 = this.evaluate(currentDT);

        return Vect3.rem(p1, p0).normalize();
    }
    public angleBetweenPoints(oldDT: number = this._oldDT,
        currentDT: number = this._currentDT): number {
        const p0: Vect3 = this.evaluate(oldDT);
        const p1: Vect3 = this.evaluate(currentDT);

        const angle = Math.atan2(p1.z - p0.z, p1.x - p0.x);
        return angle * Math.PI / 180.0;
    }
};

export { Interpolation, Spline2D, Spline3D };
