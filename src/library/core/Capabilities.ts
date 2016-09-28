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
    /**
     * Capabilities namespace
     * @namespace Capabilities
     */
    export namespace Capabilities {
        let _capabilities = {};

        /**
         * Returns the maximum anisotropy value from current WebGL implementation.
         * @param {GLContext} context [description]
         * @return {number} Maximum anisotropy value.
         */
        export function getMaxAnisotropy(context: GLContext): number {
            if (!_capabilities["anisotropy"]) {
                const gl: WebGL2RenderingContext = context.gl;
                const ext = Extensions.get(context, "EXT_texture_filter_anisotropic");
                _capabilities["anisotropy"] = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 0;
            }
            return _capabilities["anisotropy"];
        };
        /**
         * Returns the maximum number of textures permitted.
         * @param {GLContext} context [description]
         * @return {number} Maximum textures permitted.
         */
        export function getMaxTextures(context: GLContext): number {
            if (!_capabilities["maxTextures"]) {
                const gl: WebGL2RenderingContext = context.gl;
                _capabilities["maxTextures"] = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            }
            return _capabilities["maxTextures"];
        };
        /**
         * Returns the maximum vertex textures permitted.
         * @param {GLContext} context [description]
         * @return {number} Maximum vertex textures permitted.
         */
        export function getMaxVertexTextures(context: GLContext): number {
            if (!_capabilities["maxVertexTextures"]) {
                const gl: WebGL2RenderingContext = context.gl;
                _capabilities["maxVertexTextures"] = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
            }
            return _capabilities["maxVertexTextures"];
        };
        /**
         * Returns the maximum texture size permitted.
         * @param {GLContext} context [description]
         * @return {number} Maximum textures permitted.
         */
        export function getMaxTextureSize(context: GLContext): number {
            if (!_capabilities["maxTextureSize"]) {
                const gl: WebGL2RenderingContext = context.gl;
                _capabilities["maxTextureSize"] = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            }
            return _capabilities["maxTextureSize"];
        };
        /**
         * Returns the maximum cubemap texture size permitted.
         * @param {GLContext} context [description]
         * @return {number} Maximum cubemap texture size permitted.
         */
        export function getMaxCubemapSize(context: GLContext): number {
            if (!_capabilities["maxCubemapSize"]) {
                const gl: WebGL2RenderingContext = context.gl;
                _capabilities["maxCubemapSize"] = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
            }
            return _capabilities["maxCubemapSize"];
        };
        /**
         * Returns WebGL shading precision.
         * @param {GLContext} context [description]
         * @return {string}
         */
        export function getMaxPrecision(context: GLContext): string {
            const gl: WebGL2RenderingContext = context.gl;
            if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 &&
                 gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
                return "highp";
            }
            else if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 &&
                gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
                return "mediump";
            }
            return "lowp";
        };
        /**
         * Returns the maximum draw buffers permitted.
         * @param {GLContext} context [description]
         * @return {number} Maximum draw buffers permitted.
         */
        export function getMaxDrawBuffers(context: GLContext): number {
            if (!_capabilities["maxDrawBuffers"]) {
                const gl: WebGL2RenderingContext = context.gl;
                _capabilities["maxDrawBuffers"] = gl.getParameter(gl.MAX_DRAW_BUFFERS);
            }
            return _capabilities["maxDrawBuffers"];
        };
        /**
         * Returns the maximum color attachment permitted.
         * @param {GLContext} context [description]
         * @return {number} Maximum color attachment permitted.
         */
        export function getMaxColorAttachments(context: GLContext): number {
            if (!_capabilities["maxColorAttachments"]) {
                const gl: WebGL2RenderingContext = context.gl;
                _capabilities["maxColorAttachments"] = gl.getParameter(gl.MAX_COLOR_ATTACHMENTS);
            }
            return _capabilities["maxColorAttachments"];
        };
        declare var WebGL2RenderingContext: any;
        /**
         * Returns if current context supports FLOAT textures.
         * @param {GLContext} context [description]
         * @return {boolean}
         */
        export function isTextureFloat(context: GLContext): boolean {
            const gl = context.gl;
            if (gl instanceof WebGL2RenderingContext) {
                return true;
            } else {
                return !!Extensions.get(context, "OES_texture_float");
            }
        };
        /**
        TODO
        var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true
            && !! extensions.get('EXT_frag_depth');


        MAX_COMBINED_TEXTURE_IMAGE_UNITS
        MAX_VERTEX_TEXTURE_IMAGE_UNITS
        MAX_TEXTURE_IMAGE_UNITS
        MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
        MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
        MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
        MAX_CLIENT_WAIT_TIMEOUT_WEBGL
         */
    };
};

