class Context {
    static _gl: WebGLRenderingContext = null;
    static getContext(canvasName?: string) {
        if (!Context._gl) {
            let canvas;
            if (!canvasName) {
                canvas = document.createElement("canvas");
                canvas.width = 800;
                canvas.height = 800;

                document.body.appendChild(canvas);
            } else {
                canvas = <HTMLCanvasElement>document.getElementById(canvasName);
            }
            Context._gl = Context._getContext(canvas);
            if (!Context._gl) {
                document.write("<br><b>WebGL is not supported!</b>");

                throw new Error("WebGL is not supported!");
                // return;
            }
            Context._getVendors();
        }
        return Context._gl;
    }
    protected static _getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
        let contexts: string[] = "webgl2,experimental-webgl2".split(",");
        let gl: WebGLRenderingContext;
        let ctx;
        for (let i = 0; i < contexts.length; i++) {
            ctx = contexts[i];
            gl = <WebGLRenderingContext>canvas.getContext(contexts[i]);
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
            for (let i = 0; i < vendors.length; i++) {
                vendor = vendors[i];
                window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
                window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
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

export default Context;