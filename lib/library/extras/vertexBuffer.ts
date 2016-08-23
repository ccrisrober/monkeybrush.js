/// <reference path="../core/core.ts" />
/// <reference path="../constants/_constants.ts" />

import Core from "../core/core";
import BufferType from "../constants/BufferType";
import UsageType from "../constants/UsageType";

"use strict";

const gl = Core.getInstance().getGL();

class VertexBuffer {
    /**
     * [_buffer description]
     * @type {WebGLBuffer}
     */
    protected _buffer: WebGLBuffer;
    /**
     * [_type description]
     * @type {BufferType}
     */
    protected _type: BufferType = BufferType.Array;
    /**
     * @param {BufferType = BufferType.Array}
     */
    constructor(type: BufferType = BufferType.Array) {
        this._buffer = gl.createBuffer();
        this._type = type;
        this.bind();
    }
    /**
     * @param {BufferType}
     */
    public bind(type?: BufferType) {
        if (type !== undefined) {
            this._type = type;
        }
        gl.bindBuffer(this._type, this._buffer);
    }
    /**
     * 
     */
    public unbind() {
        gl.bindBuffer(this._type, null);
    }
    /**
     * @return {BufferType}
     */
    public getBufferType(): BufferType {
        return this._type;
    }
    /**
     * @return {WebGLBuffer}
     */
    public getBuffer(): WebGLBuffer {
        return this._buffer;
    }
    /**
     * 
     */
    public destroy() {
        gl.bindBuffer(this._type, 0);
        if (!this._buffer) {
            gl.deleteBuffer(this._buffer);
        }
        this._buffer = null;
    }
    /**
     * @param {Float32Array | Uint16Array}
     * @param {UsageType    = UsageType.StaticDraw}
     */
    public bufferData(data: Float32Array | Uint16Array, usage: UsageType = UsageType.StaticDraw) {
        this.bind();
        gl.bufferData(this._type, data, usage);
    }

    /**
     * @param {number}
     * @param {number}
     * @param {number}
     * @param {number = 0}
     */
    public attribDivisor(position: number, length: number, divisor: number, stride: number = 0) {
        this.bind();
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 
            length, 
            gl.FLOAT, 
            false, 
            length * Float32Array.BYTES_PER_ELEMENT, 
            0);
        (<any>gl).vertexAttribDivisor(position, divisor); 
    }
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     * @param {boolean = false}
     * @param {number  = 0}
     */
    public vertexAttribPointer(attribLocation: number, numElems: number, type: number, 
        normalized: boolean = false, offset: number = 0) {
        this.bind();
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(
            attribLocation, // Attribute location
            numElems, // Number of elements per attribute
            type, // Type of elements
            normalized,
            numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            offset // Offset from the beginning of a single vertex to this attribute
        );
    }
}

export default VertexBuffer;