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


/// <reference path="light.ts" />

import { Light } from "./light";
import { Vector3 } from "../maths/vector3";

"use strict";

// TODO: Replace Vector3 to Vect3


/**
 * Spot light class
 * @class SpotLight
 */
class SpotLight extends Light {
    /**
     * [Light position]
     * @type {Vector3<number>}
     */
    protected _position: Vector3<number>;
    /**
     * [Light direction]
     * @type {Vector3<number>}
     */
    protected _direction: Vector3<number>;
    /**
     * [CutOff flashlight]
     * @type {number}
     */
    protected _cutOff: number;

    /**
     * Spotlight constructor
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position  [description]
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction [description]
     * @param {number = 1.0} cuttoff [description]
     */
    constructor(position: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0),
        direction: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0), cuttoff: number = 1.0) {
        super();
        this._direction = direction;
        this._position = position;
        this._cutOff = cuttoff;
    }
    /**
     * [cutoff description]
     * @return {number} [description]
     */
    get cutoff(): number { return this._cutOff; }
    /**
     * [cutoff description]
     * @param {number} v [description]
     */
    set cutoff(v: number) { this._cutOff = v; }
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    get position(): Vector3<number> { return this._position; }
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    set position(position: Vector3<number>) { this._position = position; }

    /**
     * Get light direction
     * @return {Vector3<number>}
     */
    get direction(): Vector3<number> { return this._direction; }
    /**
     * Set light direction
     * @param {Vector3<number>} direction
     */
    set direction(direction: Vector3<number>) { this._direction = direction; }
};

export { SpotLight };
