/// <reference path="drawable.ts" />

class Quad extends Drawable {
	protected _handle: Array<WebGLBuffer>;

	constructor(xsize: number, zsize: number, xdivs: number, zdivs: number, smax = 1.0, tmax = 1.0) {
		super();
		var v = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
		var n = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
		var tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
		var el = new Array(6 * xdivs * zdivs);

		var x2 = xsize / 2.0;
		var z2 = zsize / 2.0;

		var iFactor = zsize / zdivs;
		var jFactor = xsize / xdivs;
		var texi = smax / zdivs;
		var texj = tmax / xdivs;
		var x, z;
		var vidx = 0, tidx = 0;
		for(var i = 0; i <= zdivs; i++) {
			z = iFactor * i - z2;
			for(var j = 0; j <= xdivs; j++) {
				x = jFactor * j - x2;
				v[vidx] = x;
				v[vidx+1] = 0.0;
				v[vidx+2] = z;
				n[vidx] = 0.0;
				n[vidx+1] = 1.0;
				n[vidx+2] = 0.0;
				vidx += 3;
				tex[tidx] = j * texi;
				tex[tidx+1] = i * texj;
				tidx += 2;
			}
		}

		var rowStart, nextRowStart;
		var idx = 0;
		for(var i = 0; i < zdivs; i++) {
			rowStart = i * (xdivs+1);
			nextRowStart = (i+1) * (xdivs+1);
			for(var j = 0; j < xdivs; j++) {
				el[idx] = rowStart + j;
				el[idx+1] = nextRowStart + j;
				el[idx+2] = nextRowStart + j + 1;
				el[idx+3] = rowStart + j;
				el[idx+4] = nextRowStart + j + 1;
				el[idx+5] = rowStart + j + 1;
				idx += 6;
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
		console.log({
			vertices: v,
			normal: n,
			textureCoords: tex,
			indices: el
		});
	}
	protected _indicesLen;
	public render() {
		var gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._vao);
		//gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);	// TODO: UNSIGNED_INT => https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
		gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
	}
}