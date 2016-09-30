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

namespace MB {
    /**
     * CustomPingPong class.
     * This class may be used, for example, for purposes that require
     *   a previous step, as the Path Tracing algorithm, swap functions,
     *   swap textures, ...
     * @class CustomPingPong
     */
    export class CustomPingPong<T> {
        protected _elems1: T;
        protected _elems2: T;
        protected _callback: Function;
        /**
         * CustomPingPong<T> constructor.
         * @param {T} elem1 First element.
         * @param {T} elem2 Second element.
         */
        constructor(elem1: T, elem2: T) {
            this._elems1 = elem1;
            this._elems2 = elem2;
        };
        public setCB(cb: Function) {
            this._callback = cb;
        };
        /**
         * Swap ping pong inner objects.
         */
        public swap(cb?: Function) {
            this._elems2 = [this._elems1, this._elems1 = this._elems2][0];
            if (cb) cb();
            else if (this._callback) this._callback();
        };
        /**
         * Returns first object.
         * @return {T}
         */
        public first(): T {
            return this._elems1;
        };
        /**
         * Returns last object.
         * @return {T}
         */
        public last(): T {
            return this._elems2;
        }
    };
};
