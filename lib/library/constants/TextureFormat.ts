/// <reference path="../core/context.ts" />
///
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

enum TextureFormat {
    RGB = gl.RGB,
    Float = gl.FLOAT
};

export default TextureFormat;
