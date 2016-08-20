"use strict"; // Force variables must be declared before used!
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
            self._onKeyUp(ev);
        });
        window.addEventListener("keydown", function (ev) {
            if (ev.keyCode === 40 || ev.keyCode === 38) {
                ev.preventDefault();
            }
            self._onKeyDown(ev);
        });
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
        var speed = 1.0;
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Left_Shift)) {
            speed = 2.5;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.W)) {
            this.processKeyboard(4, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.S)) {
            this.processKeyboard(5, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.A)) {
            this.processKeyboard(2, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.D)) {
            this.processKeyboard(3, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.E)) {
            this.processKeyboard(0, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Q)) {
            this.processKeyboard(1, speed);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(38)) {
            this.processMouseMovement(0.0, 2.5);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(40)) {
            this.processMouseMovement(0.0, -2.5);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(37)) {
            // this.processMouseMovement(2.5, 0.0);
            this.processMouseMovement(-2.5, 0.0);
            this._updateCamera = true;
        }
        if (Input.getInstance().isKeyPressed(39)) {
            // this.processMouseMovement(-2.5, 0.0);
            this.processMouseMovement(2.5, 0.0);
            this._updateCamera = true;
        }
        if (this._updateCamera && callback) {
            callback();
        }
    };
    Camera.prototype.processKeyboard = function (direction, speed) {
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
    Camera.prototype.processMouseMovement = function (xOffset, yOffset) {
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
        // this.proj = mat4.ortho(this.proj, -10.0, 10.0, -10.0, 10.0, 0.001, 1000.0);
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
        // var R = this._genMatrixUsingYawPitchRoll(
        // this._yaw, this._pitch, this._roll);
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
/// <reference path="core.ts" />
"use strict";
var mode;
(function (mode) {
    mode[mode["read_file"] = 0] = "read_file";
    mode[mode["read_script"] = 1] = "read_script";
    mode[mode["read_text"] = 2] = "read_text";
})(mode || (mode = {}));
;
var shader_type;
(function (shader_type) {
    shader_type[shader_type["vertex"] = 0] = "vertex";
    shader_type[shader_type["fragment"] = 1] = "fragment";
})(shader_type || (shader_type = {}));
var ShaderProgram = (function () {
    function ShaderProgram() {
        this.uniformLocations = {};
        this.attribLocations = {};
        this._shaders = [];
    }
    // public addAttributes(..attrs: string) {
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
    // public addUniforms(..attrs: string) {
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
    ShaderProgram.prototype.addShader = function (shader_, /*type: number*/ st, _mode) {
        var gl = Core.getInstance().getGL();
        var shader;
        var type = -1;
        if (st === shader_type.vertex) {
            type = gl.VERTEX_SHADER;
        }
        else if (st === shader_type.fragment) {
            type = gl.FRAGMENT_SHADER;
        }
        if (type < 0) {
            throw new Error("SHADER TYPE UNDEFINED");
        }
        if (_mode === mode.read_file) {
            shader = this.loadAndCompileWithFile(shader_, type);
        }
        else if (_mode === mode.read_script) {
            shader = this.loadAndCompile(shader_, type);
        }
        else if (_mode === mode.read_text) {
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
    ShaderProgram.prototype.sendUniform1f = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform1f(this.uniformLocations[name], value);
    };
    ShaderProgram.prototype.sendUniform1i = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value);
    };
    ShaderProgram.prototype.sendUniform1b = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
    };
    ShaderProgram.prototype.sendUniformVec3 = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform3fv(this.uniformLocations[name], value);
    };
    ShaderProgram.prototype.sendUniformMat4 = function (name, value, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = Core.getInstance().getGL();
        gl.uniformMatrix4fv(this.uniformLocations[name], transpose, value);
    };
    return ShaderProgram;
})();
/// <reference path="../core/shaderProgram.ts" />
var ToneMap;
(function (ToneMap) {
    var vertexCode = "#version 300 es\n  in vec3 vertex;\n  out vec2 texCoord;\n  void main() {\n    texCoord = vertex.xy * 0.5 + 0.5;\n    gl_Position = vec4( vertex, 1 );\n  }";
    function init(gl) {
        ToneMap.textureQuadSimpleProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
        ToneMap.textureQuadSimpleProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n      }", shader_type.fragment, mode.read_text);
        ToneMap.textureQuadSimpleProgram.compile();
        ToneMap.textureQuadSimpleProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadSimpleProgram.addUniforms(["texture_"]);
        ToneMap.textureQuadGammaProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
        ToneMap.textureQuadGammaProgram.addShader("#version 300 es\n\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction\n      }", shader_type.fragment, mode.read_text);
        ToneMap.textureQuadGammaProgram.compile();
        ToneMap.textureQuadGammaProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadGammaProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadReinhardProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
        ToneMap.textureQuadReinhardProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.rgb = fragColor.rgb / ( 1.0 + fragColor.rgb );\n        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction\n      }", shader_type.fragment, mode.read_text);
        ToneMap.textureQuadReinhardProgram.compile();
        ToneMap.textureQuadReinhardProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadReinhardProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadFilmicProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
        ToneMap.textureQuadFilmicProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        vec3 color = texture( texture_, texCoord ).rgb * pow( abs( brightness ), 2.2 );\n        color = max(vec3(0.), color - vec3(0.004));\n        color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);\n        fragColor = vec4( color, 1.0 );\n      }", shader_type.fragment, mode.read_text);
        ToneMap.textureQuadFilmicProgram.compile();
        ToneMap.textureQuadFilmicProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadFilmicProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadsRGBProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
        ToneMap.textureQuadsRGBProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      out vec4 fragColor;\n      float sRGB_gamma_correct(float c) {\n       const float a = 0.055;\n       if (c < 0.0031308) return 12.92*c;\n       else return (1.0+a)*pow(c, 1.0/2.4) - a;\n      }\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.r = sRGB_gamma_correct(fragColor.r);\n        fragColor.g = sRGB_gamma_correct(fragColor.g);\n        fragColor.b = sRGB_gamma_correct(fragColor.b);\n      }", shader_type.fragment, mode.read_text);
        ToneMap.textureQuadsRGBProgram.compile();
        ToneMap.textureQuadsRGBProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadsRGBProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadUncharted2Program.addShader(vertexCode, shader_type.vertex, mode.read_text);
        ToneMap.textureQuadUncharted2Program.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        float A = 0.15;\n        float B = 0.50;\n        float C = 0.10;\n        float D = 0.20;\n        float E = 0.02;\n        float F = 0.30;\n        float W = 11.2;\n        float exposure = brightness;//2.;\n        fragColor.rgb *= exposure;\n        fragColor.rgb = ((fragColor.rgb * \n          (A * fragColor.rgb + C * B) + D * E) / (fragColor.rgb * \n          (A * fragColor.rgb + B) + D * F)) - E / F;\n        float white = ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;\n        fragColor.rgb /= white;\n        fragColor.rgb = pow(fragColor.rgb, vec3(1. / 2.2));\n      }", shader_type.fragment, mode.read_text);
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
/// <reference path="input.ts" />
/// <reference path="../resources/quadToneMap.ts" />
/// <reference path="../stats.d.ts" />
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
        // var canvas = <HTMLCanvasElement>document.getElementById("canvas");
        var canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        document.body.appendChild(canvas);
        /**
        canvas.addEventListener("mouseup", function(ev: MouseEvent) {
            console.log("X: " + ev.pageX + ", Y: " + ev.pageY);
        }, false);


        canvas.addEventListener("mousemove", function(ev: MouseEvent) {
            console.log("X: " + ev.pageX + ", Y: " + ev.pageY);
        }, false);


        canvas.addEventListener("mousedown", function(ev: MouseEvent) {
            console.log("X: " + ev.pageX + ", Y: " + ev.pageY);
        }, false);
        /**/
        this._gl = this._getContext(canvas);
        if (!this._gl) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        this._getVendors();
        Input.getInstance();
        //this.init();
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
        var gl = this._gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(ComparisonFunc.Less);
        //gl.depthFunc(gl.LESS);
        // gl.depthFunc(gl.LEQUAL);
        // Set images to flip y axis to match the texture coordinate space.
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.enable(gl.CULL_FACE);
        gl.disable(gl.BLEND);
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
                window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
                window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
                if (window.requestAnimationFrame) {
                    break;
                }
            }
        }
    };
    Core._instance = new Core();
    return Core;
})();
var gl = Core.getInstance().getGL();
// Stencil operation
var StencilOp;
(function (StencilOp) {
    StencilOp[StencilOp["Keep"] = gl.KEEP] = "Keep";
    StencilOp[StencilOp["Zero"] = gl.ZERO] = "Zero";
    StencilOp[StencilOp["Replace"] = gl.REPLACE] = "Replace";
    StencilOp[StencilOp["Increase"] = gl.INCR] = "Increase";
    StencilOp[StencilOp["IncreaseSaturate"] = gl.INCR_WRAP] = "IncreaseSaturate";
    StencilOp[StencilOp["Decrease"] = gl.DECR] = "Decrease";
    StencilOp[StencilOp["DecreaseSaturate"] = gl.DECR_WRAP] = "DecreaseSaturate";
    StencilOp[StencilOp["Invert"] = gl.INVERT] = "Invert"; ///< Invert the stencil data (bitwise not)
})(StencilOp || (StencilOp = {}));
;
// Comparison function
var ComparisonFunc;
(function (ComparisonFunc) {
    // TODO (glDisable(gl.DEPTH_TEST) Disabled,       ///< Comparison is disabled
    ComparisonFunc[ComparisonFunc["Never"] = gl.NEVER] = "Never";
    ComparisonFunc[ComparisonFunc["Always"] = gl.ALWAYS] = "Always";
    ComparisonFunc[ComparisonFunc["Less"] = gl.LESS] = "Less";
    ComparisonFunc[ComparisonFunc["Equal"] = gl.EQUAL] = "Equal";
    ComparisonFunc[ComparisonFunc["NotEqual"] = gl.NOTEQUAL] = "NotEqual";
    ComparisonFunc[ComparisonFunc["LessEqual"] = gl.LEQUAL] = "LessEqual";
    ComparisonFunc[ComparisonFunc["Greater"] = gl.GREATER] = "Greater";
    ComparisonFunc[ComparisonFunc["GreaterEqual"] = gl.GEQUAL] = "GreaterEqual"; ///< Passes if source is greater than or equal to the destination
})(ComparisonFunc || (ComparisonFunc = {}));
// Cull mode
var CullMode;
(function (CullMode) {
    // TODO (glDisable(gl.CULL_FACE) None = gl.NONE,               ///< No culling
    CullMode[CullMode["Front"] = gl.FRONT] = "Front";
    CullMode[CullMode["Back"] = gl.BACK] = "Back";
    CullMode[CullMode["FrontAndBack"] = gl.FRONT_AND_BACK] = "FrontAndBack"; ///< Cull Front and back-facing primitives
})(CullMode || (CullMode = {}));
;
// Front face directions
var FaceDir;
(function (FaceDir) {
    FaceDir[FaceDir["Clockwise"] = gl.CW] = "Clockwise";
    FaceDir[FaceDir["InvClockwise"] = gl.CCW] = "InvClockwise"; ///< Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction
})(FaceDir || (FaceDir = {}));
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
// Render Primitive type
var RenderType;
(function (RenderType) {
    RenderType[RenderType["Points"] = gl.POINTS] = "Points";
    RenderType[RenderType["Lines"] = gl.LINES] = "Lines";
    RenderType[RenderType["LineLoop"] = gl.LINE_LOOP] = "LineLoop";
    RenderType[RenderType["LineStrip"] = gl.LINE_STRIP] = "LineStrip";
    RenderType[RenderType["Triangles"] = gl.TRIANGLES] = "Triangles";
    RenderType[RenderType["TriangleStrip"] = gl.TRIANGLE_STRIP] = "TriangleStrip";
    RenderType[RenderType["TriangleFan"] = gl.TRIANGLE_FAN] = "TriangleFan";
})(RenderType || (RenderType = {}));
;
// Blending equaiton
var BlendingEq;
(function (BlendingEq) {
    BlendingEq[BlendingEq["FuncAdd"] = gl.FUNC_ADD] = "FuncAdd";
    BlendingEq[BlendingEq["FuncSub"] = gl.FUNC_SUBTRACT] = "FuncSub";
    BlendingEq[BlendingEq["FuncRevSub"] = gl.FUNC_REVERSE_SUBTRACT] = "FuncRevSub";
})(BlendingEq || (BlendingEq = {}));
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    return Vector2;
})();
/// <reference path="../core/core.ts" />
/// <reference path="../extras/Vector2.ts" />
var Texture = (function () {
    function Texture(target) {
        this._target = target;
    }
    Object.defineProperty(Texture.prototype, "target", {
        get: function () { return this._target; },
        enumerable: true,
        configurable: true
    });
    Texture.prototype.handle = function () {
        return this._handle;
    };
    // TODO: Move to abstract methods
    Texture.prototype.getHeight = function () { return -1; };
    Texture.prototype.getWidth = function () { return -1; };
    return Texture;
})();
/// <reference path="../extras/Vector2.ts" />
/// <reference path="../core/Core.ts" />
var RenderBufferTexture = (function () {
    function RenderBufferTexture(size, format, attachment) {
        var gl = Core.getInstance().getGL();
        this._handle = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
        gl.renderbufferStorage(gl.RENDERBUFFER, format, size.x, size.y);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, this._handle);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }
    RenderBufferTexture.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
    };
    return RenderBufferTexture;
})();
/// <reference path="core.ts" />
/// <reference path="../textures/texture.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="../extras/Vector2.ts" />
var Framebuffer = (function () {
    function Framebuffer(textures, size, depth, stencil, options) {
        if (depth === void 0) { depth = false; }
        if (stencil === void 0) { stencil = false; }
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
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
        this._handle = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
        // Each textures to fbo
        textures.forEach(function (texture, i) {
            texture.bind();
            // Only supported simple textures
            // TODO: Cubemap or texture3D
            var target = texture.target;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, target, texture.handle(), 0);
            texture.unbind(); // TODO: Unbind debería ser un abstract de texture
        });
        // TODO: Check no texture attachments (default render buffer storage)
        if (depth) {
            this._renderBuffer = new RenderBufferTexture(size, gl.DEPTH_COMPONENT16, gl.DEPTH_ATTACHMENT);
        }
        /**
        if (depth && stencil) {
                // TODO options.floatDepth ??
            this._depth = initTexture2D(size, gl.UNSIGNED_INT_24_8, gl.DEPTH_STENCIL, gl.DEPTH_STENCIL_ATTACHMENT);
        } else if (depth && !stencil) {
            this._depth = initTexture2D(size, gl.UNSIGNED_SHORT, gl.DEPTH_ATTACHMENT, gl.DEPTH_ATTACHMENT);
        } else if (!depth && stencil) {
            this._renderBuffer = this.createRenderBuffer(size, gl.STENCIL_INDEX, gl.STENCIL_ATTACHMENT);
        }
        /**/
        if (numColors > 1) {
            var drawBuffs = [];
            for (var i = 0; i < numColors; i++) {
                drawBuffs.push(gl.COLOR_ATTACHMENT0 + i);
            }
            gl.drawBuffers(drawBuffs);
        }
        // Check status
        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            this.destroy();
            this._throwFBOError(status);
        }
        this.unbind();
    }
    Framebuffer.prototype._throwFBOError = function (status) {
        var gl = Core.getInstance().getGL();
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
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
    };
    Framebuffer.prototype.onlyBindTextures = function () {
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._colors.forEach(function (tex, idx) {
            tex.bind(idx);
        });
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
        /*if (this._depth) {
            this._depth.destroy();
            this._depth = null;
        }*/
        // Destroy depth/stencil
        if (this._renderBuffer) {
            this._renderBuffer.destroy();
            this._renderBuffer = null;
        }
        // Color buffer default TODO
    };
    return Framebuffer;
})();
/// <reference path="texture.ts" />
var SimpleTexture2D = (function (_super) {
    __extends(SimpleTexture2D, _super);
    function SimpleTexture2D(size, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        _super.call(this, gl.TEXTURE_2D);
        options = options || {};
        // Support compression
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
        this.bind();
        gl.texImage2D(this._target, 0, // Level of details
        _internalformat, // Internal format
        size.x, size.y, 0, _format, // Format
        _type, // Size of each channel
        null);
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        this.wrap(wraps);
        /*// Prevent NPOT textures
        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
    }
    SimpleTexture2D.prototype.genMipMap = function () {
        var gl = Core.getInstance().getGL();
        this.bind();
        // TODO: Check NPOT??
        gl.generateMipmap(this.target);
    };
    SimpleTexture2D.prototype.wrap = function (modes) {
        if (modes.length !== 2) {
            throw new Error("Must specify wrapS, wrapT modes");
        }
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, modes[0]);
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, modes[1]);
        this._wraps = modes;
    };
    SimpleTexture2D.prototype.minFilter = function (filter) {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, filter);
        this._minFilter = filter;
    };
    SimpleTexture2D.prototype.magFilter = function (filter) {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, filter);
        this._magFilter = filter;
    };
    SimpleTexture2D.prototype.bind = function (slot) {
        var gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this.target, this._handle);
    };
    SimpleTexture2D.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindTexture(this.target, null);
    };
    SimpleTexture2D.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
    return SimpleTexture2D;
})(Texture);
/// <reference path="../extras/Vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="core.ts" />
/// <reference path="framebuffer.ts" />
var gbuffer_type;
(function (gbuffer_type) {
    gbuffer_type[gbuffer_type["position"] = 0] = "position";
    gbuffer_type[gbuffer_type["normal"] = 1] = "normal";
    gbuffer_type[gbuffer_type["diffuse"] = 2] = "diffuse";
    gbuffer_type[gbuffer_type["num_textures"] = 3] = "num_textures";
})(gbuffer_type || (gbuffer_type = {}));
var GBuffer = (function () {
    function GBuffer(size) {
        var gl = Core.getInstance().getGL();
        this.framebuffer = new Framebuffer([
            // Position color buffer
            new SimpleTexture2D(size, {
                "internalformat": gl.RGB,
                "format": gl.RGB,
                "type": gl.FLOAT,
                "minFilter": gl.NEAREST,
                "maxFilter": gl.NEAREST
            }),
            // Normal color buffer
            new SimpleTexture2D(size, {
                "internalformat": gl.RGB,
                "format": gl.RGB,
                "type": gl.FLOAT,
                "minFilter": gl.NEAREST,
                "maxFilter": gl.NEAREST
            }),
            // Color + Specular color buffer
            new SimpleTexture2D(size, {
                "internalformat": gl.RGB,
                "format": gl.RGB,
                "type": gl.FLOAT,
                "minFilter": gl.NEAREST,
                "maxFilter": gl.NEAREST
            })
        ], size, true, true, {});
        console.log("done");
    }
    GBuffer.prototype.bindForReading = function () {
        this.framebuffer.onlyBindTextures();
    };
    GBuffer.prototype.bindForWriting = function () {
        this.framebuffer.bind();
    };
    GBuffer.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        if (this.framebuffer) {
            this.framebuffer.destroy();
        }
    };
    return GBuffer;
})();
/// <reference path="texture.ts" />
// TODO: Es necesario realmente el tamaño??
var Texture2D = (function (_super) {
    __extends(Texture2D, _super);
    function Texture2D(data /*: ImageData*/, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        _super.call(this, gl.TEXTURE_2D);
        options = options || {};
        console.log(this.target);
        // Support compression
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
        this.bind();
        gl.texImage2D(this.target, 0, // Level of details
        _internalformat, // Internal format
        _format, // Format
        _type, // Size of each channel
        data);
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        this.wrap(wraps);
        /*// Prevent NPOT textures
        // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
    }
    Texture2D.prototype.genMipMap = function () {
        var gl = Core.getInstance().getGL();
        this.bind();
        // TODO: Check NPOT??
        gl.generateMipmap(this.target);
    };
    Texture2D.prototype.wrap = function (modes) {
        if (modes.length !== 2) {
            throw new Error("Must specify wrapS, wrapT modes");
        }
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, modes[0]);
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, modes[1]);
        this._wraps = modes;
    };
    Texture2D.prototype.minFilter = function (filter) {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, filter);
        this._minFilter = filter;
    };
    Texture2D.prototype.magFilter = function (filter) {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, filter);
        this._magFilter = filter;
    };
    Texture2D.prototype.bind = function (slot) {
        var gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this.target, this._handle);
    };
    Texture2D.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindTexture(this.target, null);
    };
    Texture2D.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
    return Texture2D;
})(Texture);
/// <reference path="../extras/Vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/texture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="core.ts" />
/// <reference path="../gl-matrix.d.ts" />
// https://bitbucket.org/masterurjc/practica1/src/2a06c91942814954c1a1ae489d78705a5b5317e1/RenderingAvanzado1/GBufferSSAO.h?at=FINISH&fileviewer=file-view-default
var gbufferssao_type;
(function (gbufferssao_type) {
    gbufferssao_type[gbufferssao_type["position"] = 0] = "position";
    gbufferssao_type[gbufferssao_type["normal"] = 1] = "normal";
    gbufferssao_type[gbufferssao_type["diffuse"] = 2] = "diffuse";
    gbufferssao_type[gbufferssao_type["num_textures"] = 3] = "num_textures";
})(gbufferssao_type || (gbufferssao_type = {}));
// TODO: Find a good random uniform number generator
var GBufferSSAO = (function () {
    function GBufferSSAO(size) {
        this.ssaoKernel = [];
        this.ssaoNoise = [];
        this._textures = new Array(gbufferssao_type.num_textures);
        var gl = Core.getInstance().getGL();
        this._textures = new Array(3);
        this._fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
        var width = size.x;
        var height = size.y;
        // Position color buffer
        (this._textures[gbufferssao_type.position] = new SimpleTexture2D(size, {
            "internalformat": (gl).RGBA,
            "format": gl.RGBA,
            "type": gl.FLOAT,
            "minFilter": gl.NEAREST,
            "maxFilter": gl.NEAREST,
            "wrap": [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
        })).unbind();
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._textures[gbufferssao_type.position].handle(), 0);
        // Normal color buffer
        (this._textures[gbufferssao_type.normal] = new SimpleTexture2D(size, {
            "internalformat": gl.RGB,
            "format": gl.RGB,
            "type": gl.FLOAT,
            "minFilter": gl.NEAREST,
            "maxFilter": gl.NEAREST
        })).unbind();
        this._textures[gbufferssao_type.normal].unbind();
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this._textures[gbufferssao_type.normal].handle(), 0);
        // Color + Specular color buffer
        (this._textures[gbufferssao_type.diffuse] = new SimpleTexture2D(size, {
            "internalformat": gl.RGBA,
            "format": gl.RGBA,
            "type": gl.FLOAT,
            "minFilter": gl.NEAREST,
            "maxFilter": gl.NEAREST
        })).unbind();
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, this._textures[gbufferssao_type.diffuse].handle(), 0);
        // create a renderbuffer object to store depth info
        this._depthTexture = new RenderBufferTexture(size, gl.DEPTH_COMPONENT16, gl.DEPTH_ATTACHMENT);
        gl.drawBuffers([
            gl.COLOR_ATTACHMENT0,
            gl.COLOR_ATTACHMENT1,
            gl.COLOR_ATTACHMENT2
        ]);
        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            // console.log(`Framebuffer error. Status: ${status}`);
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
        }
        console.log("done");
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        function lerp(a, b, f) {
            return a + f * (b - a);
        }
        this.kernelSize = 128;
        function randomFloats(min, max) {
            return Math.random() * (max - min) + min;
        }
        for (var i = 0; i < this.kernelSize; i++) {
            var sample = vec3.fromValues(randomFloats(0.0, 1.0) * 2.0 - 1.0, randomFloats(0.0, 1.0) * 2.0 - 1.0, randomFloats(0.0, 1.0));
            vec3.normalize(sample, sample);
            sample[0] *= randomFloats(0.0, 1.0);
            sample[1] *= randomFloats(0.0, 1.0);
            sample[2] *= randomFloats(0.0, 1.0);
            // Scale samples s.t. they're more aligned to center of kernel
            var scale = (i * 1.0) / (this.kernelSize * 1.0);
            sample[0] *= scale;
            sample[1] *= scale;
            sample[2] *= scale;
            this.ssaoKernel.push(sample);
        }
        // Noise texture
        for (var i = 0; i < 16; ++i) {
            // rotate around z-axis (in tangent space)
            var noise = vec3.fromValues(randomFloats(0.0, 1.0) * 2.0 - 1.0, randomFloats(0.0, 1.0) * 2.0 - 1.0, 0.0);
            this.ssaoNoise.push(noise[0]);
            this.ssaoNoise.push(noise[1]);
            this.ssaoNoise.push(noise[2]);
        }
        /*let noiseTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, /*gl.RGB16F*/ /*gl.RGBA,
            4, 4, 0, gl.RGB, gl.FLOAT, new Float32Array(this.ssaoNoise));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
            gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER,
            gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,
            gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,
            gl.REPEAT);*/
    }
    GBufferSSAO.prototype.bindForReading = function () {
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._textures.forEach(function (tex, idx) {
            tex.bind(idx);
        });
    };
    GBufferSSAO.prototype.bindForWriting = function () {
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
    };
    GBufferSSAO.prototype.bindForSSAO = function () {
    };
    GBufferSSAO.prototype.sendSamplesSSAOTexture = function (progName) {
    };
    GBufferSSAO.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        if (this._fbo) {
            gl.deleteFramebuffer(this._fbo);
        }
        if (this._textures) {
            this._textures.forEach(function (tex) {
                tex.destroy();
            });
        }
        if (this._depthTexture) {
            this._depthTexture.destroy();
        }
    };
    return GBufferSSAO;
})();
/// <reference path="../core/core.ts" />
var VertexArray = (function () {
    function VertexArray() {
        var gl = Core.getInstance().getGL();
        this._handle = gl.createVertexArray();
        this.bind();
    }
    VertexArray.prototype.bind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._handle);
    };
    VertexArray.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(null);
    };
    VertexArray.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.deleteVertexArray(this._handle);
    };
    VertexArray.prototype.is = function () {
        var gl = Core.getInstance().getGL();
        return gl.isVertexArray(this._handle);
    };
    return VertexArray;
})();
/// <reference path="core.ts" />
/// <reference path="../extras/vertexArray.ts" />
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
        this.vao = new VertexArray();
        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);
        // console.log(model.meshes[0]);
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
        request.open("GET", url, false);
        var self = this;
        request.onload = function () {
            if (request.status < 200 || request.status > 299) {
                console.log("Error: HTTP Status " + request.status + " on resource " + url);
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
        this.vao.bind();
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        this.vao.unbind();
    };
    Model.prototype.renderArrayInstance = function (numInstances) {
        var gl = Core.getInstance().getGL();
        this.vao.bind();
        gl.drawElementsInstanced(gl.TRIANGLES, this.indices.length, 
        //indexCount, 
        gl.UNSIGNED_SHORT, 0, numInstances);
        //this.vao.unbind();
    };
    return Model;
})();
;
/// <reference path="../core/core.ts" />
var VertexBuffer = (function () {
    function VertexBuffer(type) {
        this._type = BufferType.Array;
        var gl = Core.getInstance().getGL();
        this._buffer = gl.createBuffer();
        this._type = type;
        this.bind();
    }
    VertexBuffer.prototype.bind = function (type) {
        var gl = Core.getInstance().getGL();
        if (type !== undefined) {
            this._type = type;
        }
        gl.bindBuffer(this._type, this._buffer);
    };
    VertexBuffer.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindBuffer(this._type, null);
    };
    VertexBuffer.prototype.getBufferType = function () {
        return this._type;
    };
    VertexBuffer.prototype.getBuffer = function () {
        return this._buffer;
    };
    VertexBuffer.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.bindBuffer(this._type, 0);
        if (!this._buffer) {
            gl.deleteBuffer(this._buffer);
        }
        this._buffer = null;
    };
    VertexBuffer.prototype.bufferData = function (data, usage) {
        if (usage === void 0) { usage = UsageType.StaticDraw; }
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.bufferData(this._type, data, usage);
    };
    VertexBuffer.prototype.attribDivisor = function (position, length, divisor) {
        var gl = Core.getInstance().getGL();
        this.bind();
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, length, gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribDivisor(position, divisor);
    };
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
})();
/// <reference path="core.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
/// <reference path="../extras/vertexArray.ts" />
"use strict";
/**
* This class wrap PostProcess effects
*
* @class core.PostProcess
*/
var PostProcess = (function () {
    function PostProcess() {
    }
    PostProcess.initialize = function () {
        var gl = Core.getInstance().getGL();
        if (!PostProcess._planeVAO) {
            var positions = [
                -1.0, -1.0,
                1.0, -1.0,
                -1.0, 1.0,
                1.0, 1.0
            ];
            PostProcess._planeVAO = new VertexArray();
            // Unnecesary (<any>gl).bindVertexArray(PostProcess._planeVAO);  
            this._planeVertexVBO = new VertexBuffer(BufferType.Array);
            // Unnecesary gl.bindBuffer(gl.ARRAY_BUFFER, this._planeVertexVBO);
            this._planeVertexVBO.bufferData(new Float32Array(positions), UsageType.StaticDraw);
            this._planeVertexVBO.vertexAttribPointer(0, 2, gl.FLOAT);
            PostProcess._planeVAO.unbind();
        }
    };
    PostProcess.bind = function () {
        var gl = Core.getInstance().getGL();
        PostProcess._planeVAO.bind();
    };
    PostProcess.render = function () {
        // console.log("DRAW QUAD");
        var gl = Core.getInstance().getGL();
        PostProcess._planeVAO.bind();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        PostProcess._planeVAO.unbind();
    };
    PostProcess._planeVAO = null;
    PostProcess._planeVertexVBO = null;
    return PostProcess;
})();
PostProcess.initialize();
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
var Stencil = (function () {
    function Stencil() {
    }
    Stencil.prototype.use = function () {
        var gl = Core.getInstance().getGL();
        gl.enable(gl.STENCIL_TEST);
    };
    Stencil.prototype.func = function (compFun, ref, mask) {
        var gl = Core.getInstance().getGL();
        gl.stencilFunc(compFun, ref, mask);
    };
    Stencil.prototype.operation = function (fail, zfail, zpass) {
        var gl = Core.getInstance().getGL();
        gl.stencilOp(fail, zfail, zpass);
    };
    Stencil.prototype.mask = function (mask) {
        var gl = Core.getInstance().getGL();
        gl.stencilMask(mask);
    };
    Stencil.prototype.clear = function () {
        var gl = Core.getInstance().getGL();
        gl.clear(gl.STENCIL_BUFFER_BIT);
    };
    Stencil.prototype.unuse = function () {
        var gl = Core.getInstance().getGL();
        gl.disable(gl.STENCIL_TEST);
    };
    return Stencil;
})();
// TODO: Change _color to Vector3
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
/*class Timer__ {
    protected running: boolean;
    protected start_clock: number;
    protected start_time: number;
    protected acc_time: number;
    constructor() {
        this.running = false;
        this.start_clock = 0;
        this.start_time = 0;
        this.acc_time = 0;
    }
    public elapsed_time(): number {
        var acc_sec = (performance || Date).now();
        return -1;
    }
    public start(msg: string = ""): void {

    }
    public SetToZero(): void {
        this.acc_time = 0;
    }
    public restart(): void {
        // Set timer status to running, reset accumulated time, and set start time
        this.running = true;
        this.acc_time = 0;
        this.start_clock = //clock();
        this.start_time = (performance || Date).now();
    }
    public stop(): void {
        // Compute accumulated running time and set timer status to not running
        if (this.running) this.acc_time += this.elapsed_time();
        this.running = false;
    }
    public check(): number {
        return -1;
    }
}
        // newTime = ( performance || Date ).now()
        // https://bitbucket.org/masterurjc/practica1/src/1b9cfa67f4b68e8c6a570ce58cfdb2c02d9ee32e/RenderingAvanzado1/Timer.h?at=master&fileviewer=file-view-default
        */ 
