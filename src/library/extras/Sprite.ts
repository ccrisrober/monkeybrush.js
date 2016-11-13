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

namespace MBX {
    /**
     * Sprite class
     * @class Sprite
     */
    export class Sprite {
        protected _geometry: MB.VertexBufferGeometry;

        constructor() {
            this._geometry = new MB.VertexBufferGeometry();
            this._geometry.addAttr("position",
                new MB.BufferAttribute(new Float32Array([
                    -0.5, -0.5, 0.0,
                     0.5, -0.5, 0.0,
                     0.5,  0.5, 0.0,
                    -0.5,  0.5, 0.0
                ]), 3));
            this._geometry.addAttr("uv",
                new MB.BufferAttribute(new Float32Array([
                    0, 0,
                    1, 0,
                    1, 1,
                    0, 1
                ]), 2));
            this._geometry.setIndex(new Uint16Array([
                0, 1, 2,
                0, 2, 3
            ]));
        }

        public setPosition(pos: MB.Vect3) {
            /**
             * sprite.position.set(
             *         Math.random() * range - range / 2,
             *         Math.random() * range - range / 2,
             *         Math.random() * range - range / 2
             *);
             * sprite.scale.set(4, 4, 4);
             */
        };

        public destroy() {
            // TODO
        };
    };
};
