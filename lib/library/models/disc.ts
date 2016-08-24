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


/// <reference path="drawable.ts" />

import Drawable from "./drawable";

"use strict";

/**
 * Disc class
 * @class Disc
 */
class Disc extends Drawable {
    /**
     * Disc constructor
     * @param {number} radius: Disc radius
     * @param {number} divisions: Disc base subdivison (num. of triangles)
     * @param {number = 1.0} stacks: Radial subdivisions around disc.
     * @param {number = 0.0} innerRadius: Inner radius of disc
     * @param {number} stackInc: Width inc/dec around center.
     */
    constructor(radius: number, divisions: number, stacks: number = 1.0, innerRadius: number = 0.0, stackInc: number) {
        super();

        if (divisions < 3) {
            throw Error("divisions must be 3 or greater");
        }

        divisions = Math.trunc(divisions);
        stacks = Math.trunc(stacks);

        const nv = 0;

        let verts = new Array(3 * nv);
        let norms = new Array(3 * nv);
        let tex = new Array(2 * nv);
        let el = new Array(3 * stacks * divisions * 2);

        let idx = 0;
        const radiusSpan = radius - innerRadius;
        const pointsPerStack = divisions + 1;

        let vv = 0;
        let nn = 0;
        let tt = 0;
        let ii = 0;

        for (let stack = 0; stack <= stacks; ++stack) {
            const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackInc);

            for (let i = 0; i <= divisions; ++i) {
                const theta = 2.0 * Math.PI * i / divisions;

                verts[vv++] = stackRadius * Math.cos(theta);
                verts[vv++] = 0;
                verts[vv++] = stackRadius * Math.sin(theta);

                norms[nn++] = 0;
                norms[nn++] = 1;
                norms[nn++] = 0;

                tex[tt++] = 1 - (i / divisions);
                tex[tt++] = stack / stacks;

                if (stack > 0 && i !== divisions) {
                    const a = idx + (i + 1);
                    const b = idx + i;
                    const c = idx + i - pointsPerStack;
                    const d = idx + (i + 1) - pointsPerStack;

                    // Create two triangles (quad)
                    el[ii++] = a;
                    el[ii++] = b;
                    el[ii++] = c;

                    el[ii++] = a;
                    el[ii++] = c;
                    el[ii++] = d;
                }
            }

            idx += divisions + 1;
        }

        this._handle = [];
        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(verts), 3);
        this.addBufferArray(1, new Float32Array(norms), 3);
        this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    }
};

export default Disc;
