/// <reference path="../core/context.ts" />
///
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

enum TextureType {
    Nearest = gl.NEAREST,
    Linear = gl.LINEAR,
    Clamp2Edge = gl.CLAMP_TO_EDGE
};

export default TextureType;
