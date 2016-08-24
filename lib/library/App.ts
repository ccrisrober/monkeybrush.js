/// <reference path="core/core.ts" />
/// <reference path="core/input.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="extras/timer.ts" />
/// <reference path="../typings/vanilla-toasts/vanilla-toasts.d.ts" />

import Core from "./core/core";
import Input from "./core/input";
import ResourceMap from "./resources/resourceMap";
import Timer from "./extras/timer";

"use strict";

interface IApp {
    loadAssets: () => void;
    initialize: () => void;
    draw: (dt) => void;
    cameraUpdate: () => void;
    textCB: (gui: dat.GUI) => void;
}

class App {

    protected stats: Stats;
    protected gui: dat.GUI;

    protected cameraUpdateCb;
    constructor(init: IApp, text: any) {
        this._appFunctions = init;
        console.log(this._appFunctions);
        this.__init__(text);
    };

    private __init__(text) {
        Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);

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
        document.body.appendChild(this.stats.domElement);

        this._appFunctions.loadAssets();
    }

    public start() {
        let self = this;
        ResourceMap.setLoadCompleteCallback(function() {
            console.log("ALL RESOURCES LOADED!!!!");

            self._appFunctions.initialize();

            // Remove loader css3 window
            document.getElementById("spinner").remove();
            try {
                (function __render__(dt?: number) {
                    // console.log(dt);
                    Input.getInstance().update();

                    self.stats.begin();
                    dt *= 0.001; // convert to seconds

                    Timer.update();

                    // self.__resize__();

                    if (self._resume) {
                        self._appFunctions.draw(dt);    // Draw user function
                    }

                    self.stats.end();

                    requestAnimationFrame(__render__);
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
        let canvas: HTMLCanvasElement = Core.getInstance().canvas();
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
            Core.getInstance().changeViewport(0, 0, canvas.width, canvas.height);

            // TODO: cameraUpdateCb();
        }
    }

    protected _appFunctions: IApp;
};

export default App;
