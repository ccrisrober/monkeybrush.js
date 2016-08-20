/// <reference path="../core/core.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />

abstract class Drawable {
	protected _vao: VertexArray; // TODO: WebGLVertexArrayObject;
    // TODO: Crear el VAO en el constructor y llamar a super
    constructor() {
        this._vao = new VertexArray();
    }
	abstract render();
    protected createBuffer(data: Float32Array | Uint16Array, handle: VertexBuffer) {
        handle.bufferData(data, UsageType.StaticDraw);
        return handle;
    }
    protected addAttrib_(attribLocation, buffer: VertexBuffer, numElems) {
        const gl = Core.getInstance().getGL();
        buffer.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
    }

}