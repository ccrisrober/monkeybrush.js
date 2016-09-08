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


import { Core } from "../core/Core";
import { Program } from "../core/Program";

"use strict";

enum TFMode {
    Interleaved = 0x8C8C,
    Separate = 0x8C8D
};

enum TFPrimitiveType {
    Points = 0x0000,
    Lines = 0x0001,
    Triangles = 0x0004
};

enum TFTarget {
    TransformFeedback = 0x8E22
}

class TransformFeedback {
    protected _handle: WebGLTransformFeedback;
    constructor() {
        const gl = Core.getInstance().getGL();
        this._handle = gl.createTransformFeedback();
    }
    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteTransformFeedback(this._handle);
        this._handle = null;
    }
    public bind() {
        const gl = Core.getInstance().getGL();
        gl.bindTransformFeedback(TFTarget.TransformFeedback, this._handle);
    };
    public unbind() {
        const gl = Core.getInstance().getGL();
        gl.bindTransformFeedback(TFTarget.TransformFeedback, null);
    };
    public begin(mode: TFPrimitiveType) {
        const gl = Core.getInstance().getGL();
        gl.beginTransformFeedback(mode);
    };
    public beginPoints() {
        this.begin(TFPrimitiveType.Points);
    };
    public beginLines() {
        this.begin(TFPrimitiveType.Lines);
    };
    public beginTriangles() {
        this.begin(TFPrimitiveType.Triangles);
    };
    public end() {
        const gl = Core.getInstance().getGL();
        gl.endTransformFeedback();
    };
    public pause() {
        const gl = Core.getInstance().getGL();
        gl.pauseTransformFeedback();
    };
    public resume() {
        const gl = Core.getInstance().getGL();
        gl.resumeTransformFeedback();
    };
    public static varyings(Program: Program, varyings: Array<string>, bufferMode: TFMode) {
        const gl = Core.getInstance().getGL();
        gl.transformFeedbackVaryings(Program.id(), varyings, bufferMode);
    };
    public getVarying(Program: Program, idx: number): WebGLActiveInfo {
        const gl = Core.getInstance().getGL();
        return gl.getTransformFeedbackVarying(Program.id(), idx);
    };
    public isValid(): boolean {
        const gl = Core.getInstance().getGL();
        return gl.isTransformFeedback(this._handle);
    };
}

export { TFMode, TFPrimitiveType, TFTarget, TransformFeedback };
