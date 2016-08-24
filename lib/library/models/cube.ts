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
     * Cube constructor
     * @param {number = 1.0} side: Size length
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

        this._handle = [];
        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(v), 3);
        this.addBufferArray(1, new Float32Array(n), 3);
        this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    }
};

export default Cube;
