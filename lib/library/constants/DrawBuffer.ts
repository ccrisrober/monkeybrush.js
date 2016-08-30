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

// TODO: extensions.get("WEBGL_draw_buffers");

enum DrawBuffer {
    MaxDrawBuffers = 0x8824,
    DrawBuffer0  = 0x8825,
    DrawBuffer1  = 0x8826,
    DrawBuffer2  = 0x8827,
    DrawBuffer3  = 0x8828,
    DrawBuffer4  = 0x8829,
    DrawBuffer5  = 0x882A,
    DrawBuffer6  = 0x882B,
    DrawBuffer7  = 0x882C,
    DrawBuffer8  = 0x882D,
    DrawBuffer9  = 0x882E,
    DrawBuffer10 = 0x882F,
    DrawBuffer11 = 0x8830,
    DrawBuffer12 = 0x8831,
    DrawBuffer13 = 0x8832,
    DrawBuffer14 = 0x8833,
    DrawBuffer15 = 0x8834,

    MaxColorAttch = 0x8CDF,
    ColorAttach0  = 0x8CE0,
    ColorAttach1  = 0x8CE1,
    ColorAttach2  = 0x8CE2,
    ColorAttach3  = 0x8CE3,
    ColorAttach4  = 0x8CE4,
    ColorAttach5  = 0x8CE4,
    ColorAttach6  = 0x8CE6,
    ColorAttach7  = 0x8CE7,
    ColorAttach8  = 0x8CE8,
    ColorAttach9  = 0x8CE9,
    ColorAttach10 = 0x8CEA,
    ColorAttach11 = 0x8CEB,
    ColorAttach12 = 0x8CEC,
    ColorAttach13 = 0x8CED,
    ColorAttach14 = 0x8CEE,
    ColorAttach15 = 0x8CEF
};

export { DrawBuffer };
