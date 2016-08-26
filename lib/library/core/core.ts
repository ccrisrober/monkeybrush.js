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


/// <reference path="input.ts" />
/// <reference path="context.ts" />
/// <reference path="../constants/_constants.ts" />

import Context from "./context";
import Input from "./input";

"use strict";
/**
* This class get WebGL2 context and animationFrame for your navigator.
*
* @class core.Core
*/
class Core {
    private static _instance: Core = new Core();

    private _gl: WebGL2RenderingContext;

    constructor() {
        if (Core._instance) {
            throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
        }
        this._gl = Context.getContext();

        Input.getInstance();

        Core._instance = this;
    }

    public initialize(color: Array<number>) {
        const gl = this._gl;
        this.init();
        // ToneMap.init(gl);
        gl.clearColor(color[0], color[1], color[2], color[3]);
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
        Depth.enable();
        Depth.comparison(ComparisonFunc.Less);

        // Set images to flip y axis to match the texture coordinate space.
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

        Cull.disable();
        Blend.disable();
    }

    public static getInstance(): Core {
        if (!Core._instance) {
            console.log("Creando core");
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
Context.getContext();
Core.getInstance();

import Depth from "./depth";
import Cull from "./cull";
import Blend from "./blend";

import ComparisonFunc from "../constants/ComparisonFunc";

export default Core;
