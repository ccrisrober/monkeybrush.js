
import { Vect3 } from "../Vect3";

class TriangleModel {
    protected _a: Vect3;
    protected _b: Vect3;
    protected _c: Vect3;

    constructor(a: Vect3 = new Vect3(), b: Vect3 = new Vect3(), c: Vect3 = new Vect3()) {
        this._a = a;
        this._b = b;
        this._c = c;
    };

    public normal(): Vect3 {
        return Vect3.cross(
            Vect3.sub(this._c, this._b),
            Vect3.sub(this._a, this._b)).normalize();
    };

};

export { TriangleModel };
