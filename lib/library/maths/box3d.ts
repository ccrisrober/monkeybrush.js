
import { Vect3 } from "./vect3";

class Box3D {
    protected _min: Vect3;
    protected _max: Vect3;

    constructor(min: Vect3 = new Vect3(Infinity, Infinity, Infinity),
        max: Vect3 = new Vect3(-Infinity, -Infinity, -Infinity)) {
        this._min = min;
        this._max = max;
    }
    public containsBox(b: Box3D): boolean {
        if ((this._min.x <= b._min.x) && (b._max.x <= this._max.x) &&
             (this._min.y <= b._min.y) && (b._max.y <= this._max.y) &&
             (this._min.z <= b._min.z) && (b._max.z <= this._max.z)) {
            return true;
        }
        return false;
    };
    public intersectsBox(b: Box3D): boolean {
        if (b._max.x < this._min.x || b._min.x > this._max.x ||
             b._max.y < this._min.y || b._min.y > this._max.y ||
             b._max.z < this._min.z || b._min.z > this._max.z) {
            return false;
        }
        return true;
    };
};

export { Box3D };
