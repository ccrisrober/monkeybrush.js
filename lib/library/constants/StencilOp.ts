/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Stencil operation
enum StencilOp {
    Keep = gl.KEEP,                         ///< Keep the stencil value
    Zero = gl.ZERO,                         ///< Set the stencil value to zero
    Replace = gl.REPLACE,                   ///< Replace the stencil value with the reference value
    Increase = gl.INCR,                     ///< Increase the stencil value by one, wrap if necessary
    IncreaseSaturate = gl.INCR_WRAP,        ///< Increase the stencil value by one, clamp if necessary
    Decrease = gl.DECR,                     ///< Decrease the stencil value by one, wrap if necessary
    DecreaseSaturate = gl.DECR_WRAP,        ///< Decrease the stencil value by one, clamp if necessary
    Invert = gl.INVERT                      ///< Invert the stencil data (bitwise not)
};

export default StencilOp;