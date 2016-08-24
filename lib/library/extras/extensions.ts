/// <reference path="../core/core.ts" />

import Core from "../core/core";

"use strict";

const gl = Core.getInstance().getGL();

// TODO: UNUSED
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

export default extensions;

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
