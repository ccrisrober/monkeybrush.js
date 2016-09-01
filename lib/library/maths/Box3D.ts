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


import { Vect3 } from "./Vect3";

"use strict";

/**
 * Box3D class
 * @class Box3D
 */
class Box3D {
    /**
     * Min corner
     * @type {Vect3}
     */
    protected _min: Vect3;
    /**
     * Max corner
     * @type {Vect3}
     */
    protected _max: Vect3;

    /**
     * Box3D constructor
     * @param {Vect3 = new Vect3(Infinity, Infinity, Infinity)} min: Box min corner
     * @param {Vect3 = new Vect3(-Infinity, -Infinity, -Infinity)} max: Box max corner
     */
    constructor(min: Vect3 = new Vect3(Infinity, Infinity, Infinity),
        max: Vect3 = new Vect3(-Infinity, -Infinity, -Infinity)) {
        this._min = min;
        this._max = max;
    };
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
};

export { Box3D };
