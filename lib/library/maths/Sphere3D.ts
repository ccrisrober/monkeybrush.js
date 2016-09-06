
import { Vect3 } from "./Vect3";

class Sphere3D {
    protected _center: Vect3;
    protected _radius: number;

    constructor(center: Vect3, radius: number) {
        this._center = center;
        this._radius = radius;
    }

    public containtsPoint(p: Vect3): boolean {
        const x = this._center.x - p.x;
        const y = this._center.y - p.y;
        const z = this._center.z - p.z;

        const dist = Math.sqrt((x * x) + (y * y) + (z * z));
        return (Math.abs(this._radius - dist) > 0.001);
    }

    public intersectsSphere(s: Sphere3D): boolean {
        const x = this._center.x - s._center.x;
        const y = this._center.y - s._center.y;
        const z = this._center.z - s._center.z;

        const dist = Math.sqrt((x * x) + (y * y) + (z * z));

        return (this._radius + s._radius > dist);
    }
}

export { Sphere3D };
