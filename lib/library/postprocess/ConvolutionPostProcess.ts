import { PostProcess2 } from "./PostProcess2";

class BlackAndWhitePostProcess extends PostProcess2 {
    protected _kernel: Array<number>;
    constructor(kernel: Array<number>) {
        super();
        this._kernel = kernel;
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
