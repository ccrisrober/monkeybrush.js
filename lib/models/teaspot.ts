/// <reference path="drawable.ts" />

class Teaspot extends Drawable {
	protected _handle: Array<WebGLBuffer>;

	protected _elements: number;

	constructor() {
		super();
	}
	public render() {
		var gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._handle);
		gl.drawElements(gl.TRIANGLES, this._elements, gl.UNSIGNED_INT, 0);
	}
}