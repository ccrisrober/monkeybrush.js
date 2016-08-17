/// <reference path="drawable.ts" />

class Cube extends Drawable {
	protected _handle: Array<WebGLBuffer>;
	constructor(side: number = 1.0) {
		super();
	    const side2 = side / 2.0;

	    let v = [
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

	    let n = [
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

	    let tex = [
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

	    let el = [
	        0, 1, 2, 0, 2, 3,
	        4, 5, 6, 4, 6, 7,
	        8, 9, 10, 8, 10, 11,
	        12, 13, 14, 12, 14, 15,
	        16, 17, 18, 16, 18, 19,
	        20, 21, 22, 20, 22, 23
	    ];

	    const gl = Core.getInstance().getGL();

		this._handle = new Array(4);
		for (let i = 0, size = this._handle.length; i < size; i++) {
			this._handle[i] = gl.createBuffer();
		}

		this._vao = (<any>gl).createVertexArray();
        (<any>gl).bindVertexArray(this._vao);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[0]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);

        this.addAttrib_(0, this.createBuffer(v, this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(n, this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(tex, this._handle[3]), 2);

        this._indicesLen = el.length;

        (<any>gl).bindVertexArray(null);
        
		// TODO: Clear v, n, tex and el
		/*console.log({
			vertices: v,
			normal: n,
			textureCoords: tex,
			indices: el,
			vao: this._handle
		});*/
	}


	protected _indicesLen;
	public render() {
		const gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._vao);
		gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
	}
}