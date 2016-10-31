namespace MB {
    export class Tube extends MB.Drawable {
        constructor(context: MB.GLContext, path: MB.Path) {
            super(context);
            this._path = path;

            let tubularSegments = 64;
            let radialSegments = 8;
            let radius = 1;

            // this._geometry.addAttr(VBType.VBVertices, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            // this._geometry.addAttr(VBType.VBNormals, new MB.BufferAttribute(new Float32Array(3 * nv), 3));
            // this._geometry.addAttr(VBType.VBTexCoord, new MB.BufferAttribute(new Float32Array(2 * nv), 2));
            // let el = new Uint16Array(3 * 2 * tubularSegments * radialSegments);

            let norm = new MB.Vect3();

            let normals = [];
            let vertices = [];
            let uvs = [];
            let indices = [];

            let i: number, j: number, p: MB.Vect3;
            let vx, vy, vz, sin, cos, subd: number;
            for (i = 0; i < tubularSegments; ++i) {
                p = null; // pointAt
                for (let j = 0; i <= radialSegments; ++j) {
                    subd = j / radialSegments * Math.PI * 2;

                    sin = Math.sin(subd);
                    cos = Math.cos(subd);

                    norm.x = 0.0;
                    norm.y = 0.0;
                    norm.z = 0.0;
                    norm = norm.normalize();
                    normals.push(norm.x, norm.y, norm.z);

                    vx = p.x + radius * norm.x;
                    vy = p.y + radius * norm.y;
                    vz = p.z + radius * norm.z;

                    vertices.push(vx, vy, vz);
                }
            }

            // TODO: Check closed!

            let u: number, v: number;
            // Generate uvs
            for (i = 0; i <= tubularSegments; ++i) {
                for (j = 0; j <= radialSegments; ++j) {
                    u = i / tubularSegments;
                    v = j / radialSegments;

                    uvs.push(u, v);
                }
            }

            let pa, pb, pc, pd: number;
            // Generate indices
            for (j = 1; j <= tubularSegments; ++j) {
                for (i = 1; i <= radialSegments; ++i) {
                    pa = (radialSegments + 1) * (j - 1) + (i - 1);
                    pb = (radialSegments + 1) * j + (i - 1);
                    pc = (radialSegments + 1) * j + i;
                    pd = (radialSegments + 1) * (j - 1) + i;

                    // faces
                    indices.push(pa, pb, pd);
                    indices.push(pb, pc, pd);
                }
            }
        }

        protected _path: MB.Path;

        protected _generateSegment(t: number) {
            let point = null;
        }
    };
};
