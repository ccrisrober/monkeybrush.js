/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="library/references.d.ts" />
	"use strict";
	var App_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(2);
	var input_1 = __webpack_require__(5);
	var sphere_1 = __webpack_require__(13);
	var mesh_1 = __webpack_require__(20);
	var texture2d_1 = __webpack_require__(21);
	var simpleTexture2d_1 = __webpack_require__(23);
	var program_1 = __webpack_require__(24);
	var framebuffer_1 = __webpack_require__(26);
	var programManager_1 = __webpack_require__(28);
	var resourceMap_1 = __webpack_require__(11);
	var loaders_1 = __webpack_require__(29);
	var timer_1 = __webpack_require__(12);
	var pointLight_1 = __webpack_require__(30);
	var vector2_1 = __webpack_require__(34);
	var vector3_1 = __webpack_require__(33);
	var _demoCamera_1 = __webpack_require__(35);
	var skybox_1 = __webpack_require__(36);
	var ProgramCte_1 = __webpack_require__(25);
	var TextureFormat_1 = __webpack_require__(38);
	var TextureType_1 = __webpack_require__(39);
	"use strict";
	var camera = new _demoCamera_1["default"](new Float32Array([-2.7, -1.4, 11.8]));
	var skybox;
	var esferita;
	var SimpleConfig = function () {
	    return {
	        max: 10,
	        resume: true
	    };
	};
	var m;
	var view;
	var projection;
	var tex2d;
	var _light = new pointLight_1["default"](new vector3_1["default"](-5.0, 0.0, 0.0));
	var identityMatrix = mat4.create();
	mat4.identity(identityMatrix);
	var model = mat4.create();
	var angle = 0;
	var text = SimpleConfig();
	function loadAssets() {
	    loaders_1["default"].loadImage("assets/images/example.png", "exampleImg");
	    // skybox
	    loaders_1["default"].loadImage("assets/images/canyon/back.jpg");
	    loaders_1["default"].loadImage("assets/images/canyon/bottom.jpg");
	    loaders_1["default"].loadImage("assets/images/canyon/front.jpg");
	    loaders_1["default"].loadImage("assets/images/canyon/left.jpg");
	    loaders_1["default"].loadImage("assets/images/canyon/right.jpg");
	    loaders_1["default"].loadImage("assets/images/canyon/top.jpg");
	    // video
	    // loaders.loadVideo("assets/video/Firefox.ogv");
	}
	var mainShader = "prog";
	var framebuffer;
	function initialize(app) {
	    esferita = new sphere_1["default"](1.0, 20, 20);
	    m = new mesh_1["default"]("assets/objects/teddy.json");
	    var canvasSize = new vector2_1["default"](core_1["default"].getInstance().canvas().width, core_1["default"].getInstance().canvas().height);
	    skybox = new skybox_1["default"]("assets/images/canyon", false);
	    framebuffer = new framebuffer_1["default"]([
	        new simpleTexture2d_1["default"](canvasSize, {
	            "internalFormat": TextureFormat_1["default"].RGB,
	            "format": TextureFormat_1["default"].RGB,
	            "type": TextureFormat_1["default"].Float,
	            "minFilter": TextureType_1["default"].Nearest,
	            "magFilter": TextureType_1["default"].Nearest
	        })
	    ], canvasSize, true, true, {});
	    // console.log(app);
	    var webgl2 = app.webglVersion() === 2;
	    programManager_1["default"].addWithFun("prog", function () {
	        var prog = new program_1["default"]();
	        if (webgl2) {
	            prog.addShader("./shaders/demoShader.vert", ProgramCte_1["default"].shader_type.vertex, ProgramCte_1["default"].mode.read_file);
	            prog.addShader("./shaders/demoShader.frag", ProgramCte_1["default"].shader_type.fragment, ProgramCte_1["default"].mode.read_file);
	        }
	        else {
	            prog.addShader("./shaders/demowebgl1.vert", ProgramCte_1["default"].shader_type.vertex, ProgramCte_1["default"].mode.read_file);
	            prog.addShader("./shaders/demowebgl1.frag", ProgramCte_1["default"].shader_type.fragment, ProgramCte_1["default"].mode.read_file);
	        }
	        prog.compile();
	        prog.addUniforms(["projection", "view", "model",
	            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
	        return prog;
	    });
	    var cubeImage = resourceMap_1["default"].retrieveAsset("exampleImg");
	    tex2d = new texture2d_1["default"](cubeImage, {
	        flipY: true,
	        minFilter: TextureType_1["default"].Linear,
	        magFilter: TextureType_1["default"].Linear,
	        wrapS: TextureType_1["default"].Clamp2Edge,
	        wrapT: TextureType_1["default"].Clamp2Edge
	    });
	    cameraUpdateCb();
	}
	function cameraUpdateCb() {
	    var canvas = core_1["default"].getInstance().canvas();
	    view = camera.GetViewMatrix();
	    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);
	    var prog = programManager_1["default"].get(mainShader);
	    prog.use();
	    prog.sendUniformMat4("view", view);
	    prog.sendUniformMat4("projection", projection);
	    prog.sendUniformVec3("viewPos", camera.position);
	}
	// @param dt: Global time in seconds
	function updateScene(app, dt) {
	    if (input_1["default"].getInstance().isButtonClicked(input_1["default"].mouseButton.Left)) {
	        console.log("Mouse left clicked");
	    }
	    camera.timeElapsed = timer_1["default"].deltaTime() / 10.0;
	    camera.update(cameraUpdateCb);
	    angle += timer_1["default"].deltaTime() * 0.001;
	}
	function drawScene(app) {
	    core_1["default"].getInstance().clearColorAndDepth();
	    var prog = programManager_1["default"].get(mainShader);
	    prog.use();
	    tex2d.bind(0);
	    prog.sendUniform1i("texSampler", 0);
	    var varvar = text.max;
	    var i = 0, j = 0, k = 0;
	    var dd = -1;
	    for (i = -varvar; i < varvar; i += 5.0) {
	        for (j = -varvar; j < varvar; j += 5.0) {
	            for (k = -varvar; k < varvar; k += 5.0) {
	                dd *= -1;
	                mat4.translate(model, identityMatrix, vec3.fromValues(i * 1.0, j * 1.0, k * 1.0));
	                mat4.rotateY(model, model, 90.0 * Math.PI / 180);
	                mat4.rotateY(model, model, angle * dd);
	                mat4.scale(model, model, vec3.fromValues(0.1, 0.1, 0.1));
	                prog.sendUniformMat4("model", model);
	                m.render();
	            }
	        }
	    }
	    skybox.render(view, projection);
	}
	// ============================================================================================ //
	// ============================================================================================ //
	// ============================================================================================ //
	// ============================================================================================ //
	// ============================================================================================ //
	// ============================================================================================ //
	/**/
	window.onload = function () {
	    new App_1["default"]({
	        webglVersion: 2,
	        loadAssets: loadAssets,
	        initialize: initialize,
	        update: updateScene,
	        draw: drawScene,
	        cameraUpdate: cameraUpdateCb,
	        textCB: function (gui) {
	            gui.add(text, "max", 5, 100);
	        }
	    }, text).start();
	};
	/**/


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="core/core.ts" />
	/// <reference path="core/input.ts" />
	/// <reference path="resources/resourceMap.ts" />
	/// <reference path="extras/timer.ts" />
	/// <reference path="../typings/vanilla-toasts/vanilla-toasts.d.ts" />
	var core_1 = __webpack_require__(2);
	var input_1 = __webpack_require__(5);
	var resourceMap_1 = __webpack_require__(11);
	var timer_1 = __webpack_require__(12);
	"use strict";
	var App = (function () {
	    function App(init, text) {
	        this._resume = true;
	        if (!init.webglVersion) {
	            init.webglVersion = 2;
	        }
	        this._appFunctions = init;
	        console.log(this._appFunctions);
	        this.__init__(text);
	    }
	    ;
	    App.prototype.webglVersion = function () {
	        return this._appFunctions.webglVersion;
	    };
	    App.prototype.__init__ = function (text) {
	        core_1["default"].getInstance().initialize([1.0, 1.0, 1.0, 1.0]);
	        this.gui = new dat.GUI();
	        this._appFunctions.textCB(this.gui);
	        var self = this;
	        this.gui.add(text, "resume", true).onChange(function (v) {
	            if (v === true) {
	                self.resume();
	            }
	            else {
	                self.pause();
	            }
	        });
	        this.stats = new Stats();
	        this.stats.setMode(0);
	        document.body.appendChild(this.stats.domElement);
	        this._appFunctions.loadAssets();
	    };
	    App.prototype.start = function () {
	        var self = this;
	        resourceMap_1["default"].setLoadCompleteCallback(function () {
	            console.log("ALL RESOURCES LOADED!!!!");
	            self._appFunctions.initialize(self);
	            // Remove loader css3 window
	            document.getElementById("spinner").remove();
	            try {
	                (function __render__(dt) {
	                    // console.log(dt);
	                    input_1["default"].getInstance().update();
	                    self.stats.begin();
	                    dt *= 0.001; // convert to seconds
	                    timer_1["default"].update();
	                    // self.__resize__();
	                    if (self._resume) {
	                        self._appFunctions.update(self, dt);
	                        self._appFunctions.draw(self, dt); // Draw user function
	                    }
	                    self.stats.end();
	                    requestAnimationFrame(__render__);
	                })(0.0);
	            }
	            catch (e) {
	                VanillaToasts.create({
	                    title: "Error:",
	                    text: "" + e,
	                    type: "error"
	                });
	                throw e;
	            }
	        });
	        return this;
	    };
	    ;
	    App.prototype.pause = function () {
	        console.log("PAUSE");
	        this._resume = false;
	    };
	    ;
	    App.prototype.resume = function () {
	        console.log("RESUME");
	        this._resume = true;
	    };
	    ;
	    App.prototype.__resize__ = function () {
	        var canvas = core_1["default"].getInstance().canvas();
	        var realToCSSPixels = window.devicePixelRatio || 1;
	        // Lookup the size the browser is displaying the canvas in CSS pixels
	        // and compute a size needed to make our drawingbuffer match it in
	        // device pixels.
	        var displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
	        var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
	        // Check if the canvas is not the same size.
	        if (canvas.width !== displayWidth ||
	            canvas.height !== displayHeight) {
	            // Make the canvas the same size
	            canvas.width = displayWidth;
	            canvas.height = displayHeight;
	            // Set the viewport to match
	            core_1["default"].getInstance().changeViewport(0, 0, canvas.width, canvas.height);
	        }
	    };
	    return App;
	}());
	;
	exports.__esModule = true;
	exports["default"] = App;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="input.ts" />
	/// <reference path="context.ts" />
	/// <reference path="../constants/_constants.ts" />
	var context_1 = __webpack_require__(3);
	var input_1 = __webpack_require__(5);
	"use strict";
	/**
	* This class get WebGL2 context and animationFrame for your navigator.
	*
	* @class core.Core
	*/
	var Core = (function () {
	    function Core() {
	        if (Core._instance) {
	            throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
	        }
	        this._gl = context_1["default"].getContext();
	        input_1["default"].getInstance();
	        Core._instance = this;
	    }
	    Core.prototype.initialize = function (color) {
	        var gl = this._gl;
	        this.init();
	        // ToneMap.init(gl);
	        gl.clearColor(color[0], color[1], color[2], color[3]);
	    };
	    Core.prototype.clearColorAndDepth = function () {
	        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	    };
	    Core.prototype.changeViewport = function (x, y, w, h) {
	        this._gl.viewport(x, y, w, h);
	    };
	    Core.prototype.canvas = function () {
	        return this._gl.canvas;
	    };
	    Core.prototype.init = function () {
	        depth_1["default"].enable();
	        depth_1["default"].comparison(ComparisonFunc_1["default"].Less);
	        // Set images to flip y axis to match the texture coordinate space.
	        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	        cull_1["default"].enable();
	        blend_1["default"].disable();
	    };
	    Core.getInstance = function () {
	        if (!Core._instance) {
	            console.log("Creando core");
	            Core._instance = new Core();
	        }
	        return Core._instance;
	    };
	    /**
	    * Return global WebGL context
	    *
	    * @method getGL
	    * @return {WebGLRenderingContext} Returns WebGL rendering context
	    */
	    Core.prototype.getGL = function () {
	        return this._gl;
	    };
	    Core._instance = new Core();
	    return Core;
	}());
	;
	context_1["default"].getContext();
	Core.getInstance();
	var depth_1 = __webpack_require__(6);
	var cull_1 = __webpack_require__(7);
	var blend_1 = __webpack_require__(8);
	var ComparisonFunc_1 = __webpack_require__(10);
	exports.__esModule = true;
	exports["default"] = Core;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="./log.ts" />
	var log_1 = __webpack_require__(4);
	// TODO: in getContext, check antialias or anothers params
	var Context = (function () {
	    function Context() {
	    }
	    Context.getContext = function (canvasName) {
	        if (!Context._gl) {
	            if (!canvasName) {
	                log_1["default"].info("Not canvas. Create one ...");
	                this._canvas = document.createElement("canvas");
	                this._canvas.width = 800;
	                this._canvas.height = 800;
	                document.body.appendChild(this._canvas);
	            }
	            else {
	                this._canvas = document.getElementById(canvasName);
	            }
	            log_1["default"].info("Get context");
	            Context._gl = Context._getContext(this._canvas);
	            if (!Context._gl) {
	                document.write("<br><b>WebGL is not supported!</b>");
	                throw new Error("WebGL is not supported!");
	            }
	            log_1["default"].info("WebGLRenderingContext OK :)");
	            Context._getVendors();
	        }
	        return Context._gl;
	    };
	    Context._getContext = function (canvas) {
	        var contexts = "webgl2,webgl,experimental-webgl2".split(",");
	        var gl;
	        var ctx;
	        for (var i = 0; i < contexts.length; ++i) {
	            ctx = contexts[i];
	            gl = canvas.getContext(contexts[i]);
	            if (gl) {
	                return gl;
	            }
	        }
	        return null;
	    };
	    Context._getVendors = function () {
	        var vendors = "ms,moz,webkit,o".split(",");
	        if (!window.requestAnimationFrame) {
	            var vendor = void 0;
	            for (var i = 0; i < vendors.length; ++i) {
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
	            var lastTime_1 = 0;
	            window.requestAnimationFrame = function (cb) {
	                var currTime = Date.now();
	                var timeToCall = Math.max(0, 16 - (currTime - lastTime_1));
	                var id = window.setTimeout(function () {
	                    cb(currTime + timeToCall);
	                }, timeToCall);
	                lastTime_1 = currTime + timeToCall;
	                return id;
	            };
	        }
	        if (!window.cancelAnimationFrame) {
	            window.cancelAnimationFrame = function (id) {
	                clearTimeout(id);
	            };
	        }
	        ;
	    };
	    Context._gl = null;
	    Context._canvas = null;
	    return Context;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Context;


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	/// <reference path="../../typings/log4javascript.d.ts" />
	// var log = log4javascript.getDefaultLogger();
	// log.setLevel(log4javascript.Level.INFO);
	var consoleAppender, logger;
	logger = log4javascript.getLogger("my_logger");
	consoleAppender = new log4javascript.BrowserConsoleAppender();
	logger.addAppender(consoleAppender);
	exports.__esModule = true;
	exports["default"] = logger;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="context.ts" />
	var context_1 = __webpack_require__(3);
	"use strict";
	// TODO: Remove Input singleton mode :S
	var Input = (function () {
	    function Input() {
	        // Key code constants
	        this.keys = {
	            Left_Shift: 16,
	            // arrows
	            Left: 37,
	            Up: 38,
	            Right: 39,
	            Down: 40,
	            // space bar
	            Space: 32,
	            // numbers
	            Zero: 48,
	            One: 49,
	            Two: 50,
	            Three: 51,
	            Four: 52,
	            Five: 53,
	            Six: 54,
	            Seven: 55,
	            Eight: 56,
	            Nine: 57,
	            // Alphabets
	            A: 65,
	            D: 68,
	            E: 69,
	            F: 70,
	            G: 71,
	            I: 73,
	            J: 74,
	            K: 75,
	            L: 76,
	            M: 77,
	            N: 78,
	            O: 79,
	            P: 80,
	            Q: 81,
	            R: 82,
	            S: 83,
	            W: 87,
	            LastKeyCode: 222
	        };
	        // Previous key state
	        this._keyPreviusState = [];
	        // Pressed keys
	        this._isKeyPressed = [];
	        // Click events: once an event is set, it will remain there until polled
	        this._isKeyClicked = [];
	        this._buttonPreviousState = [];
	        this._isButtonPressed = [];
	        this._isButtonClicked = [];
	        this._mousePosX = -1;
	        this._mousePosY = -1;
	        if (Input._instance) {
	            throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
	        }
	        for (var i = 0; i < this.keys["LastKeyCode"]; ++i) {
	            this._isKeyPressed[i] = false;
	            this._keyPreviusState[i] = false;
	            this._isKeyClicked[i] = false;
	        }
	        for (var i = 0; i < 3; ++i) {
	            this._buttonPreviousState[i] = false;
	            this._isButtonClicked[i] = false;
	            this._isButtonPressed[i] = false;
	        }
	        var self = this;
	        // Register handles
	        window.addEventListener("keyup", function (ev) {
	            if (ev.keyCode === 40 || ev.keyCode === 38) {
	                ev.preventDefault();
	            }
	            self._onKeyUp(ev);
	        });
	        window.addEventListener("keydown", function (ev) {
	            if (ev.keyCode === 40 || ev.keyCode === 38) {
	                ev.preventDefault();
	            }
	            self._onKeyDown(ev);
	        });
	        window.addEventListener("mousedown", function (ev) {
	            self._onMouseDown(ev);
	        });
	        window.addEventListener("mousemove", function (ev) {
	            self._onMouseMove(ev);
	        });
	        window.addEventListener("mouseup", function (ev) {
	            self._onMouseUp(ev);
	        });
	        Input._instance = this;
	    }
	    Input.prototype.update = function () {
	        for (var i = 0; i < this.keys["LastKeyCode"]; ++i) {
	            this._isKeyClicked[i] = (!this._keyPreviusState[i]) && this._isKeyPressed[i];
	            this._keyPreviusState[i] = this._isKeyPressed[i];
	        }
	        for (var i = 0; i < 3; ++i) {
	            this._isButtonClicked[i] = (!this._buttonPreviousState[i]) && this._isButtonPressed[i];
	            this._buttonPreviousState[i] = this._isButtonPressed[i];
	        }
	    };
	    Input.prototype.isKeyPressed = function (keycode) {
	        return this._isKeyPressed[keycode];
	    };
	    Input.prototype.isKeyClicked = function (keycode) {
	        return this._isKeyClicked[keycode];
	    };
	    Input.prototype._onKeyDown = function (ev) {
	        this._isKeyPressed[ev.keyCode] = true;
	    };
	    Input.prototype._onKeyUp = function (ev) {
	        this._isKeyPressed[ev.keyCode] = false;
	    };
	    Input.prototype._onMouseMove = function (ev) {
	        var inside = false;
	        var canvas = context_1["default"].getContext().canvas;
	        var bbox = canvas.getBoundingClientRect();
	        // const x = Math.round((ev.clientX - bbox.left) * (canvas.width / bbox.width));
	        // const y = Math.round((ev.clientY - bbox.top) * (canvas.width / bbox.width));
	        var x = ((ev.clientX - bbox.left) - canvas.height / 2) / (canvas.height / 2);
	        var y = (canvas.width / 2 - (ev.clientY - bbox.top)) / (canvas.width / 2);
	        if ((x >= 0) && (x < canvas.width) &&
	            (y >= 0) && (y < canvas.height)) {
	            this._mousePosX = x;
	            this._mousePosY = canvas.height - 1 - y;
	            inside = true;
	        }
	        return inside;
	    };
	    Input.prototype._onMouseDown = function (ev) {
	        if (this._onMouseMove(ev)) {
	            this._isButtonPressed[ev.button] = true;
	        }
	    };
	    ;
	    Input.prototype._onMouseUp = function (ev) {
	        this._onMouseMove(ev);
	        this._isButtonPressed[ev.button] = false;
	    };
	    ;
	    Input.getInstance = function () {
	        return Input._instance;
	    };
	    ;
	    Input.prototype.isButtonPressed = function (button) {
	        return this._isButtonPressed[button];
	    };
	    Input.prototype.isButtonClicked = function (button) {
	        return this._isButtonClicked[button];
	    };
	    Input.prototype.getMousePosX = function () {
	        return this._mousePosX;
	    };
	    Input.prototype.getMousePosY = function () {
	        return this._mousePosY;
	    };
	    Input._instance = new Input();
	    // Mouse states
	    Input.mouseButton = {
	        Left: 0,
	        Middle: 1,
	        Right: 2
	    };
	    return Input;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Input;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../constants/_constants.ts" />
	/// <reference path="context.ts" />
	var context_1 = __webpack_require__(3);
	"use strict";
	var Depth = (function () {
	    function Depth() {
	    }
	    /**
	     * Enable depth testing.
	     */
	    Depth.enable = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.enable(gl.DEPTH_TEST);
	    };
	    /**
	     * Enable writing into the depth buffer.
	     */
	    Depth.use = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.depthMask(true);
	    };
	    /**
	     * Specify the mode used for depth buffer comparisons.
	     * @param {ComparisonFunc} compFunc: Comparisor mode.
	     */
	    Depth.comparison = function (compFunc) {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.depthFunc(compFunc);
	    };
	    /**
	     * Specify mapping of depth values from normalized device coordinates to window coordinates.
	     * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
	     * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
	     */
	    Depth.depthRange = function (znear, zfar) {
	        if (znear === void 0) { znear = 0.0; }
	        if (zfar === void 0) { zfar = 1.0; }
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        if (znear > zfar || znear < 0.0 || zfar > 1.0) {
	            console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
	            return;
	        }
	        gl.depthRange(znear, zfar);
	    };
	    /**
	     * Clear depth buffer.
	     */
	    Depth.clear = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.clear(gl.DEPTH_BUFFER_BIT);
	    };
	    /**
	     * Disable writing into the depth buffer.
	     */
	    Depth.unuse = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.depthMask(false);
	    };
	    /**
	     * Disable depth testing.
	     */
	    Depth.disable = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.disable(gl.DEPTH_TEST);
	    };
	    /**
	     * Checks if depth test is activated
	     * @return {boolean}: True if activated
	     */
	    Depth.isEnabled = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        return gl.isEnabled(gl.DEPTH_TEST);
	    };
	    return Depth;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Depth;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../constants/_constants.ts" />
	/// <reference path="context.ts" />
	var context_1 = __webpack_require__(3);
	"use strict";
	var Cull = (function () {
	    function Cull() {
	    }
	    /**
	     * Enable cullFace test.
	     */
	    Cull.enable = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.enable(gl.CULL_FACE);
	    };
	    /**
	     * Get current cullFace mode
	     * @return {Face}: Current cullFace mode
	     */
	    Cull.getMode = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        return gl.getParameter(gl.CULL_FACE_MODE);
	    };
	    /**
	     * Specify whether front/back-facing facets can be culled.
	     * @param {Face} mode: Cull face mode
	     */
	    Cull.setMode = function (mode) {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.cullFace(mode);
	    };
	    /**
	     * Disable cullFace test.
	     */
	    Cull.disable = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.disable(gl.CULL_FACE);
	    };
	    /**
	     * Checks if cullFace is activated
	     * @return {boolean}: True if activated
	     */
	    Cull.isEnabled = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        return gl.isEnabled(gl.CULL_FACE);
	    };
	    return Cull;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Cull;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../constants/_constants.ts" />
	/// <reference path="context.ts" />
	var context_1 = __webpack_require__(3);
	var BlendingType_1 = __webpack_require__(9);
	"use strict";
	/**
	 * Blend wrapper
	 * @class Blend
	 */
	var Blend = (function () {
	    function Blend() {
	    }
	    /**
	     * Enable blending
	     */
	    Blend.enable = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.enable(gl.BLEND);
	    };
	    /**
	     * Specify the equation used for both the RGB blend equation and the Alpha blend equation
	     * @param {BlendingEq} mode: Specifies how source and destination colors are combined
	     */
	    Blend.equation = function (mode) {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.blendEquation(mode);
	    };
	    /**
	     * Set the RGB blend equation and the alpha blend equation separately
	     * @param {BlendingEqu} modeRGB: Specifies the RGB blend equation,
	     *      how thered, green, and blue components of the source and
	     *      destination colors are combined.
	     * @param {BlendingEqu} modeAlpha: Specifies the alpha blend equation,
	     *      how the alpha component of the source and destination colors
	     *      are combined.
	     */
	    Blend.equationSeparate = function (modeRGB, modeAlpha) {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.blendEquationSeparate(modeRGB, modeAlpha);
	    };
	    Blend.prototype.getBlendEquRGB = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        return gl.getParameter(gl.BLEND_EQUATION_RGB);
	    };
	    Blend.prototype.getBlendEquAlpha = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        return gl.getParameter(gl.BLEND_EQUATION_ALPHA);
	    };
	    /**
	     * Set the blend color
	     * @param {number = 0.0} red
	     * @param {number = 0.0} green
	     * @param {number = 0.0} blue
	     * @param {number = 0.0} alpha
	     */
	    Blend.color = function (red, green, blue, alpha) {
	        if (red === void 0) { red = 0.0; }
	        if (green === void 0) { green = 0.0; }
	        if (blue === void 0) { blue = 0.0; }
	        if (alpha === void 0) { alpha = 0.0; }
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.blendColor(red, green, blue, alpha);
	    };
	    /**
	     * Specify pixel arithmetic.
	     * @param {BlendingType = BlendingType.One} sfactor: Specifies how the red,
	     *     green, blue, and alpha source blending factors are computed.
	     * @param {BlendingType = BlendingType.Zero} dfactor: Specifies how the red,
	     *     green, blue, and alpha destination blending factors are computed.
	     */
	    Blend.func = function (sfactor, dfactor) {
	        if (sfactor === void 0) { sfactor = BlendingType_1["default"].One; }
	        if (dfactor === void 0) { dfactor = BlendingType_1["default"].Zero; }
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.blendFunc(sfactor, dfactor);
	    };
	    /**
	     * Specify pixel arithmetic for RGB and alpha components separately.
	     * @param {BlendingType = BlendingType.One} rcRGB: Specifies how the red, green,
	     *      and blue blending factors are computed.
	     * @param {BlendingType = BlendingType.Zero} dstRGB: Specifies how the red, green,
	     *      and blue destination blending factors are computed.
	     * @param {BlendingType = BlendingType.One} srcAlpha: Specified how the alpha source
	     *      blending factor is computed.
	     * @param {BlendingType = BlendingType.Zero} dstAlpha: Specified how the alpha destination
	     *      blending factor is computed.
	     */
	    Blend.funcSeparate = function (srcRGB, dstRGB, srcAlpha, dstAlpha) {
	        if (srcRGB === void 0) { srcRGB = BlendingType_1["default"].One; }
	        if (dstRGB === void 0) { dstRGB = BlendingType_1["default"].Zero; }
	        if (srcAlpha === void 0) { srcAlpha = BlendingType_1["default"].One; }
	        if (dstAlpha === void 0) { dstAlpha = BlendingType_1["default"].Zero; }
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
	    };
	    /**
	     * Disable blending
	     */
	    Blend.disable = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        gl.disable(gl.BLEND);
	    };
	    /**
	     * Checks if blending is activated
	     * @return {boolean}: True if activated
	     */
	    Blend.isEnabled = function () {
	        var gl = context_1["default"].getContext(); // Core.getInstance().getGL();
	        return gl.isEnabled(gl.BLEND);
	    };
	    return Blend;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Blend;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/context.ts" />
	var context_1 = __webpack_require__(3);
	"use strict";
	var gl = context_1["default"].getContext();
	// Blending type
	var BlendingType;
	(function (BlendingType) {
	    BlendingType[BlendingType["Zero"] = gl.ZERO] = "Zero";
	    BlendingType[BlendingType["One"] = gl.ONE] = "One";
	    BlendingType[BlendingType["SrcColor"] = gl.SRC_COLOR] = "SrcColor";
	    BlendingType[BlendingType["OneMinusSrcColor"] = gl.ONE_MINUS_SRC_COLOR] = "OneMinusSrcColor";
	    BlendingType[BlendingType["SrcAlpha"] = gl.SRC_ALPHA] = "SrcAlpha";
	    BlendingType[BlendingType["OneMinusSrcAlpha"] = gl.ONE_MINUS_SRC_ALPHA] = "OneMinusSrcAlpha";
	    BlendingType[BlendingType["DstAlpha"] = gl.DST_ALPHA] = "DstAlpha";
	    BlendingType[BlendingType["OneMinusDstAlpha"] = gl.ONE_MINUS_DST_ALPHA] = "OneMinusDstAlpha";
	    BlendingType[BlendingType["DstColor"] = gl.DST_COLOR] = "DstColor";
	    BlendingType[BlendingType["OneMinusDstColor"] = gl.ONE_MINUS_DST_COLOR] = "OneMinusDstColor";
	    BlendingType[BlendingType["SrcAlphaSaturate"] = gl.SRC_ALPHA_SATURATE] = "SrcAlphaSaturate";
	    BlendingType[BlendingType["CteColor"] = gl.CONSTANT_COLOR] = "CteColor";
	    BlendingType[BlendingType["OneMinusCteColor"] = gl.ONE_MINUS_CONSTANT_COLOR] = "OneMinusCteColor";
	    BlendingType[BlendingType["CteAlpha"] = gl.CONSTANT_ALPHA] = "CteAlpha";
	    BlendingType[BlendingType["OneMinusCteAlpha"] = gl.ONE_MINUS_CONSTANT_ALPHA] = "OneMinusCteAlpha";
	})(BlendingType || (BlendingType = {}));
	;
	exports.__esModule = true;
	exports["default"] = BlendingType;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/context.ts" />
	var context_1 = __webpack_require__(3);
	"use strict";
	var gl = context_1["default"].getContext();
	// Comparison function
	var ComparisonFunc;
	(function (ComparisonFunc) {
	    ComparisonFunc[ComparisonFunc["Never"] = gl.NEVER] = "Never";
	    ComparisonFunc[ComparisonFunc["Always"] = gl.ALWAYS] = "Always";
	    ComparisonFunc[ComparisonFunc["Less"] = gl.LESS] = "Less";
	    ComparisonFunc[ComparisonFunc["Equal"] = gl.EQUAL] = "Equal";
	    ComparisonFunc[ComparisonFunc["NotEqual"] = gl.NOTEQUAL] = "NotEqual";
	    ComparisonFunc[ComparisonFunc["LessEqual"] = gl.LEQUAL] = "LessEqual";
	    ComparisonFunc[ComparisonFunc["Greater"] = gl.GREATER] = "Greater";
	    ComparisonFunc[ComparisonFunc["GreaterEqual"] = gl.GEQUAL] = "GreaterEqual"; ///< Passes if source is greater than or equal to the destination
	})(ComparisonFunc || (ComparisonFunc = {}));
	;
	exports.__esModule = true;
	exports["default"] = ComparisonFunc;


