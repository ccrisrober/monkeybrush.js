
import { Vect3 } from "../Vect3";

class PlaneModel {
    protected _normal: Vect3;
    protected _cte: number;
    constructor(normal: Vect3, cte: number) {
        this._normal = normal;
        this._cte = cte;
    }
    public distance(p: Vect3) {
        return Vect3.dot(this._normal, p) + this._cte;
    }
}
