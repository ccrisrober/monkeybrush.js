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
     * Box3D class
     * @class Box3D
     */
    export class Box3D {
        /**
         * Min corner.
         * @type {Vect3}
         */
        protected _min: Vect3;
        /**
         * Max corner.
         * @type {Vect3}
         */
        protected _max: Vect3;
        /**
         * Box center.
         * @type {Vect3}
         */
        protected _center: Vect3;

        /**
         * Return min Box2D position.
         * @return {Vect3}
         */
        public get min(): Vect3 {
            return this._min;
        };
        /**
         * Return max Box2D position.
         * @return {Vect3}
         */
        public get max(): Vect3 {
            return this._max;
        };
        /**
         * Return Box2D center.
         * @return {Vect3}
         */
        public get center(): Vect3 {
            return this._center;
        };
        /**
         * Return box size.
         * @return {Vect3}
         */
        public get size(): Vect3 {
            return Vect3.sub(this.max, this.min);
        };
        /**
         * Box3D constructor
         * @param {Vect3 = new Vect3(Infinity, Infinity, Infinity)} min: Box min corner
         * @param {Vect3 = new Vect3(-Infinity, -Infinity, -Infinity)} max: Box max corner
         */
        constructor(min: Vect3 = new Vect3(Infinity, Infinity, Infinity),
            max: Vect3 = new Vect3(-Infinity, -Infinity, -Infinity)) {
            this._min = min;
            this._max = max;
            this._center = Vect3.add(this._min, this._max).scale(0.5);
        };
        public containtsPoint(p: Vect3): boolean {
            if (p.x > this._min.x || p.x < this._max.x ||
                    p.y > this._min.y || p.y < this._max.y ||
                    p.z > this._min.z || p.z < this._max.z) {
                return true;
            }
            return false;
        }
        /**
         * Check if owner box contains another box
         * @param  {Box3D} b: Another box
         * @return {boolean}
         */
        public containsBox(b: Box3D): boolean {
            if ((this._min.x <= b._min.x) && (b._max.x <= this._max.x) &&
                 (this._min.y <= b._min.y) && (b._max.y <= this._max.y) &&
                 (this._min.z <= b._min.z) && (b._max.z <= this._max.z)) {
                return true;
            }
            return false;
        };
        /**
         * Check if owner box intersect another box
         * @param  {Box3D} b: Another box
         * @return {boolean}
         */
        public intersectsBox(b: Box3D): boolean {
            if (b._max.x < this._min.x || b._min.x > this._max.x ||
                 b._max.y < this._min.y || b._min.y > this._max.y ||
                 b._max.z < this._min.z || b._min.z > this._max.z) {
                return false;
            }
            return true;
        };

        /**
         * Create new Box3D based on vertices list
         * @param  {ArrayLike<number>} array Vertices list
         * @return {Box3D}                   New Box3D
         */
        public static createFromArray (array: ArrayLike<number>): Box3D {
            let minX = +Infinity;
            let minY = +Infinity;
            let minZ = +Infinity;

            let maxX = -Infinity;
            let maxY = -Infinity;
            let maxZ = -Infinity;

            for (let i = 0, size = array.length; i < size; i += 3) {
                const
                    x = array[i],
                    y = array[i + 1],
                    z = array[i + 2];

                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;
            }

            return new Box3D(
                new Vect3(minX, minY, minZ),
                new Vect3(maxX, maxY, maxZ)
           );
        };
    };
};
