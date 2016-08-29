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
/// <reference path="../core/program.ts" />
/// <reference path="../constants/TransfFeedCte.ts" />

import { Core } from "../core/core";
import { Program } from "../core/program";
import { TransfFeedCte } from "../constants/TransfFeedCte";

"use strict";

const gl = Core.getInstance().getGL();

class TransformFeedback {
    protected _handle: WebGLTransformFeedback;
    constructor() {
        this._handle = gl.createTransformFeedback();
    };
    public destroy() {
        gl.deleteTransformFeedback(this._handle);
    };
    public bind() {
        gl.bindTransformFeedback(TransfFeedCte.Normal, this._handle);
    };
    public unbind() {
        gl.bindTransformFeedback(TransfFeedCte.Normal, null);
    };
    public begin(primitiveMode: number) {
        gl.beginTransformFeedback(primitiveMode);
    };
    public pause() {
        gl.pauseTransformFeedback();
    };
    public resume() {
        gl.resumeTransformFeedback();
    };
    public end() {
        gl.endTransformFeedback();
    };
    public varyings(program: Program, varyings: Array<string>, bufferMode: number) {
        return gl.transformFeedbackVaryings(program.id(), varyings, bufferMode);
    };
    public getVarying(program: Program, idx: number) {
        return gl.getTransformFeedbackVarying(program.id(), idx);
    };
    public isValid(): boolean {
        return gl.isTransformFeedback(this._handle);
    };
}

export default TransformFeedback;
