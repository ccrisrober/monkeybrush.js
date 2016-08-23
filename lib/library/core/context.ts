class Context {
    static _gl: WebGLRenderingContext = null;
    static _canvas: HTMLCanvasElement = null;
    static getContext(canvasName?: string): WebGLRenderingContext {
        if (!Context._gl) {
            if (!canvasName) {
                this._canvas = document.createElement("canvas");
                this._canvas.width = 800;
                this._canvas.height = 800;

                document.body.appendChild(this._canvas);
            } else {
                this._canvas = <HTMLCanvasElement>document.getElementById(canvasName);
            }
            Context._gl = Context._getContext(this._canvas);
            if (!Context._gl) {
                document.write("<br><b>WebGL is not supported!</b>");
                throw new Error("WebGL is not supported!");
            }
            Context._getVendors();
        }
        return Context._gl;
    }
    protected static _getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
        let contexts: string[] = "webgl,webgl2,experimental-webgl2".split(",");
        let gl: WebGLRenderingContext;
        let ctx;
        for (let i = 0; i < contexts.length; ++i) {
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
            for (let i = 0; i < vendors.length; ++i) {
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