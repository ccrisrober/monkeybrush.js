/// <reference path="drawable.ts" />

"use strict";

/**
 * Sphere class
 * @class Sphere
 */
class Sphere extends Drawable {
	constructor(radius: number, slices: number, stacks: number) {
		super();

		let nv = (slices + 1) * (stacks + 1);
		let elements = (slices * 2 * (stacks - 1)) * 3;

	    // v
	    let v = new Array(3 * nv);
	    // Normals
	    let n = new Array(3 * nv);
	    // Tex coords
	    let tex = new Array(2 * nv);
	    // Elements
	    let el = new Array(elements);

	    // Generate the vertex data
	    // Generate positions and normals
		let theta, phi;
		let thetaFac = Math.PI * 2.0 / slices;
		let phiFac = Math.PI / stacks;
		let nx, ny, nz, s, t;
		let idx = 0, tIdx = 0;
		for ( let i = 0; i <= slices; i++ ) {
			theta = i * thetaFac;
	                s = i / slices;
			for ( let j = 0; j <= stacks; j++ ) {
				phi = j * phiFac;
	                        t = j / stacks;
				nx = Math.sin(phi) * Math.cos(theta);
				ny = Math.sin(phi) * Math.sin(theta);
				nz = Math.cos(phi);
				v[idx] = radius * nx; v[idx + 1] = radius * ny; v[idx + 2] = radius * nz;
				n[idx] = nx; n[idx + 1] = ny; n[idx + 2] = nz;
				idx += 3;

	                        tex[tIdx] = s;
	                        tex[tIdx + 1] = t;
	                        tIdx += 2;
			}
		}

		// Generate the element list
		idx = 0;
		for ( let i = 0; i < slices; i++ ) {
			let stackStart = i * (stacks + 1);
			let nextStackStart = (i + 1) * (stacks + 1);
			for ( let j = 0; j < stacks; j++ ) {
				if ( j === 0 ) {
					el[idx] = stackStart;
					el[idx + 1] = stackStart + 1;
					el[idx + 2] = nextStackStart + 1;
					idx += 3;
				} else if ( j === stacks - 1) {
					el[idx] = stackStart + j;
					el[idx + 1] = stackStart + j + 1;
					el[idx + 2] = nextStackStart + j;
					idx += 3;
				} else {
					el[idx] = stackStart + j;
					el[idx + 1] = stackStart + j + 1;
					el[idx + 2] = nextStackStart + j + 1;
					el[idx + 3] = nextStackStart + j;
					el[idx + 4] = stackStart + j;
					el[idx + 5] = nextStackStart + j + 1;
					idx += 6;
				}
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
	// public render() {
		// gl.lineWidth(1.0);
		// Puts vertices to buffer and links it to attribute letiable 'ppos'
		// gl.drawElements(gl.LINE_STRIP, this._indicesLen, gl.UNSIGNED_SHORT, 0);
}