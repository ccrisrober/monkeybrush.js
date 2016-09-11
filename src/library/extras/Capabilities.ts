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
import { Extensions } from "./Extensions";

"use strict";


/**
 * Capabilities namespace
 * @namespace Capabilities
 */
namespace Capabilities {
    let _capabilities = {};

    /**
     * Return the maximum anisotropy value from current WebGL implementation
     * @return {number} Maximum anisotropy value
     */
    export function getMaxAnisotropy(): number {
        if (!_capabilities["anisotropy"]) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            const ext = Extensions.get("EXT_texture_filter_anisotropic");
            _capabilities["anisotropy"] = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 0;
        }
        return _capabilities["anisotropy"];
    };
    /**
     * Returns the maximum number of textures permitted
     * @return {number} Maximum textures permitted
     */
    export function getMaxTextures(): number {
        if (!_capabilities["maxTextures"]) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            _capabilities["maxTextures"] = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        }
        return _capabilities["maxTextures"];
    };
    export function getMaxVertexTextures(): number {
        if (!_capabilities["maxVertexTextures"]) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            _capabilities["maxVertexTextures"] = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
        }
        return _capabilities["maxVertexTextures"];
    };
    export function getMaxTextureSize(): number {
        if (!_capabilities["maxTextureSize"]) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            _capabilities["maxTextureSize"] = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        }
        return _capabilities["maxTextureSize"];
    };
    export function getMaxCubemapSize(): number {
        if (!_capabilities["maxCubemapSize"]) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            _capabilities["maxCubemapSize"] = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        }
        return _capabilities["maxCubemapSize"];
    }
    export function getMaxPrecision(): string {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
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
    var logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true && !! extensions.get('EXT_frag_depth');
    var maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    var maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    var maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
    var maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);

    var vertexTextures = maxVertexTextures > 0;
    var floatFragmentTextures = !! extensions.get('OES_texture_float');
    var floatVertexTextures = vertexTextures && floatFragmentTextures;



    MAX_COMBINED_TEXTURE_IMAGE_UNITS
    MAX_VERTEX_TEXTURE_IMAGE_UNITS
    MAX_TEXTURE_IMAGE_UNITS
    MAX_DRAW_BUFFERS
    MAX_COLOR_ATTACHMENTS
    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
    MAX_CLIENT_WAIT_TIMEOUT_WEBGL
     */
};

export { Capabilities };
