
import { Vect2 } from "../maths/Vect2";
import { Vect3 } from "../maths/Vect3";

class Lathe {
    public vertices = [];
    public normals = [];
    public uvs = [];
    public indices = [];
    constructor(points: Array<Vect3> = [], segments: number = 55, phiInit = 0, phiRadius = 2 * Math.PI) {

        points = [];
        const height = 5;
        const count = 30;
        for (let p = 0; p < count; p++) {
            points.push(
                new Vect3((Math.sin(p * 0.2) + Math.cos(p * 0.3)) * height + 12,
                    p + height,
                    (p - count) + count / 2));
        }

        segments = Math.floor(segments);

        // phiRadius [0, 2PI]

        // vertexSize (in floats) = (segments + 1) * points.length;
        // indexSize (in floats) =  segments * points.length * 2 * 3;

        const inverseSegments = 1.0 / segments;

        let i, j, base, a, b, c, d, size;
        for ( i = 0; i <= segments; ++i) {
            const phi = phiInit + i * inverseSegments * phiRadius;

            const sin = Math.sin(phi);
            const cos = Math.cos(phi);

            for (j = 0, size = points.length - 1; j <= size; ++j) {
                this.vertices.push(new Vect3(
                    points[j].x * sin,
                    points[j].y,
                    points[j].x * cos
                ));

                this.uvs.push(new Vect2(
                    i / segments,
                    j / (points.length - 1)
                ));
            }
        }

        for (i = 0; i < segments; ++i) {
            for (j = 0; j < (points.length - 1); ++j) {
                base = j + i * points.length;

                // indices
                a = base;
                b = base + points.length;
                c = base + points.length + 1;
                d = base + 1;

                // face one
                this.indices.push(new Vect3(a, b, d));

                // face two
                this.indices.push(new Vect3(b, c, d));
            }
        }

        for (i = 0; i < this.vertices.length; ++i) {
            this.normals.push(new Vect3());
        }

        for (i = 0; i < this.indices.length; ++i) {
            const ia: Vect3 = this.vertices[this.indices[i].x];
            const ib: Vect3 = this.vertices[this.indices[i].y];
            const ic: Vect3 = this.vertices[this.indices[i].z];

            const e1: Vect3 = Vect3.sub(ia, ib);
            const e2: Vect3 = Vect3.sub(ic, ib);
            const no: Vect3 = Vect3.cross(e1, e2);

            this.normals[this.indices[i].x] = this.normals[this.indices[i].x].add(no);
            this.normals[this.indices[i].y] = this.normals[this.indices[i].y].add(no);
            this.normals[this.indices[i].z] = this.normals[this.indices[i].z].add(no);
        }

        for (i = 0; i < this.normals.length; ++i) {
            this.normals[i] = this.normals[i].normalize();
        }


        let vertices: Array<number> = [];
        for (i = 0; i < this.vertices.length; ++i) {
            vertices.push(this.vertices[i].x, this.vertices[i].y, this.vertices[i].z);
        }
        this.vertices = vertices;
        let normals: Array<number> = [];
        for (i = 0; i < this.normals.length; ++i) {
            normals.push(this.normals[i].x, this.normals[i].y, this.normals[i].z);
        }
        this.normals = normals;
        let uvs: Array<number> = [];
        for (i = 0; i < this.uvs.length; ++i) {
            uvs.push(this.uvs[i].x, this.uvs[i].y);
        }
        this.uvs = uvs;
        let indices: Array<number> = [];
        for (i = 0; i < this.indices.length; ++i) {
            indices.push(this.indices[i].x, this.indices[i].y, this.indices[i].z);
        }
        this.indices = indices;

        // if geometry closed, check average along the seam
        if (phiRadius === Math.PI * 2) {
            let n1 = new Vect3();
            let n2 = new Vect3();
            // let n3 = new Vect3();
            let n = new Vect3();

            base = segments * points.length * 3;
            for (i = 0, j = 0, size = points.length; i < size; ++i, j += 3) {

                // select normal int the first line
                n1.x = this.normals[j];
                n1.y = this.normals[j + 1];
                n1.z = this.normals[j + 2];

                // select normal of last line
                n2.x = this.normals[base + j];
                n2.y = this.normals[base + j + 1];
                n2.z = this.normals[base + j + 2];

                n = Vect3.add(n, Vect3.add(n1, n2)).normalize();

                this.normals[j] = this.normals[base + j] = n.x;
                this.normals[j + 1] = this.normals[base + j + 1] = n.y;
                this.normals[j + 2] = this.normals[base + j + 2] = n.z;

            }
        }
    }
}

export { Lathe };
