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
 * Cube class
 * @class Cube
 */
class Cube extends Drawable {
    /**
     * @param {number = 1.0} side: Number of sides
     */
    constructor(side: number = 1.0) {
        super();
        const side2 = side / 2.0;

        let v = [
            // Front
           -side2, -side2, side2,
            side2, -side2, side2,
            side2,  side2, side2,
           -side2,  side2, side2,
           // Right
            side2, -side2, side2,
            side2, -side2, -side2,
            side2,  side2, -side2,
            side2,  side2, side2,
           // Back
           -side2, -side2, -side2,
           -side2,  side2, -side2,
            side2,  side2, -side2,
            side2, -side2, -side2,
           // Left
           -side2, -side2, side2,
           -side2,  side2, side2,
           -side2,  side2, -side2,
           -side2, -side2, -side2,
           // Bottom
           -side2, -side2, side2,
           -side2, -side2, -side2,
            side2, -side2, -side2,
            side2, -side2, side2,
           // Top
           -side2,  side2, side2,
            side2,  side2, side2,
            side2,  side2, -side2,
           -side2,  side2, -side2
        ];

        let n = [
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            // Right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            // Back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            // Left
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            // Top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ];

        let tex = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];

        let el = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];

        const gl = Core.getInstance().getGL();

        this._handle = new Array(4);
        let i = 0;
        this._handle[i] = new VertexBuffer(BufferType.ElementArray);
        for (i = 1; i < 4; i++) {
            this._handle[i] = new VertexBuffer(BufferType.Array);
        }
        this._vao.bind();

        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);

        this.addAttrib_(0, this.createBuffer(new Float32Array(v), this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(new Float32Array(n), this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(new Float32Array(tex), this._handle[3]), 2);

        this._indicesLen = el.length;
    }
};

export default Cube;