/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Blending ecuation
enum BlendingEq {
    FuncAdd = gl.FUNC_ADD,
    FuncSub = gl.FUNC_SUBTRACT,
    FuncRevSub = gl.FUNC_REVERSE_SUBTRACT,
    /**
    When using the EXT_blend_minmax extension:
    ext.MIN_EXT: Minimum of source and destination,
    ext.MAX_EXT: Maximum of source and destination.
    When using a WebGL 2 context, the following values are available additionally:
    gl.MIN: Minimum of source and destination,
    gl.MAX: Maximum of source and destination.
    /**/
}
export default BlendingEq;