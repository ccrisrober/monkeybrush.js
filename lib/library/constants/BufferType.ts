/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Array buffer type
enum BufferType {
    Array = gl.ARRAY_BUFFER,
    ElementArray = gl.ELEMENT_ARRAY_BUFFER,
    TransformFeedback = (<any>gl).TRANSFORM_FEEDBACK_BUFFER,
    Uniform = (<any>gl).UNIFORM_BUFFER,
    PixelPack = (<any>gl).PIXEL_PACK_BUFFER,
    PixelUnpack = (<any>gl).PIXEL_UNPACK_BUFFER,
    CopyRead = (<any>gl).COPY_READ_BUFFER,
    CopyWrite = (<any>gl).COPY_WRITE_BUFFER,
};

export default BufferType;