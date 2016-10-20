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

namespace MBS {
    export class Engine {
        public _scenes: Array<Scene> = [];
        protected _context: MB.GLContext;
        private _onFullScreenChange: () => void;
        get context(): MB.GLContext {
            return this._context;
        }
        public setViewport(vp: MB.Vector4<number>) {
            this._context.state.setViewport(vp);
        }
        constructor(context: MB.GLContext, options = {}) {
            this._context = context;
            MB.Input.initialize();
            // TODO: Cache VENDOOR and RENDERER
            /*this._onFullScreenChange = function() {
                if (document["fullscreen"] !== undefined) {
                    this.isFullscreen = document["fullscreen"];
                } else if (document["mozFullScreen"] !== undefined) {
                    this.isFullscreen = document["mozFullScreen"];
                } else if (document["webkitIsFullScreen"] !== undefined) {
                    this.isFullscreen = document["webkitIsFullScreen"];
                } else if (document["msIsFullScreen"] !== undefined) {
                    this.isFullscreen = document["msIsFullScreen"];
                }

                // Pointer lock
                if (this.isFullscreen && this._pointerLockRequested) {
                    this._context.canvas.requestPointerLock = this._context.canvas.requestPointerLock ||
                        this._context.canvas.msRequestPointerLock ||
                        this._context.canvas.mozRequestPointerLock ||
                        this._context.canvas.webkitRequestPointerLock;

                    if (this._context.canvas.requestPointerLock) {
                        this._context.canvas.requestPointerLock();
                    }
                }
            }

            document.addEventListener("fullscreenchange", this._onFullScreenChange, false);
            document.addEventListener("mozfullscreenchange", this._onFullScreenChange, false);
            document.addEventListener("webkitfullscreenchange", this._onFullScreenChange, false);
            document.addEventListener("msfullscreenchange", this._onFullScreenChange, false);*/
        }
        public run(loop: Function) {
            MB.ResourceMap.setLoadCompleteCallback(function() {
                try {
                    (function __render__(dt?: number) {
                        requestAnimationFrame(__render__);
                        MB.Input.update();

                        dt *= 0.001; // convert to seconds

                        MB.Timer.update();

                        loop(dt);
                    })(0.0);
                } catch (e) {
                    MB.Log.error({
                        title: "Error:",
                        text: `${e}`,
                        type: "error"
                    });
                    throw e;
                }
            });
        }
    }
}
