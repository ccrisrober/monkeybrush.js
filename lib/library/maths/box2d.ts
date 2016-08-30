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


import { Vect2 } from "./vect2";

"use strict";

/**
 * Box2D class
 * @class Box2D
 */
class Box2D {
    /**
     * Min corner
     * @type {Vect2}
     */
    protected _min: Vect2;
    /**
     * Max corner
     * @type {Vect2}
     */
    protected _max: Vect2;

    /**
     * Box2D definition
     * @param {Vect2 = new Vect2(Infinity, Infinity)} min: Box min corner
     * @param {Vect2 = new Vect2(-Infinity, Infinity)} max: Box max corner
     */
    constructor(min: Vect2 = new Vect2(Infinity, Infinity), max: Vect2 = new Vect2(-Infinity, -Infinity)) {
        this._min = min;
        this._max = max;
    };
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
};

export { Box2D };
