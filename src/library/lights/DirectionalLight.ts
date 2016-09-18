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
    export namespace lights {
        /**
         * Directional light class
         *
         * Directional light is light that is emitted from a
         * specific direction.
         * This is light that's coming from so far away that every
         * photon is moving parallel to every other photon.
         * Sunlight, for example, is directional light.
         * @class DirectionalLight
         */
        export class DirectionalLight extends Light {
            /**
             * Vector pointing from the surface to the light source.
             * @type {MB.maths.Vect3}
             */
            protected _direction: MB.maths.Vect3;
            /**
             * Directional light constructor
             * @param {MB.maths.Vect3 = new MB.maths.Vect3(0.0, 0.0, 0.0)} direction [description]
             */
            constructor(direction: MB.maths.Vect3 = new MB.maths.Vect3(0.0, 0.0, 0.0)) {
                super();
                this._direction = direction;
            }
            /**
             * Return light direction
             * @return {MB.maths.Vect3}
             */
            get direction(): MB.maths.Vect3 { return this._direction; }
            /**
             * Set light direction
             * @param {MB.maths.Vect3} New light direciton
             */
            set direction(direction: MB.maths.Vect3) { this._direction = direction; }
        };
    };
};
