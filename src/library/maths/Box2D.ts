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
    export namespace maths {
        /**
         * Box2D class
         * @class Box2D
         */
        export class Box2D {
            /**
             * Min corner.
             * @type {Vect2}
             */
            protected _min: Vect2;
            /**
             * Max corner.
             * @type {Vect2}
             */
            protected _max: Vect2;
            /**
             * Box center.
             * @type {Vect2}
             */
            protected _center: Vect2;

            /**
             * Return min Box2D position.
             * @return {Vect2}
             */
            public get min(): Vect2 {
                return this._min;
            };
            /**
             * Return max Box2D position.
             * @return {Vect2}
             */
            public get max(): Vect2 {
                return this._max;
            };
            /**
             * Return Box2D center.
             * @return {Vect2}
             */
            public get center(): Vect2 {
                return this._center;
            };
            /**
             * Return box size.
             * @return {Vect2}
             */
            public get size(): Vect2 {
                return Vect2.sub(this.max, this.min);
            };
            /**
             * Box2D constructor
             * @param {Vect2 = new Vect2(Infinity, Infinity)} min: Box min corner
             * @param {Vect2 = new Vect2(-Infinity, Infinity)} max: Box max corner
             */
            constructor(min: Vect2 = new Vect2(Infinity, Infinity), max: Vect2 = new Vect2(-Infinity, -Infinity)) {
                this._min = min;
                this._max = max;
                this._center = Vect2.add(this._min, this._max).scale(0.5);
            };
            public containtsPoint(p: Vect2): boolean {
                if (p.x > this._min.x || p.x < this._max.x ||
                        p.y > this._min.y || p.y < this._max.y) {
                    return true;
                }
                return false;
            }
            /**
             * Check if owner box contains another box
             * @param  {Box2D} b: Another box
             * @return {boolean}
             */
            public containsBox(b: Box2D): boolean {
                if ((this._min.x <= b._min.x) && (b._max.x <= this._max.x) &&
                     (this._min.y <= b._min.y) && (b._max.y <= this._max.y)) {
                    return true;
                }
                return false;
            };
            /**
             * Check if owner box intersect another box
             * @param  {Box2D} b: Another box
             * @return {boolean}
             */
            public intersectsBox(b: Box2D): boolean {
                if (b._max.x < this._min.x || b._min.x > this._max.x ||
                     b._max.y < this._min.y || b._min.y > this._max.y) {
                    return false;
                }
                return true;
            };

            public isEqual(b: Box2D): boolean {
                return b._min.isEquals(this._min) && b._max.isEquals(this._max);
            }
        };
    };
};
