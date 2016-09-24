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

"use strict";

namespace MB {
    /**
     * Hemispheric light class
     *
     * Hemispheric light represents a simple and easy way to
     *     simulate realistic ambient light.
     * An hemispheric light is defined by a direction to the
     *     sky and by 3 colors: one for the diffuse (the sky color),
     *     one for the ground (the color when the pixel is not towards
     *     the sky) and one for the specular.
     * @class HemisphericLight
     */
    export class HemisphericLight extends Light {
        /**
         * Vector pointing from the surface to the light source.
         * @type {MB.Vect3}
         */
        protected _direction: MB.Vect3;
        /**
         * HemisphericLight ground color
         * @type {MB.Color3}
         */
        protected _groundColor: MB.Color3;
        /**
         * Hemispheric light constructor
         * @param {MB.Vect3 = new MB.Vect3(0.0, 0.0, 0.0)} direction Light direction
         */
        constructor(direction: MB.Vect3 = new MB.Vect3(0.0, 0.0, 0.0)) {
            super();
            this._direction = direction;
            this._groundColor = new MB.Color3(0.0, 0.0, 0.0);
        }
        /**
         * Return light direction
         * @return {MB.Vect3}
         */
        get direction(): MB.Vect3 { return this._direction; }
        /**
         * Set light direction
         * @param {MB.Vect3} direction New light direction
         */
        set direction(direction: MB.Vect3) { this._direction = direction; }
        /**
         * Return light ground color
         * @return {MB.Color3}
         */
        get groundColor(): MB.Color3 { return this._groundColor; }
        /**
         * Set light ground color
         * @param {MB.Color3} color New ground color
         */
        set groundColor(color: MB.Color3) { this._groundColor = color; }
    };
};
