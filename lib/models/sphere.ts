/// <reference path="drawable.ts" />

class Sphere extends Drawable {
	protected _handle: Array<WebGLBuffer>;

	constructor(radius: number, slices: number, stacks: number) {
		super();

		var nv = (slices +1) * (stacks + 1);
		var elements = (slices * 2 * (stacks - 1)) * 3;

	    // v
	    var v = new Array(3 * nv);
	    // Normals
	    var n = new Array(3 * nv);
	    // Tex coords
	    var tex = new Array(2 * nv);
	    // Elements
	    var el = new Array(elements);

	    // Generate the vertex data
	    // Generate positions and normals
		var theta, phi;
		var thetaFac = Math.PI * 2.0 / slices;
		var phiFac = Math.PI / stacks;
		var nx, ny, nz, s, t;
		var idx = 0, tIdx = 0;
		for( var i = 0; i <= slices; i++ ) {
			theta = i * thetaFac;
	                s = i / slices;
			for( var j = 0; j <= stacks; j++ ) {
				phi = j * phiFac;
	                        t = j / stacks;
				nx = Math.sin(phi) * Math.cos(theta);
				ny = Math.sin(phi) * Math.sin(theta);
				nz = Math.cos(phi);
				v[idx] = radius * nx; v[idx+1] = radius * ny; v[idx+2] = radius * nz;
				n[idx] = nx; n[idx+1] = ny; n[idx+2] = nz;
				idx += 3;

	                        tex[tIdx] = s;
	                        tex[tIdx+1] = t;
	                        tIdx += 2;
			}
		}

		// Generate the element list
		idx = 0;
		for( var i = 0; i < slices; i++ ) {
			var stackStart = i * (stacks + 1);
			var nextStackStart = (i+1) * (stacks+1);
			for( var j = 0; j < stacks; j++ ) {
				if( j == 0 ) {
					el[idx] = stackStart;
					el[idx+1] = stackStart + 1;
					el[idx+2] = nextStackStart + 1;
					idx += 3;
				} else if( j == stacks - 1) {
					el[idx] = stackStart + j;
					el[idx+1] = stackStart + j + 1;
					el[idx+2] = nextStackStart + j;
					idx += 3;
				} else {
					el[idx] = stackStart + j;
					el[idx+1] = stackStart + j + 1;
					el[idx+2] = nextStackStart + j + 1;
					el[idx+3] = nextStackStart + j;
					el[idx+4] = stackStart + j;
					el[idx+5] = nextStackStart + j + 1;
					idx += 6;
				}
			}
		}

		var gl = Core.getInstance().getGL();

		this._handle = new Array(4);
		for(var i = 0; i < 4; i++) {
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

		// TODO: Clear v, n, tex and el
		/*console.log({
			vertices: v,
			normal: n,
			textureCoords: tex,
			indices: el
		});*/
	}
	protected _indicesLen;
	public render() {
		var gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._vao);
		gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
	}
}