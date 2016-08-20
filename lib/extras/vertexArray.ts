/// <reference path="../core/core.ts" />

class VertexArray {
	protected _handle: any; // TODO: WebGLVertexArrayObject;
	constructor() {
        const gl = Core.getInstance().getGL();
		this._handle = (<any>gl).createVertexArray();
		this.bind();
	}
	public bind() {
        const gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._handle);
	}
	public unbind() {
        const gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(null);
	}
	public destroy() {
        const gl = Core.getInstance().getGL();
        this.bind();
        (<any>gl).deleteVertexArray(this._handle);
	}
	public is(): boolean {
        const gl = Core.getInstance().getGL();
		return (<any>gl).isVertexArray(this._handle);
	}
}