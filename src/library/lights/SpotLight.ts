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
 * Spot light class
 * @class SpotLight
 *
 * A spotlight is a light source that is located somewhere
 * in the environment that, instead of shooting light rays
 * in all directions, only shoots them in a specific direction.
 * The result is that only the objects within a certain radius of
 * the spotlight's direction are lit and everything else stays dark.
 * A good example of a spotlight would be a street lamp or a flashlight.
 */
class SpotLight extends Light {
    /**
     * Light source position.
     * @type {Vect3}
     */
    protected _position: Vect3;
    /**
     * Vector pointing from the surface to the light source.
     * @type {Vect3}
     */
    protected _direction: Vect3;
    /**
     * Specifies the spotlight´s radius. Everything outside
     * this angle is not lit by the spotlight.
     * @type {number}
     */
    protected _cutOff: number;

    /**
     * SpotLight constructor
     * @param {Vect3 = new Vect3(0.0, 0.0, 0.0)} position  SpotLight position
     * @param {Vect3 = new Vect3(0.0, 0.0, 0.0)} direction Spotlight direction
     * @param {number = 1.0} cuttoff Spotlight radius
     */
    constructor(position: Vect3 = new Vect3(0.0, 0.0, 0.0),
        direction: Vect3 = new Vect3(0.0, 0.0, 0.0), cuttoff: number = 1.0) {
        super();
        this._direction = direction;
        this._position = position;
        this._cutOff = cuttoff;
    }
    /**
     * Return spotlight´s radius.
     * @return {number}
     */
    get cutoff(): number { return this._cutOff; }
    /**
     * Edit spotlight´s radius.
     * @param {number} v New spotlight radius
     */
    set cutoff(v: number) { this._cutOff = v; }
    /**
     * Return light source position
     * @return {Vect3}
     */
    get position(): Vect3 { return this._position; }
    /**
     * Set light source position
     * @param {Vect3} New light position
     */
    set position(position: Vect3) { this._position = position; }

    /**
     * Return light direction
     * @return {Vect3}
     */
    get direction(): Vect3 { return this._direction; }
    /**
     * Set light direction
     * @param {Vect3} New light direciton
     */
    set direction(direction: Vect3) { this._direction = direction; }
};

export { SpotLight };
