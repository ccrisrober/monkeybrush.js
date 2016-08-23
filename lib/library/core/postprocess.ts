/// <reference path="core.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../constants/_constants.ts" />
import Core from "./core.ts"
import VertexArray from "../extras/vertexArray.ts"
import VertexBuffer from "../extras/vertexBuffer.ts"
import UsageType from "../constants/UsageType.ts"
import BufferType from "../constants/BufferType.ts"

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
            // Unnecesary (<any>gl).bindVertexArray(PostProcess._planeVAO);  
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