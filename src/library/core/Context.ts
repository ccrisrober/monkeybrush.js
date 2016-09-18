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
/// <reference path="../../typings/webgl2.d.ts" />

namespace MB {

    declare var WebGL2RenderingContext: any;

    // TODO: in getContext, check antialias or anothers params
    /**
     * alpha: Boolean that indicates if the canvas contains an alpha buffer.
     * depth: Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.
     * stencil: Boolean that indicates that the drawing buffer has a stencil buffer of at least 8 bits.
     * antialias: Boolean that indicates whether or not to perform anti-aliasing.
     * premultipliedAlpha: Boolean that indicates that the page compositor will assume the drawing
     *         buffer contains colors with pre-multiplied alpha.
     * preserveDrawingBuffer: If the value is true the buffers will not be cleared and will preserve
     *         their values until cleared or overwritten by the author.
     * failIfMajorPerformanceCaveat: Boolean that indicates if a context will be created if the system
     *         performance is low.
     */
    // TODO: WebGL isn't supported alert
    export class Context {
        static _gl: WebGL2RenderingContext = null;
        static _canvas: HTMLCanvasElement = null;

        public static webglVersion: number = 0;

        static getContext(canvasName?: string): WebGL2RenderingContext {
            if (Context.webglVersion === 0) {
                return;
            }
            if (!Context._gl) {
                if (!canvasName) {
                    Log.info("Not canvas. Create one ...");
                    this._canvas = document.createElement("canvas");
                    this._canvas.width = 800;
                    this._canvas.height = 800;

                    document.body.appendChild(this._canvas);
                } else {
                    this._canvas = <HTMLCanvasElement>document.createElementNS(
                        "http://www.w3.org/1999/xhtml", canvasName);
                }
                Log.info("Get context");
                Context._gl = Context._getContext(this._canvas);
                if (!Context._gl) {
                    document.write("<br><b>WebGL is not supported!</b>");
                    throw new Error("WebGL is not supported!");
                }
                Log.info("WebGL2RenderingContext OK :)");
                Context._getVendors();
            }
            return Context._gl;
        }
        protected static _getContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
            let contexts: string[];
            if (Context.webglVersion === 1) {
                contexts = "webgl,experimental-webgl".split(",");
            } else {
                contexts = "webgl2,experimental-webgl2".split(",");
            }
            let gl: WebGL2RenderingContext;
            let ctx;
            for (let i = 0; i < contexts.length; ++i) {
                ctx = contexts[i];
                gl = <WebGL2RenderingContext>canvas.getContext(contexts[i], {
                    antialias: false
                });
                if (gl) {
                    return gl;
                }
            }
            return null;
        }
        protected static _getVendors() {
            let vendors: string[] = "ms,moz,webkit,o".split(",");
            if (!window.requestAnimationFrame) {
                let vendor;
                for (let i = 0; i < vendors.length; ++i) {
                    vendor = vendors[i];
                    window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
                    window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] ||
                        window[vendor + "CancelRequestAnimationFrame"];
                    if (window.requestAnimationFrame) {
                        break;
                    }
                }
            }
            // Manual fallback
            if (!window.requestAnimationFrame) {
                let lastTime = 0;
                window.requestAnimationFrame = function(cb) {
                    const currTime = Date.now();
                    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    const id = window.setTimeout(function() {
                        cb(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }

            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            };
        }
    };
};
