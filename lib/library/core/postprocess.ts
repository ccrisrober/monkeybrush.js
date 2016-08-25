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


/// <reference path="core.ts" />
/// <reference path="./vertexBuffer.ts" />
/// <reference path="./vertexArray.ts" />
/// <reference path="../constants/_constants.ts" />

import Core from "./core.ts";
import VertexArray from "./vertexArray.ts";
import VertexBuffer from "./vertexBuffer.ts";
import UsageType from "../constants/UsageType.ts";
import BufferType from "../constants/BufferType.ts";

"use strict";

const gl = Core.getInstance().getGL();

/**
* This class wrap PostProcess effects
*
* @class core.PostProcess
*/
class PostProcess {
    /**
     *
     */
    static initialize() {
        if (!PostProcess._planeVAO) {
            const positions = [
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                 1.0,  1.0
            ];
            PostProcess._planeVAO = new VertexArray();
            // Unnecesary gl.bindVertexArray(PostProcess._planeVAO);
            this._planeVertexVBO = new VertexBuffer(BufferType.Array);
            // Unnecesary gl.bindBuffer(gl.ARRAY_BUFFER, this._planeVertexVBO);
            this._planeVertexVBO.bufferData(new Float32Array(positions), UsageType.StaticDraw);
            this._planeVertexVBO.vertexAttribPointer(0, 2, gl.FLOAT);
            PostProcess._planeVAO.unbind();
        }
    }
    /**
     *
     */
    public static bind() {
        PostProcess._planeVAO.bind();
    }
    /**
     *
     */
    public static render() {
        // console.log("DRAW QUAD");
        PostProcess._planeVAO.bind();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        PostProcess._planeVAO.unbind();
    }
    /**
     * [_planeVAO description]
     * @type {VertexArray}
     */
    protected static _planeVAO: VertexArray = null;
    /**
     * [_planeVertexVBO description]
     * @type {VertexBuffer}
     */
    protected static _planeVertexVBO: VertexBuffer = null;
};

PostProcess.initialize();

export default PostProcess;
