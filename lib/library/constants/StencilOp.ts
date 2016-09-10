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

// Stencil operation
enum StencilOp {
    /**
     * Keep the stencil value.
     */
    Keep = 0x1E00,
    /**
     * Set the stencil value to zero.
     */
    Zero = 0,
    /**
     * Replace the stencil value with the reference value.
     */
    Replace = 0x1E01,
    /**
     * Increase the stencil value by one, wrap if necessary.
     */
    Increase = 0x1E02,
    /**
     * Increase the stencil value by one, clamp if necessary.
     */
    IncreaseSaturate = 0x8507,
    /**
     * Decrease the stencil value by one, wrap if necessary.
     */
    Decrease = 0x1E03,
    /**
     * Decrease the stencil value by one, clamp if necessary.
     */
    DecreaseSaturate = 0x8508,
    /**
     * Invert the stencil data (bitwise not).
     */
    Invert = 0x150A
};

export { StencilOp };
