/// <reference path="drawable.ts" />

class Teaspot extends Drawable {
	protected _handle: Array<VertexBuffer>;

	protected _faces: number;

	constructor() {
		super();
	}
	public render() {
		const gl = Core.getInstance().getGL();
        this._vao.bind();
		gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);
	}
}