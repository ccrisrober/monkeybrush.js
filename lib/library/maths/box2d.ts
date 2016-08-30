
import { Vect2 } from "./vect2";

class Box2D {
    protected _min: Vect2;
    protected _max: Vect2;

    constructor(min: Vect2 = new Vect2(Infinity, Infinity), max: Vect2 = new Vect2(-Infinity, -Infinity)) {
        this._min = min;
        this._max = max;
    }
    public containsBox(b: Box2D): boolean {
        if ((this._min.x <= b._min.x) && (b._max.x <= this._max.x) &&
             (this._min.y <= b._min.y) && (b._max.y <= this._max.y) ) {
            return true;
        }
        return false;
    };
    public intersectsBox(b: Box2D): boolean {
        if ( b._max.x < this._min.x || b._min.x > this._max.x ||
             b._max.y < this._min.y || b._min.y > this._max.y ) {
            return false;
        }
        return true;
    };
};

export { Box2D };
