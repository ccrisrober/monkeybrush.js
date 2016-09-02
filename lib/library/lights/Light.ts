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


/// <reference path="../extras/Color3.ts" />
/// <reference path="../maths/Vector3.ts" />

import { Color3 } from "../extras/Color3";
import { Vect3 } from "../maths/Vect3";

"use strict";

/**
 * Light abstract class
 * @class Light
 */
abstract class Light {
    /**
     * [Intensity value]
     * @type {number}
     */
    protected _intensity: number;
    /**
     * [Light color]
     * @type {Color3}
     */
    protected _color: Color3;
    protected _enable: boolean;
    /**
     * [Attenuation light value]
     * @type {Vect3}
     */
    protected _attenuation: Vect3;
    /**
     * Light constructor
     */
    constructor() {
        this._intensity = 1.0;
        this._color = new Color3(1.0, 1.0, 1.0);
        this._enable = true;
        this._attenuation = new Vect3(
            1.0,        // Constant
            0.014,      // Linear
            0.0007      // Quadratic
        );
    }

    /**
     * Set constant attenuation value.
     * @param {number} v: Constant attenuation value.
     */
    public setConstantAtt(value: number) {
        this._attenuation.x = value;
    }
    /**
     * Set linear attenuation value.
     * @param {number} v: Linear attenuation value.
     */
    public setLinearAtt(value: number) {
        this._attenuation.y = value;
    }
    /**
     * Set quadratic attenuation value.
     * @param {number} v: Quadratic attenuation value.
     */
    public setQuadraticAtt(value: number) {
        this._attenuation.z = value;
    }
    /**
     * Get light attenuation value.
     * @return {Vect3}
     */
    get attenuation(): Vect3 { return this._attenuation; }

    /**
     * Get light intensity.
     * @return {number}
     */
    get intensity(): number { return this._intensity; }
    /**
     * Set light intensity.
     * @param {number} intensity: Light intensity.
     */
    set intensity(intensity: number) { this._intensity = intensity; }

    /**
     * Get light color.
     * @return {Color3}
     */
    get color(): Color3 { return this._color; }
    /**
     * Set light color
     * @param {Color3} color: Color value
     */
    set color(color: Color3) { this._color = color; }
};

export { Light };