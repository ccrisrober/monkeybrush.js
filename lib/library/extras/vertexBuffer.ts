/// <reference path="../core/core.ts" />

"use strict";

class VertexBuffer {
	static gl = Core.getInstance().getGL();
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
		this._buffer = VertexBuffer.gl.createBuffer();
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
		VertexBuffer.gl.bindBuffer(this._type, this._buffer);
	}
	/**
	 * 
	 */
	public unbind() {
		VertexBuffer.gl.bindBuffer(this._type, null);
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
		VertexBuffer.gl.bindBuffer(this._type, 0);
		if (!this._buffer) {
			VertexBuffer.gl.deleteBuffer(this._buffer);
		}
		this._buffer = null;
	}
	/**
	 * @param {Float32Array | Uint16Array}
	 * @param {UsageType    = UsageType.StaticDraw}
	 */
	public bufferData(data: Float32Array | Uint16Array, usage: UsageType = UsageType.StaticDraw) {
		this.bind();
		VertexBuffer.gl.bufferData(this._type, data, usage);
	}

	/**
	 * @param {number}
	 * @param {number}
	 * @param {number}
	 * @param {number = 0}
	 */
	public attribDivisor(position: number, length: number, divisor: number, stride: number = 0) {
		this.bind();
		VertexBuffer.gl.enableVertexAttribArray(position);
        VertexBuffer.gl.vertexAttribPointer(position, 
        	length, 
        	VertexBuffer.gl.FLOAT, 
        	false, 
        	length * Float32Array.BYTES_PER_ELEMENT, 
        	0);
        (<any>VertexBuffer.gl).vertexAttribDivisor(position, divisor); 
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
        VertexBuffer.gl.enableVertexAttribArray(attribLocation);
        VertexBuffer.gl.vertexAttribPointer(
            attribLocation, // Attribute location
            numElems, // Number of elements per attribute
            type, // Type of elements
            normalized,
            numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            offset // Offset from the beginning of a single vertex to this attribute
        );
	}
}