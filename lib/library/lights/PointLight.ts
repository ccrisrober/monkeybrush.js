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


import { Light } from "./Light";
import { Vect3 } from "../maths/Vect3";

"use strict";

/**
 * Point light class
 * @class PointLight
 */
class PointLight extends Light {
    /**
     * [Light position]
     * @type {Vect3}
     */
    protected _position: Vect3;
    /**
     * Point light constructor
     * @param {Vect3 = new Vect3(0.0, 0.0, 0.0)} position
     */
    constructor(position: Vect3 = new Vect3(0.0, 0.0, 0.0)) {
        super();
        this._position = position;
    }
    /**
     * Get light position
     * @return {Vect3}
     */
    get position(): Vect3 { return this._position; }
    /**
     * Set light position
     * @param {Vect3} position
     */
    set position(position: Vect3) { this._position = position; }

    /**
     * Increment position from current position
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    public addTransform(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
    }
};

export { PointLight };
