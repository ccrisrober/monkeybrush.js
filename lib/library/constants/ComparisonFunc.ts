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

// Comparison function
enum ComparisonFunc {
    Never = 0x0200,                  ///< Comparison always fails
    Less = 0x0201,                   ///< Passes if source is less than the destination
    Equal = 0x0202,                  ///< Passes if source is equal to the destination
    LessEqual = 0x0203,              ///< Passes if source is less than or equal to the destination
    Greater = 0x0204,                ///< Passes if source is greater than to the destination
    NotEqual = 0x0205,               ///< Passes if source is not equal to the destination
    GreaterEqual = 0x0206,           ///< Passes if source is greater than or equal to the destination
    Always = 0x0207                  ///< Comparison always succeeds
};

export { ComparisonFunc };
