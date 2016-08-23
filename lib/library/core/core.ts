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
        //  var canvas = <HTMLCanvasElement>document.getElementById("canvas");
        // let canvas = document.createElement("canvas");
        // canvas.width = 800;
        // canvas.height = 800;
        // 
        // document.body.appendChild(canvas);
        // 
        // this._gl = this._getContext(canvas);
        // if (!this._gl) {
        //     document.write("<br><b>WebGL is not supported!</b>");
        //     return;
        // }
        // this._getVendors();

        Input.getInstance();
        // this.init();

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

    // protected _getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
    //     let contexts: string[] = "webgl2,experimental-webgl2".split(",");
    //     let gl: WebGLRenderingContext;
    //     let ctx;
    //     for (let i = 0; i < contexts.length; i++) {
    //         ctx = contexts[i];
    //         gl = <WebGLRenderingContext>canvas.getContext(contexts[i]);
    //         if (gl) {
    //             return gl;
    //         }
    //     }
    //     return null;
    // }
    // private _getVendors() {
    //     let vendors: string[] = "ms,moz,webkit,o".split(",");
    //     if (!window.requestAnimationFrame) {
    //         let vendor;
    //         for (let i = 0; i < vendors.length; i++) {
    //             vendor = vendors[i];
    //             window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
    //             window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
    //             if (window.requestAnimationFrame) {
    //                 break;
    //             }
    //         }
    //     }
    //     // Manual fallback
    //     if (!window.requestAnimationFrame) {
    //         let lastTime = 0;
    //         window.requestAnimationFrame = function(cb) {
    //             const currTime = Date.now();
    //             const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    //             const id = window.setTimeout(function() {
    //                 cb(currTime + timeToCall);
    //             }, timeToCall);
    //             lastTime = currTime + timeToCall;
    //             return id;
    //         };
    //     }
    // 
    //     if (!window.cancelAnimationFrame) {
    //         window.cancelAnimationFrame = function(id) {
    //             clearTimeout(id);
    //         };
    //     };
    // }
};
// Context.getContext();
// Core.getInstance();

import Depth from "./depth";
import Cull from "./cull";
import Blend from "./blend";

import ComparisonFunc from "../constants/ComparisonFunc";

export default Core;
