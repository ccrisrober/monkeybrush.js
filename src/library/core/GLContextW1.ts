namespace MB {
    declare var WebGL2RenderingContext: any;
    export class GLContextW1 extends GLContext {
        constructor(canvas: HTMLCanvasElement, params: ContextParams = {}) {
            super(canvas);
            this._init("webgl", 1, params);
            // const gl = this._gl;
            // gl.getParameter(gl.VERSION)
            // Load all extensions if WebGLRenderingContext === 1
            if (!(this._gl instanceof WebGL2RenderingContext)) {
                [
                    "OES_element_index_uint",
                    "EXT_sRGB",
                    "EXT_blend_minmax",
                    "EXT_frag_depth",
                    "WEBGL_depth_texture",
                    "WEBKIT_WEBGL_depth_texture",
                    "EXT_shader_texture_lod",
                    "OES_standard_derivatives",
                    "OES_texture_float",
                    "OES_texture_half_float",
                    "OES_texture_half_float_linear",
                    "OES_vertex_array_object",
                    "WEBGL_draw_buffers",
                    "OES_fbo_render_mipmap",
                    "ANGLE_instanced_arrays"
                ].forEach((ext: string) => {
                    MB.Extensions.get(this, ext);
                });
                MB.Log.info("All WebGL1 extensions enabled");
            }
        }
    }
}
