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

class Sampler {
    protected _handle: WebGLSampler;
    constructor() {
        this._handle = gl.createSampler();
    };
    /**
     * [bind description]
     * @param {number} unit: Specifying the index of the texture
     *                       to which to bind the sampler
     */
    public bind(unit: number) {
        gl.bindSampler(unit, this._handle);
    };
    public unbind(unit: number) {
        gl.bindSampler(unit, null);
    };
    public parameteri(name: number, param: number) {
        gl.samplerParameteri(this._handle, name, param);
    };
    public parameterf(name: number, param: number) {
        gl.samplerParameterf(this._handle, name, param);
    };
    public getParameter(name: number) {
        return gl.getSamplerParameter(this._handle, name);
    };
    public destroy() {
        gl.deleteSampler(this._handle);
    };
    public isValid(): boolean {
        return gl.isSampler(this._handle);
    };
};

export default Sampler;
