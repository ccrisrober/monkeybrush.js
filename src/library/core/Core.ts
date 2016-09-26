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

    declare var WebGL2RenderingContext: any;

    /**
    * This class get WebGL context and animationFrame for your navigator.
    *
    * @class core.Core
    */
    export class Core {
        private static _instance: Core = null;
        private _gl: WebGL2RenderingContext;
        public static _context: GLContext;
        protected static _state: GlobalState;

        constructor() {
            Log.info("INIT CORE");
            if (Core._instance) {
                throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
            }
            this._gl = Core._context.gl;
            Core._state = Core._context.state;

            Core._instance = this;
        };
        public initialize(color: Array<number> /* TODO: COLOR UNUSED */) {
            Input.initialize();
            MB.PostProcess.initialize();

            Core._state.depth.setStatus(true);
            Core._state.depth.setFunc(ctes.ComparisonFunc.Less);

            Core._state.culling.setStatus(true);
            Core._state.blending.setStatus(false);
        };
        public clearColorAndDepth() {
            Core._state.clearBuffers();
        };
        public canvas(): HTMLCanvasElement {
            return this._gl.canvas;
        };
        public get state(): GlobalState {
            return Core._state;
        };
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
