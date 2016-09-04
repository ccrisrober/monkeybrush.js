import { PostProcess2 } from "./PostProcess2";
import { Vect2 } from "../maths/Vect2";

class BlurPostProcess extends PostProcess2 {
    protected _dir: Vect2;
    protected _width: number;
    protected _ratio: number;
    constructor(dir: Vect2, width: number, ratio: number = 1.0) {
        super();
        this._dir = dir;
        this._width = width;
        this._ratio = ratio;
    }
};
