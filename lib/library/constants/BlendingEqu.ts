/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

enum BlendingEqu {
    Add = gl.FUNC_ADD,
    Substract = gl.FUNC_SUBTRACT,
    RevSubstract = gl.FUNC_REVERSE_SUBTRACT,
    Min = (<any>gl).MIN,        // TODO: EXT_blend_minmax
    Max = (<any>gl).MAX         // TODO: EXT_blend_minmax
};

export default BlendingEqu;