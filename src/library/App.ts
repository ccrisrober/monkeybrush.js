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
/// <reference path="../typings/vanilla-toasts/vanilla-toasts.d.ts" />

namespace MB {
    export interface IApp {
        title?: string;
        webglVersion?: number;
        loadAssets: () => void;
        initialize: (app_: App) => void;
        update: (app_: App, dt: number) => void;
        draw: (app_: App, dt?: number) => void;
        cameraUpdate: () => void;
        textCB: (gui: dat.GUI) => void;
    }

    @Decorators.sealed
    export class App {

        protected stats: Stats;
        protected gui: dat.GUI;

        protected cameraUpdateCb;
        constructor(init: IApp, text: any) {
            if (!init.webglVersion) {
                init.webglVersion = 2;
            }
            this._appFunctions = init;
            console.log(this._appFunctions);
            // console.log(MB.core.Context.webglVersion);
            MB.core.Context.webglVersion = init.webglVersion;
            // console.log(MB.core.Context.webglVersion);
            MB.core.Core.getInstance();

            document.title = init.title || `WebGL${init.webglVersion} app`;

            this.__init__(text);
        };

        public webglVersion(): number {
            return this._appFunctions.webglVersion;
        }

        private __init__(text) {
            MB.core.Core.getInstance().initialize([1.0, 0.0, 1.0, 1.0]);

            this.gui = new dat.GUI();

            this._appFunctions.textCB(this.gui);

            let self = this;
            this.gui.add(text, "resume", true).onChange(function(v) {
                if (v === true) {
                   self.resume();
                } else {
                    self.pause();
                }
            });

            this.stats = new Stats();
            this.stats.setMode(0);
            this.stats.domElement.style.position = "absolute";
            this.stats.domElement.style.left = "0";
            this.stats.domElement.style.top = "0";
            document.body.appendChild(this.stats.domElement);

            this._appFunctions.loadAssets();
        }

        public start() {
            let self = this;
            MB.resources.ResourceMap.setLoadCompleteCallback(function() {
                console.log("ALL RESOURCES LOADED!!!!");

                self._appFunctions.initialize(self);

                // Remove loader css3 window
                document.getElementById("spinner").remove();

                /*MB.core.Core.getInstance().canvas().addEventListener("dblclick", function(){
                    var el: any = MB.core.Core.getInstance().canvas();

                    if (el.webkitRequestFullScreen) {
                        el.webkitRequestFullScreen();
                    }
                    else {
                        el.mozRequestFullScreen();
                    }
                });*/

                try {
                    (function __render__(dt?: number) {
                        requestAnimationFrame(__render__);
                        // console.log(dt);
                        MB.core.Input.update();

                        self.stats.begin();
                        dt *= 0.001; // convert to seconds

                        MB.extras.Timer.update();

                        // self.__resize__();

                        if (self._resume) {
                            self._appFunctions.update(self, dt);
                            self._appFunctions.draw(self, dt);    // Draw user function
                        }

                        self.stats.end();
                    })(0.0);
                } catch (e) {
                    VanillaToasts.create({
                        title: "Error:",
                        text: `${e}`,
                        type: "error"
                    });
                    throw e;
                }
            });
            return this;
        };

        public pause() {
            console.log("PAUSE");
            this._resume = false;
        };
        public resume() {
            console.log("RESUME");
            this._resume = true;
        };

        protected _resume: boolean = true;

        protected __resize__() {
            let canvas: HTMLCanvasElement = MB.core.Core.getInstance().canvas();
            let realToCSSPixels = window.devicePixelRatio || 1;

            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            let displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
            let displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

            // Check if the canvas is not the same size.
            if (canvas.width  !== displayWidth ||
                canvas.height !== displayHeight) {

                // Make the canvas the same size
                canvas.width  = displayWidth;
                canvas.height = displayHeight;

                // Set the viewport to match
                MB.core.Core.getInstance().changeViewport(0, 0, canvas.width, canvas.height);

                this.cameraUpdateCb();
            }
        }

        protected _appFunctions: IApp;
    };
}
