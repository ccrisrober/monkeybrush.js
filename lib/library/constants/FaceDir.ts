/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Front face directions
enum FaceDir {
    Clockwise = gl.CW,                      ///< Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction
    InvClockwise = gl.CCW                   ///< Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction
}

export default FaceDir;