/// <reference path="../core/core.ts" />

class VertexBuffer {
	constructor() {
		const gl = Core.getInstance().getGL();
		this._buffer = gl.createBuffer();
	}
	public bind(type: number) {
		const gl = Core.getInstance().getGL();
		this._type = type;
		gl.bindBuffer(this._type, this._buffer);
	}
	public getBufferType(): number {
		return this._type;
	}
	public getBuffer() {
		return this._buffer;
	}
	public destroy() {
		const gl = Core.getInstance().getGL();
		if (this._type !== 0) {
			switch (this._type) {
				case gl.ARRAY_BUFFER:
					gl.bindBuffer(this._type, 0);
					break;
				case gl.ELEMENT_ARRAY_BUFFER:
					gl.bindBuffer(this._type, 0);
					break;
			}
		}
		if (!this._buffer) {
			gl.deleteBuffer(this._buffer);
		}
		this._buffer = null;
	}

	protected _buffer: WebGLBuffer;
	protected _type: number = 0;
}