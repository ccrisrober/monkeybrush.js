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

import Light from "./light";
import Vector3 from "../maths/vector3";

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
    protected _cutOff: number;  // TODO: Unused

    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction
     */
    constructor(position: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0),
        direction: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)) {
        super();
        this._direction = direction;
        this._position = position;
    }
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    // TODO: get position() { return this._position; }
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    // TODO: set position(position: Vector3<number>) { this._position = position; }

    /**
     * Get light direction
     * @return {Vector3<number>}
     */
    // TODO: get direction() { return this._direction; }
    /**
     * Set light direction
     * @param {Vector3<number>} direction
     */
    // TODO: set direction(direction: Vector3<number>) { this._direction = direction; }
};

export default SpotLight;
