namespace MBS {
    export class Engine {
        public _scenes: Array<Scene> = [];
        protected _context: MB.GLContext;
        private _onFullScreenChange: () => void;
        get context(): MB.GLContext {
            return this._context;
        }
        public setViewport(vp: MB.Vector4<number>) {
            this._context.state.setViewport(vp)
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
            let self: Engine = this;
            MB.ResourceMap.setLoadCompleteCallback(function() {
                MB.Log.info("ALL RESOURCES LOADED!!!!");

                // Remove loader css3 window
                let spinner = document.getElementById("spinner");
                if (spinner) spinner.remove();

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
