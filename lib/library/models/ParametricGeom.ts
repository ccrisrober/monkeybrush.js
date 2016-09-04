import { Vect3 } from "../maths/Vect3";

class ParametricGeom {
    public verts = [];
    public normals = [];
    public indices = [];
    public uvs = [];
    constructor(func: (u: number, v: number) => Vect3, slices: number, stacks: number) {

        let evalVect3;
        let u, v;

        const count = slices + 1;

        for (let i = 0; i <= stacks; ++i) {
            v = i / stacks;
            for (let j = 0; j <= slices; ++j) {
                u = j / slices;

                evalVect3 = func(u, v);
                this.verts.push(evalVect3.x, evalVect3.y, evalVect3.z);
            }
        }

        let pA, pB, pC, pD;
        let uva, uvb, uvc, uvd;

        for (let i = 0; i < stacks; ++i) {
            for (let j = 0; j < slices; ++j) {
                pA = i * count + j;
                pB = i * count + j + 1;
                pC = (i + 1) * count + j + 1;
                pD = (i + 1) * count + j;

                uva = new Array([j / slices, i / stacks]);
                uvb = new Array([(j + 1) / slices, i / stacks]);
                uvc = new Array([(j + 1) / slices, (i + 1) / stacks]);
                uvd = new Array([j / slices, (i + 1) / stacks]);

                this.indices.push(pA, pB, pD);
                this.uvs.push(
                    uva[0], uva[1],
                    uvb[0], uvb[1],
                    uvd[0], uvd[1]
                );

                this.indices.push(pB, pC, pD);
                this.uvs.push(
                    uvb[0], uvb[1],
                    uvc[0], uvc[1],
                    uvd[0], uvd[1]
                );
            }
        }

        // TODO: NORMALS

        console.log({
            vertices: this.verts,
            indices: this.indices,
            uvs: this.uvs
        });
    }
};

export { ParametricGeom };
