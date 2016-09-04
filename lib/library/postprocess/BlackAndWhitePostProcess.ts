import { PostProcess2 } from "./PostProcess2";

class BlackAndWhitePostProcess extends PostProcess2 {
    protected _ratio: number;
    constructor(ratio: number = 1.0) {
        super();
        this._ratio = ratio;
    }
};
