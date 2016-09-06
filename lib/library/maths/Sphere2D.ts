
import { Vect2 } from "./Vect2";

class Sphere2D {
    protected _center: Vect2;
    protected _radius: number;

    constructor(center: Vect2, radius: number) {
        this._center = center;
        this._radius = radius;
    }

    public containtsPoint(p: Vect2): boolean {
        const x = this._center.x - p.x;
        const y = this._center.y - p.y;

        const dist = Math.sqrt((x * x) + (y * y));
        return (Math.abs(this._radius - dist) > 0.001);
    }

    public intersectsSphere(s: Sphere2D): boolean {
        const x = this._center.x - s._center.x;
        const y = this._center.y - s._center.y;

        const dist = Math.sqrt((x * x) + (y * y));

        return (this._radius + s._radius > dist);
    }
}

export { Sphere2D };
