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


import { Vect4 } from "../maths/Vect4";

"use strict";

class Color4 {
    /**
     * Internal array that identifies the color values
     */
    protected _color = new Vect4(0.0, 0.0, 0.0, 1.0);
    /**
     * Color4 constructor
     * @param {number} r Red channel
     * @param {number} g Green channel
     * @param {number} b Blue channel
     * @param {number} a Alpha channel
     */
    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    };
    /**
     * Check if another color is equals than current color.
     * @param  {Color4}  c Another color
     * @return {boolean}
     */
    public isEquals(c: Color4): boolean {
        return this._color.exactEquals(c._color);
    };
    /**
     * [clone description]
     * @return {Color4} [description]
     */
    public clone(): Color4 {
        return new Color4(this.r, this.g, this.b, this.a);
    };
    /**
     * [copy description]
     * @param  {Color4} c [description]
     * @return {Color4}   [description]
     */
    public copy(c: Color4): Color4 {
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        this.a = c.a;

        return this;
    };
    /**
     * Return red channel
     * @return {number}
     */
    get r(): number {
        return this._color.x;
    };
    /**
     * Return green channel
     * @return {number}
     */
    get g(): number {
        return this._color.y;
    };
    /**
     * Return blue channel
     * @return {number}
     */
    get b(): number {
        return this._color.z;
    };
    /**
     * Return alpha channel
     * @return {number}
     */
    get a(): number {
        return this._color.w;
    };
    /**
     * Set blue channel
     * @param {number} r New red channel value.
     */
    set r(r: number) {
        this._color.x = r;
    };
    /**
     * Set blue channel
     * @param {number} g New green channel value.
     */
    set g(g: number) {
        this._color.y = g;
    };
    /**
     * Set blue channel
     * @param {number} b New blue channel value.
     */
    set b(b: number) {
        this._color.z = b;
    };
    /**
     * Set alpha channel
     * @param {number} a New alpha channel value.
     */
    set a(a: number) {
        this._color.w = a;
    };
    /**
     * Lerp color between two colors using alpha value.
     * The parameter alpha is clamped to the range [0, 1].
     * @param  {Color4} minColor Minimum color.
     * @param  {Color4} maxColor Maximum color.
     * @param  {number} alpha    Alpha. Clamped to the range [0, 1].
     * @return {Color4}          New color.
     */
    public static lerp(minColor: Color4, maxColor: Color4, alpha: number): Color4 {
        const r = minColor.r + (maxColor.r - minColor.r) * alpha;
        const g = minColor.g + (maxColor.g - minColor.g) * alpha;
        const b = minColor.b + (maxColor.b - minColor.b) * alpha;
        const a = minColor.a + (maxColor.a - minColor.a) * alpha;
        return new Color4(r, g, b, a);
    };
    /**
     * Create color for RGBA value
     * @param  {number} r Red channel value
     * @param  {number} g Green channel value
     * @param  {number} b Blue channel value
     * @param  {number} a Alpha channel value
     * @return {Color4}    New color
     */
    public setRGBA(r: number, g: number, b: number, a: number): Color4 {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        return this;
    };
    /**
     * Convert current color to HSL representation.
     * @return {Color4} New color using HSL representation.
     */
    public toHSL(): Color4 {
        const
            max = Math.max(this.r, this.g, this.b),
            min = Math.min(this.r, this.g, this.b);

        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;  // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case this.r: h = (this.g - this.b) / d +
                    (this.g < this.b ? 6 : 0); break;
                case this.g: h = (this.b - this.r) / d + 2; break;
                case this.b: h = (this.r - this.g) / d + 4; break;
            }
            h /= 6;
        }
        return new Color4(h, s, l, this.a);
    };
};

export { Color4 };
