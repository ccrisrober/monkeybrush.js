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


/// <reference path="cone.ts" />

import { Cone } from "./cone";

"use strict";

/**
 * Cylinder class
 * @class Cylinder
 */
class Cylinder extends Cone {
    /**
     * Cylinder constructor
     * @param {number} radius: Cylinder radius
     * @param {number} height: Cylinder height
     * @param {number = 15.0} radialSubDiv: Radial subdivisions around cylinder
     * @param {number = 1.0} heightSubDiv Height subdivisions
     * @param {boolean = true} createTopBase: Create top base
     * @param {boolean = true} createBottomBase: Create bottom base
     */
    constructor(radius: number, height: number, radialSubDiv: number = 15.0,
        heightSubDiv: number = 1.0, createTopBase: boolean = true, createBottomBase: boolean = true) {
        if (radialSubDiv < 15) {
            throw Error("radialSubDiv must be 15 or greater");
        }
        super(radius, radius, height, radialSubDiv, heightSubDiv, createTopBase, createBottomBase);
    }
};

export { Cylinder };
