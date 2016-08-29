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


/// <reference path="../core/core.ts" />
/// <reference path="../maths/vector2.ts" />

// TODO: hacer unbind al crear textura!!

import { Core } from "../core/core";
import { Vect2 } from "../maths/vect2";

"use strict";

declare var WebGL2RenderingContext: any;

abstract class Texture {
    protected _handle: WebGLTexture;
    protected _target: number;
    constructor(target: number) {
        this._target = target;
    }
    get target(): number { return this._target; }
    abstract destroy(): void;

    abstract bind(slot?: number);
    abstract unbind();

    public handle(): WebGLTexture {
        return this._handle;
    }

    public resize(size: Vect2) {
        // Nothing to do here
    }

    public setLOD(lod: number) {
        const gl = Core.getInstance().getGL();
        if (gl instanceof WebGL2RenderingContext) {
            gl.texParameterf(this._target, gl.TEXTURE_MIN_LOD, lod);
            gl.texParameterf(this._target, gl.TEXTURE_MAX_LOD, lod);
        } else {
            console.log("TEXTURE LOD isn´t supported");
        }
    }
    public generateMipMap() {
        const gl = Core.getInstance().getGL();
        this.bind();
        gl.generateMipmap(this._target);
    }

    // TODO: Move to abstract methods
    public getHeight(): number { return -1; }
    public getWidth(): number { return -1; }
};

export { Texture };
