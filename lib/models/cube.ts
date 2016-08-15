/// <reference path="drawable.ts" />

class Cube extends Drawable {
	protected _handle: Array<WebGLBuffer>;
	constructor(side: number = 1.0) {
		super();
	    var side2 = side / 2.0;

	    var v = [
	        // Front
	       -side2, -side2, side2,
	        side2, -side2, side2,
	        side2,  side2, side2,
	       -side2,  side2, side2,
	       // Right
	        side2, -side2, side2,
	        side2, -side2, -side2,
	        side2,  side2, -side2,
	        side2,  side2, side2,
	       // Back
	       -side2, -side2, -side2,
	       -side2,  side2, -side2,
	        side2,  side2, -side2,
	        side2, -side2, -side2,
	       // Left
	       -side2, -side2, side2,
	       -side2,  side2, side2,
	       -side2,  side2, -side2,
	       -side2, -side2, -side2,
	       // Bottom
	       -side2, -side2, side2,
	       -side2, -side2, -side2,
	        side2, -side2, -side2,
	        side2, -side2, side2,
	       // Top
	       -side2,  side2, side2,
	        side2,  side2, side2,
	        side2,  side2, -side2,
	       -side2,  side2, -side2
	    ];

	    var n = [
	        // Front
	        0.0, 0.0, 1.0,
	        0.0, 0.0, 1.0,
	        0.0, 0.0, 1.0,
	        0.0, 0.0, 1.0,
	        // Right
	        1.0, 0.0, 0.0,
	        1.0, 0.0, 0.0,
	        1.0, 0.0, 0.0,
	        1.0, 0.0, 0.0,
	        // Back
	        0.0, 0.0, -1.0,
	        0.0, 0.0, -1.0,
	        0.0, 0.0, -1.0,
	        0.0, 0.0, -1.0,
	        // Left
	        -1.0, 0.0, 0.0,
	        -1.0, 0.0, 0.0,
	        -1.0, 0.0, 0.0,
	        -1.0, 0.0, 0.0,
	        // Bottom
	        0.0, -1.0, 0.0,
	        0.0, -1.0, 0.0,
	        0.0, -1.0, 0.0,
	        0.0, -1.0, 0.0,
	        // Top
	        0.0, 1.0, 0.0,
	        0.0, 1.0, 0.0,
	        0.0, 1.0, 0.0,
	        0.0, 1.0, 0.0
	    ];

	    var tex = [
	        // Front
	        0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0,
	        // Right
	        0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0,
	        // Back
	        0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0,
	        // Left
	        0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0,
	        // Bottom
	        0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0,
	        // Top
	        0.0, 0.0,
	        1.0, 0.0,
	        1.0, 1.0,
	        0.0, 1.0
	    ];

	    var el = [
	        0,1,2,0,2,3,
	        4,5,6,4,6,7,
	        8,9,10,8,10,11,
	        12,13,14,12,14,15,
	        16,17,18,16,18,19,
	        20,21,22,20,22,23
	    ];

	    var gl = Core.getInstance().getGL();

		this._handle = new Array(4);
		for(var i = 0; i < 4; i++) {
			this._handle[i] = gl.createBuffer();
		}

		this._vao = (<any>gl).createVertexArray();
        (<any>gl).bindVertexArray(this._vao);

		this.addAttrib(0, this._handle[0], v, 3);
		this.addAttrib(1, this._handle[1], n, 3);
		this.addAttrib(2, this._handle[2], tex, 2);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[3]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);
        (<any>gl).bindVertexArray(null);
        
		// TODO: Clear v, n, tex and el
		console.log({
			vertices: v,
			normal: n,
			textureCoords: tex,
			indices: el
		});
	}
	public render() {
		var gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._handle);
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_INT, 0);
	}
}