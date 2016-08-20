/// <reference path="drawable.ts" />

class Quad extends Drawable {
	protected _handle: Array<VertexBuffer>;

	constructor(xsize: number, zsize: number, xdivs: number, zdivs: number, smax = 1.0, tmax = 1.0) {
		super();
		let v = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
		let n = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
		let tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
		let el = new Array(6 * xdivs * zdivs);

		let x2 = xsize / 2.0;
		let z2 = zsize / 2.0;

		let iFactor = zsize / zdivs;
		let jFactor = xsize / xdivs;
		let texi = smax / zdivs;
		let texj = tmax / xdivs;
		let x, z;
		let vidx = 0, tidx = 0;
		for (let i = 0; i <= zdivs; i++) {
			z = iFactor * i - z2;
			for (let j = 0; j <= xdivs; j++) {
				x = jFactor * j - x2;
				v[vidx] = x;
				v[vidx + 1] = 0.0;
				v[vidx + 2] = z;
				n[vidx] = 0.0;
				n[vidx + 1] = 1.0;
				n[vidx + 2] = 0.0;
				vidx += 3;
				tex[tidx] = j * texi;
				tex[tidx + 1] = i * texj;
				tidx += 2;
			}
		}

		let rowStart, nextRowStart;
		let idx = 0;
		for (let i = 0; i < zdivs; i++) {
			rowStart = i * (xdivs + 1);
			nextRowStart = (i + 1) * (xdivs + 1);
			for (let j = 0; j < xdivs; j++) {
				el[idx] = rowStart + j;
				el[idx + 1] = nextRowStart + j;
				el[idx + 2] = nextRowStart + j + 1;
				el[idx + 3] = rowStart + j;
				el[idx + 4] = nextRowStart + j + 1;
				el[idx + 5] = rowStart + j + 1;
				idx += 6;
			}
		}

		const gl = Core.getInstance().getGL();

		this._handle = new Array(4);
		let i = 0;
		this._handle[i] = new VertexBuffer(BufferType.ElementArray);
		for (i = 1; i < 4; i++) {
			this._handle[i] = new VertexBuffer(BufferType.Array);
		}

        this._vao.bind();

        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);

        this.addAttrib_(0, this.createBuffer(new Float32Array(v), this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(new Float32Array(n), this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(new Float32Array(tex), this._handle[3]), 2);

        this._indicesLen = el.length;
	}
	protected _indicesLen;
	public render() {
		const gl = Core.getInstance().getGL();
        this._vao.bind();
		// gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);	// TODO: UNSIGNED_INT => https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
		gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
	}
}