/***/ },
/* 11 */
/***/ function(module, exports) {

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
	/// <reference path="../../typings/vanilla-toasts/vanilla-toasts.d.ts" />
	"use strict";
	var ResourceMap;
	(function (ResourceMap) {
	    var MapEntry = (function () {
	        function MapEntry(resName) {
	            this._asset = resName;
	            this._refCount = 1;
	        }
	        MapEntry.prototype.getAsset = function () { return this._asset; };
	        MapEntry.prototype.setAsset = function (name) {
	            this._asset = name;
	        };
	        MapEntry.prototype.count = function () {
	            return this._refCount;
	        };
	        MapEntry.prototype.incCount = function () {
	            this._refCount++;
	        };
	        MapEntry.prototype.decCount = function () {
	            this._refCount--;
	        };
	        return MapEntry;
	    }());
	    ResourceMap.MapEntry = MapEntry;
	    /**
	     * [_numOutstandingLoads description]
	     * @type {number}
	     */
	    var _numOutstandingLoads = 0;
	    /**
	     * [_loadCompleteCallback description]
	     * @type {Function}
	     */
	    var _loadCompleteCallback = null;
	    /**
	     * [MapEntry description]
	     * @type {[type]}
	     */
	    ResourceMap._resourceMap = {};
	    /**
	     * @param {string}
	     */
	    function asyncLoadRequested(resName) {
	        ResourceMap._resourceMap[resName] = new MapEntry(resName);
	        ++_numOutstandingLoads;
	    }
	    ResourceMap.asyncLoadRequested = asyncLoadRequested;
	    ;
	    /**
	     * @param {string}
	     */
	    function asyncLoadFailed(resName) {
	        VanillaToasts.create({
	            title: resName + " completed",
	            text: "",
	            type: "error",
	            timeout: 2500
	        });
	        --_numOutstandingLoads;
	        _checkForAllLoadCompleted();
	    }
	    ResourceMap.asyncLoadFailed = asyncLoadFailed;
	    /**
	     * @param {string}
	     * @param {[type]}
	     */
	    function asyncLoadCompleted(resName, loadedAsset) {
	        if (!isAssetLoaded(resName)) {
	            VanillaToasts.create({
	                title: "asyncLoadCompleted: [" + resName + "] not in map!",
	                text: "",
	                type: "error",
	                timeout: 2500
	            });
	        }
	        VanillaToasts.create({
	            title: resName + " completed",
	            text: "",
	            type: "success",
	            timeout: 1500
	        });
	        ResourceMap._resourceMap[resName].setAsset(loadedAsset);
	        --_numOutstandingLoads;
	        _checkForAllLoadCompleted();
	    }
	    ResourceMap.asyncLoadCompleted = asyncLoadCompleted;
	    ;
	    /**
	     *
	     */
	    function _checkForAllLoadCompleted() {
	        if ((_numOutstandingLoads === 0) && (_loadCompleteCallback !== null)) {
	            var funToCall = _loadCompleteCallback;
	            _loadCompleteCallback = null;
	            funToCall();
	        }
	    }
	    ;
	    /**
	     * Set callback function that called when all assets have finished loading.
	     * @param {Function}
	     */
	    function setLoadCompleteCallback(fn) {
	        _loadCompleteCallback = fn;
	        _checkForAllLoadCompleted();
	    }
	    ResourceMap.setLoadCompleteCallback = setLoadCompleteCallback;
	    ;
	    /**
	     * Get asset from alias/name
	     * @param  {string} resName [description]
	     * @return {any}
	     */
	    function retrieveAsset(resName) {
	        var r = null;
	        if (resName in ResourceMap._resourceMap) {
	            r = ResourceMap._resourceMap[resName].getAsset();
	        }
	        else {
	            alert("retrieveAsset: [" + resName + "] not in map!");
	        }
	        return r;
	    }
	    ResourceMap.retrieveAsset = retrieveAsset;
	    ;
	    /**
	     * Check whether the resource has already been loaded.
	     * @param  {string} resName: Resource name
	     * @return {boolean}: True if resource exist
	     */
	    function isAssetLoaded(resName) {
	        return (resName in ResourceMap._resourceMap);
	    }
	    ResourceMap.isAssetLoaded = isAssetLoaded;
	    ;
	    /**
	     * @param {string}
	     */
	    function incAssetRefCount(resName) {
	        ResourceMap._resourceMap[resName].incCount();
	    }
	    ResourceMap.incAssetRefCount = incAssetRefCount;
	    ;
	    /**
	     * Unload a existing resource.
	     * @param {string}
	     */
	    function unloadAsset(resName) {
	        var c = 0;
	        if (resName in ResourceMap._resourceMap) {
	            ResourceMap._resourceMap[resName].decCount();
	            c = ResourceMap._resourceMap[resName].count();
	            if (c === 0) {
	                delete ResourceMap._resourceMap[resName];
	            }
	        }
	        return c;
	    }
	    ResourceMap.unloadAsset = unloadAsset;
	    ;
	})(ResourceMap || (ResourceMap = {}));
	;
	exports.__esModule = true;
	exports["default"] = ResourceMap;


/***/ },
/* 12 */
/***/ function(module, exports) {

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
	var Timer;
	(function (Timer) {
	    var _lastTime = Date.now();
	    var _deltaTime = 0.0;
	    var _currentTime, _timeElapsed;
	    /**
	     *
	     */
	    function update() {
	        _currentTime = Date.now();
	        _timeElapsed = _currentTime - _lastTime;
	        _deltaTime = _timeElapsed;
	        _lastTime = _currentTime;
	    }
	    Timer.update = update;
	    /**
	     * @return {number}
	     */
	    function deltaTime() {
	        return _deltaTime;
	    }
	    Timer.deltaTime = deltaTime;
	})(Timer || (Timer = {}));
	exports.__esModule = true;
	exports["default"] = Timer;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="drawable.ts" />
	var drawable_1 = __webpack_require__(14);
	"use strict";
	/**
	 * Sphere class
	 * @class Sphere
	 */
	var Sphere = (function (_super) {
	    __extends(Sphere, _super);
	    /**
	     * Sphere constructor
	     * @param {number} radius [description]
	     * @param {number} slices [description]
	     * @param {number} stacks [description]
	     */
	    function Sphere(radius, slices, stacks) {
	        _super.call(this);
	        var nv = (slices + 1) * (stacks + 1);
	        var elements = (slices * 2 * (stacks - 1)) * 3;
	        // v
	        var v = new Array(3 * nv);
	        // Normals
	        var n = new Array(3 * nv);
	        // Tex coords
	        var tex = new Array(2 * nv);
	        // Elements
	        var el = new Array(elements);
	        // Generate the vertex data
	        // Generate positions and normals
	        var theta, phi;
	        var thetaFac = Math.PI * 2.0 / slices;
	        var phiFac = Math.PI / stacks;
	        var nx, ny, nz, s, t;
	        var idx = 0, tIdx = 0;
	        for (var i = 0; i <= slices; ++i) {
	            theta = i * thetaFac;
	            s = i / slices;
	            for (var j = 0; j <= stacks; ++j) {
	                phi = j * phiFac;
	                t = j / stacks;
	                nx = Math.sin(phi) * Math.cos(theta);
	                ny = Math.sin(phi) * Math.sin(theta);
	                nz = Math.cos(phi);
	                v[idx] = radius * nx;
	                v[idx + 1] = radius * ny;
	                v[idx + 2] = radius * nz;
	                n[idx] = nx;
	                n[idx + 1] = ny;
	                n[idx + 2] = nz;
	                idx += 3;
	                tex[tIdx] = s;
	                tex[tIdx + 1] = t;
	                tIdx += 2;
	            }
	        }
	        // Generate the element list
	        idx = 0;
	        for (var i = 0; i < slices; ++i) {
	            var stackStart = i * (stacks + 1);
	            var nextStackStart = (i + 1) * (stacks + 1);
	            for (var j = 0; j < stacks; ++j) {
	                if (j === 0) {
	                    el[idx] = stackStart;
	                    el[idx + 1] = stackStart + 1;
	                    el[idx + 2] = nextStackStart + 1;
	                    idx += 3;
	                }
	                else if (j === stacks - 1) {
	                    el[idx] = stackStart + j;
	                    el[idx + 1] = stackStart + j + 1;
	                    el[idx + 2] = nextStackStart + j;
	                    idx += 3;
	                }
	                else {
	                    el[idx] = stackStart + j;
	                    el[idx + 1] = stackStart + j + 1;
	                    el[idx + 2] = nextStackStart + j + 1;
	                    el[idx + 3] = nextStackStart + j;
	                    el[idx + 4] = stackStart + j;
	                    el[idx + 5] = nextStackStart + j + 1;
	                    idx += 6;
	                }
	            }
	        }
	        this._handle = [];
	        this._vao.bind();
	        this.addElementArray(new Uint16Array(el));
	        this.addBufferArray(0, new Float32Array(v), 3);
	        this.addBufferArray(1, new Float32Array(n), 3);
	        this.addBufferArray(2, new Float32Array(tex), 2);
	        this._indicesLen = el.length;
	    }
	    return Sphere;
	}(drawable_1["default"]));
	;
	exports.__esModule = true;
	exports["default"] = Sphere;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/core.ts" />
	/// <reference path="../core/vertexArray.ts" />
	/// <reference path="../core/vertexBuffer.ts" />
	/// <reference path="../constants/_constants.ts" />
	/// <reference path="../extras/extensions.ts" />
	var core_ts_1 = __webpack_require__(2);
	var vertexArray_ts_1 = __webpack_require__(15);
	var vertexBuffer_ts_1 = __webpack_require__(17);
	var UsageType_ts_1 = __webpack_require__(19);
	var BufferType_ts_1 = __webpack_require__(18);
	var extensions_1 = __webpack_require__(16);
	"use strict";
	var gl = core_ts_1["default"].getInstance().getGL();
	/**
	 * Drawable abstract class
	 * @class Drawable
	 */
	var Drawable = (function () {
	    /**
	     * Drawable constructor
	     */
	    function Drawable() {
	        this._vao = new vertexArray_ts_1["default"]();
	    }
	    ;
	    /**
	     * Add Element buffer object.
	     * @param {Uint16Array} data [description]
	     * @param {UsageType = UsageType.StaticDraw} type [description]
	     */
	    Drawable.prototype.addElementArray = function (data, type) {
	        if (type === void 0) { type = UsageType_ts_1["default"].StaticDraw; }
	        var vb = new vertexBuffer_ts_1["default"](BufferType_ts_1["default"].ElementArray);
	        vb.bufferData(new Uint16Array(data), type);
	        this._handle.push(vb);
	        return vb;
	    };
	    ;
	    /**
	     * Add Vertex buffer object.
	     * @param  {number} attribLocation [description]
	     * @param  {Float32Array} data [description]
	     * @param  {number} numElems [description]
	     * @param  {UsageType = UsageType.StaticDraw} type [description]
	     * @return {VertexBuffer} [description]
	     */
	    Drawable.prototype.addBufferArray = function (attribLocation, data, numElems, type) {
	        if (type === void 0) { type = UsageType_ts_1["default"].StaticDraw; }
	        var vb = new vertexBuffer_ts_1["default"](BufferType_ts_1["default"].Array);
	        vb.bufferData(data, type);
	        vb.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
	        this._handle.push(vb);
	        return vb;
	    };
	    ;
	    /**
	     * Normal render
	     */
	    Drawable.prototype.render = function () {
	        this._vao.bind();
	        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
	        this._vao.unbind();
	    };
	    ;
	    /**
	     * Render with element instance mode
	     * @param {number} numInstances: Instances to render
	     */
	    Drawable.prototype.renderElementInstance = function (numInstances) {
	        this._vao.bind();
	        if (gl instanceof WebGL2RenderingContext) {
	            gl.drawElementsInstanced(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0, numInstances);
	        }
	        else {
	            var ext = extensions_1["default"].get("ANGLE_instanced_arrays");
	            if (ext) {
	                ext.drawElementsInstancedANGLE(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0, numInstances);
	            }
	        }
	        this._vao.unbind();
	    };
	    ;
	    /**
	     * Render with array instance mode
	     * @param {number} numInstances: Instances to render
	     */
	    Drawable.prototype.renderArrayInstance = function (numInstances) {
	        this._vao.bind();
	        if (gl instanceof WebGL2RenderingContext) {
	            gl.drawArraysInstanced(gl.TRIANGLES, 0, this._indicesLen, numInstances);
	        }
	        else {
	            var ext = extensions_1["default"].get("ANGLE_instanced_arrays");
	            if (ext) {
	                ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, this._indicesLen, numInstances);
	            }
	        }
	        this._vao.unbind();
	    };
	    ;
	    return Drawable;
	}());
	exports.__esModule = true;
	exports["default"] = Drawable;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/core.ts" />
	/// <reference path="../extras/extensions.ts" />
	var core_1 = __webpack_require__(2);
	var extensions_1 = __webpack_require__(16);
	"use strict";
	// TODO: Move to core
	var gl = core_1["default"].getInstance().getGL();
	var VertexArray = (function () {
	    /**
	     * Vertex array constructor
	     * @param {WebGLVertexArrayObject} vao [description]
	     */
	    function VertexArray(vao /**/) {
	        if (vao !== undefined) {
	            this._handle = vao;
	        }
	        else {
	            if (gl instanceof WebGL2RenderingContext) {
	                this._handle = gl.createVertexArray();
	            }
	            else {
	                var ext = extensions_1["default"].get("OES_vertex_array_object");
	                if (ext) {
	                    this._handle = ext.createVertexArrayOES();
	                }
	            }
	        }
	        this.bind();
	    }
	    /**
	     * [wrap description]
	     * @param {WebGLVertexArrayObject} vao [description]
	     */
	    VertexArray.wrap = function (vao /*WebGLVertexArrayObject*/) {
	        return new VertexArray(vao);
	    };
	    /**
	     * [bind description]
	     */
	    VertexArray.prototype.bind = function () {
	        if (gl instanceof WebGL2RenderingContext) {
	            gl.bindVertexArray(this._handle);
	            return;
	        }
	        var ext = extensions_1["default"].get("OES_vertex_array_object");
	        if (ext) {
	            ext.bindVertexArrayOES(this._handle);
	        }
	    };
	    /**
	     * [unbind description]
	     */
	    VertexArray.prototype.unbind = function () {
	        if (gl instanceof WebGL2RenderingContext) {
	            gl.bindVertexArray(null);
	            return;
	        }
	        var ext = extensions_1["default"].get("OES_vertex_array_object");
	        if (ext) {
	            ext.bindVertexArrayOES(null);
	        }
	    };
	    /**
	     * Destroy vertex array
	     */
	    VertexArray.prototype.destroy = function () {
	        this.bind();
	        if (gl instanceof WebGL2RenderingContext) {
	            gl.deleteVertexArray(this._handle);
	            return;
	        }
	        var ext = extensions_1["default"].get("OES_vertex_array_object");
	        if (ext) {
	            ext.deleteVertexArrayOES(this._handle);
	        }
	    };
	    /**
	     * Check if current context supports VertexArray
	     * @return {boolean} True if current context supports VertexArray
	     */
	    VertexArray.isSupported = function () {
	        return gl instanceof WebGL2RenderingContext ||
	            extensions_1["default"].get("OES_vertex_array_object");
	    };
	    return VertexArray;
	}());
	;
	exports.__esModule = true;
	exports["default"] = VertexArray;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/core.ts" />
	var core_1 = __webpack_require__(2);
	"use strict";
	var gl = core_1["default"].getInstance().getGL();
	// TODO: UNUSED
	var extensions;
	(function (extensions) {
	    /**
	     * [_extensions description]
	     * @type {Object}
	     */
	    var _extensions = {};
	    /**
	     * [get description]
	     * @param {string} name [description]
	     */
	    function get(name) {
	        if (name in _extensions) {
	            return _extensions[name];
	        }
	        var ext = gl.getExtension(name) || gl.getExtension("WEBKIT_" + name) || gl.getExtension("MOZ_" + name);
	        if (ext === null) {
	            console.warn(name + " extension not supported.");
	            return;
	        }
	        _extensions[name] = ext;
	        return ext;
	    }
	    extensions.get = get;
	})(extensions || (extensions = {}));
	;
	exports.__esModule = true;
	exports["default"] = extensions;
	// const ext = gl_.getExtension("OES_draw_buffers_indexed");
	// console.log(ext);
	/*let arr = [
	    'OES_element_index_uint',
	    'EXT_sRGB',
	    'EXT_blend_minmax',
	    'EXT_frag_depth',
	    'WEBGL_depth_texture',
	    'WEBKIT_WEBGL_depth_texture',
	    'EXT_shader_texture_lod',
	    'OES_standard_derivatives',
	    'OES_texture_float',
	    'OES_texture_half_float',
	    'OES_texture_half_float_linear',
	    'OES_vertex_array_object',
	    'WEBGL_draw_buffers',
	    'OES_fbo_render_mipmap',
	    'ANGLE_instanced_arrays'
	];
	
	arr.forEach((v: string) => {
	    console.log(v);
	    console.log(gl_.getExtension(v));
	});*/


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/core.ts" />
	/// <reference path="../constants/_constants.ts" />
	var core_1 = __webpack_require__(2);
	var BufferType_1 = __webpack_require__(18);
	var UsageType_1 = __webpack_require__(19);
	"use strict";
	// TODO: Move to core
	var gl = core_1["default"].getInstance().getGL();
	var VertexBuffer = (function () {
	    /**
	     * Vertex buffer constructor
	     * @param {BufferType = BufferType.Array}
	     */
	    function VertexBuffer(type) {
	        if (type === void 0) { type = BufferType_1["default"].Array; }
	        /**
	         * [_type description]
	         * @type {BufferType}
	         */
	        this._type = BufferType_1["default"].Array;
	        this._buffer = gl.createBuffer();
	        this._type = type;
	        this.bind();
	    }
	    /**
	     * [bind description]
	     * @param {BufferType} type [description]
	     */
	    VertexBuffer.prototype.bind = function (type) {
	        if (type !== undefined) {
	            this._type = type;
	        }
	        gl.bindBuffer(this._type, this._buffer);
	    };
	    /**
	     * [unbind description]
	     */
	    VertexBuffer.prototype.unbind = function () {
	        gl.bindBuffer(this._type, null);
	    };
	    /**
	     * [getBufferType description]
	     * @return {BufferType} [description]
	     */
	    VertexBuffer.prototype.getBufferType = function () {
	        return this._type;
	    };
	    /**
	     * [getBuffer description]
	     * @return {WebGLBuffer} [description]
	     */
	    VertexBuffer.prototype.getBuffer = function () {
	        return this._buffer;
	    };
	    /**
	     * [destroy description]
	     */
	    VertexBuffer.prototype.destroy = function () {
	        gl.bindBuffer(this._type, 0);
	        if (!this._buffer) {
	            gl.deleteBuffer(this._buffer);
	        }
	        this._buffer = null;
	    };
	    /**
	     * [bufferData description]
	     * @param {Float32Array | Uint16Array}          data  [description]
	     * @param {UsageType    = UsageType.StaticDraw} usage [description]
	     */
	    VertexBuffer.prototype.bufferData = function (data, usage) {
	        if (usage === void 0) { usage = UsageType_1["default"].StaticDraw; }
	        this.bind();
	        gl.bufferData(this._type, data, usage);
	    };
	    /**
	     * [attribDivisor description]
	     * @param {number}    position [description]
	     * @param {number}    length   [description]
	     * @param {number}    divisor  [description]
	     * @param {number =        0}           stride [description]
	     */
	    VertexBuffer.prototype.attribDivisor = function (position, length, divisor, stride) {
	        if (stride === void 0) { stride = 0; }
	        this.bind();
	        gl.enableVertexAttribArray(position);
	        gl.vertexAttribPointer(position, length, gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
	        gl.vertexAttribDivisor(position, divisor);
	    };
	    /**
	     * [vertexAttribPointer description]
	     * @param {number}     attribLocation [description]
	     * @param {number}     numElems       [description]
	     * @param {number}     type           [description]
	     * @param {boolean =              false}       normalized [description]
	     * @param {number  =              0}           offset     [description]
	     */
	    VertexBuffer.prototype.vertexAttribPointer = function (attribLocation, numElems, type, normalized, offset) {
	        if (normalized === void 0) { normalized = false; }
	        if (offset === void 0) { offset = 0; }
	        this.bind();
	        gl.enableVertexAttribArray(attribLocation);
	        gl.vertexAttribPointer(attribLocation, // Attribute location
	        numElems, // Number of elements per attribute
	        type, // Type of elements
	        normalized, numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
	        offset // Offset from the beginning of a single vertex to this attribute
	        );
	    };
	    return VertexBuffer;
	}());
	exports.__esModule = true;
	exports["default"] = VertexBuffer;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/context.ts" />
	var context_1 = __webpack_require__(3);
	"use strict";
	var gl = context_1["default"].getContext();
	// Array buffer type
	var BufferType;
	(function (BufferType) {
	    BufferType[BufferType["Array"] = gl.ARRAY_BUFFER] = "Array";
	    BufferType[BufferType["ElementArray"] = gl.ELEMENT_ARRAY_BUFFER] = "ElementArray";
	    BufferType[BufferType["TransformFeedback"] = gl.TRANSFORM_FEEDBACK_BUFFER] = "TransformFeedback";
	    BufferType[BufferType["Uniform"] = gl.UNIFORM_BUFFER] = "Uniform";
	    BufferType[BufferType["PixelPack"] = gl.PIXEL_PACK_BUFFER] = "PixelPack";
	    BufferType[BufferType["PixelUnpack"] = gl.PIXEL_UNPACK_BUFFER] = "PixelUnpack";
	    BufferType[BufferType["CopyRead"] = gl.COPY_READ_BUFFER] = "CopyRead";
	    BufferType[BufferType["CopyWrite"] = gl.COPY_WRITE_BUFFER] = "CopyWrite";
	})(BufferType || (BufferType = {}));
	;
	exports.__esModule = true;
	exports["default"] = BufferType;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/context.ts" />
	var context_1 = __webpack_require__(3);
	"use strict";
	var gl = context_1["default"].getContext();
	// Usage type
	var UsageType;
	(function (UsageType) {
	    UsageType[UsageType["StaticDraw"] = gl.STATIC_DRAW] = "StaticDraw";
	    UsageType[UsageType["DynamicDraw"] = gl.DYNAMIC_DRAW] = "DynamicDraw";
	    UsageType[UsageType["StreamDraw"] = gl.STREAM_DRAW] = "StreamDraw";
	    UsageType[UsageType["StaticRead"] = gl.STATIC_READ] = "StaticRead";
	    UsageType[UsageType["DynamicRead"] = gl.DYNAMIC_READ] = "DynamicRead";
	    UsageType[UsageType["StreamRead"] = gl.STREAM_READ] = "StreamRead";
	    UsageType[UsageType["StaticCopy"] = gl.STATIC_COPY] = "StaticCopy";
	    UsageType[UsageType["DynamicCopy"] = gl.DYNAMIC_COPY] = "DynamicCopy";
	    UsageType[UsageType["StreamCopy"] = gl.STREAM_COPY] = "StreamCopy";
	})(UsageType || (UsageType = {}));
	;
	exports.__esModule = true;
	exports["default"] = UsageType;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="drawable.ts" />
	var drawable_1 = __webpack_require__(14);
	"use strict";
	/**
	 * Mesh class
	 * @class Mesh
	 */
	var Mesh = (function (_super) {
	    __extends(Mesh, _super);
	    /**
	     * Mesh definition
	     * @param {string} fileRoute: Json file route
	     */
	    function Mesh(fileRoute) {
	        _super.call(this);
	        this.loadJSON(fileRoute);
	    }
	    /**
	     * Vao construction
	     * @param {[type]} model: Model object in JSON format
	     * @param {[type]} el: Indices array
	     */
	    Mesh.prototype.createVAO = function (model, el) {
	        this._handle = [];
	        this._vao.bind();
	        // console.log(model.meshes[0]);
	        if (model.meshes[0].vertices) {
	            var verts = model.meshes[0].vertices;
	            this.addBufferArray(0, new Float32Array(verts), 3);
	        }
	        if (model.meshes[0].normals) {
	            var norms = model.meshes[0].normals;
	            this.addBufferArray(1, new Float32Array(norms), 3);
	        }
	        if (model.meshes[0].texturecoords) {
	            var tc = model.meshes[0].texturecoords[0];
	            this.addBufferArray(2, new Float32Array(tc), 2);
	        }
	        this.addElementArray(new Uint16Array(el));
	        this._vao.unbind();
	        this._indicesLen = el.length;
	    };
	    /**
	     * Read JSON file
	     * @param {string} url: Json file route
	     */
	    Mesh.prototype.loadJSON = function (url) {
	        var request = new XMLHttpRequest();
	        request.open("GET", url, false);
	        var self = this;
	        request.onload = function () {
	            if (request.status < 200 || request.status > 299) {
	                console.log("Error: HTTP Status " + request.status + " on resource " + url);
	                return {};
	            }
	            else {
	                var modelObj = JSON.parse(request.responseText);
	                self.createVAO(modelObj, [].concat.apply([], modelObj.meshes[0].faces));
	            }
	        };
	        request.send();
	    };
	    return Mesh;
	}(drawable_1["default"]));
	;
	exports.__esModule = true;
	exports["default"] = Mesh;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="texture.ts" />
	/// <reference path="texOptions.ts" />
	/// <reference path="../extras/extensions.ts" />
	var core_1 = __webpack_require__(2);
	var texture_1 = __webpack_require__(22);
	var extensions_1 = __webpack_require__(16);
	"use strict";
	var gl = core_1["default"].getInstance().getGL();
	// TODO: Es necesario realmente el tamaño??
	var Texture2D = (function (_super) {
	    __extends(Texture2D, _super);
	    function Texture2D(data /*: ImageData*/, options, onSuccess) {
	        if (options === void 0) { options = {}; }
	        if (onSuccess === void 0) { onSuccess = null; }
	        _super.call(this, gl.TEXTURE_2D);
	        // options = options || {};
	        // TODO: Support compression
	        this._flipY = options["flipY"] === true;
	        this._handle = gl.createTexture();
	        var _internalformat = options["internalformat"] || gl.RGBA;
	        var _format = options["format"] || gl.RGBA;
	        var _type = options["type"] || gl.UNSIGNED_BYTE;
	        var _level = options["level"] || 0;
	        this._minFilter = options["minFilter"] || gl.NEAREST;
	        this._magFilter = options["magFilter"] || gl.NEAREST;
	        var wraps = options["wrap"] || [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];
	        this.bind();
	        gl.texImage2D(this._target, _level, // Level of details
	        _internalformat, // Internal format
	        _format, // Format
	        _type, // Size of each channel
	        data);
	        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, this._minFilter);
	        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, this._magFilter);
	        this.wrap(wraps);
	        /*// Prevent NPOT textures
	        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
	        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        // Prevents s-coordinate wrapping (repeating).
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        // Prevents t-coordinate wrapping (repeating).
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
	        if (onSuccess) {
	            onSuccess();
	        }
	    }
	    Texture2D.prototype.genMipMap = function () {
	        this.bind();
	        // TODO: Check NPOT??
	        gl.generateMipmap(this._target);
	    };
	    Texture2D.prototype.wrap = function (modes) {
	        if (modes.length !== 2) {
	            throw new Error("Must specify wrapS, wrapT modes");
	        }
	        this.bind();
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, modes[0]);
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, modes[1]);
	        this._wraps = modes;
	    };
	    Texture2D.prototype.minFilter = function (filter) {
	        this.bind();
	        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, filter);
	        this._minFilter = filter;
	    };
	    Texture2D.prototype.magFilter = function (filter) {
	        this.bind();
	        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, filter);
	        this._magFilter = filter;
	    };
	    Texture2D.prototype.bind = function (slot) {
	        if (typeof slot === "number") {
	            gl.activeTexture(gl.TEXTURE0 + slot);
	        }
	        gl.bindTexture(this._target, this._handle);
	    };
	    Texture2D.prototype.unbind = function () {
	        gl.bindTexture(this._target, null);
	    };
	    Texture2D.prototype.destroy = function () {
	        gl.deleteTexture(this._handle);
	        this._handle = null;
	    };
	    /*public setPixelStorage() {
	        //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha)
	        //gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment)
	        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY)
	    }*/
	    /**
	     * Set texture anisotropic level
	     * @param {number = 0} level: Anisotropic level
	     */
	    Texture2D.prototype.setAnisotropic = function (level) {
	        if (level === void 0) { level = 0; }
	        level = Math.floor(level);
	        var ext = extensions_1["default"].get("EXT_texture_filter_anisotropic");
	        var max_anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
	        if (max_anisotropy < level) {
	            gl.texParameterf(this._target, ext.TEXTURE_MAX_ANISOTROPY_EXT, level);
	        }
	    };
	    return Texture2D;
	}(texture_1["default"]));
	;
	exports.__esModule = true;
	exports["default"] = Texture2D;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/core.ts" />
	/// <reference path="../maths/vector2.ts" />
	var core_1 = __webpack_require__(2);
	"use strict";
	// TODO: Redimension
	var Texture = (function () {
	    function Texture(target) {
	        this._target = target;
	    }
	    Texture.prototype.handle = function () {
	        return this._handle;
	    };
	    Texture.prototype.setLOD = function (lod) {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.texParameterf(this._target, gl.TEXTURE_MIN_LOD, lod);
	        gl.texParameterf(this._target, gl.TEXTURE_MAX_LOD, lod);
	    };
	    // TODO: Move to abstract methods
	    Texture.prototype.getHeight = function () { return -1; };
	    Texture.prototype.getWidth = function () { return -1; };
	    return Texture;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Texture;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="texture.ts" />
	/// <reference path="texOptions.ts" />
	var core_1 = __webpack_require__(2);
	var texture_1 = __webpack_require__(22);
	"use strict";
	var gl = core_1["default"].getInstance().getGL();
	var SimpleTexture2D = (function (_super) {
	    __extends(SimpleTexture2D, _super);
	    function SimpleTexture2D(size, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, gl.TEXTURE_2D);
	        options = options || {};
	        this._handle = gl.createTexture();
	        // TODO: Support compression
	        this._flipY = options.flipY === true;
	        var _internalformat = options.internalFormat || gl.RGBA;
	        var _format = options.format || gl.RGBA;
	        var _type = options.type || gl.UNSIGNED_BYTE;
	        var _level = options.level || 0;
	        this._minFilter = options.minFilter || gl.NEAREST;
	        this._magFilter = options.magFilter || gl.NEAREST;
	        var wraps = [
	            options.wrapS || gl.CLAMP_TO_EDGE,
	            options.wrapT || gl.CLAMP_TO_EDGE,
	        ];
	        this.bind();
	        gl.texImage2D(this._target, _level, // Level of details
	        _internalformat, // Internal format
	        size.x, size.y, 0, _format, // Format
	        _type, // Size of each channel
	        null);
	        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, this._minFilter);
	        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, this._magFilter);
	        this.wrap(wraps);
	        /*// Prevent NPOT textures
	        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
	        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        // Prevents s-coordinate wrapping (repeating).
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        // Prevents t-coordinate wrapping (repeating).
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
	    }
	    SimpleTexture2D.prototype.genMipMap = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        this.bind();
	        // TODO: Check NPOT??
	        gl.generateMipmap(this._target);
	    };
	    SimpleTexture2D.prototype.wrap = function (modes) {
	        if (modes.length !== 2) {
	            throw new Error("Must specify wrapS, wrapT modes");
	        }
	        this.bind();
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, modes[0]);
	        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, modes[1]);
	        this._wraps = modes;
	    };
	    SimpleTexture2D.prototype.minFilter = function (filter) {
	        this.bind();
	        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, filter);
	        this._minFilter = filter;
	    };
	    SimpleTexture2D.prototype.magFilter = function (filter) {
	        this.bind();
	        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, filter);
	        this._magFilter = filter;
	    };
	    SimpleTexture2D.prototype.bind = function (slot) {
	        if (typeof slot === "number") {
	            gl.activeTexture(gl.TEXTURE0 + slot);
	        }
	        gl.bindTexture(this._target, this._handle);
	    };
	    SimpleTexture2D.prototype.unbind = function () {
	        gl.bindTexture(this._target, null);
	    };
	    SimpleTexture2D.prototype.destroy = function () {
	        gl.deleteTexture(this._handle);
	        this._handle = null;
	    };
	    return SimpleTexture2D;
	}(texture_1["default"]));
	;
	exports.__esModule = true;
	exports["default"] = SimpleTexture2D;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="core.ts" />
	/// <reference path="../constants/ProgramCte.ts" />
	var core_1 = __webpack_require__(2);
	var ProgramCte_1 = __webpack_require__(25);
	"use strict";
	/**
	 * Program class
	 * @class Program
	 */
	var Program = (function () {
	    function Program() {
	        this.uniformLocations = {};
	        this.attribLocations = {};
	        this._shaders = [];
	    }
	    /**
	     * @param {string[]}
	     */
	    Program.prototype.addAttributesArgs = function () {
	        var attrs = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            attrs[_i - 0] = arguments[_i];
	        }
	        this.addAttributes(attrs);
	    };
	    /**
	     * @param {Array<string>}
	     */
	    Program.prototype.addAttributes = function (attrs) {
	        var gl = core_1["default"].getInstance().getGL();
	        for (var attr in attrs) {
	            attr = attrs[attr];
	            var attrID = gl.getAttribLocation(this._compiledShader, attr);
	            if (attrID < 0) {
	                console.error(attr + " undefined");
	                continue;
	            }
	            this.attribLocations[attr] = attrID;
	        }
	    };
	    /**
	     * @param {string[]}
	     */
	    Program.prototype.addUniformsArgs = function () {
	        var unifs = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            unifs[_i - 0] = arguments[_i];
	        }
	        this.addUniforms(unifs);
	    };
	    /**
	     * @param {Array<string>}
	     */
	    Program.prototype.addUniforms = function (unifs) {
	        var gl = core_1["default"].getInstance().getGL();
	        for (var unif in unifs) {
	            unif = unifs[unif];
	            var unifID = gl.getUniformLocation(this._compiledShader, unif);
	            if (unifID < 0) {
	                console.error(unif + " undefined");
	                continue;
	            }
	            this.uniformLocations[unif] = unifID;
	        }
	    };
	    /**
	     * @return {WebGLProgram}
	     */
	    Program.prototype.program = function () {
	        return this._compiledShader;
	    };
	    /**
	     * @param {string}
	     * @param {shader_type}
	     * @param {mode}
	     */
	    Program.prototype.addShader = function (shader_, /*type: number*/ st, _mode) {
	        var gl = core_1["default"].getInstance().getGL();
	        var shader;
	        var type = -1;
	        if (st === ProgramCte_1["default"].shader_type.vertex) {
	            type = gl.VERTEX_SHADER;
	        }
	        else if (st === ProgramCte_1["default"].shader_type.fragment) {
	            type = gl.FRAGMENT_SHADER;
	        }
	        if (type < 0) {
	            throw new Error("SHADER TYPE UNDEFINED");
	        }
	        if (_mode === ProgramCte_1["default"].mode.read_file) {
	            shader = this.loadAndCompileWithFile(shader_, type);
	        }
	        else if (_mode === ProgramCte_1["default"].mode.read_script) {
	            shader = this.loadAndCompile(shader_, type);
	        }
	        else if (_mode === ProgramCte_1["default"].mode.read_text) {
	            shader = this.loadAndCompileFromText(shader_, type);
	        }
	        this._shaders.push(shader);
	    };
	    Program.prototype._compile = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        // Create and compile shader
	        this._compiledShader = gl.createProgram();
	        for (var i = 0; i < this._shaders.length; ++i) {
	            gl.attachShader(this._compiledShader, this._shaders[i]);
	        }
	    };
	    Program.prototype._link = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.linkProgram(this._compiledShader);
	        // Checkin errors
	        if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
	            alert("ERROR");
	            console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
	            console.log({
	                vertex: this._vertexSource,
	                fragment: this._fragmentSource
	            });
	            throw "SHADER ERROR";
	        }
	        return true;
	    };
	    /**
	     * Compile and link program
	     * @return {boolean}: True if not errors
	     */
	    Program.prototype.compile = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        // Create and compile shader
	        this._compiledShader = gl.createProgram();
	        for (var i = 0; i < this._shaders.length; ++i) {
	            gl.attachShader(this._compiledShader, this._shaders[i]);
	        }
	        gl.linkProgram(this._compiledShader);
	        // Checkin errors
	        if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
	            alert("ERROR");
	            console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
	            console.log({
	                vertex: this._vertexSource,
	                fragment: this._fragmentSource
	            });
	            throw "SHADER ERROR";
	        }
	        return true;
	    };
	    /**
	     * @param {string}
	     * @param {number}
	     */
	    Program.prototype.loadAndCompileWithFile = function (filePath, shaderType) {
	        var request = new XMLHttpRequest();
	        request.open("GET", filePath, false);
	        try {
	            request.send();
	        }
	        catch (err) {
	            alert("ERROR: " + filePath);
	            console.log("ERROR: " + filePath);
	            return null;
	        }
	        var shaderSource = request.responseText;
	        if (shaderSource === null) {
	            alert("WARNING: " + filePath + " failed");
	            console.log(this._fragmentSource);
	            throw "SHADER ERROR";
	        }
	        return this.compileShader(shaderSource, shaderType);
	    };
	    /**
	     * @param {string}
	     * @param {number}
	     */
	    Program.prototype.loadAndCompileFromText = function (shaderSource, shaderType) {
	        if (shaderSource === null) {
	            alert("WARNING: " + shaderSource + " failed");
	            console.log(this._fragmentSource);
	            throw "SHADER ERROR";
	        }
	        return this.compileShader(shaderSource, shaderType);
	    };
	    /**
	     * @param {string}
	     * @param {number}
	     */
	    Program.prototype.loadAndCompile = function (id, shaderType) {
	        var shaderText, shaderSource;
	        // Get shader from index.html
	        shaderText = document.getElementById(id);
	        shaderSource = shaderText.firstChild.textContent;
	        if (shaderSource === null) {
	            alert("WARNING: " + id + " failed");
	            console.log(this._fragmentSource);
	            throw "SHADER ERROR";
	        }
	        return this.compileShader(shaderSource, shaderType);
	    };
	    /**
	     * @param {string}
	     * @param {number}
	     */
	    Program.prototype.compileShader = function (shaderSource, shaderType) {
	        var gl = core_1["default"].getInstance().getGL();
	        var compiledShader;
	        if (shaderType === gl.VERTEX_SHADER) {
	            this._vertexSource = shaderSource;
	        }
	        else if (shaderType === gl.FRAGMENT_SHADER) {
	            this._fragmentSource = shaderSource;
	        }
	        // Create shader
	        compiledShader = gl.createShader(shaderType);
	        // Compilate shader
	        gl.shaderSource(compiledShader, shaderSource);
	        gl.compileShader(compiledShader);
	        // Check errors
	        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
	            alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
	            console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
	            console.log({
	                vertex: this._vertexSource,
	                fragment: this._fragmentSource
	            });
	            throw "SHADER ERROR";
	        }
	        return compiledShader;
	    };
	    /**
	     *
	     */
	    Program.prototype.use = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.useProgram(this._compiledShader);
	    };
	    /**
	     *
	     */
	    Program.prototype.destroy = function () {
	        var _this = this;
	        var gl = core_1["default"].getInstance().getGL();
	        this._shaders.forEach(function (shader) {
	            gl.detachShader(_this.compileShader, shader);
	        });
	        gl.deleteShader(this._compiledShader);
	    };
	    /*
	    protected getPropSetter(path, location, type) {
	        // Check primitive types
	        switch (type) {
	            case "bool":
	            case "int":
	                return "gl.uniform1i(location, value)";
	            case "float":
	                return "gl.uniform1f(location, value)";
	            case "uint":
	                return "gl.uniform1ui(location, value)";
	        }
	
	        // Check sampler type
	        if (/^(u|i)?sampler(2D|3D|Cube|2DArray)$/.test(type)) {
	            return 'gl.uniform1i(location, value)'
	        }
	
	        // Check complex matrix type
	        if (/^mat[0-9]x[0-9]$/.test(type)) {
	            let dims = type.substring(type.length - 3)
	            return 'gl.uniformMatrix' + dims + 'fv(location, Boolean(transposed), value)'
	        }
	
	        // Checksimple type
	        let vecIdx = type.indexOf('vec');
	        let count = parseInt(type.charAt(type.length - 1), 10) || -1;
	
	        if ((vecIdx === 0 || vecIdx === 1) && (count >= 1 && count <= 4)) {
	            let vtype = type.charAt('0')
	            switch (vtype) {
	                case 'b':
	                case 'i':
	                    return 'gl.uniform' + count + 'iv(location, value)';
	                case 'u':
	                    return 'gl.uniform' + count + 'uiv(locaiton, value)';
	                case 'v': // regular vecN
	                    return 'gl.uniform' + count + 'fv(location, value)';
	                default:
	                    throw new Error('unrecognized uniform type ' + type + ' for ' + path);
	            }
	        }
	
	        let matIdx = type.indexOf('mat');
	        count = parseInt(type.charAt(type.length - 1), 10) || -1;
	        console.log(count);
	
	        if ((matIdx === 0 || matIdx === 1) && (count >= 2 && count <= 4)) {
	            return 'gl.uniformMatrix' + count + 'fv(location, Boolean(transposed), value)';
	        }
	        throw new Error('unrecognized uniform type ' + type + ' for ' + path);
	    }
	
	    public sendUniform(uniform, type) {
	        let path = uniform;
	        let location = this.uniformLocations[path];
	        let setter = this.getPropSetter(path, location, type);
	
	        let srcfn = `
	        return function uniformGetSet (value, transposed) {
	            transposed = typeof transposed !== 'undefined' ? transposed: false;
	            location = prog.uniformLocations[name];
	                if (!location) {
	                    prog.addUniforms([name]);
	                    location = prog.uniformLocations[name];
	                }
	                if (location) {
	                    ${setter}
	                    //console.log("SENDED");
	                } else {
	                    //console.error("ERROR");
	                }
	        }`;
	
	        let generated = new Function('prog', 'gl', 'name', 'location', srcfn);
	        const gl = Core.getInstance().getGL();
	        return generated(this, gl, uniform, location);
	    }*/
	    /**
	     * @param {string}
	     * @param {number}
	     */
	    Program.prototype.sendUniform1f = function (name, value) {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.uniform1f(this.uniformLocations[name], value);
	    };
	    /**
	     * @param {string}
	     * @param {number}
	     */
	    Program.prototype.sendUniform1i = function (name, value) {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.uniform1i(this.uniformLocations[name], value);
	    };
	    /**
	     * @param {string}
	     * @param {boolean}
	     */
	    Program.prototype.sendUniform1b = function (name, value) {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
	    };
	    /**
	     * @param {string}
	     * @param {Float32Array}
	     */
	    Program.prototype.sendUniformVec3 = function (name, value) {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.uniform3fv(this.uniformLocations[name], value);
	    };
	    /**
	     * @param {string}
	     * @param {Float32Array}
	     * @param {boolean   = false}
	     */
	    Program.prototype.sendUniformMat4 = function (name, value, transpose) {
	        if (transpose === void 0) { transpose = false; }
	        var gl = core_1["default"].getInstance().getGL();
	        gl.uniformMatrix4fv(this.uniformLocations[name], transpose, value);
	    };
	    return Program;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Program;


