/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Blending type
enum BlendingType {
    Zero = gl.ZERO,
    One = gl.ONE,
    SrcColor = gl.SRC_COLOR,
    OneMinusSrcColor = gl.ONE_MINUS_SRC_COLOR,
    SrcAlpha = gl.SRC_ALPHA,
    OneMinusSrcAlpha = gl.ONE_MINUS_SRC_ALPHA,
    DstAlpha = gl.DST_ALPHA,
    OneMinusDstAlpha = gl.ONE_MINUS_DST_ALPHA,
    DstColor = gl.DST_COLOR,
    OneMinusDstColor = gl.ONE_MINUS_DST_COLOR,
    SrcAlphaSaturate = gl.SRC_ALPHA_SATURATE,
    CteColor = gl.CONSTANT_COLOR,
    OneMinusCteColor = gl.ONE_MINUS_CONSTANT_COLOR,
    CteAlpha = gl.CONSTANT_ALPHA,
    OneMinusCteAlpha = gl.ONE_MINUS_CONSTANT_ALPHA,
};

export default BlendingType;