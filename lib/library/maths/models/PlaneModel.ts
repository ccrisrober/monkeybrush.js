
import { Vect3 } from "../Vect3";
import { SphereModel } from "./SphereModel";

class PlaneModel {
    protected _normal: Vect3;
    protected _cte: number;
    constructor(normal: Vect3, cte: number) {
        this._normal = normal;
        this._cte = cte;
    };
    public distance(p: Vect3) {
        return Vect3.dot(this._normal, p) + this._cte;
    };
    public distanceToPoint(point: Vect3): number {
        return Vect3.dot(this._normal, point) + this._cte;
    };
    public distanceToSphere(sphere: SphereModel): number {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    };
    get normal(): Vect3 {
        return this._normal;
    };
    get constant(): number {
        return this._cte;
    }
};

export { PlaneModel };
