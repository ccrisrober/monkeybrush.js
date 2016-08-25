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

export interface SamplerParams {
    minFilter?: number;
    magFilter?: number;
    wrapS?: number;
    wrapT?: number;
    wrapR?: number;
    minLOD?: number;
    maxLOD?: number;
    compareFunc?: number;
    compareMode?: number;
};
// TODO: Added this to textures
export class Sampler {
    public _handle: WebGLSampler;
    constructor() {
        this._handle = gl.createSampler();
    };
    public setParams(params: SamplerParams) {
        if (params.minFilter) {
            this.parameteri(gl.TEXTURE_MIN_FILTER, params.minFilter);
        }
        if (params.magFilter) {
            this.parameteri(gl.TEXTURE_MAG_FILTER, params.magFilter);
        }

        if (params.wrapS) {
            this.parameteri(gl.TEXTURE_WRAP_S, params.wrapS);
        }
        if (params.wrapT) {
            this.parameteri(gl.TEXTURE_WRAP_T, params.wrapT);
        }
        if (params.wrapR) {
            this.parameteri(gl.TEXTURE_WRAP_R, params.wrapR);
        }

        if (params.minLOD) {
            this.parameterf(gl.TEXTURE_MIN_LOD, params.minLOD);
        }
        if (params.maxLOD) {
            this.parameterf(gl.TEXTURE_MAX_LOD, params.maxLOD);
        }

        if (params.compareFunc) {
            this.parameteri(gl.TEXTURE_COMPARE_FUNC, params.compareFunc);
        }
        if (params.compareMode) {
            this.parameteri(gl.TEXTURE_COMPARE_MODE, params.compareMode);
        }
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

//export default Sampler;
