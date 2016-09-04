import { PostProcess2 } from "./PostProcess2";

type ToneOperator = "gamma" | "reinhard" | "filmic" | "srgb" | "uncharted2";

class ToneMapPostProcess extends PostProcess2 {
    protected _operator: ToneOperator;
    constructor(operator: ToneOperator) {
        super();
        this._operator = operator;
    }

    // Kernel examples
    public static EmbossKernel = [
        -2, -1, 0,
        -1,  1, 1,
         0,  1, 2
    ];
    public static SharpenKernel = [
         0, -1,  0,
        -1,  5, -1,
         0, -1,  0
    ];
};
