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
    export namespace models {
        /**
         * Prism class
         * @class Prism
         */
        export class Prism extends Cone {
            /**
             * Prism constructor
             * @param {number} radius: Prism radius
             * @param {number} height: Prism height
             * @param {number = 1.0} sides: Number of sides of the prism
             * @param {number = 1.0} heightSubDiv Height subdivisions
             * @param {boolean = true} createTopBase: Create top base
             * @param {boolean = true} createBottomBase: Create bottom base
             */
            constructor(radius: number, height: number, sides: number,
                heightSubDiv: number = 1.0, topCap: boolean = true, bottomCap: boolean = true) {
                super(radius, radius, height, sides, heightSubDiv, topCap, bottomCap);
            };
        };
    };
};
