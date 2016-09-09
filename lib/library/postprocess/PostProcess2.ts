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


import { Color4 } from "../extras/Color4";
import { Camera } from "../camera/Camera";
import { SimpleTexture2D } from "../textures/SimpleTexture2D";
import { Core } from "../core/Core";


"use strict";


class PostProcess2 {
    public width: number = -1;
    public height: number = -1;
    public clearColor: Color4 = null;

    constructor() {
        /*
        in vec2 position;

        uniform vec2 scale;

        out vec2 tc;

        void main(void) {
            tc = (position * 0.5 + 0.5) * scale;
            gl_Position = vec4(position, 0.0, 1.0);
        }*/
    }

    public active(camera: Camera, srcTex?: SimpleTexture2D) {
        const gl = Core.getInstance().getGL();
        if (this.clearColor) {
            gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a);
        }
    }
    public destroy() {
        // TODO
    }
    public apply() {
        // TODO
    }
};

export { PostProcess2 };
