
import { Vect3 } from "../Vect3";

class SphereModel {
    protected _radius: number;
    protected _center: Vect3;

    constructor(radius: number = 1.0, center: Vect3 = new Vect3()) {
        this._radius = radius;
        this._center = center;
    };

    get radius(): number {
        return this._radius;
    };
    get center(): Vect3 {
        return this._center;
    };

    public containtsPoint(point: Vect3): boolean {
        return false;
    };

    public intersectSphere(sphere: SphereModel): boolean {
        const totalRadius = this.radius + sphere.radius;
        return sphere.center.squaredLength()
            <= (totalRadius * totalRadius);
    }
};

export { SphereModel };
