namespace MB {
    export interface ContextParams {
       alpha?: boolean;
       antialias?: boolean;
       depth?: boolean;
       stencil?: boolean;
       premultipliedAlpha?: boolean;
    };
    export abstract class GLContext {
        protected _canvas: HTMLCanvasElement;
        protected _gl: WebGL2RenderingContext;
        protected _state: GlobalState;
        protected _version: number;
        public get version(): number {
            return this._version;
        };

        constructor(canvas: HTMLCanvasElement) {
            if (!canvas) {
                Log.info("Not canvas. Create one ...");
                canvas = <HTMLCanvasElement>document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                canvas.width = 800;
                canvas.height = 800;
                document.body.appendChild(canvas);
            }
            this._canvas = canvas;
        }
        protected _init(glVersion: string, numVersion: number, params: ContextParams = {}) {
            params.antialias = params.antialias || false;
            let contexts: string[] = [
                glVersion,
                `experimental-${glVersion}`
            ];
            this._gl = null;
            let ctx;
            for (let i = 0; i < contexts.length; ++i) {
                ctx = contexts[i];
                this._gl = <WebGL2RenderingContext>this._canvas.getContext(contexts[i], params);
                if (this._gl) {
                    break;
                }
            }
            if (this._gl === null) {
                let domElement = document.createElement("div");

                domElement.style.fontFamily = "monospace";
                domElement.style.fontSize = "13px";
                domElement.style.textAlign = "center";
                domElement.style.background = "#eee";
                domElement.style.color = "#000";
                domElement.style.padding = "1em";
                domElement.style.width = "475px";
                domElement.style.margin = "5em auto 0";
                domElement.innerHTML = window["WebGLRenderingContext"] ?
                    `Sorry, your graphics card doesn\'t support
                    <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>`
                :
                    `Sorry, your browser doesn\'t support
                    <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a><br/>
                    Please try with
                    <a href="http://www.google.com/chrome">Chrome</a>,
                    <a href="http://www.mozilla.com/en-US/firefox/new/">Firefox 4</a> or
                    <a href="http://nightly.webkit.org/">Webkit Nightly (Mac)</a>`;
                document.appendChild(domElement);
                throw new Error("WebGL is not supported!");
            } else {
                this._version = numVersion;
                this._getVendors();

                this._state = new GlobalState(this);
                Log.info("WebGL2RenderingContext OK :)");
            }
        };
        get gl(): WebGL2RenderingContext {
            return this._gl;
        };
        get canvas(): HTMLCanvasElement {
            return this._canvas;
        };
        get state(): GlobalState {
            return this._state;
        };
        protected _getVendors() {
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
        };
    }
}
