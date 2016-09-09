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
     * [Array description]
     * @param {[type]} 3 [description]
     */
    protected _color = new Vect4(0.0, 0.0, 0.0, 1.0);
    /**
     * [constructor description]
     * @param {number} r [description]
     * @param {number} g [description]
     * @param {number} b [description]
     * @param {number} a [description]
     */
    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    public isEquals(c: Color4): boolean {
        return this._color.exactEquals(c._color);
    }
    public clone(): Color4 {
        return new Color4(this.r, this.g, this.b, this.a);
    }
    public copy(c: Color4): Color4 {
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        this.a = c.a;

        return this;
    }
    /**
     * @return {number}
     */
    get r(): number { return this._color.x; }
    /**
     * @return {number}
     */
    get g(): number { return this._color.y; }
    /**
     * @return {number}
     */
    get b(): number { return this._color.z; }
    /**
     * @return {number}
     */
    get a(): number { return this._color.w; }
    /**
     * @param {number}
     */
    set r(r: number) { this._color.x = r; }
    /**
     * @param {number}
     */
    set g(g: number) { this._color.y = g; }
    /**
     * @param {number}
     */
    set b(b: number) { this._color.z = b; }
    /**
     * @param {number}
     */
    set a(a: number) { this._color.w = a; }
    /**
     * [setRGBA description]
     * @param  {number} r [description]
     * @param  {number} g [description]
     * @param  {number} b [description]
     * @return {Color4}    [description]
     */
    public setRGBA(r: number, g: number, b: number, a: number): Color4 {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        return this;
    }
    /**
     * [toHSL description]
     * @return {Color4} [description]
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
    }
};

export { Color4 };
