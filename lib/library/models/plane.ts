/// <reference path="../core/core.ts" />
/// <reference path="drawable.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
/// <reference path="../constants/_constants.ts" />

import Core from "../core/core.ts";
import VertexArray from "../extras/vertexArray.ts";
import VertexBuffer from "../extras/vertexBuffer.ts";
import UsageType from "../constants/UsageType.ts";
import BufferType from "../constants/BufferType.ts";

import Drawable from "./drawable";

"use strict";

/**
 * Quad class
 * @class Quad
 */
class Plane extends Drawable {
    /**
     * Plane constructor
     * @param {number} xsize: Width plane size
     * @param {number} zsize: Height plane size
     * @param {number} xdivs: Width plane subdivisions
     * @param {number} zdivs: Height plane subdivisions
     * @param {number = 1.0} smax: Width texCoord subdivision
     * @param {number = 1.0} tmax  Height texCoord subdivision
     */
    constructor(xsize: number, zsize: number, xdivs: number, zdivs: number,
        smax: number = 1.0, tmax: number = 1.0) {
        super();
        let v = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let n = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let el = new Array(6 * xdivs * zdivs);

        let x2 = xsize / 2.0;
        let z2 = zsize / 2.0;

        let iFactor = zsize / zdivs;
        let jFactor = xsize / xdivs;
        let texi = smax / zdivs;
        let texj = tmax / xdivs;
        let x, z;
        let vidx = 0, tidx = 0;
        for (let i = 0; i <= zdivs; ++i) {
            z = iFactor * i - z2;
            for (let j = 0; j <= xdivs; ++j) {
                x = jFactor * j - x2;
                v[vidx] = x;
                v[vidx + 1] = 0.0;
                v[vidx + 2] = z;
                n[vidx] = 0.0;
                n[vidx + 1] = 1.0;
                n[vidx + 2] = 0.0;
                vidx += 3;
                tex[tidx] = j * texi;
                tex[tidx + 1] = i * texj;
                tidx += 2;
            }
        }

        let rowStart, nextRowStart;
        let idx = 0;
        for (let i = 0; i < zdivs; ++i) {
            rowStart = i * (xdivs + 1);
            nextRowStart = (i + 1) * (xdivs + 1);
            for (let j = 0; j < xdivs; ++j) {
                el[idx] = rowStart + j;
                el[idx + 1] = nextRowStart + j;
                el[idx + 2] = nextRowStart + j + 1;
                el[idx + 3] = rowStart + j;
                el[idx + 4] = nextRowStart + j + 1;
                el[idx + 5] = rowStart + j + 1;
                idx += 6;
            }
        }

        const gl = Core.getInstance().getGL();

        this._handle = [];

        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(v), 3);
        this.addBufferArray(1, new Float32Array(n), 3);
        this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    }
};

export default Plane;
