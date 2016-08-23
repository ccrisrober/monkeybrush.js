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

    private _gl: WebGLRenderingContext;

    constructor() {
        if (Core._instance) {
            throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
        }
        this._gl = Context.getContext();
        
        Input.getInstance();

        console.log("GL OBTAINED");

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
        const gl = this._gl;

        Depth.enable();
        Depth.comparison(ComparisonFunc.Less);

        // Set images to flip y axis to match the texture coordinate space.
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

        Cull.enable();
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
    public getGL(): WebGLRenderingContext {
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
