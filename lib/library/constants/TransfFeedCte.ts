/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


/// <reference path="../core/context.ts" />
///
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

enum TransfFeedCte {
    BufferMode = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_MODE,
    SeparateComponents = (<any>gl).MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS,
    Varyings = (<any>gl).TRANSFORM_FEEDBACK_VARYINGS,
    BufferStart = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_START,
    BufferSize = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_SIZE,
    PrimitivesWritten = (<any>gl).TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN,
    MaxInterleavedComponents = (<any>gl).MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS,
    MaxSeparateAttribs = (<any>gl).MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS,

    InterleavedAttribs = (<any>gl).INTERLEAVED_ATTRIBS,
    SeparateAttribs = (<any>gl).SEPARATE_ATTRIBS,
    Buffer = (<any>gl).TRANSFORM_FEEDBACK_BUFFER,
    BufferBinding = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_BINDING,
    Normal = (<any>gl).TRANSFORM_FEEDBACK,
    Paused = (<any>gl).TRANSFORM_FEEDBACK_PAUSED,
    Active = (<any>gl).TRANSFORM_FEEDBACK_ACTIVE,
    Binding = (<any>gl).TRANSFORM_FEEDBACK_BINDING
};

export default TransfFeedCte;
