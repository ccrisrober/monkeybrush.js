namespace Geometry {
    export function triangleCentroid(
        v1: Float32Array, v2: Float32Array, v3: Float32Array): Float32Array {

        const dim = v1.length;
        let res = new Float32Array(dim);
        for (let i = 0; i < dim; ++i) {
            const t0 = v1[i];
            const t1 = v2[i];
            const t2 = v3[i];
            res[i] = (t0 + t1 + t2) / 3;
        }

        return res;
    };
    export function triangleIncenter(
        v1: Float32Array, v2: Float32Array, v3: Float32Array): Float32Array {

        const dim = v1.length;

        function sub(tmp: Float32Array, a: Float32Array, b: Float32Array): Float32Array {
            for (let i = 0; i < tmp.length; ++i) {
                tmp[i] = a[i] - b[i]
            }
            return tmp;
        }

        function length(vec: Float32Array): number {
            let res = 0;
            for (let n = 0; n < vec.length; ++n) {
                res += vec[n] * vec[n]
            }
            return Math.sqrt(res);
        }

        let tmp = new Float32Array(dim);
        const d1 = length(sub(tmp, v3, v2));
        const d2 = length(sub(tmp, v1, v3));
        const d3 = length(sub(tmp, v2, v1));
        const p = d1 + d2 + d3;

        for (let i = 0; i < dim; ++i) {
            tmp[i] = (v1[i] * d1 + v2[i] * d2 + v3[i] * d3) / p;
        }

        return tmp;
    };
    // TODO: Not best solution ...
    // https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
    export function getConvexHull(points: number[][]): Array<any> {
        points.sort(function(a, b) {
            return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
        });

        function cross(o, a, b) {
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
        }

        let lower = [];
        for (let i = 0; i < points.length; i++) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
                lower.pop();
            }
            lower.push(points[i]);
        }

        let upper = [];
        for (let i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }

        upper.pop();
        lower.pop();
        return lower.concat(upper);
    }
};

export { Geometry };
