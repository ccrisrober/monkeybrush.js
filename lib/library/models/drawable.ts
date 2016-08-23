/// <reference path="../core/core.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
/// <reference path="../constants/_constants.ts" />
/// 
import Core from "../core/core.ts";
import VertexArray from "../extras/vertexArray.ts";
import VertexBuffer from "../extras/vertexBuffer.ts";
import UsageType from "../constants/UsageType.ts";

"use strict";

const gl = Core.getInstance().getGL();

declare var WebGL2RenderingContext: any;

/**
 * Drawable abstract class
 * @class Drawable
 */
abstract class Drawable {
    protected _indicesLen: number;
    protected _handle: Array<VertexBuffer>;
    protected _vao: VertexArray;
    constructor() {
        this._vao = new VertexArray();
    }

    protected createBuffer(data: Float32Array | Uint16Array, handle: VertexBuffer) {
        handle.bufferData(data, UsageType.StaticDraw);
        return handle;
    }

    protected addAttrib_(attribLocation: number, buffer: VertexBuffer, numElems: number) {
        buffer.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
    }
    /**
     * Normal render
     */
    public render() {
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        //this._vao.unbind();
    }
    /**
     * Render with array instance mode
     * @param {number} numInstances: Instances to render
     */
    public renderArrayInstance(numInstances: number) {
        this._vao.bind();
        if (gl instanceof WebGL2RenderingContext) {
            (<any>gl).drawElementsInstanced(
                gl.TRIANGLES, 
                this._indicesLen,
                gl.UNSIGNED_SHORT, 
                0, 
                numInstances
            );
        } else {
            const ext = gl.getExtension("ANGLE_instanced_arrays");
            if (ext) {
                ext.drawElementsInstancedANGLE(
                    gl.TRIANGLES, 
                    this._indicesLen,
                    gl.UNSIGNED_SHORT, 
                    0, 
                    numInstances
                );
            }
        }
        // this.vao.unbind();
    }
}

export default Drawable;