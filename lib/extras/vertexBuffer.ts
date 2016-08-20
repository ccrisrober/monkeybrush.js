/// <reference path="../core/core.ts" />

class VertexBuffer {
	constructor(type: BufferType) {
		const gl = Core.getInstance().getGL();
		this._buffer = gl.createBuffer();
		this._type = type;
		this.bind();
	}
	public bind(type?: BufferType) {
		const gl = Core.getInstance().getGL();
		if(type !== undefined) {
			this._type = type;
		}
		gl.bindBuffer(this._type, this._buffer);
	}
	public unbind() {
		const gl = Core.getInstance().getGL();
		gl.bindBuffer(this._type, null);
	}
	public getBufferType(): BufferType {
		return this._type;
	}
	public getBuffer() {
		return this._buffer;
	}
	public destroy() {
		const gl = Core.getInstance().getGL();
		gl.bindBuffer(this._type, 0);
		if (!this._buffer) {
			gl.deleteBuffer(this._buffer);
		}
		this._buffer = null;
	}
	public bufferData(data: Float32Array | Uint16Array, usage: UsageType = UsageType.StaticDraw) {
		const gl = Core.getInstance().getGL();
		this.bind();
		gl.bufferData(this._type, data, usage);
	}

	public attribDivisor(position: number, length: number, divisor: number) {
		const gl = Core.getInstance().getGL();
		this.bind();
		gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, length, gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
        (<any>gl).vertexAttribDivisor(position, divisor); 
	}

	public vertexAttribPointer(attribLocation: number, numElems: number, type: number, normalized: boolean = false, offset: number = 0) {
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

	protected _buffer: WebGLBuffer;
	protected _type: BufferType = BufferType.Array;
}