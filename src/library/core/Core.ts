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
    export namespace core {

        declare var WebGL2RenderingContext: any;

        /**
        * This class get WebGL context and animationFrame for your navigator.
        *
        * @class core.Core
        */
        export class Core {
            private static _instance: Core = null;

            private _gl: WebGL2RenderingContext;

            constructor() {
                Log.info("INIT CORE");
                if (Core._instance) {
                    throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
                }
                this._gl = Context.getContext();

                Core._instance = this;
            }

            public initialize(color: Array<number>) {
                const gl = this._gl;
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
                        MB.extras.Extensions.get(ext);
                    });
                    console.log("All WebGL1 extensions enabled");
                }

                this.init();
                GlobalState.initializeAll();
                GlobalState.setClearColor(color[0], color[1], color[2], color[3]);
            }

            public clearColorAndDepth() {
                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            }
            public changeViewport(x: number, y: number, w: number, h: number) {
                this._gl.viewport(x, y, w, h);
            }
            public canvas(): HTMLCanvasElement {
                return this._gl.canvas;
            }
            protected init() {
                Input.initialize();
                MB.extras.PostProcess.initialize();

                GlobalState.setDepthStatus(true);
                GlobalState.setDepthComparisonFunc(MB.ctes.ComparisonFunc.Less);

                GlobalState.setCullingStatus(true);
                GlobalState.setBlendingStatus(false);
            }

            public static getInstance(): Core {
                if (!Core._instance) {
                    Log.info("Creando core");
                    Core._instance = new Core();
                }
                return Core._instance;
            }

            /**
            * Return global WebGL context
            *
            * @method getGL
            * @return {WebGLRenderingContext} Returns WebGL rendering context
            */
            public getGL(): WebGL2RenderingContext {
                return this._gl;
            }
        };
    };
};
        