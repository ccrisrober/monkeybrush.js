"use strict"; // Force variables must be declared before used!
var Input = (function () {
    function Input() {
        // Key code constants
        this.keys = {
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
        if (Input._instance) {
            throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
        }
        for (var i = 0; i < this.keys["LastKeyCode"]; i++) {
            this._isKeyPressed[i] = false;
            this._keyPreviusState[i] = false;
            this._isKeyClicked[i] = false;
        }
        var self = this;
        // Register handles
        window.addEventListener("keyup", function (ev) {
            if (ev.keyCode === 40 || ev.keyCode === 38) {
                ev.preventDefault();
            }
            //console.log(self);
            self._onKeyUp(ev);
        }); //this._onKeyUp);
        window.addEventListener("keydown", function (ev) {
            if (ev.keyCode === 40 || ev.keyCode === 38) {
                ev.preventDefault();
            }
            //console.log(self);
            self._onKeyDown(ev);
        }); //this._onKeyDown);
        Input._instance = this;
    }
    Input.prototype.update = function () {
        for (var i = 0; i < this.keys["LastKeyCode"]; i++) {
            this._isKeyClicked[i] = (!this._keyPreviusState[i]) && this._isKeyPressed[i];
            this._keyPreviusState[i] = this._isKeyPressed[i];
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
    Input.getInstance = function () {
        return Input._instance;
    };
    Input._instance = new Input();
    return Input;
})();
/// <reference path="gl-matrix.d.ts" />
/// <reference path="core/input.ts" />
var Camera = (function () {
    function Camera(position, up, yaw, pitch) {
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
    Camera.prototype.GetPos = function () {
        return this.position;
    };
    Camera.prototype.update = function (callback) {
        // TODO: Move input here
        this._updateCamera = false;
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.W)) {
            camera.processKeyboard(4);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.S)) {
            camera.processKeyboard(5);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.A)) {
            camera.processKeyboard(2);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.D)) {
            camera.processKeyboard(3);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.E)) {
            camera.processKeyboard(0);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Q)) {
            camera.processKeyboard(1);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(38)) {
            camera.processMouseMovement(0.0, 2.5);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(40)) {
            camera.processMouseMovement(0.0, -2.5);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(37)) {
            camera.processMouseMovement(2.5, 0.0);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(39)) {
            camera.processMouseMovement(-2.5, 0.0);
            this._updateCamera = true;
        }
        if (this._updateCamera && callback) {
            callback();
        }
    };
    Camera.prototype.processKeyboard = function (direction) {
        if (this.timeElapsed > 25) {
            return;
        }
        var velocity = this.movSpeed * this.timeElapsed; //deltaTime;
        //console.log(direction);
        if (direction == 0) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.front, velocity);
        }
        else if (direction == 1) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.front, -velocity);
        }
        else if (direction == 2) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.right, -velocity);
        }
        else if (direction == 3) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.right, velocity);
        }
        else if (direction == 4) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.up, velocity);
        }
        else if (direction == 5) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.up, -velocity);
        }
    };
    Camera.prototype.processMouseMovement = function (xOffset, yOffset) {
        xOffset *= this.movSpeed * this.timeElapsed;
        yOffset *= this.movSpeed * this.timeElapsed;
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
    Camera.prototype.updateCameraVectors = function () {
        var front = vec3.fromValues(Math.cos(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)));
        this.front = vec3.normalize(this.front, front);
        // Recalculate right and up vector
        this.right = vec3.cross(this.right, this.front, this.worldUp);
        this.right = vec3.normalize(this.right, this.right);
        this.up = vec3.cross(this.up, this.right, this.front);
        this.up = vec3.normalize(this.up, this.up);
    };
    Camera.prototype.GetViewMatrix = function () {
        var aux = vec3.create();
        this.view = mat4.lookAt(this.view, this.position, vec3.add(aux, this.position, this.front), this.up);
        return this.view;
    };
    Camera.prototype.GetProjectionMatrix = function (w, h) {
        this.proj = mat4.perspective(this.proj, 45.0, (w * 1.0) / (h * 1.0), 0.001, 1000.0);
        //this.proj = mat4.ortho(this.proj, -1.0, 1.0, -1.0, 1.0, 0.001, 1000.0);
        return this.proj;
    };
    return Camera;
})();
/// <reference path="../gl-matrix.d.ts" />
// https://github.com/bagobor/opengl33_dev_cookbook_2013/tree/master/Chapter2/FreeCamera/FreeCamera
var ICamera = (function () {
    function ICamera(pos) {
        this._position = pos;
        this._projection = mat4.create();
        this._view = mat4.create();
    }
    Object.defineProperty(ICamera.prototype, "position", {
        get: function () { return this._position; },
        set: function (pos) { this._position = pos; },
        enumerable: true,
        configurable: true
    });
    ICamera.prototype.getViewMatrix = function () {
        return this._view;
    };
    ICamera.prototype.getProjectionMatrix = function () {
        return this._projection;
    };
    ICamera.prototype.getFOV = function () {
        return this._fov;
    };
    ICamera.prototype.getAspectRatio = function () {
        return this._ar;
    };
    ICamera.prototype.setupProjection = function (fovy, aspRatio) {
        this._projection = mat4.perspective(this._projection, fovy, aspRatio, 0.01, 1000.0); // TODO: near and far configurable
        this._fov = fovy;
        this._ar = aspRatio;
    };
    return ICamera;
})();
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="icamera.ts" />
// https://github.com/bagobor/opengl33_dev_cookbook_2013/tree/master/Chapter2/FreeCamera/FreeCamera
var FreeCamera = (function (_super) {
    __extends(FreeCamera, _super);
    function FreeCamera(pos) {
        _super.call(this, pos);
        this._translation = vec3.create();
    }
    FreeCamera.prototype.update = function () {
        //var R = this._genMatrixUsingYawPitchRoll(
        //		this._yaw, this._pitch, this._roll);
        this._position = vec3.add(this._position, this._position, this._look);
        this._translation = vec3.create();
    };
    FreeCamera.prototype.rotate = function (yaw, pitch, roll) { };
    FreeCamera.prototype.walk = function (amount) {
        this._translation = vec3.scaleAndAdd(this._translation, this._translation, this._look, amount);
    };
    FreeCamera.prototype.strafe = function (amount) {
        this._translation = vec3.scaleAndAdd(this._translation, this._translation, this._right, amount);
    };
    FreeCamera.prototype.lift = function (amount) {
        this._translation = vec3.scaleAndAdd(this._translation, this._translation, this._up, amount);
    };
    return FreeCamera;
})(ICamera);
/// <reference path="icamera.ts" />
var OrthoCamera = (function (_super) {
    __extends(OrthoCamera, _super);
    function OrthoCamera() {
        _super.apply(this, arguments);
    }
    return OrthoCamera;
})(ICamera);
/// <reference path="icamera.ts" />
var PerspectiveCamera = (function (_super) {
    __extends(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        _super.apply(this, arguments);
    }
    return PerspectiveCamera;
})(ICamera);
/// <reference path="input.ts" />
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
        //var canvas = <HTMLCanvasElement>document.getElementById("canvas");
        var canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        document.body.appendChild(canvas);
        this._gl = this._getContext(canvas);
        if (!this._gl) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        this._getVendors();
        this.init();
        Core._instance = this;
    }
    Core.prototype.init = function () {
        var gl = this._gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        //gl.depthFunc(gl.LEQUAL);
        // Set images to flip y axis to match the texture coordinate space.
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.enable(gl.CULL_FACE);
        gl.disable(gl.BLEND);
        Input.getInstance();
    };
    Core.getInstance = function () {
        return Core._instance;
    };
    /**
    * Return global WebGL2 context
    *
    * @method getGL
    * @return {WebGLRenderingContext} Returns WebGL rendering context
    */
    Core.prototype.getGL = function () {
        return this._gl;
    };
    Core.prototype._getContext = function (canvas) {
        var contexts = "webgl2,experimental-webgl2".split(",");
        var gl;
        var ctx;
        for (var i = 0; i < contexts.length; i++) {
            ctx = contexts[i];
            gl = canvas.getContext(contexts[i]);
            if (gl) {
                return gl;
            }
        }
        return null;
    };
    Core.prototype._getVendors = function () {
        var vendors = "ms,moz,webkit,o".split(",");
        if (!window.requestAnimationFrame) {
            var vendor;
            for (var i = 0; i < vendors.length; i++) {
                vendor = vendors[i];
                window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
                if (window.requestAnimationFrame) {
                    break;
                }
            }
        }
    };
    Core._instance = new Core();
    return Core;
})();
var vector2 = (function () {
    function vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    vector2.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    return vector2;
})();
/// <reference path="../core/core.ts" />
/// <reference path="../extras/vector2.ts" />
var Texture = (function () {
    function Texture(target) {
    }
    Object.defineProperty(Texture.prototype, "target", {
        get: function () { return this._target; },
        enumerable: true,
        configurable: true
    });
    return Texture;
})();
/// <reference path="core.ts" />
/// <reference path="../textures/texture.ts" />
/// <reference path="../extras/vector2.ts" />
// https://github.com/glo-js/glo-framebuffer
var Framebuffer = (function () {
    function Framebuffer(textures, size, depth, stencil, options) {
        if (depth === void 0) { depth = false; }
        if (stencil === void 0) { stencil = false; }
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        var numColors = textures.length;
        if (numColors < 0) {
            throw new Error('must specify >= 0 color attachments');
        }
        else if (numColors > 1) {
            if (numColors > gl.getParameter(gl.MAX_COLOR_ATTACHMENTS)) {
                throw new Error("GL context doesn\u00B4t support " + numColors + " color attachments");
            }
        }
        options = options || {};
        this._colors = textures;
        this._handle = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
        // Each textures to fbo
        textures.forEach(function (texture, i) {
            texture.bind();
            // Only supported simple textures
            // TODO: Cubemap or texture3D
            var target = texture.target;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, target, texture.handle, 0);
        });
        // Attachment indices
        this._attachments = textures.map(function (texture, i) {
            return gl.COLOR_ATTACHMENT0 + i;
        });
        // TODO: Check no texture attachments (default render buffer storage)
        /**
        if(depth && stencil) {
                // TODO options.floatDepth ??
            this._depth = initTexture2D(size, gl.UNSIGNED_INT_24_8, gl.DEPTH_STENCIL, gl.DEPTH_STENCIL_ATTACHMENT);
        } else if(depth && !stencil) {
            this._depth = initTexture2D(size, gl.UNSIGNED_SHORT, gl.DEPTH_ATTACHMENT, gl.DEPTH_ATTACHMENT);
        } else if (!depth && stencil) {
            this._renderBuffer = this.createRenderBuffer(size, gl.STENCIL_INDEX, gl.STENCIL_ATTACHMENT);
        }
        /**/
        // Check status
        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            this.destroy();
            this._throwFBOError(status);
        }
    }
    Framebuffer.prototype._throwFBOError = function (status) {
        var gl = Core.getInstance().getGL();
        switch (status) {
            case gl.FRAMEBUFFER_UNSUPPORTED:
                throw new Error('framebuffer: Framebuffer unsupported');
            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                throw new Error('framebuffer: Framebuffer incomplete attachment');
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw new Error('framebuffer: Framebuffer incomplete dimensions');
            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                throw new Error('framebuffer: Framebuffer incomplete missing attachment');
            default:
                throw new Error('framebuffer: Framebuffer failed for unspecified reason');
        }
    };
    Framebuffer.prototype.bind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
        if (this._attachments.length > 1) {
        }
    };
    Framebuffer.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    Framebuffer.prototype.rebuild = function (size) {
        if (!size.isEqual(this._size)) {
        }
    };
    Framebuffer.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        var oldBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        if (oldBinding === this._handle) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        this._colors.forEach(function (texture) {
            texture.destroy();
        });
        gl.deleteFramebuffer(this._handle);
        if (this._depth) {
            this._depth.destroy();
            this._depth = null;
        }
        // Destroy depth/stencil
        if (this._renderBuffer) {
            //this._renderBuffer.destroy();
            //gl.deleteRenderbuffer(this._renderBuffer)
            this._renderBuffer = null;
        }
        // Color buffer default TODO
    };
    Framebuffer.prototype.createRenderBuffer = function (size, format, attachment) {
        var gl = Core.getInstance().getGL();
        var res = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, res);
        gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, null);
        return res;
    };
    return Framebuffer;
})();
/// <reference path="core.ts" />
"use strict";
var Model = (function () {
    function Model(fileRoute) {
        console.log("Loading file");
        this.loadJSON(fileRoute);
    }
    Model.prototype.createBuffer = function (data) {
        var gl = Core.getInstance().getGL();
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        return buffer;
    };
    Model.prototype.addAttrib = function (attribLocation, buffer, numElems) {
        var gl = Core.getInstance().getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(attribLocation, // Attribute location
        numElems, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        false, numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(attribLocation);
    };
    Model.prototype.createVAO = function (model, indicesArray) {
        var gl = Core.getInstance().getGL();
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);
        console.log(model.meshes[0]);
        if (model.meshes[0].vertices)
            this.addAttrib(0, this.createBuffer(model.meshes[0].vertices), 3);
        if (model.meshes[0].normals)
            this.addAttrib(1, this.createBuffer(model.meshes[0].normals), 3);
        if (model.meshes[0].texturecoords)
            this.addAttrib(2, this.createBuffer(model.meshes[0].texturecoords[0]), 2);
        gl.bindVertexArray(null);
    };
    Model.prototype.loadJSON = function (url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        var self = this;
        request.onload = function () {
            if (request.status < 200 || request.status > 299) {
                console.log('Error: HTTP Status ' + request.status + ' on resource ' + url);
                return {};
            }
            else {
                var modelObj = JSON.parse(request.responseText);
                self.indices = [].concat.apply([], modelObj.meshes[0].faces);
                console.log("Creating VAO");
                self.createVAO(modelObj, self.indices);
                console.log("Finish creating VAO");
            }
        };
        request.send();
    };
    Model.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this.vao);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    };
    Model.prototype.renderArrayInstance = function (numInstances) {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this.vao);
        gl.drawElementsInstanced(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 100);
        gl.bindVertexArray(null);
    };
    return Model;
})();
;
var Scene = (function () {
    function Scene() {
        this._animate = false;
    }
    Scene.prototype.animate = function (value) {
        this._animate = value;
    };
    Scene.prototype.animating = function () {
        return this._animate;
    };
    return Scene;
})();
/// <reference path="core.ts" />
"use strict";
var mode;
(function (mode) {
    mode[mode["read_file"] = 0] = "read_file";
    mode[mode["read_script"] = 1] = "read_script";
    mode[mode["read_text"] = 2] = "read_text";
})(mode || (mode = {}));
;
var ShaderProgram = (function () {
    function ShaderProgram() {
        this.uniformLocations = {};
        this.attribLocations = {};
        this._shaders = [];
    }
    //public addAttributes(..attrs: string) {
    ShaderProgram.prototype.addAttributes = function (attrs) {
        var gl = Core.getInstance().getGL();
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
    //public addUniforms(..attrs: string) {
    ShaderProgram.prototype.addUniforms = function (unifs) {
        var gl = Core.getInstance().getGL();
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
    ShaderProgram.prototype.program = function () {
        return this._compiledShader;
    };
    ShaderProgram.prototype.addShader = function (shader_, type, _mode) {
        var shader;
        if (_mode == mode.read_file) {
            shader = this.loadAndCompileWithFile(shader_, type);
        }
        else if (_mode == mode.read_script) {
            shader = this.loadAndCompile(shader_, type);
        }
        else if (_mode == mode.read_text) {
            shader = this.loadAndCompileFromText(shader_, type);
        }
        this._shaders.push(shader);
    };
    ShaderProgram.prototype.compile = function () {
        var gl = Core.getInstance().getGL();
        // Create and compile shader
        this._compiledShader = gl.createProgram();
        for (var i = 0; i < this._shaders.length; i++) {
            gl.attachShader(this._compiledShader, this._shaders[i]);
        }
        gl.linkProgram(this._compiledShader);
        // Checkin errors
        if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
            alert("ERROR");
            console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        return true;
    };
    ShaderProgram.prototype.loadAndCompileWithFile = function (filePath, shaderType) {
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
    ShaderProgram.prototype.loadAndCompileFromText = function (shaderSource, shaderType) {
        if (shaderSource === null) {
            alert("WARNING: " + shaderSource + " failed");
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        return this.compileShader(shaderSource, shaderType);
    };
    ShaderProgram.prototype.loadAndCompile = function (id, shaderType) {
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
    ShaderProgram.prototype.compileShader = function (shaderSource, shaderType) {
        var gl = Core.getInstance().getGL();
        var compiledShader;
        if (shaderType == gl.VERTEX_SHADER) {
            this._vertexSource = shaderSource;
        }
        else if (shaderType == gl.FRAGMENT_SHADER) {
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
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        return compiledShader;
    };
    ShaderProgram.prototype.use = function () {
        var gl = Core.getInstance().getGL();
        gl.useProgram(this._compiledShader);
    };
    ShaderProgram.prototype.destroy = function () {
        var _this = this;
        var gl = Core.getInstance().getGL();
        this._shaders.forEach(function (shader) {
            gl.detachShader(_this.compileShader, shader);
        });
        gl.deleteShader(this._compiledShader);
    };
    ShaderProgram.prototype.getPropSetter = function (path, location, type) {
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
            return 'gl.uniform1i(location, value)';
        }
        // Check complex matrix type
        if (/^mat[0-9]x[0-9]$/.test(type)) {
            var dims = type.substring(type.length - 3);
            return 'gl.uniformMatrix' + dims + 'fv(location, Boolean(transposed), value)';
        }
        // Checksimple type
        var vecIdx = type.indexOf('vec');
        var count = parseInt(type.charAt(type.length - 1), 10) || -1;
        if ((vecIdx === 0 || vecIdx === 1) && (count >= 1 && count <= 4)) {
            var vtype = type.charAt('0');
            switch (vtype) {
                case 'b':
                case 'i':
                    return 'gl.uniform' + count + 'iv(location, value)';
                case 'u':
                    return 'gl.uniform' + count + 'uiv(locaiton, value)';
                case 'v':
                    return 'gl.uniform' + count + 'fv(location, value)';
                default:
                    throw new Error('unrecognized uniform type ' + type + ' for ' + path);
            }
        }
        var matIdx = type.indexOf('mat');
        count = parseInt(type.charAt(type.length - 1), 10) || -1;
        console.log(count);
        if ((matIdx === 0 || matIdx === 1) && (count >= 2 && count <= 4)) {
            return 'gl.uniformMatrix' + count + 'fv(location, Boolean(transposed), value)';
        }
        throw new Error('unrecognized uniform type ' + type + ' for ' + path);
    };
    ShaderProgram.prototype.sendUniform = function (uniform, type) {
        var path = uniform;
        var location = ss.uniformLocations[path];
        var setter = ss.getPropSetter(path, location, type);
        var srcfn = "\n        return function uniformGetSet (value, transposed) {\n            transposed = typeof transposed !== 'undefined' ? transposed : false;\n            location = prog.uniformLocations[name];\n                if (!location) {\n                    prog.addUniforms([name]);\n                    location = prog.uniformLocations[name];\n                }\n                if (location) {\n                    " + setter + "\n                    console.log(\"SENDED\");\n                } else {\n                    console.error(\"ERROR\");\n                }\n        }";
        var generated = new Function('prog', 'gl', 'name', 'location', srcfn);
        var gl = Core.getInstance().getGL();
        return generated(ss, gl, uniform, location);
    };
    return ShaderProgram;
})();
/// <reference path="core.ts" />
"use strict";
var _Texture = (function () {
    function _Texture() {
    }
    _Texture.prototype.loadTexture = function (textureName) {
        var _this = this;
        // Create texture object
        var img = new Image();
        img.onload = function () {
            _this._processLoadedImage(textureName, img);
        };
        img.src = textureName;
    };
    _Texture.prototype.unloadTexture = function (textureName) {
        var gl = Core.getInstance().getGL();
        //gl.deleteTexture()
    };
    _Texture.prototype.activateTexture = function () { };
    _Texture.prototype.deactivateTexture = function () { };
    _Texture.prototype._processLoadedImage = function (textureName, img) {
        var gl = Core.getInstance().getGL();
        // Generate a texture reference to webgl ctx
        var textureID = gl.createTexture();
        // bind the texture reference with the current texture functionality in the webGL
        gl.bindTexture(gl.TEXTURE_2D, textureID);
    };
    return _Texture;
})();
// TODO: Change _color to vector3
var Color = (function () {
    function Color(r, g, b) {
        this._color = new Array(3);
        this.setRGB(r, g, b);
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () { return this._color[0]; },
        set: function (r) { this._color[0] = r; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () { return this._color[1]; },
        set: function (g) { this._color[1] = g; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () { return this._color[2]; },
        set: function (b) { this._color[2] = b; },
        enumerable: true,
        configurable: true
    });
    Color.prototype.setRGB = function (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    };
    Color.prototype.toHSL = function () {
        var max = Math.max(this.r, this.g, this.b), min = Math.min(this.r, this.g, this.b);
        var h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case this.r:
                    h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0);
                    break;
                case this.g:
                    h = (this.b - this.r) / d + 2;
                    break;
                case this.b:
                    h = (this.r - this.g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Color(h, s, l);
    };
    return Color;
})();
/// <reference path="../core/core.ts" />
var extensions;
(function (extensions) {
    var _extensions = {};
    function get(name) {
        if (name in _extensions) {
            return _extensions[name];
        }
        var gl = Core.getInstance().getGL();
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
var Timer = (function () {
    function Timer() {
        this.running = false;
        this.start_clock = 0;
        this.start_time = 0;
        this.acc_time = 0;
    }
    Timer.prototype.elapsed_time = function () {
        var acc_sec = (performance || Date).now();
        return -1;
    };
    Timer.prototype.start = function (msg) {
        if (msg === void 0) { msg = ""; }
    };
    Timer.prototype.SetToZero = function () {
        this.acc_time = 0;
    };
    Timer.prototype.restart = function () {
        // Set timer status to running, reset accumulated time, and set start time
        this.running = true;
        this.acc_time = 0;
        this.start_clock =
            this.start_time = (performance || Date).now();
    };
    Timer.prototype.stop = function () {
        // Compute accumulated running time and set timer status to not running
        if (this.running)
            this.acc_time += this.elapsed_time();
        this.running = false;
    };
    Timer.prototype.check = function () {
        return -1;
    };
    return Timer;
})();
// newTime = ( performance || Date ).now()
// https://bitbucket.org/masterurjc/practica1/src/1b9cfa67f4b68e8c6a570ce58cfdb2c02d9ee32e/RenderingAvanzado1/Timer.h?at=master&fileviewer=file-view-default 
var vector3 = (function () {
    function vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    vector3.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    };
    return vector3;
})();
var vector4 = (function () {
    function vector4(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    vector4.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    };
    return vector4;
})();
/// <reference path="../core/shaderProgram.ts" />
var vertexCode = "#version 300 es\nin vec3 vertex;\nout vec2 texCoord;\nvoid main() {\n  texCoord = vertex.xy * 0.5 + 0.5;\n  gl_Position = vec4( vertex, 1 );\n}";
var ToneMap;
(function (ToneMap) {
    function init(gl) {
        ToneMap.textureQuadSimpleProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadSimpleProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadSimpleProgram.compile();
        ToneMap.textureQuadSimpleProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadSimpleProgram.addUniforms(["texture_"]);
        ToneMap.textureQuadGammaProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadGammaProgram.addShader("#version 300 es\n\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadGammaProgram.compile();
        ToneMap.textureQuadGammaProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadGammaProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadReinhardProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadReinhardProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.rgb = fragColor.rgb / ( 1.0 + fragColor.rgb );\n        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadReinhardProgram.compile();
        ToneMap.textureQuadReinhardProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadReinhardProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadFilmicProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadFilmicProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        vec3 color = texture( texture_, texCoord ).rgb * pow( abs( brightness ), 2.2 );\n        color = max(vec3(0.), color - vec3(0.004));\n        color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);\n        fragColor = vec4( color, 1.0 );\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadFilmicProgram.compile();
        ToneMap.textureQuadFilmicProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadFilmicProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadsRGBProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadsRGBProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      out vec4 fragColor;\n      float sRGB_gamma_correct(float c) {\n       const float a = 0.055;\n       if(c < 0.0031308) return 12.92*c;\n       else return (1.0+a)*pow(c, 1.0/2.4) - a;\n      }\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.r = sRGB_gamma_correct(fragColor.r);\n        fragColor.g = sRGB_gamma_correct(fragColor.g);\n        fragColor.b = sRGB_gamma_correct(fragColor.b);\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadsRGBProgram.compile();
        ToneMap.textureQuadsRGBProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadsRGBProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadUncharted2Program.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadUncharted2Program.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        float A = 0.15;\n        float B = 0.50;\n        float C = 0.10;\n        float D = 0.20;\n        float E = 0.02;\n        float F = 0.30;\n        float W = 11.2;\n        float exposure = brightness;//2.;\n        fragColor.rgb *= exposure;\n        fragColor.rgb = ((fragColor.rgb * \n          (A * fragColor.rgb + C * B) + D * E) / (fragColor.rgb * \n          (A * fragColor.rgb + B) + D * F)) - E / F;\n        float white = ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;\n        fragColor.rgb /= white;\n        fragColor.rgb = pow(fragColor.rgb, vec3(1. / 2.2));\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadUncharted2Program.compile();
        ToneMap.textureQuadUncharted2Program.addAttributes(["vertex"]);
        ToneMap.textureQuadUncharted2Program.addUniforms(["texture_", "brightness"]);
    }
    ToneMap.init = init;
    ToneMap.textureQuadSimpleProgram = new ShaderProgram();
    ToneMap.textureQuadGammaProgram = new ShaderProgram();
    ToneMap.textureQuadReinhardProgram = new ShaderProgram();
    ToneMap.textureQuadFilmicProgram = new ShaderProgram();
    ToneMap.textureQuadsRGBProgram = new ShaderProgram();
    ToneMap.textureQuadUncharted2Program = new ShaderProgram();
})(ToneMap || (ToneMap = {}));
/// <reference path="../core/core.ts" />
var Drawable = (function () {
    function Drawable() {
    }
    // TODO: unused DELETE PLS
    Drawable.prototype.addAttrib = function (attribLocation, buffer, data, numElems) {
        var gl = Core.getInstance().getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.vertexAttribPointer(attribLocation, // Attribute location
        numElems, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        false, numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(attribLocation);
    };
    Drawable.prototype.createBuffer = function (data, handle) {
        var gl = Core.getInstance().getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, handle);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        return handle;
    };
    Drawable.prototype.addAttrib_ = function (attribLocation, buffer, numElems) {
        var gl = Core.getInstance().getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(attribLocation, // Attribute location
        numElems, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        false, numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(attribLocation);
    };
    return Drawable;
})();
/// <reference path="drawable.ts" />
var Quad = (function (_super) {
    __extends(Quad, _super);
    function Quad(xsize, zsize, xdivs, zdivs, smax, tmax) {
        if (smax === void 0) { smax = 1.0; }
        if (tmax === void 0) { tmax = 1.0; }
        _super.call(this);
        var v = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        var n = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        var tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
        var el = new Array(6 * xdivs * zdivs);
        var x2 = xsize / 2.0;
        var z2 = zsize / 2.0;
        var iFactor = zsize / zdivs;
        var jFactor = xsize / xdivs;
        var texi = smax / zdivs;
        var texj = tmax / xdivs;
        var x, z;
        var vidx = 0, tidx = 0;
        for (var i = 0; i <= zdivs; i++) {
            z = iFactor * i - z2;
            for (var j = 0; j <= xdivs; j++) {
                x = jFactor * j - x2;
                v[vidx] = x;
                v[vidx + 1] = 0.0;
                v[vidx + 2] = z;
                n[vidx] = 0.0;
                n[vidx + 1] = 1.0;
                n[vidx + 2] = 0.0;
                vidx += 3;
                tex[tidx] = j * texi;
                tex[tidx + 1] = i * texj;
                tidx += 2;
            }
        }
        var rowStart, nextRowStart;
        var idx = 0;
        for (var i = 0; i < zdivs; i++) {
            rowStart = i * (xdivs + 1);
            nextRowStart = (i + 1) * (xdivs + 1);
            for (var j = 0; j < xdivs; j++) {
                el[idx] = rowStart + j;
                el[idx + 1] = nextRowStart + j;
                el[idx + 2] = nextRowStart + j + 1;
                el[idx + 3] = rowStart + j;
                el[idx + 4] = nextRowStart + j + 1;
                el[idx + 5] = rowStart + j + 1;
                idx += 6;
            }
        }
        var gl = Core.getInstance().getGL();
        this._handle = new Array(4);
        for (var i = 0; i < 4; i++) {
            this._handle[i] = gl.createBuffer();
        }
        this._vao = gl.createVertexArray();
        gl.bindVertexArray(this._vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[0]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);
        this.addAttrib_(0, this.createBuffer(v, this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(n, this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(tex, this._handle[3]), 2);
        this._indicesLen = el.length;
        // TODO: Clear v, n, tex and el
        console.log({
            vertices: v,
            normal: n,
            textureCoords: tex,
            indices: el
        });
    }
    Quad.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._vao);
        //gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);	// TODO: UNSIGNED_INT => https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    };
    return Quad;
})(Drawable);
/// <reference path="drawable.ts" />
var Cube = (function (_super) {
    __extends(Cube, _super);
    function Cube(side) {
        if (side === void 0) { side = 1.0; }
        _super.call(this);
        var side2 = side / 2.0;
        var v = [
            // Front
            -side2, -side2, side2,
            side2, -side2, side2,
            side2, side2, side2,
            -side2, side2, side2,
            // Right
            side2, -side2, side2,
            side2, -side2, -side2,
            side2, side2, -side2,
            side2, side2, side2,
            // Back
            -side2, -side2, -side2,
            -side2, side2, -side2,
            side2, side2, -side2,
            side2, -side2, -side2,
            // Left
            -side2, -side2, side2,
            -side2, side2, side2,
            -side2, side2, -side2,
            -side2, -side2, -side2,
            // Bottom
            -side2, -side2, side2,
            -side2, -side2, -side2,
            side2, -side2, -side2,
            side2, -side2, side2,
            // Top
            -side2, side2, side2,
            side2, side2, side2,
            side2, side2, -side2,
            -side2, side2, -side2
        ];
        var n = [
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            // Right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            // Back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            // Left
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            // Top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ];
        var tex = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];
        var el = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];
        var gl = Core.getInstance().getGL();
        this._handle = new Array(4);
        for (var i = 0, size = this._handle.length; i < size; i++) {
            this._handle[i] = gl.createBuffer();
        }
        this._vao = gl.createVertexArray();
        gl.bindVertexArray(this._vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[0]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);
        this.addAttrib_(0, this.createBuffer(v, this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(n, this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(tex, this._handle[3]), 2);
        this._indicesLen = el.length;
        gl.bindVertexArray(null);
        // TODO: Clear v, n, tex and el
        console.log({
            vertices: v,
            normal: n,
            textureCoords: tex,
            indices: el,
            vao: this._handle
        });
    }
    Cube.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._vao);
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    };
    return Cube;
})(Drawable);
/// <reference path="drawable.ts" />
var Sphere = (function (_super) {
    __extends(Sphere, _super);
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
        for (var i = 0; i <= slices; i++) {
            theta = i * thetaFac;
            s = i / slices;
            for (var j = 0; j <= stacks; j++) {
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
        for (var i = 0; i < slices; i++) {
            var stackStart = i * (stacks + 1);
            var nextStackStart = (i + 1) * (stacks + 1);
            for (var j = 0; j < stacks; j++) {
                if (j == 0) {
                    el[idx] = stackStart;
                    el[idx + 1] = stackStart + 1;
                    el[idx + 2] = nextStackStart + 1;
                    idx += 3;
                }
                else if (j == stacks - 1) {
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
        var gl = Core.getInstance().getGL();
        this._handle = new Array(4);
        for (var i = 0; i < 4; i++) {
            this._handle[i] = gl.createBuffer();
        }
        this._vao = gl.createVertexArray();
        gl.bindVertexArray(this._vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[0]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);
        this.addAttrib_(0, this.createBuffer(v, this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(n, this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(tex, this._handle[3]), 2);
        this._indicesLen = el.length;
        // TODO: Clear v, n, tex and el
        console.log({
            vertices: v,
            normal: n,
            textureCoords: tex,
            indices: el
        });
    }
    Sphere.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._vao);
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    };
    return Sphere;
})(Drawable);
/// <reference path="texture.ts" />
var Texture2D = (function (_super) {
    __extends(Texture2D, _super);
    function Texture2D(image, size, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        _super.call(this, gl.TEXTURE_2D);
        options = options || {};
        // TODO: REplace gl.TEXTURE_2D TO this.target = gl.TEXTURE_2D;
        this._flipY = options["flipY"] === true;
        this._handle = gl.createTexture();
        var _internalformat = options["internalformat"] || gl.RGBA;
        var _format = options["format"] || gl.RGBA;
        var _type = options["type"] || gl.UNSIGNED_BYTE;
        this._minFilter = options["minFilter"] || gl.NEAREST;
        this._magFilter = options["magFilter"] || gl.NEAREST;
        var wraps = options["wrap"] || [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];
        if (!Array.isArray(wraps)) {
            wraps = [wraps, wraps];
        }
        else {
            this._wraps = wraps;
        }
        //this.minFilter();
        //this.magFilter();
        //this.wrap();
        this.bind();
        gl.texImage2D(gl.TEXTURE_2D, 0, // Level of details
        _internalformat, // Internal format
        _format, // Format
        _type, // Size of each channel
        image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._magFilter);
        this.wrap(wraps);
        /*// Prevent NPOT textures
        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
    }
    Texture2D.prototype.genMipMap = function () {
        var gl = Core.getInstance().getGL();
        this.bind();
        // TODO: Check NPOT??
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    Texture2D.prototype.wrap = function (modes) {
        if (modes.length !== 2) {
            throw new Error("Must specify wrapS, wrapT modes");
        }
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, modes[0]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, modes[1]);
        this._wraps = modes;
    };
    Texture2D.prototype.minFilter = function (filter) {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        this._minFilter = filter;
    };
    Texture2D.prototype.magFilter = function (filter) {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        this._magFilter = filter;
    };
    Texture2D.prototype.bind = function (slot) {
        var gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(gl.TEXTURE_2D, this._handle);
    };
    Texture2D.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    Texture2D.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
    Texture2D.prototype.setPixelStorage = function () {
        var gl = Core.getInstance().getGL();
        //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha)
        //gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment)
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY)
    };
    return Texture2D;
})(Texture);
/// <reference path="core/core.ts" />
/// <reference path="resources/quadToneMap.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="models/quad.ts" />
/// <reference path="models/cube.ts" />
/// <reference path="models/sphere.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="textures/texture2d.ts" />
/// <reference path="core/model.ts" />
/// <reference path="_demoCamera.ts" />
var camera = new Camera(new Float32Array([0.2082894891500473, 1.0681922435760498, 8.870955467224121]));
var gl;
var stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);
var SimpleConfig = function () {
    return {
        message: 'dat.gui',
        speed: 0.8,
        displayOutline: false,
        explode: function () { }
    };
};
var cc;
var ss;
var cubito;
var planito;
var esferita;
var view;
var projection;
window.onload = function () {
    gl = Core.getInstance().getGL();
    ToneMap.init(gl);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    var text = SimpleConfig();
    var gui = new dat.GUI();
    for (var index in text) {
        gui.add(text, index);
    }
    esferita = new Sphere(1.0, 20, 20);
    planito = new Quad(1.0, 1.0, 1, 1);
    cubito = new Cube(5.0);
    cc = new Model("omg.json");
    ss = new ShaderProgram();
    ss.addShader("./shaders/demoShader.vert", gl.VERTEX_SHADER, mode.read_file);
    ss.addShader("./shaders/demoShader.frag", gl.FRAGMENT_SHADER, mode.read_file);
    ss.compile();
    ss.addAttributes(["position", "normal", "uv"]); //, "normal"]);
    ss.addUniforms(["projection", "view", "model", "normalMatrix", "texSampler", "viewPos", "lightPosition"]); //, "demo"]);
    ss.use();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(gl.canvas.width, gl.canvas.height);
    //console.log(view, projection);
    gl.uniformMatrix4fv(ss.uniformLocations['view'], false, view);
    gl.uniformMatrix4fv(ss.uniformLocations['projection'], false, projection);
    gl.uniform3fv(ss.uniformLocations["viewPos"], camera.position);
    //ss.sendUniform("demo", "vec2")([0.0, 0.0], false);
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(gl.canvas.width, gl.canvas.height);
    /**
    document.addEventListener("keydown", function (ev) {
        switch (ev.keyCode) {
            case 38:
                camera.processMouseMovement(0.0, 2.5);
                break;
            case 40:
                camera.processMouseMovement(0.0, -2.5);
                break;
            case 37:
                camera.processMouseMovement(2.5, 0.0);
                break;
            case 39:
                camera.processMouseMovement(-2.5, 0.0);
                break;
        }
    });
    /**/
    initTexture("example.png");
    //tex2d = initTexture("example.png");
    var itv = setInterval(function () {
        //console.log(counterTextures);
        if (counterTextures === 0) {
            //console.log(tex2d);
            clearInterval(itv);
            requestAnimationFrame(drawScene);
        }
    }, 100);
};
var counterTextures = 0;
function initTexture(str) {
    //var tex2d_;
    counterTextures++;
    //gl.bindTexture(gl.TEXTURE_2D, _tex);
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
    var cubeImage = new Image();
    cubeImage.onload = function () {
        var size = new vector2(1000.0, 1000.0);
        tex2d = new Texture2D(cubeImage, size, {
            flipY: true,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
            wrap: [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
        });
        counterTextures--;
    };
    cubeImage.src = str;
    //return tex2d_;
}
var tex2d;
var lightPos = [0.5, 0.5, -1.0];
var lastTime = Date.now();
var deltaTime = 0.0;
var identityMatrix = mat4.create();
mat4.identity(identityMatrix);
var model = mat4.create();
var angle = 0;
function cameraUpdateCb() {
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(gl.canvas.width, gl.canvas.height);
    gl.uniformMatrix4fv(ss.uniformLocations['view'], false, view);
    gl.uniformMatrix4fv(ss.uniformLocations['projection'], false, projection);
    gl.uniform3fv(ss.uniformLocations["viewPos"], camera.position);
}
function drawScene(dt) {
    var currentTime = Date.now();
    var timeElapsed = currentTime - lastTime;
    //camera.timeElapsed = timeElapsed;
    deltaTime = timeElapsed;
    lastTime = currentTime;
    Input.getInstance().update();
    stats.begin();
    dt *= 0.001; // convert to seconds
    dt = deltaTime;
    //console.log(dt);
    camera.timeElapsed = dt / 10.0;
    lightPos[0] += Math.cos(angle) * 0.05;
    lightPos[1] += Math.cos(angle) * 0.05;
    lightPos[2] += Math.sin(angle) * 0.05;
    camera.update(cameraUpdateCb);
    //resize(gl);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //console.log("LEFT: " + Input.getInstance().isKeyPressed(Input.keys["Left"]));
    angle += dt * 0.001;
    /*if(angle >= 180.0) {
        angle = -180.0;
    }*/
    ss.use();
    gl.uniform3f(ss.uniformLocations["lightPosition"], lightPos[0], lightPos[1], lightPos[2]);
    tex2d.bind(0);
    gl.uniform1i(ss.uniformLocations["texSampler"], 0);
    var dd = 1;
    var i = 0, j = 0;
    mat4.translate(model, identityMatrix, new Float32Array(lightPos));
    mat4.rotateY(model, model, 90.0 * Math.PI / 180);
    //mat4.rotateY(model, model, angle * dd);
    mat4.scale(model, model, vec3.fromValues(0.335, 0.335, 0.335));
    gl.uniformMatrix4fv(ss.uniformLocations['model'], false, model);
    //cc.render();
    //cubito.render();
    //planito.render();
    esferita.render();
    for (i = -7; i < 7; i += 5.0) {
        for (j = -7; j < 7; j += 5.0) {
            dd *= -1;
            mat4.translate(model, identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, 0.0));
            mat4.rotateY(model, model, 90.0 * Math.PI / 180);
            mat4.rotateY(model, model, angle * dd);
            mat4.scale(model, model, vec3.fromValues(0.335, 0.335, 0.335));
            gl.uniformMatrix4fv(ss.uniformLocations['model'], false, model);
            //cc.render();
            cubito.render();
        }
    }
    stats.end();
    requestAnimationFrame(drawScene);
}
function resize(gl) {
    var realToCSSPixels = window.devicePixelRatio || 1;
    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    var displayWidth = Math.floor(gl.canvas.clientWidth * realToCSSPixels);
    var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);
    // Check if the canvas is not the same size.
    if (gl.canvas.width != displayWidth ||
        gl.canvas.height != displayHeight) {
        // Make the canvas the same size
        gl.canvas.width = displayWidth;
        gl.canvas.height = displayHeight;
        // Set the viewport to match
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
}
var url = "config.json";
var request = new XMLHttpRequest();
request.open('GET', url, false);
request.onload = function () {
    if (request.status < 200 || request.status > 299) {
        console.log('Error: HTTP Status ' + request.status + ' on resource ' + url);
        return {};
    }
    else {
        var json = JSON.parse(request.responseText);
        console.log(json);
    }
};
request.send();
/// <reference path="../extras/color.ts" />
var Light = (function () {
    function Light() {
        this.intensity = 1.0;
        this.color = new Color(1.0, 1.0, 1.0);
    }
    Object.defineProperty(Light.prototype, "intensity", {
        get: function () { return this._intensity; },
        set: function (intensity) { this._intensity = intensity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Light.prototype, "color", {
        get: function () { return this._color; },
        set: function (color) { this._color = color; },
        enumerable: true,
        configurable: true
    });
    return Light;
})();
/**
 * TODO:
 *	- [] Attenuation (constant, linear, cuadratic)
 *	- [] http://www.learnopengl.com/code_viewer.php?code=lighting/multiple_lights-exercise1
 *
**/ 
/// <reference path="light.ts" />
var DirectionalLight = (function (_super) {
    __extends(DirectionalLight, _super);
    function DirectionalLight(direction) {
        if (direction === void 0) { direction = new Float32Array([0.0, 0.0, 0.0]); }
        _super.call(this);
        this.direction = direction;
    }
    Object.defineProperty(DirectionalLight.prototype, "direction", {
        get: function () { return this._direction; },
        set: function (direction) { this._direction = direction; },
        enumerable: true,
        configurable: true
    });
    return DirectionalLight;
})(Light);
/// <reference path="light.ts" />
var PointLight = (function (_super) {
    __extends(PointLight, _super);
    function PointLight(position) {
        if (position === void 0) { position = new Float32Array([0.0, 0.0, 0.0]); }
        _super.call(this);
        this.position = position;
    }
    Object.defineProperty(PointLight.prototype, "position", {
        get: function () { return this._position; },
        set: function (position) { this._position = position; },
        enumerable: true,
        configurable: true
    });
    return PointLight;
})(Light);
/// <reference path="light.ts" />
var SpotLight = (function (_super) {
    __extends(SpotLight, _super);
    function SpotLight(position, direction) {
        if (position === void 0) { position = new Float32Array([0.0, 0.0, 0.0]); }
        if (direction === void 0) { direction = new Float32Array([0.0, 0.0, 0.0]); }
        _super.call(this);
        this.direction = direction;
        this.position = position;
    }
    Object.defineProperty(SpotLight.prototype, "position", {
        get: function () { return this._position; },
        set: function (position) { this._position = position; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpotLight.prototype, "direction", {
        get: function () { return this._direction; },
        set: function (direction) { this._direction = direction; },
        enumerable: true,
        configurable: true
    });
    return SpotLight;
})(Light);
var Material = (function () {
    function Material() {
    }
    return Material;
})();
/// <reference path="material.ts" />
/// <reference path="../core/shaderProgram.ts" />
var DepthMat = (function (_super) {
    __extends(DepthMat, _super);
    function DepthMat() {
        _super.apply(this, arguments);
    }
    DepthMat.initialize = function () {
        DepthMat.ss.addShader("shaders/depthShader.vert", gl.VERTEX_SHADER, mode.read_file);
    };
    DepthMat.ss = new ShaderProgram();
    return DepthMat;
})(Material);
//DepthMat.initialize(); 
/// <reference path="material.ts" />
var LambertMat = (function (_super) {
    __extends(LambertMat, _super);
    function LambertMat() {
        _super.apply(this, arguments);
    }
    return LambertMat;
})(Material);
/// <reference path="material.ts" />
var NormalMat = (function (_super) {
    __extends(NormalMat, _super);
    function NormalMat() {
        _super.apply(this, arguments);
    }
    return NormalMat;
})(Material);
/// <reference path="material.ts" />
var PhongMat = (function (_super) {
    __extends(PhongMat, _super);
    function PhongMat() {
        _super.apply(this, arguments);
    }
    return PhongMat;
})(Material);
/// <reference path="material.ts" />
var ShaderMat = (function (_super) {
    __extends(ShaderMat, _super);
    function ShaderMat() {
        _super.apply(this, arguments);
    }
    return ShaderMat;
})(Material);
/// <reference path="drawable.ts" />
var Teaspot = (function (_super) {
    __extends(Teaspot, _super);
    function Teaspot() {
        _super.call(this);
    }
    Teaspot.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._vao);
        gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);
    };
    return Teaspot;
})(Drawable);
/// <reference path="drawable.ts" />
var Torus = (function (_super) {
    __extends(Torus, _super);
    function Torus() {
        _super.call(this);
    }
    Torus.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._vao);
        gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);
    };
    return Torus;
})(Drawable);
var AudioClip = (function () {
    function AudioClip() {
        this._audioCtx = null;
        this._bgAudioNode = null;
    }
    return AudioClip;
})();
"use strict";
var ResourceMap = (function () {
    function ResourceMap() {
        // Number of outstanding load operations
        this._numOutstandingLoads = 0;
        // Callback function when all textures are loaded
        this._loadCompleteCallback = null;
        if (ResourceMap._instance) {
            throw new Error("Error: Instantiation failed: Use ResourceMap.getInstance() instead of new.");
        }
        ResourceMap._instance = this;
    }
    ResourceMap.getInstance = function () {
        return ResourceMap._instance;
    };
    ResourceMap.prototype.asyncLoadRequested = function (resName) {
        this._resourceMap[resName] = new ResourceMap.MapEntry(resName);
        ++this._numOutstandingLoads;
    };
    ResourceMap.prototype.asyncLoadCompleted = function (resName, loadedAsset) {
        if (!this.isAssetLoaded(resName)) {
            alert("asyncLoadCompleted: [" + resName + "] not in map!");
        }
        this._resourceMap[resName].setAsset(resName);
        --this._numOutstandingLoads;
        this._checkForAllLoadCompleted();
    };
    // Make sure to set the callback _AFTER_ all load commands are issued
    ResourceMap.prototype.setLoadCompleteCallback = function (fun) {
        this._loadCompleteCallback = fun;
        // in case all loading are done
        this._checkForAllLoadCompleted();
    };
    ResourceMap.prototype.retrieveAsset = function (resName) {
        var r = null;
        if (resName in this._resourceMap) {
            r = this._resourceMap[resName].getAsset();
        }
        else {
            alert("retrieveAsset: [" + resName + "] not in map!");
        }
        return r;
    };
    ResourceMap.prototype.unloadAsset = function (resName) {
        var c = 0;
        if (resName in this._resourceMap) {
            this._resourceMap[resName].decCount();
            c = this._resourceMap[resName].count();
            if (c === 0) {
                delete this._resourceMap[resName];
            }
        }
        return c;
    };
    ResourceMap.prototype.isAssetLoaded = function (resName) {
        return (resName in this._resourceMap);
    };
    ResourceMap.prototype.incAssetRefCount = function (resName) {
        this._resourceMap[resName].incCount();
    };
    ResourceMap.prototype._checkForAllLoadCompleted = function () {
        if ((this._numOutstandingLoads === 0) && (this._loadCompleteCallback != null)) {
            // ensures the load complete call back will only be called once!
            var fun = this._loadCompleteCallback;
            this._loadCompleteCallback = null;
            fun();
        }
    };
    ResourceMap._instance = new ResourceMap();
    return ResourceMap;
})();
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
    })();
    ResourceMap.MapEntry = MapEntry;
})(ResourceMap || (ResourceMap = {}));
/// <reference path="resourceMap.ts" />
var Font = (function () {
    function Font(fontName) {
        var rm = ResourceMap.getInstance();
        if (!(rm.isAssetLoaded(fontName))) {
            var fontInfoSrcStr = fontName + ".fnt";
            var texSrcStr = fontName + ".png";
            rm.asyncLoadRequested(fontName);
        }
        else {
            rm.incAssetRefCount(fontName);
        }
    }
    Font.prototype.unloadFont = function (fontName) {
        var rm = ResourceMap.getInstance();
        if (!(rm.unloadAsset(fontName))) {
            var fontInfoSrcStr = fontName + ".fnt";
            var texSrcStr = fontName + ".png";
        }
    };
    return Font;
})();
var Font;
(function (Font) {
    var CharacterInfo = (function () {
        function CharacterInfo() {
            // in texture coordinate (0 to 1) maps to the entier image
            this.mTexCoordLeft = 0;
            this.mTexCoordRight = 1;
            this.mTexCoordBottom = 0;
            this.mTexCoordTop = 0;
            // reference to nominal character size, 1 is "standard width/height" of a char
            this.mCharWidth = 1;
            this.mCharHeight = 1;
            this.mCharWidthOffset = 0;
            this.mCharHeightOffset = 0;
            // reference of char width/height ration
            this.mCharAspectRatio = 1;
        }
        return CharacterInfo;
    })();
    Font.CharacterInfo = CharacterInfo;
})(Font || (Font = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../core/shaderProgram.ts" />
/// <reference path="../core/texture.ts" />
/// <reference path="../gl-matrix.d.ts" />
var Skybox = (function () {
    function Skybox(dir) {
        console.log("Load skybox ...");
        var faces = [];
        faces.push("textures/" + dir + "/right.jpg");
        faces.push("textures/" + dir + "/left.jpg");
        faces.push("textures/" + dir + "/top.jpg");
        faces.push("textures/" + dir + "/bottom.jpg");
        faces.push("textures/" + dir + "/back.jpg");
        faces.push("textures/" + dir + "/front.jpg");
        var gl = Core.getInstance().getGL();
        var vs = "#version 300 es\n    \tprecision highp float;\n\t\tlayout (location = 0) in vec3 position;\n\t\tout vec3 TexCoords;\n\t\tuniform mat4 projection;\n\t\tuniform mat4 view;\n\t\tvoid main() {\n\t\t\tvec4 pos = projection * view * vec4(position, 1.0);\n\t\t\tgl_Position = pos.xyww;\n\t\t\tTexCoords = position;\n\t\t}";
        this.ss.addShader(vs, gl.VERTEX_SHADER, mode.read_text);
        var fg = "#version 300 es\n    \tprecision highp float;\n\t\tin vec3 TexCoords;\n\t\tout vec4 color;\n\t\tuniform samplerCube skybox;\n\t\tvoid main() { \n\t\t\tcolor = texture(skybox, TexCoords);\n\t\t}";
        this.ss.addShader(fg, gl.FRAGMENT_SHADER, mode.read_text);
        this.ss.compile();
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
        // Setup vertex vao
        //this.skyboxVAO = gl.createVertexArray();
        this.skyboxVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.skyboxVBO);
        gl.bufferData(gl.ARRAY_BUFFER, skyboxVertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        //gl.bindVertexArray(0);
        this.cubeMapTexture = this._loadCubemap(faces);
        this.ss.addUniforms(["view", "projection"]);
    }
    Skybox.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.depthFunc(gl.LEQUAL);
        this.ss.use();
        // get projection and view from camera and send it to ss
        gl.depthFunc(gl.LESS);
    };
    Skybox.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        //gl.bindVertexArray(0);
        //gl.deleteVertexArrays(this.skyboxVAO);
        //gl.deleteTexture
    };
    Skybox.prototype._loadCubemap = function (faces) {
    };
    return Skybox;
})();
/// <reference path="../extras/vector2.ts" />
/// <reference path="../core/Core.ts" />
var RenderBufferTexture = (function () {
    function RenderBufferTexture(size, format, attachment) {
        var gl = Core.getInstance().getGL();
        this._handle = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
        gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, null);
    }
    return RenderBufferTexture;
})();
var Texture3D = (function () {
    function Texture3D() {
    }
    return Texture3D;
})();
// https://github.com/glo-js/glo-texture/tree/master/lib 
