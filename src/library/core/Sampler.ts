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
        anisotropic?: number;     // TODO ext.TEXTURE_MAX_ANISOTROPY_EXT
                                  //     (EXT_texture_filter_anisotropic)
        maxLevel?: number;        // TODO gl.TEXTURE_MAX_LEVEL
        baseLevel?: number;       // TODO gl.TEXTURE_BASE_LEVEL
    };
    /**
     * Sampler class.
     * @class Sampler
     *
     * Sampler Object are objects that stores the sampling
     *     parameters for a Texture access inside of a shader.
     */
    // TODO: Added this to textures
    export class Sampler {
        public _handler: WebGLSampler;
        constructor() {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            this._handler = gl.createSampler();
        };
        /**
         * Set a list of texture parameters (filters, wraps, LOD, ...).
         * @param {SamplerParams} params SamplerParams interface.
         */
        public setParams(params: SamplerParams) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
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
         * Bind (active) sampler.
         * @param {number} unit Specifying the index of the texture
         *                       to which to bind the sampler.
         */
        public bind(unit: number) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.bindSampler(unit, this._handler);
        };
        /**
         * Unbind (disable) sampler.
         * @param {number} unit Specifying the index of the texture
         *                       to which to unbind the sampler.
         */
        public unbind(unit: number) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.bindSampler(unit, null);
        };
        /**
         * Set a unique texture parameter.
         * @param {ctes.SamplerParameter} name  Parameter name.
         * @param {number} param Parameter value.
         */
        public parameteri(name: ctes.SamplerParameter, param: number) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.samplerParameteri(this._handler, name, param);
        };
        /**
         * Set a unique texture parameter.
         * @param {ctes.SamplerParameter} name  Parameter name.
         * @param {number} param Parameter value.
         */
        public parameterf(name: ctes.SamplerParameter, param: number) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.samplerParameterf(this._handler, name, param);
        };
        /**
         * Return parameter for this sampler object.
         * @param {ctes.SamplerParameter} name  Parameter name.
         */
        public getParameter(name: ctes.SamplerParameter) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getSamplerParameter(this._handler, name);
        };
        /**
         * Destroy sampler object.
         */
        public destroy() {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.deleteSampler(this._handler);
        };
        /**
         * Return if this sampler is a valid sampler.
         * @return {boolean}
         */
        public isValid(): boolean {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.isSampler(this._handler);
        };
    };
};