/***/ },
/* 25 */
/***/ function(module, exports) {

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
	var ProgramCte;
	(function (ProgramCte) {
	    (function (mode) {
	        mode[mode["read_file"] = 0] = "read_file";
	        mode[mode["read_script"] = 1] = "read_script";
	        mode[mode["read_text"] = 2] = "read_text";
	    })(ProgramCte.mode || (ProgramCte.mode = {}));
	    var mode = ProgramCte.mode;
	    ;
	    (function (shader_type) {
	        shader_type[shader_type["vertex"] = 0] = "vertex";
	        shader_type[shader_type["fragment"] = 1] = "fragment";
	    })(ProgramCte.shader_type || (ProgramCte.shader_type = {}));
	    var shader_type = ProgramCte.shader_type;
	})(ProgramCte || (ProgramCte = {}));
	;
	exports.__esModule = true;
	exports["default"] = ProgramCte;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="core.ts" />
	/// <reference path="../textures/texture.ts" />
	/// <reference path="../textures/simpleTexture2D.ts" />
	/// <reference path="../textures/renderBufferTexture.ts" />
	/// <reference path="..//maths/vector2.ts" />
	///
	var core_1 = __webpack_require__(2);
	var renderBufferTexture_1 = __webpack_require__(27);
	"use strict";
	var gl = core_1["default"].getInstance().getGL();
	// TODO: Redimension
	// TODO: Blit FBO (https://www.opengl.org/wiki/Framebuffer#Blitting)
	var Framebuffer = (function () {
	    // TODO: Stencil unused
	    function Framebuffer(textures, size, depth, stencil, options) {
	        if (depth === void 0) { depth = false; }
	        if (stencil === void 0) { stencil = false; }
	        if (options === void 0) { options = {}; }
	        var numColors = textures.length;
	        if (numColors < 0) {
	            throw new Error("must specify >= 0 color attachments");
	        }
	        else if (numColors > 1) {
	            if (numColors > gl.getParameter(gl.MAX_COLOR_ATTACHMENTS)) {
	                throw new Error("GL context doesn\u00B4t support " + numColors + " color attachments");
	            }
	        }
	        options = options || {};
	        this._colors = textures;
	        this._size = size;
	        this._handle = gl.createFramebuffer();
	        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
	        // Each textures to fbo
	        textures.forEach(function (texture, i) {
	            texture.bind();
	            // Only supported simple textures
	            // TODO: Cubemap or texture3D
	            var target = texture._target;
	            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, target, texture.handle(), 0);
	            texture.unbind(); // TODO: Unbind debería ser un abstract de texture
	        });
	        // TODO: Check no texture attachments (default render buffer storage)
	        if (depth) {
	            this._renderBuffer = new renderBufferTexture_1["default"](size, gl.DEPTH_COMPONENT16, gl.DEPTH_ATTACHMENT);
	        }
	        /**
	        // TODO
	        if (depth && stencil) {
	            this._depth = new SimpleTexture2D(size, {
	                type: (<any>gl).UNSIGNED_INT_24_8,
	                format: gl.DEPTH_STENCIL
	            });
	            let target = this._depth.target;
	
	            gl.framebufferTexture2D(gl.FRAMEBUFFER,
	                gl.DEPTH_STENCIL_ATTACHMENT,
	                target,
	                this._depth.handle(), 0);
	        } else if (depth && !stencil) {
	            this._depth = new SimpleTexture2D(size, {
	                type: (<any>gl).UNSIGNED_SHORT,
	                format: gl.DEPTH_COMPONENT
	            });
	            let target = this._depth.target;
	
	            gl.framebufferTexture2D(gl.FRAMEBUFFER,
	                gl.DEPTH_ATTACHMENT,
	                target,
	                this._depth.handle(), 0);
	        } else {
	            this._renderBuffer = new RenderBufferTexture(
	                size,
	                gl.STENCIL_INDEX,
	                gl.STENCIL_ATTACHMENT
	            );
	        }
	        /**/
	        if (numColors > 1) {
	            var drawBuffs = [];
	            for (var i = 0; i < numColors; ++i) {
	                drawBuffs.push(gl.COLOR_ATTACHMENT0 + i);
	            }
	            gl.drawBuffers(drawBuffs);
	        }
	        // Check status
	        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	        if (status !== gl.FRAMEBUFFER_COMPLETE) {
	            this.destroy();
	            this.checkStatus(status);
	        }
	        this.unbind();
	    }
	    Framebuffer.prototype.checkStatus = function (status) {
	        switch (status) {
	            case gl.FRAMEBUFFER_UNSUPPORTED:
	                throw new Error("framebuffer: Framebuffer unsupported");
	            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
	                throw new Error("framebuffer: Framebuffer incomplete attachment");
	            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
	                throw new Error("framebuffer: Framebuffer incomplete dimensions");
	            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
	                throw new Error("framebuffer: Framebuffer incomplete missing attachment");
	            default:
	                throw new Error("framebuffer: Framebuffer failed for unspecified reason");
	        }
	    };
	    Framebuffer.prototype.bind = function () {
	        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
	    };
	    Framebuffer.prototype.onlyBindTextures = function () {
	        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	        this._colors.forEach(function (tex, idx) {
	            tex.bind(idx);
	        });
	    };
	    Framebuffer.prototype.unbind = function () {
	        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	    };
	    Framebuffer.prototype.rebuild = function (size) {
	        if (!size.isEqual(this._size)) {
	        }
	    };
	    Framebuffer.prototype.destroy = function () {
	        var oldBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
	        if (oldBinding === this._handle) {
	            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	        }
	        this._colors.forEach(function (texture) {
	            texture.destroy();
	        });
	        gl.deleteFramebuffer(this._handle);
	        // Destroy depth/stencil
	        if (this._renderBuffer) {
	            this._renderBuffer.destroy();
	            this._renderBuffer = null;
	        }
	        // Destroy depth
	        if (this._depth) {
	            this._depth.destroy();
	            this._depth = null;
	        }
	    };
	    return Framebuffer;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Framebuffer;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../maths/vector2.ts" />
	/// <reference path="../core/Core.ts" />
	var core_1 = __webpack_require__(2);
	"use strict";
	var gl = core_1["default"].getInstance().getGL();
	var RenderBufferTexture = (function () {
	    function RenderBufferTexture(size, format, attachment) {
	        this._handle = gl.createRenderbuffer();
	        gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
	        gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
	        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, this._handle);
	        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	    }
	    RenderBufferTexture.prototype.destroy = function () {
	        gl.deleteTexture(this._handle);
	    };
	    return RenderBufferTexture;
	}());
	;
	exports.__esModule = true;
	exports["default"] = RenderBufferTexture;


/***/ },
/* 28 */
/***/ function(module, exports) {

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
	"use strict";
	;
	;
	var ProgramManager;
	(function (ProgramManager) {
	    /**
	     * [Program cache]
	     */
	    var _progDictionary = {};
	    /**
	     * Get program from name
	     * @param  {string} name: Program name
	     * @return {Program}
	     */
	    function get(name) {
	        var prog = _progDictionary[name];
	        if (!prog) {
	            throw new Error("Program " + name + " undefined");
	        }
	        return prog;
	    }
	    ProgramManager.get = get;
	    /**
	     * Execute a callback function using the specified program (name).
	     * @param  {string} name: Program name
	     * @param {ProgramUseCallback}: Function to execute
	     */
	    function getCB(name, cb) {
	        var prog = get(name);
	        if (!prog) {
	            throw new Error("Program " + name + " undefined");
	        }
	        cb(prog);
	    }
	    ProgramManager.getCB = getCB;
	    /**
	     * Add a new program with his name and a function that creates the program.
	     * @param {string} name: Program name
	     * @param {ProgramCallback}: Function that creates the program (return program)
	     */
	    function addWithFun(name, fn) {
	        add(name, fn());
	    }
	    ProgramManager.addWithFun = addWithFun;
	    /**
	     * Add a existing program with his name and the program.
	     * @param {string} name: Program name.
	     * @param {Program} prog: Existing program.
	     */
	    function add(name, prog) {
	        if (!prog) {
	            throw new Error("Program " + name + " undefined");
	        }
	        _progDictionary[name] = prog;
	    }
	    ProgramManager.add = add;
	    /**
	     * Destroy all programs and clear cache.
	     */
	    function destroy() {
	        for (var key in _progDictionary) {
	            _progDictionary[key].destroy();
	        }
	        _progDictionary = {};
	    }
	    ProgramManager.destroy = destroy;
	})(ProgramManager || (ProgramManager = {}));
	;
	exports.__esModule = true;
	exports["default"] = ProgramManager;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="resourceMap.ts" />
	var resourceMap_1 = __webpack_require__(11);
	"use strict";
	var loaders;
	(function (loaders) {
	    function _getAlias(imageSrc, alias) {
	        return (alias.length < 1) ? imageSrc : alias;
	    }
	    function loadVideo(videoSrc, alias) {
	        if (alias === void 0) { alias = ""; }
	        /*alias = _getAlias(videoSrc, alias);
	        if (!ResourceMap.isAssetLoaded(alias)) {
	            // Update resources in load counter
	            ResourceMap.asyncLoadRequested(alias);
	
	            // Async request the data from server
	            let request = new XMLHttpRequest();
	            request.open("GET", videoSrc, true);
	
	            request.responseType = "arraybuffer";
	
	            request.onload = function () {
	                // Asynchronously decode, then call the function in parameter.
	                var video: HTMLVideoElement = <HTMLVideoElement> document.createElement(alias);
	                video.src = videoSrc;
	                ResourceMap.asyncLoadCompleted(alias, video);
	            }.bind(this);
	
	            request.send();
	        }*/
	        /*// Create HTML Video Element to play the video
	        var video = document.createElement('video');
	        video.addEventListener('canplay', function (e) {
	            videoTexture.setSource(video);
	        });
	        video.src = this.videoUrl;
	        video.crossOrigin = 'anonymous';
	        video.loop = true;
	        video.play();*/
	    }
	    loaders.loadVideo = loadVideo;
	    /**
	     * @param {string}
	     * @param {string = ""}
	     */
	    function loadImage(imageSrc, alias) {
	        if (alias === void 0) { alias = ""; }
	        alias = _getAlias(imageSrc, alias);
	        if (!resourceMap_1["default"].isAssetLoaded(alias)) {
	            var img_1 = new Image();
	            resourceMap_1["default"].asyncLoadRequested(alias);
	            img_1.onload = function () {
	                // setTimeout(function() {
	                resourceMap_1["default"].asyncLoadCompleted(alias, img_1);
	                // }, 2500);
	            };
	            img_1.onerror = function (err) {
	                resourceMap_1["default"].asyncLoadFailed(alias);
	            };
	            img_1.src = imageSrc;
	        }
	        else {
	            resourceMap_1["default"].incAssetRefCount(alias);
	        }
	    }
	    loaders.loadImage = loadImage;
	    /**
	     * @param {string}
	     */
	    function unloadImage(imageSrc) {
	        resourceMap_1["default"].unloadAsset(imageSrc);
	    }
	    loaders.unloadImage = unloadImage;
	    /**
	     * @param {string}
	     */
	    function loadAudio(clipName, alias) {
	        if (alias === void 0) { alias = ""; }
	        alias = _getAlias(clipName, alias);
	        if (!(resourceMap_1["default"].isAssetLoaded(alias))) {
	            // Update resources in load counter
	            resourceMap_1["default"].asyncLoadRequested(alias);
	            // Async request the data from server
	            var request_1 = new XMLHttpRequest();
	            request_1.open("GET", clipName, true);
	            // Specify that the request retrieves binary data.
	            request_1.responseType = "arraybuffer";
	            request_1.onload = function () {
	                // Asynchronously decode, then call the function in parameter.
	                this._audioContext.decodeAudioData(request_1.response, function (buffer) {
	                    resourceMap_1["default"].asyncLoadCompleted(alias, buffer);
	                });
	            }.bind(this);
	            request_1.send();
	        }
	    }
	    loaders.loadAudio = loadAudio;
	    /**
	     * @param {string}
	     */
	    function unloadAudio(clipName) {
	        resourceMap_1["default"].unloadAsset(clipName);
	    }
	    loaders.unloadAudio = unloadAudio;
	    /**
	     * @param {string}
	     * @param {number}
	     * @param {number}
	     * @param {string = ""}
	     */
	    function loadHDRImage(imageSrc, width, height, alias) {
	        if (alias === void 0) { alias = ""; }
	        alias = _getAlias(imageSrc, alias);
	        if (!resourceMap_1["default"].isAssetLoaded(alias)) {
	            resourceMap_1["default"].asyncLoadRequested(alias);
	            // Async request the data from server
	            var request_2 = new XMLHttpRequest();
	            request_2.open("GET", imageSrc, true);
	            // Specify that the request retrieves binary data.
	            request_2.responseType = "arraybuffer";
	            request_2.onload = function () {
	                // Asynchronously decode, then call the function in parameter.
	                var arrayBuffer = request_2.response;
	                if (arrayBuffer) {
	                    var bytes = new Uint8Array(arrayBuffer);
	                    var data = new Float32Array(width * height * 3);
	                    var byteIdx = 0;
	                    // skip the main header (we already assume the format, width and height)
	                    for (; byteIdx < bytes.length; byteIdx++) {
	                        if (bytes[byteIdx] === 0x0A && bytes[byteIdx + 1] === 0x0A) {
	                            byteIdx = byteIdx + 2;
	                            break;
	                        }
	                    }
	                    // skip the resolution bit
	                    for (; byteIdx < bytes.length; byteIdx++) {
	                        if (bytes[byteIdx] === 0x0A) {
	                            byteIdx = byteIdx + 1;
	                            break;
	                        }
	                    }
	                    var idx = 0;
	                    for (var row = 0; row < height; row++) {
	                        for (var col = 0; col < width; col++) {
	                            var r = bytes[byteIdx++];
	                            var g = bytes[byteIdx++];
	                            var b = bytes[byteIdx++];
	                            var e = bytes[byteIdx++];
	                            var expFactor = Math.pow(2, e - 128);
	                            data[idx++] = (r / 256) * expFactor;
	                            data[idx++] = (g / 256) * expFactor;
	                            data[idx++] = (b / 256) * expFactor;
	                        }
	                    }
	                    resourceMap_1["default"].asyncLoadCompleted(alias, data);
	                }
	            }.bind(this);
	            request_2.send();
	        }
	        else {
	            resourceMap_1["default"].incAssetRefCount(alias);
	        }
	    }
	    loaders.loadHDRImage = loadHDRImage;
	    /**
	     * @param {string}
	     */
	    function unloadHDRImage(imageSrc) {
	        resourceMap_1["default"].unloadAsset(imageSrc);
	    }
	    loaders.unloadHDRImage = unloadHDRImage;
	})(loaders || (loaders = {}));
	;
	exports.__esModule = true;
	exports["default"] = loaders;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="light.ts" />
	var light_1 = __webpack_require__(31);
	var vector3_1 = __webpack_require__(33);
	"use strict";
	// TODO: Replace Vector3 to Vect3
	/**
	 * Point light class
	 * @class PointLight
	 */
	var PointLight = (function (_super) {
	    __extends(PointLight, _super);
	    /**
	     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
	     */
	    function PointLight(position) {
	        if (position === void 0) { position = new vector3_1["default"](0.0, 0.0, 0.0); }
	        _super.call(this);
	        this._position = position;
	    }
	    /**
	     * Get light position
	     * @return {Vector3<number>}
	     */
	    // TODO: get position(): Vector3<number> { return this._position; }
	    /**
	     * Set light position
	     * @param {Vector3<number>} position
	     */
	    // TODO: set position(position: Vector3<number>) { this._position = position; }
	    /**
	     * Increment position from current position
	     * @param {number = 0.0} x
	     * @param {number = 0.0} y
	     * @param {number = 0.0} z
	     */
	    PointLight.prototype.addTransform = function (x, y, z) {
	        if (x === void 0) { x = 0.0; }
	        if (y === void 0) { y = 0.0; }
	        if (z === void 0) { z = 0.0; }
	        this._position.x += x;
	        this._position.y += y;
	        this._position.z += z;
	    };
	    return PointLight;
	}(light_1["default"]));
	;
	exports.__esModule = true;
	exports["default"] = PointLight;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../extras/color.ts" />
	/// <reference path="../maths/vector3.ts" />
	var color_1 = __webpack_require__(32);
	var vector3_1 = __webpack_require__(33);
	"use strict";
	// TODO: Replace Vector3 to Vect3
	/**
	 * Light abstract class
	 * @class Light
	 */
	var Light = (function () {
	    function Light() {
	        this._intensity = 1.0;
	        this._color = new color_1["default"](1.0, 1.0, 1.0);
	        this._enable = true;
	        this._attenuation = new vector3_1["default"](1.0, // Constant
	        0.014, // Linear
	        0.0007 // Quadratic
	        );
	    }
	    /**
	     * Set constant attenuation value.
	     * @param {number} v: Constant attenuation value.
	     */
	    Light.prototype.setConstantAtt = function (value) {
	        this._attenuation.x = value;
	    };
	    /**
	     * Set linear attenuation value.
	     * @param {number} v: Linear attenuation value.
	     */
	    Light.prototype.setLinearAtt = function (value) {
	        this._attenuation.y = value;
	    };
	    /**
	     * Set quadratic attenuation value.
	     * @param {number} v: Quadratic attenuation value.
	     */
	    Light.prototype.setQuadraticAtt = function (value) {
	        this._attenuation.z = value;
	    };
	    return Light;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Light;


/***/ },
/* 32 */
/***/ function(module, exports) {

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
	// TODO: Change _color to Vector3
	"use strict";
	var Color = (function () {
	    /**
	     * [constructor description]
	     * @param {number} r [description]
	     * @param {number} g [description]
	     * @param {number} b [description]
	     */
	    function Color(r, g, b) {
	        /**
	         * [Array description]
	         * @param {[type]} 3 [description]
	         */
	        this._color = new Array(3);
	        this.setRGB(r, g, b);
	    }
	    /**
	     * @return {number}
	     */
	    // TODO: get r(): number { return this._color[0]; }
	    /**
	     * @return {number}
	     */
	    // TODO: get g(): number { return this._color[1]; }
	    /**
	     * @return {number}
	     */
	    // TODO: get b(): number { return this._color[2]; }
	    /**
	     * @param {number}
	     */
	    // TODO: set r(r: number) { this._color[0] = r; }
	    /**
	     * @param {number}
	     */
	    // TODO: set g(g: number) { this._color[1] = g; }
	    /**
	     * @param {number}
	     */
	    // TODO: set b(b: number) { this._color[2] = b; }
	    /**
	     * [setRGB description]
	     * @param  {number} r [description]
	     * @param  {number} g [description]
	     * @param  {number} b [description]
	     * @return {Color}    [description]
	     */
	    Color.prototype.setRGB = function (r, g, b) {
	        // this.r = r;
	        // this.g = g;
	        // this.b = b;
	        this._color[0] = r;
	        this._color[1] = g;
	        this._color[2] = b;
	        return this;
	    };
	    /**
	     * [toHSL description]
	     * @return {Color} [description]
	     */
	    Color.prototype.toHSL = function () {
	        var max = Math.max(this._color[0], this._color[1], this._color[2]), min = Math.min(this._color[0], this._color[1], this._color[2]);
	        var h, s, l = (max + min) / 2;
	        if (max === min) {
	            h = s = 0; // achromatic
	        }
	        else {
	            var d = max - min;
	            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	            switch (max) {
	                case this._color[0]:
	                    h = (this._color[1] - this._color[2]) / d +
	                        (this._color[1] < this._color[2] ? 6 : 0);
	                    break;
	                case this._color[1]:
	                    h = (this._color[2] - this._color[0]) / d + 2;
	                    break;
	                case this._color[2]:
	                    h = (this._color[0] - this._color[1]) / d + 4;
	                    break;
	            }
	            h /= 6;
	        }
	        return new Color(h, s, l);
	    };
	    return Color;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Color;


/***/ },
/* 33 */
/***/ function(module, exports) {

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
	/**
	 * Vector3<T> class
	 * @class Vector3<T>
	 */
	var Vector3 = (function () {
	    /**
	     * Vector3<T> constructor
	     * @param {T} x: First value
	     * @param {T} y: Second value
	     * @param {T} z: Third value
	     */
	    function Vector3(x, y, z) {
	        this.x = x;
	        this.y = y;
	        this.z = z;
	    }
	    /**
	     * Check if two vector3<T> are equals
	     * @param  {Vector3<T>} other: Second vector
	     * @return {boolean}: True if both equals
	     */
	    Vector3.prototype.isEqual = function (other) {
	        return this.x === other.x && this.y === other.y && this.z === other.z;
	    };
	    return Vector3;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Vector3;


/***/ },
/* 34 */
/***/ function(module, exports) {

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
	/**
	 * Vector2<T> class
	 * @class Vector2<T>
	 */
	var Vector2 = (function () {
	    /**
	     * Vector2<T> constructor
	     * @param {T} x: First value
	     * @param {T} y: Second value
	     */
	    function Vector2(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    /**
	     * Check if two vector2<T> are equals
	     * @param  {Vector2<T>} other: Second vector
	     * @return {boolean}: True if both equals
	     */
	    Vector2.prototype.isEqual = function (other) {
	        return this.x === other.x && this.y === other.y;
	    };
	    return Vector2;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Vector2;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="core/input.ts" />
	var input_1 = __webpack_require__(5);
	"use strict";
	var Camera2 = (function () {
	    function Camera2(position, up, yaw, pitch) {
	        if (position === void 0) { position = vec3.fromValues(0, 0, 0); }
	        if (up === void 0) { up = vec3.fromValues(0, 1, 0); }
	        if (yaw === void 0) { yaw = -90.0; }
	        if (pitch === void 0) { pitch = 0.0; }
	        // Camera options
	        this.movSpeed = 0.05;
	        this.mouseSensivity = 0.25;
	        this._updateCamera = false;
	        this.view = mat4.create();
	        this.proj = mat4.create();
	        this.front = vec3.fromValues(0, 0, -1);
	        this.position = position;
	        this.worldUp = up;
	        this.yaw = yaw;
	        this.pitch = pitch;
	        this.right = vec3.create();
	        this.up = vec3.create();
	        this.updateCameraVectors();
	    }
	    Camera2.prototype.GetPos = function () {
	        return this.position;
	    };
	    Camera2.prototype.update = function (callback) {
	        this._updateCamera = false;
	        var speed = 1.0;
	        if (input_1["default"].getInstance().isKeyPressed(input_1["default"].getInstance().keys.Left_Shift)) {
	            speed = 2.5;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(input_1["default"].getInstance().keys.W)) {
	            this.processKeyboard(4, speed);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(input_1["default"].getInstance().keys.S)) {
	            this.processKeyboard(5, speed);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(input_1["default"].getInstance().keys.A)) {
	            this.processKeyboard(2, speed);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(input_1["default"].getInstance().keys.D)) {
	            this.processKeyboard(3, speed);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(input_1["default"].getInstance().keys.E)) {
	            this.processKeyboard(0, speed);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(input_1["default"].getInstance().keys.Q)) {
	            this.processKeyboard(1, speed);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(38)) {
	            this.processMouseMovement(0.0, 2.5);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(40)) {
	            this.processMouseMovement(0.0, -2.5);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(37)) {
	            // this.processMouseMovement(2.5, 0.0);
	            this.processMouseMovement(-2.5, 0.0);
	            this._updateCamera = true;
	        }
	        if (input_1["default"].getInstance().isKeyPressed(39)) {
	            // this.processMouseMovement(-2.5, 0.0);
	            this.processMouseMovement(2.5, 0.0);
	            this._updateCamera = true;
	        }
	        if (this._updateCamera && callback) {
	            callback();
	        }
	    };
	    Camera2.prototype.processKeyboard = function (direction, speed) {
	        if (speed === void 0) { speed = 1.0; }
	        if (this.timeElapsed > 25) {
	            return;
	        }
	        var velocity = this.movSpeed * this.timeElapsed * speed;
	        // console.log(direction);
	        if (direction === 0) {
	            this.position = vec3.scaleAndAdd(this.position, this.position, this.front, velocity);
	        }
	        else if (direction === 1) {
	            this.position = vec3.scaleAndAdd(this.position, this.position, this.front, -velocity);
	        }
	        else if (direction === 2) {
	            this.position = vec3.scaleAndAdd(this.position, this.position, this.right, -velocity);
	        }
	        else if (direction === 3) {
	            this.position = vec3.scaleAndAdd(this.position, this.position, this.right, velocity);
	        }
	        else if (direction === 4) {
	            this.position = vec3.scaleAndAdd(this.position, this.position, this.up, velocity);
	        }
	        else if (direction === 5) {
	            this.position = vec3.scaleAndAdd(this.position, this.position, this.up, -velocity);
	        }
	    };
	    Camera2.prototype.processMouseMovement = function (xOffset, yOffset) {
	        xOffset *= this.movSpeed * 2.0 * this.timeElapsed;
	        yOffset *= this.movSpeed * 2.0 * this.timeElapsed;
	        this.yaw += xOffset;
	        this.pitch += yOffset;
	        if (this.pitch > 89.0) {
	            this.pitch = 89.0;
	        }
	        if (this.pitch < -89.0) {
	            this.pitch = -89.0;
	        }
	        this.updateCameraVectors();
	    };
	    Camera2.prototype.updateCameraVectors = function () {
	        var front = vec3.fromValues(Math.cos(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)));
	        this.front = vec3.normalize(this.front, front);
	        // Recalculate right and up vector
	        this.right = vec3.cross(this.right, this.front, this.worldUp);
	        this.right = vec3.normalize(this.right, this.right);
	        this.up = vec3.cross(this.up, this.right, this.front);
	        this.up = vec3.normalize(this.up, this.up);
	    };
	    Camera2.prototype.GetViewMatrix = function () {
	        var aux = vec3.create();
	        this.view = mat4.lookAt(this.view, this.position, vec3.add(aux, this.position, this.front), this.up);
	        return this.view;
	    };
	    Camera2.prototype.GetOrthoProjectionMatrix = function (w, h) {
	        var ymax = 0.001 * Math.tan(45.0 * Math.PI / 360);
	        var ymin = -ymax;
	        var xmin = ymin * (w * 1.0) / (h * 1.0);
	        var xmax = ymax * (w * 1.0) / (h * 1.0);
	        this.proj = mat4.ortho(this.proj, xmin, xmax, ymin, ymax, 0.001, 1000.0);
	        return this.proj;
	    };
	    Camera2.prototype.GetProjectionMatrix = function (w, h) {
	        this.proj = mat4.perspective(this.proj, 45.0, (w * 1.0) / (h * 1.0), 0.001, 1000.0);
	        // this.proj = mat4.ortho(this.proj, -10.0, 10.0, -10.0, 10.0, 0.001, 1000.0);
	        return this.proj;
	    };
	    return Camera2;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Camera2;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/core.ts" />
	/// <reference path="../core/program.ts" />
	/// <reference path="../resources/resourceMap.ts" />
	/// <reference path="../textures/cubemapTexture.ts" />
	/// <reference path="../core/depth.ts" />
	/// <reference path="../constants/ProgramCte.ts" />
	/// <reference path="../constants/ComparisonFunc.ts" />
	/// <reference path="../core/vertexBuffer.ts" />
	/// <reference path="../core/vertexArray.ts" />
	var core_ts_1 = __webpack_require__(2);
	var program_ts_1 = __webpack_require__(24);
	var resourceMap_ts_1 = __webpack_require__(11);
	var cubemapTexture_ts_1 = __webpack_require__(37);
	var depth_ts_1 = __webpack_require__(6);
	var ProgramCte_1 = __webpack_require__(25);
	var ComparisonFunc_1 = __webpack_require__(10);
	var vertexBuffer_ts_1 = __webpack_require__(17);
	var vertexArray_1 = __webpack_require__(15);
	var UsageType_ts_1 = __webpack_require__(19);
	var BufferType_ts_1 = __webpack_require__(18);
	"use strict";
	var Skybox = (function () {
	    /**
	     * @param {string}
	     */
	    function Skybox(dir, isWebGL2) {
	        if (isWebGL2 === void 0) { isWebGL2 = true; }
	        var faces = [];
	        faces.push(dir + "/right.jpg");
	        faces.push(dir + "/left.jpg");
	        faces.push(dir + "/top.jpg");
	        faces.push(dir + "/bottom.jpg");
	        faces.push(dir + "/back.jpg");
	        faces.push(dir + "/front.jpg");
	        var gl = core_ts_1["default"].getInstance().getGL();
	        this._prog = new program_ts_1["default"]();
	        var vs;
	        if (isWebGL2) {
	            vs = "#version 300 es\n            precision highp float;\n            layout (location = 0) in vec3 position;\n            out vec3 TexCoords;\n            uniform mat4 projection;\n            uniform mat4 view;\n            void main() {\n                vec4 pos = projection * view * vec4(position, 1.0);\n                gl_Position = pos.xyww;\n                TexCoords = position;\n            }";
	        }
	        else {
	            vs = "precision highp float;\n            attribute vec3 position;\n            varying vec3 TexCoords;\n            uniform mat4 projection;\n            uniform mat4 view;\n            void main() {\n                vec4 pos = projection * view * vec4(position, 1.0);\n                gl_Position = pos.xyww;\n                TexCoords = position;\n            }";
	        }
	        this._prog.addShader(vs, ProgramCte_1["default"].shader_type.vertex, ProgramCte_1["default"].mode.read_text);
	        var fg;
	        if (isWebGL2) {
	            fg = "#version 300 es\n            precision highp float;\n            in vec3 TexCoords;\n            out vec4 color;\n            uniform samplerCube skybox;\n            void main() {\n                color = texture(skybox, TexCoords);\n            }";
	        }
	        else {
	            fg = "precision highp float;\n            varying vec3 TexCoords;\n            uniform samplerCube skybox;\n            void main() {\n                gl_FragColor = textureCube(skybox, TexCoords);\n            }";
	        }
	        this._prog.addShader(fg, ProgramCte_1["default"].shader_type.fragment, ProgramCte_1["default"].mode.read_text);
	        this._prog.compile();
	        this._prog.addUniforms(["view", "projection"]);
	        var skyboxVertices = new Float32Array([
	            // Positions
	            -1.0, 1.0, -1.0,
	            -1.0, -1.0, -1.0,
	            1.0, -1.0, -1.0,
	            1.0, -1.0, -1.0,
	            1.0, 1.0, -1.0,
	            -1.0, 1.0, -1.0,
	            -1.0, -1.0, 1.0,
	            -1.0, -1.0, -1.0,
	            -1.0, 1.0, -1.0,
	            -1.0, 1.0, -1.0,
	            -1.0, 1.0, 1.0,
	            -1.0, -1.0, 1.0,
	            1.0, -1.0, -1.0,
	            1.0, -1.0, 1.0,
	            1.0, 1.0, 1.0,
	            1.0, 1.0, 1.0,
	            1.0, 1.0, -1.0,
	            1.0, -1.0, -1.0,
	            -1.0, -1.0, 1.0,
	            -1.0, 1.0, 1.0,
	            1.0, 1.0, 1.0,
	            1.0, 1.0, 1.0,
	            1.0, -1.0, 1.0,
	            -1.0, -1.0, 1.0,
	            -1.0, 1.0, -1.0,
	            1.0, 1.0, -1.0,
	            1.0, 1.0, 1.0,
	            1.0, 1.0, 1.0,
	            -1.0, 1.0, 1.0,
	            -1.0, 1.0, -1.0,
	            -1.0, -1.0, -1.0,
	            -1.0, -1.0, 1.0,
	            1.0, -1.0, -1.0,
	            1.0, -1.0, -1.0,
	            -1.0, -1.0, 1.0,
	            1.0, -1.0, 1.0
	        ]);
	        this.skyboxVAO = new vertexArray_1["default"]();
	        this.skyboxVAO.bind();
	        this.skyboxVBO = new vertexBuffer_ts_1["default"](BufferType_ts_1["default"].Array);
	        this.skyboxVBO.bind();
	        this.skyboxVBO.bufferData(skyboxVertices, UsageType_ts_1["default"].StaticDraw);
	        this.skyboxVBO.vertexAttribPointer(0, 3, gl.FLOAT, false, 0);
	        this._loadCubemap(faces);
	        this.skyboxVAO.unbind();
	    }
	    /**
	     * @param {Float32Array}
	     * @param {Float32Array}
	     */
	    Skybox.prototype.render = function (view, projection) {
	        var gl = core_ts_1["default"].getInstance().getGL();
	        depth_ts_1["default"].comparison(ComparisonFunc_1["default"].LessEqual);
	        this._prog.use();
	        var auxView = mat3.create();
	        auxView = mat3.fromMat4(auxView, view);
	        // Remove any translation
	        auxView = new Float32Array([
	            auxView[0], auxView[1], auxView[2], 0.0,
	            auxView[3], auxView[4], auxView[5], 0.0,
	            auxView[6], auxView[7], auxView[8], 0.0,
	            0.0, 0.0, 0.0, 0.0
	        ]);
	        this._prog.sendUniformMat4("view", auxView);
	        this._prog.sendUniformMat4("projection", projection);
	        this.cubeMapTexture.bind(0);
	        this.skyboxVAO.bind();
	        gl.drawArrays(gl.TRIANGLES, 0, 36);
	        this.skyboxVAO.unbind();
	        depth_ts_1["default"].comparison(ComparisonFunc_1["default"].Less);
	    };
	    /**
	     *
	     */
	    Skybox.prototype.destroy = function () {
	        this.cubeMapTexture.destroy();
	    };
	    /**
	     * @param {Array<string>}
	     */
	    Skybox.prototype._loadCubemap = function (faces) {
	        this.cubeMapTexture = new cubemapTexture_ts_1["default"]();
	        this.cubeMapTexture.bind();
	        faces.forEach(function (face, i) {
	            var img = resourceMap_ts_1["default"].retrieveAsset(face);
	            this.cubeMapTexture.addImage(i, img);
	        }.bind(this));
	        this.cubeMapTexture.finishTex();
	        this.cubeMapTexture.unbind();
	    };
	    return Skybox;
	}());
	;
	exports.__esModule = true;
	exports["default"] = Skybox;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="texture.ts" />
	/// <reference path="texOptions.ts" />
	var texture_1 = __webpack_require__(22);
	var core_1 = __webpack_require__(2);
	"use strict";
	var CubeMapTexture = (function (_super) {
	    __extends(CubeMapTexture, _super);
	    function CubeMapTexture(options) {
	        if (options === void 0) { options = {}; }
	        var gl = core_1["default"].getInstance().getGL();
	        _super.call(this, gl.TEXTURE_CUBE_MAP);
	        options = options || {};
	        this.finished = false;
	        // TODO: Faltan todo el tema de filtrados o wrap de las opciones
	        // que me he saltado por falta de tiempo :(
	        this._handle = gl.createTexture();
	    }
	    CubeMapTexture.prototype.addImage = function (i, data) {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
	    };
	    CubeMapTexture.prototype.bind = function (slot) {
	        var gl = core_1["default"].getInstance().getGL();
	        if (typeof slot === "number") {
	            gl.activeTexture(gl.TEXTURE0 + slot);
	        }
	        gl.bindTexture(this._target, this._handle);
	    };
	    CubeMapTexture.prototype.unbind = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.bindTexture(this._target, null);
	    };
	    CubeMapTexture.prototype.destroy = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.deleteTexture(this._handle);
	        this._handle = null;
	    };
	    CubeMapTexture.prototype.finishTex = function () {
	        var gl = core_1["default"].getInstance().getGL();
	        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        if (gl.TEXTURE_WRAP_R) {
	            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
	        }
	        this.finished = true;
	    };
	    return CubeMapTexture;
	}(texture_1["default"]));
	;
	exports.__esModule = true;
	exports["default"] = CubeMapTexture;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/context.ts" />
	///
	var context_1 = __webpack_require__(3);
	"use strict";
	var gl = context_1["default"].getContext();
	var TextureFormat;
	(function (TextureFormat) {
	    TextureFormat[TextureFormat["RGB"] = gl.RGB] = "RGB";
	    TextureFormat[TextureFormat["Float"] = gl.FLOAT] = "Float";
	})(TextureFormat || (TextureFormat = {}));
	;
	exports.__esModule = true;
	exports["default"] = TextureFormat;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

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
	/// <reference path="../core/context.ts" />
	///
	var context_1 = __webpack_require__(3);
	"use strict";
	var gl = context_1["default"].getContext();
	var TextureType;
	(function (TextureType) {
	    TextureType[TextureType["Nearest"] = gl.NEAREST] = "Nearest";
	    TextureType[TextureType["Linear"] = gl.LINEAR] = "Linear";
	    TextureType[TextureType["Clamp2Edge"] = gl.CLAMP_TO_EDGE] = "Clamp2Edge";
	})(TextureType || (TextureType = {}));
	;
	exports.__esModule = true;
	exports["default"] = TextureType;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map