var Timer;
(function (Timer) {
    var _lastTime = Date.now();
    var _deltaTime = 0.0;
    var _currentTime, _timeElapsed;
    function update() {
        _currentTime = Date.now();
        _timeElapsed = _currentTime - _lastTime;
        _deltaTime = _timeElapsed;
        _lastTime = _currentTime;
    }
    Timer.update = update;
    function deltaTime() {
        return _deltaTime;
    }
    Timer.deltaTime = deltaTime;
})(Timer || (Timer = {}));
var Vector3 = (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    };
    return Vector3;
})();
var Vector4 = (function () {
    function Vector4(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Vector4.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    };
    return Vector4;
})();
/// <reference path="../core/shaderProgram.ts" />
"use strict";
;
;
var ShaderManager;
(function (ShaderManager) {
    var _progDictionary = {};
    function get(name) {
        return _progDictionary[name];
    }
    ShaderManager.get = get;
    function addWithFun(name, fn) {
        _progDictionary[name] = fn();
    }
    ShaderManager.addWithFun = addWithFun;
    function add(name, prog) {
        // if (name in ShaderManager._progDictionary) {
        // if (_progDictionary.hasOwnProperty(name)) {
        // 	console.warn(name + " key exist ...");
        // }
        _progDictionary[name] = prog;
    }
    ShaderManager.add = add;
    function destroy() {
        for (var key in _progDictionary) {
            _progDictionary[key].destroy();
        }
    }
    ShaderManager.destroy = destroy;
    function getCB(name, cb) {
        var prog = get(name);
        cb(prog);
    }
    ShaderManager.getCB = getCB;
})(ShaderManager || (ShaderManager = {}));
;
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
    })();
    ResourceMap.MapEntry = MapEntry;
    var _numOutstandingLoads = 0;
    var _loadCompleteCallback = null;
    var _resourceMap = {};
    function asyncLoadRequested(resName) {
        _resourceMap[resName] = new MapEntry(resName);
        ++_numOutstandingLoads;
    }
    ResourceMap.asyncLoadRequested = asyncLoadRequested;
    ;
    function asyncLoadFailed(resName) {
        VanillaToasts.create({
            title: resName + " completed",
            type: "error",
            timeout: 2500
        });
        --_numOutstandingLoads;
        _checkForAllLoadCompleted();
    }
    ResourceMap.asyncLoadFailed = asyncLoadFailed;
    function asyncLoadCompleted(resName, loadedAsset) {
        if (!isAssetLoaded(resName)) {
            VanillaToasts.create({
                title: "asyncLoadCompleted: [" + resName + "] not in map!",
                type: "error",
                timeout: 2500
            });
        }
        VanillaToasts.create({
            title: resName + " completed",
            type: "success",
            timeout: 1500
        });
        _resourceMap[resName].setAsset(loadedAsset);
        --_numOutstandingLoads;
        _checkForAllLoadCompleted();
    }
    ResourceMap.asyncLoadCompleted = asyncLoadCompleted;
    ;
    function _checkForAllLoadCompleted() {
        if ((_numOutstandingLoads === 0) && (_loadCompleteCallback !== null)) {
            var funToCall = _loadCompleteCallback;
            _loadCompleteCallback = null;
            funToCall();
        }
    }
    ;
    function setLoadCompleteCallback(fn) {
        _loadCompleteCallback = fn;
        _checkForAllLoadCompleted();
    }
    ResourceMap.setLoadCompleteCallback = setLoadCompleteCallback;
    ;
    function retrieveAsset(resName) {
        var r = null;
        if (resName in _resourceMap) {
            r = _resourceMap[resName].getAsset();
        }
        else {
            alert("retrieveAsset: [" + resName + "] not in map!");
        }
        return r;
    }
    ResourceMap.retrieveAsset = retrieveAsset;
    ;
    function isAssetLoaded(resName) {
        return (resName in _resourceMap);
    }
    ResourceMap.isAssetLoaded = isAssetLoaded;
    ;
    function incAssetRefCount(resName) {
        _resourceMap[resName].incCount();
    }
    ResourceMap.incAssetRefCount = incAssetRefCount;
    ;
    function unloadAsset(resName) {
        var c = 0;
        if (resName in _resourceMap) {
            _resourceMap[resName].decCount();
            c = _resourceMap[resName].count();
            if (c === 0) {
                delete _resourceMap[resName];
            }
        }
        return c;
    }
    ResourceMap.unloadAsset = unloadAsset;
    ;
})(ResourceMap || (ResourceMap = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
var Drawable = (function () {
    // TODO: Crear el VAO en el constructor y llamar a super
    function Drawable() {
        this._vao = new VertexArray();
    }
    Drawable.prototype.createBuffer = function (data, handle) {
        handle.bufferData(data, UsageType.StaticDraw);
        return handle;
    };
    Drawable.prototype.addAttrib_ = function (attribLocation, buffer, numElems) {
        var gl = Core.getInstance().getGL();
        buffer.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
    };
    return Drawable;
})();
/// <reference path="drawable.ts" />
var Torus = (function (_super) {
    __extends(Torus, _super);
    function Torus(outerRadius, innerRadius, sides, rings) {
        if (outerRadius === void 0) { outerRadius = 1.0; }
        if (innerRadius === void 0) { innerRadius = 0.5; }
        if (sides === void 0) { sides = 4; }
        if (rings === void 0) { rings = 10; }
        _super.call(this);
        var faces = sides * rings;
        var nVerts = sides * (rings + 1); // One extra ring to duplicate first ring
        // v
        var verts = new Array(3 * nVerts);
        // Normals
        var norms = new Array(3 * nVerts);
        // Tex coords
        var tex = new Array(2 * nVerts);
        // Elements
        var el = new Array(6 * faces);
        // Generate the vertex data
        var ringFactor = (Math.PI * 2.0) / rings;
        var sideFactor = (Math.PI * 2.0) / sides;
        var idx = 0, tidx = 0;
        for (var ring = 0; ring <= rings; ring++) {
            var u = ring * ringFactor;
            var cu = Math.cos(u);
            var su = Math.sin(u);
            for (var side = 0; side < sides; side++) {
                var v = side * sideFactor;
                var cv = Math.cos(v);
                var sv = Math.sin(v);
                var r = (outerRadius + innerRadius * cv);
                verts[idx] = r * cu;
                verts[idx + 1] = r * su;
                verts[idx + 2] = innerRadius * sv;
                norms[idx] = cv * cu * r;
                norms[idx + 1] = cv * su * r;
                norms[idx + 2] = sv * r;
                tex[tidx] = u / (Math.PI * 2.0);
                tex[tidx + 1] = v / (Math.PI * 2.0);
                tidx += 2;
                // Normalize
                var len = Math.sqrt(norms[idx] * norms[idx] +
                    norms[idx + 1] * norms[idx + 1] +
                    norms[idx + 2] * norms[idx + 2]);
                norms[idx] /= len;
                norms[idx + 1] /= len;
                norms[idx + 2] /= len;
                idx += 3;
            }
        }
        idx = 0;
        for (var ring = 0; ring < rings; ring++) {
            var ringStart = ring * sides;
            var nextRingStart = (ring + 1) * sides;
            for (var side = 0; side < sides; side++) {
                var nextSide = (side + 1) % sides;
                // The quad
                el[idx] = (ringStart + side);
                el[idx + 1] = (nextRingStart + side);
                el[idx + 2] = (nextRingStart + nextSide);
                el[idx + 3] = ringStart + side;
                el[idx + 4] = nextRingStart + nextSide;
                el[idx + 5] = (ringStart + nextSide);
                idx += 6;
            }
        }
        var gl = Core.getInstance().getGL();
        this._handle = new Array(4);
        var i = 0;
        this._handle[i] = new VertexBuffer(BufferType.ElementArray);
        for (i = 1; i < 4; i++) {
            this._handle[i] = new VertexBuffer(BufferType.Array);
        }
        this._vao.bind();
        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);
        this.addAttrib_(0, this.createBuffer(new Float32Array(verts), this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(new Float32Array(norms), this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(new Float32Array(tex), this._handle[3]), 2);
        this._indicesLen = el.length;
    }
    Torus.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        // offset the filled object to avoid the stitching that can arise when the wireframe lines are drawn
        // gl.enable(gl.POLYGON_OFFSET_FILL);
        // gl.polygonOffset(2.0, 2.0);
        // gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        // gl.disable(gl.POLYGON_OFFSET_FILL);
        // Then disable the vertex colors and draw the wire frame with one constant color
        // gl.lineWidth(1.0);
        // gl.drawElements(gl.LINE_LOOP, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    };
    Torus.prototype.renderArrayInstance = function (numInstances) {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElementsInstanced(gl.TRIANGLES, this._indicesLen, 
        //indexCount, 
        gl.UNSIGNED_SHORT, 0, numInstances);
        //this.vao.unbind();
    };
    return Torus;
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
        for (var i_1 = 0; i_1 <= slices; i_1++) {
            theta = i_1 * thetaFac;
            s = i_1 / slices;
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
        for (var i_2 = 0; i_2 < slices; i_2++) {
            var stackStart = i_2 * (stacks + 1);
            var nextStackStart = (i_2 + 1) * (stacks + 1);
            for (var j = 0; j < stacks; j++) {
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
        var gl = Core.getInstance().getGL();
        this._handle = new Array(4);
        var i = 0;
        this._handle[i] = new VertexBuffer(BufferType.ElementArray);
        for (i = 1; i < 4; i++) {
            this._handle[i] = new VertexBuffer(BufferType.Array);
        }
        this._vao.bind();
        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);
        this.addAttrib_(0, this.createBuffer(new Float32Array(v), this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(new Float32Array(n), this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(new Float32Array(tex), this._handle[3]), 2);
        this._indicesLen = el.length;
    }
    Sphere.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        // gl.lineWidth(1.0);
        // Puts vertices to buffer and links it to attribute letiable 'ppos'
        // gl.drawElements(gl.LINE_STRIP, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    };
    return Sphere;
})(Drawable);
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
        for (var i_3 = 0; i_3 <= zdivs; i_3++) {
            z = iFactor * i_3 - z2;
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
                tex[tidx + 1] = i_3 * texj;
                tidx += 2;
            }
        }
        var rowStart, nextRowStart;
        var idx = 0;
        for (var i_4 = 0; i_4 < zdivs; i_4++) {
            rowStart = i_4 * (xdivs + 1);
            nextRowStart = (i_4 + 1) * (xdivs + 1);
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
        var i = 0;
        this._handle[i] = new VertexBuffer(BufferType.ElementArray);
        for (i = 1; i < 4; i++) {
            this._handle[i] = new VertexBuffer(BufferType.Array);
        }
        this._vao.bind();
        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);
        this.addAttrib_(0, this.createBuffer(new Float32Array(v), this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(new Float32Array(n), this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(new Float32Array(tex), this._handle[3]), 2);
        this._indicesLen = el.length;
    }
    Quad.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        // gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);	// TODO: UNSIGNED_INT => https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    };
    return Quad;
})(Drawable);
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
    PointLight.prototype.addTransform = function (x, y, z) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        this._position[0] += x;
        this._position[1] += y;
        this._position[2] += z;
    };
    return PointLight;
})(Light);
/// <reference path="core/core.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="resources/shaderManager.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="models/torus.ts" />
/// <reference path="models/sphere.ts" />
/// <reference path="models/quad.ts" />
/// <reference path="core/model.ts" />
/// <reference path="textures/texture2d.ts" />
/// <reference path="core/gbuffer.ts" />
/// <reference path="core/gbufferSSAO.ts" />
/// <reference path="core/postprocess.ts" />
/// <reference path="extras/timer.ts" />
/// <reference path="lights/pointLight.ts" />
/// <reference path="_demoCamera.ts" />
/// <reference path="core/postProcess.ts" />
/// <reference path="extras/vertexBuffer.ts" />
var camera = new Camera(new Float32Array([-2.7, -1.4, 11.8]));
var gl_;
var stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);
var deferred;
var ssao;
var esferita;
var SimpleConfig = function () {
    return {
        max: 10
    };
};
var gui;
var torito;
var planito;
var m;
var view;
var projection;
var tex2d;
var light = new PointLight(new Float32Array([-5.0, 0.0, 0.0]));
var identityMatrix = mat4.create();
mat4.identity(identityMatrix);
var model = mat4.create();
var angle = 0;
var text = SimpleConfig();
function loadAssets() {
    myImageLoader("matcap.jpg");
}
var mainShader = "prog";
var offsetBuffer;
var numInstancias;
function maxOffsetUpdate() {
    var varvar = text.max;
    var offsetData = [];
    numInstancias = 0;
    for (var i = -varvar; i < varvar; i += 5.0) {
        for (var j = -varvar; j < varvar; j += 5.0) {
            for (var k = -varvar; k < varvar; k += 5.0) {
                offsetData.push(i * 1.0);
                offsetData.push(j * 1.0);
                offsetData.push(k * 1.0);
                numInstancias += 1;
            }
        }
    }
    console.log("NUM INSTANCES: " + numInstancias);
    // A nice little line of monkeys down the X axis
    // Optional (unnecesary): offsetBuffer.bind();
    var offsets = new Float32Array(offsetData);
    offsetBuffer.bufferData(offsets, UsageType.StaticDraw);
}
function initialize() {
    esferita = new Sphere(1.0, 20, 20);
    torito = new Torus(3.7, 2.3, 25, 10);
    planito = new Quad(100.0, 100.0, 2.0, 2.0);
    m = new Model("teddy.json");
    gl_ = Core.getInstance().getGL();
    ShaderManager.addWithFun("prog", function () {
        var prog = new ShaderProgram();
        prog.addShader("./shaders/demoShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/demoShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();
        prog.addUniforms(["projection", "view", "model",
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });
    var cubeImage = ResourceMap.retrieveAsset("matcap.jpg");
    var gl = Core.getInstance().getGL();
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrap: [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
    });
    //audio.playBackgroundAudio("music.mp3");
    offsetBuffer = new VertexBuffer(BufferType.Array);
    maxOffsetUpdate();
    cameraUpdateCb();
}
function cameraUpdateCb() {
    var canvas = Core.getInstance().canvas();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);
    var prog = ShaderManager.get(mainShader);
    prog.use();
    prog.sendUniformMat4("view", view);
    prog.sendUniformMat4("projection", projection);
    prog.sendUniformVec3("viewPos", camera.position);
}
// @param dt: Global time in seconds
function drawScene(dt) {
    var gl = Core.getInstance().getGL();
    camera.timeElapsed = Timer.deltaTime() / 10.0;
    camera.update(cameraUpdateCb);
    light.addTransform(Math.sin(dt) * 0.06, Math.cos(dt) * 0.06, 0.0 //5.0 + Math.cos(dt) * 0.06
    );
    Core.getInstance().clearColorAndDepth();
    ShaderManager.getCB(mainShader, function (prog) {
        prog.use();
        prog.sendUniformVec3("lightPosition", light.position);
        tex2d.bind(0);
        prog.sendUniform1i("tex", 0);
        angle += Timer.deltaTime() * 0.001;
        prog.sendUniform1b("usemc", true);
        var varvar = text.max;
        var i = 0, j = 0, k = 0;
        mat4.translate(model, identityMatrix, vec3.create());
        mat4.rotateY(model, model, 90.0 * Math.PI / 180);
        mat4.rotateY(model, model, angle);
        mat4.scale(model, model, vec3.fromValues(0.33, 0.33, 0.33));
        prog.sendUniformMat4("model", model);
        // Bind the instance position data
        // Optional (unnecesary): offsetBuffer.bind();
        offsetBuffer.attribDivisor(3, 3, 1);
        // Draw the instanced meshes
        torito.renderArrayInstance(numInstancias);
    });
}
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
function myImageLoader(src) {
    if (!ResourceMap.isAssetLoaded(src)) {
        var img = new Image();
        ResourceMap.asyncLoadRequested(src);
        img.onload = function () {
            // setTimeout(function() {
            ResourceMap.asyncLoadCompleted(src, img);
            // }, 2500);
        };
        img.onerror = function (err) {
            ResourceMap.asyncLoadFailed(src);
        };
        img.src = src;
    }
    else {
        ResourceMap.incAssetRefCount(src);
    }
}
;
window.onload = function () {
    Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);
    if (Object.keys(text).length > 0) {
        gui = new dat.GUI();
        /*for (var index in text) {
            gui.add(text, index);
        }*/
        gui.add(text, "max", 5, 100).onChange(maxOffsetUpdate);
    }
    loadAssets();
    ResourceMap.setLoadCompleteCallback(function () {
        console.log("ALL RESOURCES LOADED!!!!");
        Element.prototype.remove = function () {
            this.parentElement.removeChild(this);
        };
        NodeList.prototype["remove"] = HTMLCollection.prototype["remove"] = function () {
            for (var i = this.length - 1; i >= 0; i--) {
                if (this[i] && this[i].parentElement) {
                    this[i].parentElement.removeChild(this[i]);
                }
            }
        };
        // Remove loader css3 window
        document.getElementById("spinner").remove();
        initialize();
        requestAnimationFrame(loop);
    });
};
function loop(dt) {
    Input.getInstance().update();
    stats.begin();
    dt *= 0.001; // convert to seconds
    Timer.update();
    //resize();
    drawScene(dt); // Draw user function
    stats.end();
    requestAnimationFrame(loop);
}
function resize() {
    var canvas = Core.getInstance().canvas();
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
        Core.getInstance().changeViewport(0, 0, canvas.width, canvas.height);
        cameraUpdateCb();
    }
}
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
        // const gl = Core.getInstance().getGL();
        // DepthMat.ss.addShader("shaders/depthShader.vert", shader_type.vertex, mode.read_file);
    };
    DepthMat.ss = new ShaderProgram();
    return DepthMat;
})(Material);
// DepthMat.initialize(); 
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
/*
class Capsule extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(segments: number = 0, radius: number = 0.0, length: number = 0.0) {
        super();

        // Ensure odd
        segments = (segments + 1) &~1;
        
        var doubleSegments = segments * 2;
        var halfLength = length / 2;

        
        var vertices = new Array(3 * doubleSegments);
        var normals = new Array(3 * doubleSegments);
        var texCoords = new Array(3 * doubleSegments);
        var el;




        const gl = Core.getInstance().getGL();

        this._handle = new Array(4);
        for (var i = 0, size = this._handle.length; i < size; i++) {
            this._handle[i] = gl.createBuffer();
        }

        this._vao = (<any>gl).createVertexArray();
        (<any>gl).bindVertexArray(this._vao);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[0]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);

        this.addAttrib_(0, this.createBuffer(vertices, this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(normals, this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(texCoords, this._handle[3]), 2);

        this._indicesLen = el.length;

        (<any>gl).bindVertexArray(null);
        
        // TODO: Clear v, n, tex and el
        console.log({
            vertices: vertices,
            normal: normals,
            textureCoords: texCoords,
            indices: el,
            vao: this._handle
        });
    }


    protected _indicesLen;
    public render() {
        const gl = Core.getInstance().getGL();
        (<any>gl).bindVertexArray(this._vao);
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    }
}
*/ 
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
        var i = 0;
        this._handle[i] = new VertexBuffer(BufferType.ElementArray);
        for (i = 1; i < 4; i++) {
            this._handle[i] = new VertexBuffer(BufferType.Array);
        }
        this._vao.bind();
        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);
        this.addAttrib_(0, this.createBuffer(new Float32Array(v), this._handle[1]), 3);
        this.addAttrib_(1, this.createBuffer(new Float32Array(n), this._handle[2]), 3);
        this.addAttrib_(2, this.createBuffer(new Float32Array(tex), this._handle[3]), 2);
        this._indicesLen = el.length;
    }
    Cube.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
    };
    return Cube;
})(Drawable);
/// <reference path="drawable.ts" />
var Teaspot = (function (_super) {
    __extends(Teaspot, _super);
    function Teaspot() {
        _super.call(this);
    }
    Teaspot.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);
    };
    return Teaspot;
})(Drawable);
/// <reference path="resourceMap.ts" />
var AudioClip = (function () {
    function AudioClip() {
        this._bgAudioNode = null;
        this.initAudioContext();
    }
    AudioClip.prototype.initAudioContext = function () {
        this._audioContext = new (window["AudioContext"] || window["webkitAudioContext"])();
    };
    AudioClip.prototype.loadAudio = function (clipName) {
        if (!(ResourceMap.isAssetLoaded(clipName))) {
            // Update resources in load counter
            ResourceMap.asyncLoadRequested(clipName);
            // Async request the data from server
            var request = new XMLHttpRequest();
            request.open("GET", clipName, true);
            // Specify that the request retrieves binary data.
            request.responseType = "arraybuffer";
            request.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                this._audioContext.decodeAudioData(request.response, function (buffer) {
                    ResourceMap.asyncLoadCompleted(clipName, buffer);
                });
            }.bind(this);
            request.send();
        }
    };
    AudioClip.prototype.unloadAudio = function (clipName) {
        ResourceMap.unloadAsset(clipName);
    };
    AudioClip.prototype.stopBackgroundAudio = function () {
        // Check if the audio is playing
        if (this._bgAudioNode !== null) {
            this._bgAudioNode.stop(0);
            this._bgAudioNode = null;
        }
    };
    AudioClip.prototype.playSound = function (clipName) {
        var clip = ResourceMap.retrieveAsset(clipName);
        if (clip) {
            var sourceNode = this._audioContext.createBufferSource();
            sourceNode.buffer = clip;
            sourceNode.connect(this._audioContext.destination);
            // TODO: Volume!!
            sourceNode.start(0);
        }
    };
    AudioClip.prototype.isBackgroundAudioPlaying = function () {
        return this._bgAudioNode !== null;
    };
    AudioClip.prototype.playBackgroundAudio = function (clipName) {
        var clipInfo = ResourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // Stop audio if playing.
            this._stopBackgroundAudio();
            this._bgAudioNode = this._audioContext.createBufferSource();
            this._bgAudioNode.buffer = clipInfo;
            this._bgAudioNode.connect(this._audioContext.destination);
            this._bgAudioNode.loop = true;
            this._bgAudioNode.start(0);
        }
    };
    AudioClip.prototype._stopBackgroundAudio = function () {
        // Check if audio is playing
        if (this._bgAudioNode !== null) {
            this._bgAudioNode.stop(0);
            this._bgAudioNode = null;
        }
    };
    return AudioClip;
})();
/// <reference path="resourceMap.ts" />
var Font = (function () {
    function Font() {
    }
    Font.prototype.loadFont = function (fontName) {
        if (!(ResourceMap.isAssetLoaded(fontName))) {
            var fontInfoSrcStr = fontName + ".fnt";
            var texSrcStr = fontName + ".png";
            ResourceMap.asyncLoadRequested(fontName);
        }
        else {
            ResourceMap.incAssetRefCount(fontName);
        }
    };
    Font.prototype.unloadFont = function (fontName) {
        if (!(ResourceMap.unloadAsset(fontName))) {
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
            this._texCoordLeft = 0;
            this._texCoordRight = 1;
            this._texCoordBottom = 0;
            this._texCoordTop = 0;
            // reference to nominal character size, 1 is "standard width/height" of a char
            this._charWidth = 1;
            this._charHeight = 1;
            this._charWidthOffset = 0;
            this._charHeightOffset = 0;
            // reference of char width/height ration
            this._charAspectRatio = 1;
        }
        return CharacterInfo;
    })();
    Font.CharacterInfo = CharacterInfo;
})(Font || (Font = {}));
/// <reference path="texture.ts" />
// TODO: Es necesario realmente el tamaño??
var CubeMapTexture = (function (_super) {
    __extends(CubeMapTexture, _super);
    function CubeMapTexture(options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        _super.call(this, gl.TEXTURE_CUBE_MAP);
        options = options || {};
        console.log(this.target);
        this.finished = false;
        // TODO: Faltan todo el tema de filtrados o wrap de las opciones 
        // que me he saltado por falta de tiempo :(
        this._handle = gl.createTexture();
    }
    CubeMapTexture.prototype.addImage = function (i, data) {
        var gl = Core.getInstance().getGL();
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    };
    CubeMapTexture.prototype.bind = function (slot) {
        var gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this.target, this._handle);
    };
    CubeMapTexture.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        gl.bindTexture(this.target, null);
    };
    CubeMapTexture.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
    CubeMapTexture.prototype.finishTex = function () {
        var gl = Core.getInstance().getGL();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
        this.finished = true;
    };
    return CubeMapTexture;
})(Texture);
/// <reference path="../core/core.ts" />
/// <reference path="../core/shaderProgram.ts" />
/// <reference path="resourceMap.ts" />
/// <reference path="../textures/cubemapTexture.ts" />
/// <reference path="../gl-matrix.d.ts" />
var Skybox = (function () {
    function Skybox(dir) {
        console.log("Load skybox ...");
        var faces = [];
        faces.push(dir + "/right.jpg");
        faces.push(dir + "/left.jpg");
        faces.push(dir + "/top.jpg");
        faces.push(dir + "/bottom.jpg");
        faces.push(dir + "/back.jpg");
        faces.push(dir + "/front.jpg");
        var gl = Core.getInstance().getGL();
        this._prog = new ShaderProgram();
        var vs = "#version 300 es\n    \tprecision highp float;\n\t\tlayout (location = 0) in vec3 position;\n\t\tout vec3 TexCoords;\n\t\tuniform mat4 projection;\n\t\tuniform mat4 view;\n\t\tvoid main() {\n\t\t\tvec4 pos = projection * view * vec4(position, 1.0);\n\t\t\tgl_Position = pos.xyww;\n\t\t\tTexCoords = position;\n\t\t}";
        this._prog.addShader(vs, shader_type.vertex, mode.read_text);
        var fg = "#version 300 es\n    \tprecision highp float;\n\t\tin vec3 TexCoords;\n\t\tout vec4 color;\n\t\tuniform samplerCube skybox;\n\t\tvoid main() { \n\t\t\tcolor = texture(skybox, TexCoords);\n\t\t}";
        this._prog.addShader(fg, shader_type.fragment, mode.read_text);
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
        this.skyboxVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.skyboxVBO);
        gl.bufferData(gl.ARRAY_BUFFER, skyboxVertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this._loadCubemap(faces);
    }
    Skybox.prototype.render = function (view, projection) {
        var gl = Core.getInstance().getGL();
        gl.depthFunc(gl.LEQUAL);
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
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        gl.depthFunc(gl.LESS);
    };
    Skybox.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        this.cubeMapTexture.destroy();
    };
    Skybox.prototype._loadCubemap = function (faces) {
        this.cubeMapTexture = new CubeMapTexture();
        this.cubeMapTexture.bind();
        faces.forEach(function (face, i) {
            var img = ResourceMap.retrieveAsset(face);
            this.cubeMapTexture.addImage(i, img);
        }.bind(this));
        this.cubeMapTexture.finishTex();
        this.cubeMapTexture.unbind();
    };
    return Skybox;
})();
/// <reference path="../core/shaderProgram.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
var Sprite = (function () {
    function Sprite() {
    }
    Sprite.initialize = function () {
        Sprite.prog = new ShaderProgram();
        Sprite.prog.addShader("#version 300 es\nprecision mediump float;\n\nlayout(location = 0) in vec3 position;\nlayout(location = 2) in vec2 texCoord;\n\nuniform mat4 projection;\nuniform mat4 view;\nuniform mat4 model;\n\nout vec2 outTexCoord;\n\nvoid main() {\n\tgl_Position = projection * view * model * vec4(position, 1.0);\n\toutTexCoord = texCoord;\n}", shader_type.vertex, mode.read_text);
        Sprite.prog.addShader("#version 300 es\nprecision mediump float;\n\nuniform sampler2D tex;\n\nin vec2 outTexCoord;\n\nout vec4 fragColor;\n\nvoid main() {\n\tfragColor = texture(tex, outTexCoord);\n}", shader_type.fragment, mode.read_text);
        var gl = Core.getInstance().getGL();
        var initTC = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];
        Sprite.buffer = new VertexBuffer(BufferType.Array);
        Sprite.buffer.bufferData(new Float32Array(initTC), gl.DYNAMIC_DRAW);
        Sprite.buffer.unbind();
    };
    return Sprite;
})();
;
Sprite.initialize();
/// <reference path="texture2d.ts" />
var FloatTexture = (function (_super) {
    __extends(FloatTexture, _super);
    function FloatTexture(image, size, options) {
        if (options === void 0) { options = {}; }
        options = options || {};
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.FLOAT, null);
        _super.call(this, image, options);
    }
    return FloatTexture;
})(Texture2D);
/// <reference path="texture.ts" />
/// <reference path="../extras/Vector3.ts" />
var Texture3D = (function (_super) {
    __extends(Texture3D, _super);
    function Texture3D(data, size, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        _super.call(this, gl.TEXTURE_3D);
        options = options || {};
        console.log(this.target);
        var compressed = options["compressed"] === true;
        var _internalformat = options["internalformat"] || gl.RGBA;
        var _format = options["format"] || gl.RGBA;
        var _type = options["type"] || gl.UNSIGNED_BYTE;
        if (compressed) {
        }
        else {
            gl.texSubImage3D(this.target, 0, // level
            _internalformat, // Internal format A GLenum specifying the format of the texel data
            size.x, size.y, size.z, 0, _format, // Format2
            _type, // A GLenum specifying the data type of the texel data
            data);
        }
    }
    Texture3D.prototype.bind = function (slot) {
        var gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this.target, this._handle);
    };
    Texture3D.prototype.destroy = function () {
    };
    return Texture3D;
})(Texture);
/// <reference path="texture2d.ts" />
var VideoTexture = (function (_super) {
    __extends(VideoTexture, _super);
    function VideoTexture(data, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        options["minFilter"] = gl.LINEAR;
        options["magFilter"] = gl.LINEAR;
        options["wrap"] = [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];
        this._videoElem.play();
        _super.call(this, data, options);
    }
    VideoTexture.prototype.updateTexture = function () {
        var gl = Core.getInstance().getGL();
        gl.bindTexture(this.target, this._handle);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(this.target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._videoElem // TODO: videoElement
        );
    };
    return VideoTexture;
})(Texture2D);
