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


import { Core } from "./Core";
import { Program } from "./Program";
import { TFMode, TFPrimitive, TFTarget }
    from "../constants/Constants";

"use strict";

class TransformFeedback {
    protected _handle: WebGLTransformFeedback;
    /**
     * Create and initializes a TransformFeedback object
     */
    constructor() {
        const gl = Core.getInstance().getGL();
        this._handle = gl.createTransformFeedback();
    };
    /**
     * Delete TransformFeedback object.
     */
    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteTransformFeedback(this._handle);
        this._handle = null;
    };
    /**
     * Bind this TransformFeedback object to current GL state.
     */
    public bind() {
        const gl = Core.getInstance().getGL();
        gl.bindTransformFeedback(TFTarget.TransformFeedback, this._handle);
    };
    /**
     * Unbind this TransformFeedback object to current GL state.
     */
    public unbind() {
        const gl = Core.getInstance().getGL();
        gl.bindTransformFeedback(TFTarget.TransformFeedback, null);
    };
    /**
     * Start TransformFeedback operation using given mode.
     * @param {TFPrimitive} mode TransformFeedback mode.
     */
    public begin(mode: TFPrimitive) {
        const gl = Core.getInstance().getGL();
        gl.beginTransformFeedback(mode);
    };
    /**
     * Start TransformFeedback operation using point mode.
     */
    public beginPoints() {
        this.begin(TFPrimitive.Points);
    };
    /**
     * Start TransformFeedback operation using line mode.
     */
    public beginLines() {
        this.begin(TFPrimitive.Lines);
    };
    /**
     * Start TransformFeedback operation using triangle mode.
     */
    public beginTriangles() {
        this.begin(TFPrimitive.Triangles);
    };
    /**
     * End TransformFeedback operation.
     */
    public end() {
        const gl = Core.getInstance().getGL();
        gl.endTransformFeedback();
    };
    /**
     * Pause TransformFeedback operation.
     */
    public pause() {
        const gl = Core.getInstance().getGL();
        gl.pauseTransformFeedback();
    };
    /**
     * Resume TransformFeedback operation.
     */
    public resume() {
        const gl = Core.getInstance().getGL();
        gl.resumeTransformFeedback();
    };
    /**
     * Specifies values to record in TransformFeedback buffers.
     * @param {Program}       Program    [description]
     * @param {Array<string>} varyings   [description]
     * @param {TFMode}        bufferMode [description]
     */
    public static varyings(Program: Program, varyings: Array<string>,
        bufferMode: TFMode) {

        const gl = Core.getInstance().getGL();
        gl.transformFeedbackVaryings(Program.id(), varyings, bufferMode);
    };
    /**
     * Return information about varying variables specifies in the previous
     *     call to "varyings" method.
     * @param  {Program}         Program [description]
     * @param  {number}          idx     [description]
     * @return {WebGLActiveInfo}         [description]
     */
    public getVarying(Program: Program, idx: number): WebGLActiveInfo {
        const gl = Core.getInstance().getGL();
        return gl.getTransformFeedbackVarying(Program.id(), idx);
    };
    /**
     * Return true if this object is a valid TransformFeedback object.
     * @return {boolean} [description]
     */
    public isValid(): boolean {
        const gl = Core.getInstance().getGL();
        return gl.isTransformFeedback(this._handle);
    };
}

export { TransformFeedback };
