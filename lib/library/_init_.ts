/// <reference path="core/core.ts" />
/// <reference path="core/input.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="extras/timer.ts" />

import Core from "./core/core";
import Input from "./core/input";
import ResourceMap from "./resources/resourceMap";
import Timer from "./extras/timer";

"use strict";

interface LoadAssets {
    (): void;
};

interface Initialize {
    (): void;
};

interface DrawCallback {
    (dt: number): void;
};

namespace _init__ {

    let stats: Stats;
    let _drawSceneCB: Function;
    let gui: dat.GUI;
    export function init(loadAssets: LoadAssets, textCB) {
        Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);

        gui = new dat.GUI();
        textCB(gui);

        stats = new Stats();
        stats.setMode(0);
        document.body.appendChild(stats.domElement);

        loadAssets();
    }
    export function start(initialize: Initialize, drawScene: DrawCallback) {
        ResourceMap.setLoadCompleteCallback(function() {
            console.log("ALL RESOURCES LOADED!!!!");

            Element.prototype.remove = function() {
                this.parentElement.removeChild(this);
            };
            NodeList.prototype["remove"] = HTMLCollection.prototype["remove"] = function() {
                for (let i = this.length - 1; i >= 0; i--) {
                    if (this[i] && this[i].parentElement) {
                        this[i].parentElement.removeChild(this[i]);
                    }
                }
            };

            initialize();

            _drawSceneCB = drawScene;

            // Remove loader css3 window
            document.getElementById("spinner").remove();

            requestAnimationFrame(render);
        });
    }
    export function render(dt: number) {
        Input.getInstance().update();

        stats.begin();
        dt *= 0.001; // convert to seconds

        Timer.update();
        

        // resize();
        

        _drawSceneCB(dt);    // Draw user function

        stats.end();
        requestAnimationFrame(render);
    }

    function resize() {
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
};

export default _init__;