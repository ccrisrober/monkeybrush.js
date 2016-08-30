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


"use strict";

enum TransfFeedCte {
    BufferMode = 0x8C7F,
    SeparateComponents = 0x8C80,
    Varyings = 0x8C83,
    BufferStart = 0x8C84,
    BufferSize = 0x8C85,
    PrimitivesWritten = 0x8C88,
    MaxInterleavedComponents = 0x8C8A,
    MaxSeparateAttribs = 0x8C8B,

    InterleavedAttribs = 0x8C8C,
    SeparateAttribs = 0x8C8D,
    Buffer = 0x8C8E,
    BufferBinding = 0x8C8F,
    Normal = 0x8E22,
    Paused = 0x8E23,
    Active = 0x8E24,
    Binding = 0x8E25
};

export { TransfFeedCte };
