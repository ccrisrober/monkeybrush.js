/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Cull mode
enum Face {
    Front = gl.FRONT,                       ///< Cull front-facing primitives
    Back = gl.BACK,                         ///< Cull back-facing primitives
    FrontAndBack = gl.FRONT_AND_BACK        ///< Cull Front and back-facing primitives
};

export default Face;
