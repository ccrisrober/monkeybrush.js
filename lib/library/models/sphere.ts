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

import { Drawable } from "./drawable";

"use strict";

/**
 * Sphere class
 * @class Sphere
 */
class Sphere extends Drawable {
    /**
     * Sphere constructor
     * @param {number} radius [description]
     * @param {number} slices: Number of steps around sphere.
     * @param {number} stacks: Number of vertically on the sphere.
     */
    constructor(radius: number, slices: number, stacks: number) {
        super();

        slices = Math.trunc(slices);
        stacks = Math.trunc(stacks);

        let nv = (slices + 1) * (stacks + 1);
        let elements = (slices * 2 * (stacks - 1)) * 3;

        // v
        let v = new Array(3 * nv);
        // Normals
        let n = new Array(3 * nv);
        // Tex coords
        let tex = new Array(2 * nv);
        // Elements
        let el = new Array(elements);

        // Generate the vertex data
        // Generate positions and normals
        let theta, phi;
        let thetaFac = Math.PI * 2.0 / slices;
        let phiFac = Math.PI / stacks;
        let nx, ny, nz, s, t;
        let idx = 0, tIdx = 0;
        for ( let i = 0; i <= slices; ++i ) {
            theta = i * thetaFac;
                    s = i / slices;
            for ( let j = 0; j <= stacks; ++j ) {
                phi = j * phiFac;
                            t = j / stacks;
                nx = Math.sin(phi) * Math.cos(theta);
                ny = Math.sin(phi) * Math.sin(theta);
                nz = Math.cos(phi);
                v[idx] = radius * nx; v[idx + 1] = radius * ny; v[idx + 2] = radius * nz;
                n[idx] = nx; n[idx + 1] = ny; n[idx + 2] = nz;
                idx += 3;

                            tex[tIdx] = s;
                            tex[tIdx + 1] = t;
                            tIdx += 2;
            }
        }

        // Generate the element list
        idx = 0;
        for ( let i = 0; i < slices; ++i ) {
            let stackStart = i * (stacks + 1);
            let nextStackStart = (i + 1) * (stacks + 1);
            for ( let j = 0; j < stacks; ++j ) {
                if ( j === 0 ) {
                    el[idx] = stackStart;
                    el[idx + 1] = stackStart + 1;
                    el[idx + 2] = nextStackStart + 1;
                    idx += 3;
                } else if ( j === stacks - 1) {
                    el[idx] = stackStart + j;
                    el[idx + 1] = stackStart + j + 1;
                    el[idx + 2] = nextStackStart + j;
                    idx += 3;
                } else {
                    el[idx] = stackStart + j;
                    el[idx + 1] = stackStart + j + 1;
                    el[idx + 2] = nextStackStart + j + 1;
                    el[idx + 3] = nextStackStart + j;
                    el[idx + 4] = stackStart + j;
                    el[idx + 5] = nextStackStart + j + 1;
                    idx += 6;
                }
            }
        }

        this._handle = [];
        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(v), 3);
        this.addBufferArray(1, new Float32Array(n), 3);
        this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    }
    // public render() {
        // gl.lineWidth(1.0);
        // Puts vertices to buffer and links it to attribute letiable 'ppos'
        // gl.drawElements(gl.LINE_STRIP, this._indicesLen, gl.UNSIGNED_SHORT, 0);
};

export { Sphere };
