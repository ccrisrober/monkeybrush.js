/// <reference path="../core/context.ts" />
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

// Usage type
enum UsageType {
    StaticDraw = gl.STATIC_DRAW,
    DynamicDraw = gl.DYNAMIC_DRAW,
    StreamDraw = gl.STREAM_DRAW,

    StaticRead = (<any>gl).STATIC_READ,
    DynamicRead = (<any>gl).DYNAMIC_READ,
    StreamRead = (<any>gl).STREAM_READ,

    StaticCopy = (<any>gl).STATIC_COPY,
    DynamicCopy = (<any>gl).DYNAMIC_COPY,
    StreamCopy = (<any>gl).STREAM_COPY,
};

export default UsageType;