/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Render Primitive type
enum RenderType {
    Points = gl.POINTS,
    Lines = gl.LINES,
    LineLoop = gl.LINE_LOOP,
    LineStrip = gl.LINE_STRIP,
    Triangles = gl.TRIANGLES,
    TriangleStrip = gl.TRIANGLE_STRIP,
    TriangleFan = gl.TRIANGLE_FAN,
};

export default RenderType;