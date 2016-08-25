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

import Core from "../core/core";

"use strict";

const gl = Core.getInstance().getGL();

declare var WebGLTransformFeedback: any;

class TransformFeedback {
    protected _handle: WebGLTransformFeedback;
    constructor() {
        this._handle = (<any>gl).createTransformFeedback();
    };
    public destroy() {
        (<any>gl).deleteTransformFeedback(this._handle);
    };
    public bind(target: number) {
        (<any>gl).bindTranformFeedback(target, this._handle);
    };
    public unbind(target: number) {
        (<any>gl).bindTransformFeedback(target, null);
    };
    public begin(primitiveMode: number) {
        (<any>gl).beginTranformFeedback(primitiveMode);
    };
    public pause() {
        (<any>gl).pauseTranformFeedback();
    };
    public resume() {
        (<any>gl).resumeTransformFeedback();
    };
    public end() {
        (<any>gl).endTranformFeedback();
    };
    public varyings(program: number, varyings: Array<string>, bufferMode: number) {
        return (<any>gl).transformFeedbackVaryings(program, varyings, bufferMode);
    };
    public getVarying(program: number, idx: number) {
        return (<any>gl).getTransformFeedbackVarying(program, idx);
    };
    public isValid(): boolean {
        return (<any>gl).isTransformFeedback(this._handle);
    };
}

export default TransformFeedback;
