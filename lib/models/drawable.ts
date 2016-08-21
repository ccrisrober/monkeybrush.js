/// <reference path="../core/core.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />

abstract class Drawable {
    protected _indicesLen: number;
    protected _handle: Array<VertexBuffer>;
	protected _vao: VertexArray; // TODO: WebGLVertexArrayObject;
    // TODO: Crear el VAO en el constructor y llamar a super
    constructor() {
        this._vao = new VertexArray();
    }
    protected createBuffer(data: Float32Array | Uint16Array, handle: VertexBuffer) {
        handle.bufferData(data, UsageType.StaticDraw);
        return handle;
    }
    protected addAttrib_(attribLocation, buffer: VertexBuffer, numElems) {
        const gl = Core.getInstance().getGL();
        buffer.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
    }
    public render() {
        const gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        this._vao.unbind();
    }
    public renderArrayInstance(numInstances: number) {
        const gl = Core.getInstance().getGL();

        this._vao.bind();
        if (gl instanceof WebGL2RenderingContext) {
            (<any>gl).drawElementsInstanced(
                gl.TRIANGLES, 
                this._indicesLen,
                gl.UNSIGNED_SHORT, 
                0, 
                numInstances
            );
        }
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
        // this.vao.unbind();
    }
}