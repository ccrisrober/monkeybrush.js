/// <reference path="drawable.ts" />

class Capsule extends Drawable {
	protected _handle: Array<WebGLBuffer>;
	constructor(segments: number = 0, radius: number = 0.0, length: number = 0.0) {
		super();

        // Ensure odd
        segments = (segments + 1) &~1;
        
        var doubleSegments = segments * 2;
        var halfLength = length / 2;

	    
	    var vertices = new Array(3 * doubleSegments);
	    var normals = new Array(3 * doubleSegments);
	    var texCoords = new Array(3 * doubleSegments);
	    var el;




	    var gl = Core.getInstance().getGL();

		this._handle = new Array(4);
		for(var i = 0, size = this._handle.length; i < size; i++) {
			this._handle[i] = gl.createBuffer();
		}

		this._vao = (<any>gl).createVertexArray();
        (<any>gl).bindVertexArray(this._vao);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[0]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);

        this.addAttrib_(0, this.createBuffer(vertices, this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(normals, this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(texCoords, this._handle[3]), 2);

        this._indicesLen = el.length;

        (<any>gl).bindVertexArray(null);
        
		// TODO: Clear v, n, tex and el
		console.log({
			vertices: vertices,
			normal: normals,
			textureCoords: texCoords,
			indices: el,
			vao: this._handle
		});
	}


	protected _indicesLen;
	public render() {
		var gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._vao);
		gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
	}
}