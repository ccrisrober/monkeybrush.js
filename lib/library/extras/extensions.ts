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

import { Core } from "../core/core";

"use strict";

const gl = Core.getInstance().getGL();

namespace extensions {
    /**
     * [_extensions description]
     * @type {Object}
     */
    let _extensions = {};
    /**
     * [get description]
     * @param {string} name [description]
     */
    export function get(name: string) {
        if (name in _extensions) {
            return _extensions[name];
        }
        let ext = gl.getExtension(name) || gl.getExtension("WEBKIT_" + name) || gl.getExtension("MOZ_" + name);

        if (ext === null) {
            console.warn(name + " extension not supported.");
            return;
        }
        _extensions[name] = ext;
        return ext;
    }
};

export { extensions };

// const ext = gl_.getExtension("OES_draw_buffers_indexed");
// console.log(ext);

/*let arr = [
    'OES_element_index_uint',
    'EXT_sRGB',
    'EXT_blend_minmax',
    'EXT_frag_depth',
    'WEBGL_depth_texture',
    'WEBKIT_WEBGL_depth_texture',
    'EXT_shader_texture_lod',
    'OES_standard_derivatives',
    'OES_texture_float',
    'OES_texture_half_float',
    'OES_texture_half_float_linear',
    'OES_vertex_array_object',
    'WEBGL_draw_buffers',
    'OES_fbo_render_mipmap',
    'ANGLE_instanced_arrays'
];

arr.forEach((v: string) => {
    console.log(v);
    console.log(gl_.getExtension(v));
});*/
