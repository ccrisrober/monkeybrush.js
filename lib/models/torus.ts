/// <reference path="drawable.ts" />

class Torus extends Drawable {
	protected _handle: Array<WebGLBuffer>;

	protected _faces: number;

	constructor(outerRadius: number = 1.0, innerRadius: number = 0.5, 
		sides: number = 4, rings: number = 10) {
		super();
		let faces = sides * rings;
		let nVerts  = sides * (rings + 1);   // One extra ring to duplicate first ring

		// v
		let verts = new Array(3 * nVerts);
		// Normals
		let norms = new Array(3 * nVerts);
		// Tex coords
		let tex = new Array(2 * nVerts);
		// Elements
		let el = new Array(6 * faces);

		// Generate the vertex data

		let ringFactor = (Math.PI * 2.0) / rings;
		let sideFactor = (Math.PI * 2.0) / sides;
		let idx = 0, tidx = 0;
		for ( let ring = 0; ring <= rings; ring++ ) {
			let u = ring * ringFactor;
			let cu = Math.cos(u);
			let su = Math.sin(u);
			for ( let side = 0; side < sides; side++ ) {
				let v = side * sideFactor;
				let cv = Math.cos(v);
				let sv = Math.sin(v);
				let r = (outerRadius + innerRadius * cv);
				verts[idx] = r * cu;
				verts[idx + 1] = r * su;
				verts[idx + 2] = innerRadius * sv;
				norms[idx] = cv * cu * r;
				norms[idx + 1] = cv * su * r;
				norms[idx + 2] = sv * r;
				tex[tidx] = u / (Math.PI * 2.0);
				tex[tidx + 1] = v / (Math.PI * 2.0);
				tidx += 2;
				// Normalize
				let len = Math.sqrt( norms[idx] * norms[idx] +
								  norms[idx + 1] * norms[idx + 1] +
								  norms[idx + 2] * norms[idx + 2] );
				norms[idx] /= len;
				norms[idx + 1] /= len;
				norms[idx + 2] /= len;
				idx += 3;
			}
		}

		idx = 0;
		for ( let ring = 0; ring < rings; ring++ ) {
			let ringStart = ring * sides;
			let nextRingStart = (ring + 1) * sides;
			for ( let side = 0; side < sides; side++ ) {
				let nextSide = (side + 1) % sides;
				// The quad
				el[idx] = (ringStart + side);
				el[idx + 1] = (nextRingStart + side);
				el[idx + 2] = (nextRingStart + nextSide);
				el[idx + 3] = ringStart + side;
				el[idx + 4] = nextRingStart + nextSide;
				el[idx + 5] = (ringStart + nextSide);
				idx += 6;
			}
		}

		const gl = Core.getInstance().getGL();

		this._handle = new Array(4);
		for (let i = 0; i < 4; i++) {
			this._handle[i] = gl.createBuffer();
		}

		this._vao = (<any>gl).createVertexArray();
        (<any>gl).bindVertexArray(this._vao);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[0]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);

        this.addAttrib_(0, this.createBuffer(verts, this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(norms, this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(tex, this._handle[3]), 2);

        this._indicesLen = el.length;

		// TODO: Clear v, n, tex and el
		/*console.log({
			vertices: verts,
			normal: norms,
			textureCoords: tex,
			indices: el
		});*/
	}
	protected _indicesLen;
	public render() {
		const gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._vao);
		gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);

		// offset the filled object to avoid the stitching that can arise when the wireframe lines are drawn
		// gl.enable(gl.POLYGON_OFFSET_FILL);
		// gl.polygonOffset(2.0, 2.0);
		// gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
		// gl.disable(gl.POLYGON_OFFSET_FILL);

		// Then disable the vertex colors and draw the wire frame with one constant color
		// gl.lineWidth(1.0);
		// gl.drawElements(gl.LINE_LOOP, this._indicesLen, gl.UNSIGNED_SHORT, 0);
	}

	public render2(counter: number) {
		// console.log(counter);
		const gl = Core.getInstance().getGL();
		(<any>gl).bindVertexArray(this._vao);
		(<any>gl).drawElementsInstanced(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0, counter);
	}
}