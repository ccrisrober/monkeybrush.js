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


// TODO: Change _color to Vector3

"use strict";

class Color3 {
    /**
     * [Array description]
     * @param {[type]} 3 [description]
     */
    protected _color = new Array(3);
    /**
     * [constructor description]
     * @param {number} r [description]
     * @param {number} g [description]
     * @param {number} b [description]
     */
    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    /**
     * @return {number}
     */
    get r(): number { return this._color[0]; }
    /**
     * @return {number}
     */
    get g(): number { return this._color[1]; }
    /**
     * @return {number}
     */
    get b(): number { return this._color[2]; }
    /**
     * @param {number}
     */
    set r(r: number) { this._color[0] = r; }
    /**
     * @param {number}
     */
    set g(g: number) { this._color[1] = g; }
    /**
     * @param {number}
     */
    set b(b: number) { this._color[2] = b; }
    /**
     * [setRGB description]
     * @param  {number} r [description]
     * @param  {number} g [description]
     * @param  {number} b [description]
     * @return {Color3}    [description]
     */
    public setRGB(r: number, g: number, b: number): Color3 {
        this.r = r;
        this.g = g;
        this.b = b;

        return this;
    }
    /**
     * [toHSL description]
     * @return {Color3} [description]
     */
    public toHSL(): Color3 {
        const max = Math.max(this.r, this.g, this.b),
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
        return new Color3(h, s, l);
    }

    public static lerp(minColor: Color3, maxColor: Color3, alpha: number): Color3 {
        var r = minColor.r + (maxColor.r - minColor.r) * alpha;
        var g = minColor.g + (maxColor.g - minColor.g) * alpha;
        var b = minColor.b + (maxColor.b - minColor.b) * alpha;
        return new Color3(r, g, b);
    }


    static createFromHex(hex: number): Color3 {
        return new Color3(
            (hex >> 16 & 255) / 255,
            (hex >> 8 & 255) / 255,
            (hex & 255) / 255
        );
    }

    public static Aqua: Color3 = Color3.createFromHex(0x00FFFF);
    public static Beige: Color3 = Color3.createFromHex(0xF5F5DC);
    public static Black: Color3 = Color3.createFromHex(0x000000);
    public static Blue: Color3 = Color3.createFromHex(0x0000FF);
    public static Brown: Color3 = Color3.createFromHex(0xA52A2A);
    public static Cyan: Color3 = Color3.createFromHex(0x00FFFF);
    public static Gold: Color3 = Color3.createFromHex(0xFFD700);
    public static Gray: Color3 = Color3.createFromHex(0x808080);
    public static Green: Color3 = Color3.createFromHex(0x008000);
    public static Grey: Color3 = Color3.createFromHex(0x808080);
    public static Indigo: Color3 = Color3.createFromHex(0x4B0082);
    public static Lavender: Color3 = Color3.createFromHex(0xE6E6FA);
    public static Lime: Color3 = Color3.createFromHex(0x00FF00);
    public static Magenta: Color3 = Color3.createFromHex(0xFF00FF);
    public static Olive: Color3 = Color3.createFromHex(0x808000);
    public static Orange: Color3 = Color3.createFromHex(0xFFA500);
    public static Pink: Color3 = Color3.createFromHex(0xFFC0CB);
    public static Purple: Color3 = Color3.createFromHex(0x800080);
    public static Red: Color3 = Color3.createFromHex(0xFF0000);
    public static Salmon: Color3 = Color3.createFromHex(0xFA8072);
    public static Yellow: Color3 = Color3.createFromHex(0xFFFF00);
};

export { Color3 };
