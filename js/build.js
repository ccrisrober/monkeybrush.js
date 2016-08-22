"use strict";
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
    /**
     * Compile and link program
     * @return {boolean}: True if not errors
     */
    Program.prototype.compile = function () {
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
    /**
     *
     */
    Program.prototype.use = function () {
        var gl = Core.getInstance().getGL();
        gl.useProgram(this._compiledShader);
    };
    /**
     *
     */
    Program.prototype.destroy = function () {
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
    /**
     * @param {string}
     * @param {number}
     */
    Program.prototype.sendUniform1f = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform1f(this.uniformLocations[name], value);
    };
    /**
     * @param {string}
     * @param {number}
     */
    Program.prototype.sendUniform1i = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value);
    };
    /**
     * @param {string}
     * @param {boolean}
     */
    Program.prototype.sendUniform1b = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
    };
    /**
     * @param {string}
     * @param {Float32Array}
     */
    Program.prototype.sendUniformVec3 = function (name, value) {
        var gl = Core.getInstance().getGL();
        gl.uniform3fv(this.uniformLocations[name], value);
    };
    /**
     * @param {string}
     * @param {Float32Array}
     * @param {boolean   = false}
     */
    Program.prototype.sendUniformMat4 = function (name, value, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = Core.getInstance().getGL();
        gl.uniformMatrix4fv(this.uniformLocations[name], transpose, value);
    };
    return Program;
})();
/// <reference path="../core/program.ts" />
"use strict";
var ToneMap;
(function (ToneMap) {
    var vertexCode = "#version 300 es\n  in vec3 vertex;\n  out vec2 texCoord;\n  void main() {\n    texCoord = vertex.xy * 0.5 + 0.5;\n    gl_Position = vec4( vertex, 1 );\n  }";
    /**
     * @param {WebGLRenderingContext}
     */
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
    ToneMap.textureQuadSimpleProgram = new Program();
    ToneMap.textureQuadGammaProgram = new Program();
    ToneMap.textureQuadReinhardProgram = new Program();
    ToneMap.textureQuadFilmicProgram = new Program();
    ToneMap.textureQuadsRGBProgram = new Program();
    ToneMap.textureQuadUncharted2Program = new Program();
})(ToneMap || (ToneMap = {}));
/// <reference path="../tsd.d.ts" />
/// <reference path="input.ts" />
/// <reference path="../resources/quadToneMap.ts" />
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
        this._gl = this._getContext(canvas);
        if (!this._gl) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        this._getVendors();
        Input.getInstance();
        // this.init();
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
        Depth.enable();
        Depth.comparison(ComparisonFunc.Less);
        // Set images to flip y axis to match the texture coordinate space.
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        Cull.enable();
        Blend.disable();
    };
    Core.getInstance = function () {
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
        // Manual fallback
        if (!window.requestAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function (cb) {
                var currTime = Date.now();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    cb(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
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
var Face;
(function (Face) {
    // TODO (glDisable(gl.CULL_FACE) None = gl.NONE,               ///< No culling
    Face[Face["Front"] = gl.FRONT] = "Front";
    Face[Face["Back"] = gl.BACK] = "Back";
    Face[Face["FrontAndBack"] = gl.FRONT_AND_BACK] = "FrontAndBack"; ///< Cull Front and back-facing primitives
})(Face || (Face = {}));
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
var BlendingEqu;
(function (BlendingEqu) {
    BlendingEqu[BlendingEqu["Add"] = gl.FUNC_ADD] = "Add";
    BlendingEqu[BlendingEqu["Substract"] = gl.FUNC_SUBTRACT] = "Substract";
    BlendingEqu[BlendingEqu["RevSubstract"] = gl.FUNC_REVERSE_SUBTRACT] = "RevSubstract";
    BlendingEqu[BlendingEqu["Min"] = gl.MIN] = "Min";
    BlendingEqu[BlendingEqu["Max"] = gl.MAX] = "Max"; // TODO: EXT_blend_minmax
})(BlendingEqu || (BlendingEqu = {}));
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
// TODO: Texture Filter 
/// <reference path="../core/program.ts" />
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
    })();
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
    var _resourceMap = {};
    /**
     * @param {string}
     */
    function asyncLoadRequested(resName) {
        _resourceMap[resName] = new MapEntry(resName);
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
        _resourceMap[resName].setAsset(loadedAsset);
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
     * @param {string} resName
     */
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
    /**
     * Check whether the resource has already been loaded.
     * @param  {string} resName: Resource name
     * @return {boolean}: True if resource exist
     */
    function isAssetLoaded(resName) {
        return (resName in _resourceMap);
    }
    ResourceMap.isAssetLoaded = isAssetLoaded;
    ;
    /**
     * @param {string}
     */
    function incAssetRefCount(resName) {
        _resourceMap[resName].incCount();
    }
    ResourceMap.incAssetRefCount = incAssetRefCount;
    ;
    /**
     * Unload a existing resource.
     * @param {string}
     */
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
/// <reference path="resourceMap.ts" />
"use strict";
var loaders;
(function (loaders) {
    function _getAlias(imageSrc, alias) {
        return (alias.length < 1) ? imageSrc : alias;
    }
    /**
     * @param {string}
     * @param {string = ""}
     */
    function loadImage(imageSrc, alias) {
        if (alias === void 0) { alias = ""; }
        alias = _getAlias(imageSrc, alias);
        if (!ResourceMap.isAssetLoaded(alias)) {
            var img = new Image();
            ResourceMap.asyncLoadRequested(alias);
            img.onload = function () {
                // setTimeout(function() {
                ResourceMap.asyncLoadCompleted(alias, img);
                // }, 2500);
            };
            img.onerror = function (err) {
                ResourceMap.asyncLoadFailed(alias);
            };
            img.src = imageSrc;
        }
        else {
            ResourceMap.incAssetRefCount(alias);
        }
    }
    loaders.loadImage = loadImage;
    /**
     * @param {string}
     */
    function unloadImage(imageSrc) {
        ResourceMap.unloadAsset(imageSrc);
    }
    loaders.unloadImage = unloadImage;
    /**
     * @param {string}
     */
    function loadAudio(clipName, alias) {
        if (alias === void 0) { alias = ""; }
        alias = _getAlias(clipName, alias);
        if (!(ResourceMap.isAssetLoaded(alias))) {
            // Update resources in load counter
            ResourceMap.asyncLoadRequested(alias);
            // Async request the data from server
            var request = new XMLHttpRequest();
            request.open("GET", clipName, true);
            // Specify that the request retrieves binary data.
            request.responseType = "arraybuffer";
            request.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                this._audioContext.decodeAudioData(request.response, function (buffer) {
                    ResourceMap.asyncLoadCompleted(alias, buffer);
                });
            }.bind(this);
            request.send();
        }
    }
    loaders.loadAudio = loadAudio;
    /**
     * @param {string}
     */
    function unloadAudio(clipName) {
        ResourceMap.unloadAsset(clipName);
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
        if (!ResourceMap.isAssetLoaded(alias)) {
            ResourceMap.asyncLoadRequested(alias);
            // Async request the data from server
            var request = new XMLHttpRequest();
            request.open("GET", imageSrc, true);
            // Specify that the request retrieves binary data.
            request.responseType = "arraybuffer";
            request.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                var arrayBuffer = request.response;
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
                    ResourceMap.asyncLoadCompleted(alias, data);
                }
            }.bind(this);
            request.send();
        }
        else {
            ResourceMap.incAssetRefCount(alias);
        }
    }
    loaders.loadHDRImage = loadHDRImage;
    /**
     * @param {string}
     */
    function unloadHDRImage(imageSrc) {
        ResourceMap.unloadAsset(imageSrc);
    }
    loaders.unloadHDRImage = unloadHDRImage;
})(loaders || (loaders = {}));
/// <reference path="../core/core.ts" />
"use strict";
var VertexArray = (function () {
    /**
     * @param {WebGLVertexArrayObject}
     */
    function VertexArray(vao /**/) {
        var gl = Core.getInstance().getGL();
        if (vao !== undefined) {
            this._handle = vao;
        }
        else {
            if (gl instanceof WebGL2RenderingContext) {
                this._handle = gl.createVertexArray();
            }
            else {
                var ext = gl.getExtension("OES_vertex_array_object");
                if (ext) {
                    this._handle = ext.createVertexArray();
                }
            }
        }
        this.bind();
    }
    /**
     * @param {WebGLVertexArrayObject}
     */
    VertexArray.wrap = function (vao /*WebGLVertexArrayObject*/) {
        return new VertexArray(vao);
    };
    /**
     *
     */
    VertexArray.prototype.bind = function () {
        var gl = Core.getInstance().getGL();
        if (gl instanceof WebGL2RenderingContext) {
            gl.bindVertexArray(this._handle);
            return;
        }
        var ext = gl.getExtension("OES_vertex_array_object");
        if (ext) {
            ext.bindVertexArrayOES(this._handle);
        }
    };
    /**
     *
     */
    VertexArray.prototype.unbind = function () {
        var gl = Core.getInstance().getGL();
        if (gl instanceof WebGL2RenderingContext) {
            gl.bindVertexArray(null);
            return;
        }
        var ext = gl.getExtension("OES_vertex_array_object");
        if (ext) {
            ext.bindVertexArrayOES(null);
        }
    };
    /**
     *
     */
    VertexArray.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        this.bind();
        if (gl instanceof WebGL2RenderingContext) {
            gl.deleteVertexArray(this._handle);
            return;
        }
        var ext = gl.getExtension("OES_vertex_array_object");
        if (ext) {
            ext.deleteVertexArrayOES(this._handle);
        }
    };
    /**
     * @return {boolean}
     */
    VertexArray.isSupported = function () {
        var gl = Core.getInstance().getGL();
        return gl instanceof WebGL2RenderingContext ||
            gl.getExtension("OES_vertex_array_object");
    };
    /**
     * @return {boolean}
     */
    VertexArray.prototype.is = function () {
        var gl = Core.getInstance().getGL();
        if (gl instanceof WebGL2RenderingContext) {
            return gl.isVertexArray(this._handle);
        }
        var ext = gl.getExtension("OES_vertex_array_object");
        if (ext) {
            return ext.isVertexArrayOES(this._handle);
        }
        return false;
    };
    return VertexArray;
})();
/// <reference path="../core/core.ts" />
"use strict";
var VertexBuffer = (function () {
    /**
     * @param {BufferType = BufferType.Array}
     */
    function VertexBuffer(type) {
        if (type === void 0) { type = BufferType.Array; }
        /**
         * [_type description]
         * @type {BufferType}
         */
        this._type = BufferType.Array;
        this._buffer = VertexBuffer.gl.createBuffer();
        this._type = type;
        this.bind();
    }
    /**
     * @param {BufferType}
     */
    VertexBuffer.prototype.bind = function (type) {
        if (type !== undefined) {
            this._type = type;
        }
        VertexBuffer.gl.bindBuffer(this._type, this._buffer);
    };
    /**
     *
     */
    VertexBuffer.prototype.unbind = function () {
        VertexBuffer.gl.bindBuffer(this._type, null);
    };
    /**
     * @return {BufferType}
     */
    VertexBuffer.prototype.getBufferType = function () {
        return this._type;
    };
    /**
     * @return {WebGLBuffer}
     */
    VertexBuffer.prototype.getBuffer = function () {
        return this._buffer;
    };
    /**
     *
     */
    VertexBuffer.prototype.destroy = function () {
        VertexBuffer.gl.bindBuffer(this._type, 0);
        if (!this._buffer) {
            VertexBuffer.gl.deleteBuffer(this._buffer);
        }
        this._buffer = null;
    };
    /**
     * @param {Float32Array | Uint16Array}
     * @param {UsageType    = UsageType.StaticDraw}
     */
    VertexBuffer.prototype.bufferData = function (data, usage) {
        if (usage === void 0) { usage = UsageType.StaticDraw; }
        this.bind();
        VertexBuffer.gl.bufferData(this._type, data, usage);
    };
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     * @param {number = 0}
     */
    VertexBuffer.prototype.attribDivisor = function (position, length, divisor, stride) {
        if (stride === void 0) { stride = 0; }
        this.bind();
        VertexBuffer.gl.enableVertexAttribArray(position);
        VertexBuffer.gl.vertexAttribPointer(position, length, VertexBuffer.gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
        VertexBuffer.gl.vertexAttribDivisor(position, divisor);
    };
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     * @param {boolean = false}
     * @param {number  = 0}
     */
    VertexBuffer.prototype.vertexAttribPointer = function (attribLocation, numElems, type, normalized, offset) {
        if (normalized === void 0) { normalized = false; }
        if (offset === void 0) { offset = 0; }
        this.bind();
        VertexBuffer.gl.enableVertexAttribArray(attribLocation);
        VertexBuffer.gl.vertexAttribPointer(attribLocation, // Attribute location
        numElems, // Number of elements per attribute
        type, // Type of elements
        normalized, numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        offset // Offset from the beginning of a single vertex to this attribute
        );
    };
    VertexBuffer.gl = Core.getInstance().getGL();
    return VertexBuffer;
})();
/// <reference path="../core/core.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
"use strict";
/**
 * Drawable abstract class
 * @class Drawable
 */
var Drawable = (function () {
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
    /**
     * Normal render
     */
    Drawable.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        this._vao.unbind();
    };
    /**
     * Render with array instance mode
     * @param {number} numInstances: Instances to render
     */
    Drawable.prototype.renderArrayInstance = function (numInstances) {
        var gl = Core.getInstance().getGL();
        this._vao.bind();
        if (gl instanceof WebGL2RenderingContext) {
            gl.drawElementsInstanced(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0, numInstances);
        }
        else {
            var ext = gl.getExtension("ANGLE_instanced_arrays");
            if (ext) {
                ext.drawElementsInstancedANGLE(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0, numInstances);
            }
        }
        // this.vao.unbind();
    };
    return Drawable;
})();
/// <reference path="drawable.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Torus class
 * @class Torus
 */
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
    return Torus;
})(Drawable);
/// <reference path="drawable.ts" />
"use strict";
/**
 * Sphere class
 * @class Sphere
 */
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
    return Sphere;
})(Drawable);
/// <reference path="drawable.ts" />
"use strict";
/**
 * Quad class
 * @class Quad
 */
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(xsize, zsize, xdivs, zdivs, smax, tmax) {
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
    return Plane;
})(Drawable);
/// <reference path="drawable.ts" />
"use strict";
/**
 * Cube class
 * @class Cube
 */
var Cube = (function (_super) {
    __extends(Cube, _super);
    /**
     * @param {number = 1.0} side: Number of sides
     */
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
    return Cube;
})(Drawable);
"use strict";
var ObjLoader;
(function (ObjLoader) {
    function loadFile(filename) {
        var req = new XMLHttpRequest();
        req.open("GET", filename, false);
        if (req.overrideMimeType) {
            req.overrideMimeType("text/plain");
        }
        try {
            req.send(null);
        }
        catch (e) {
            console.log("Error reading file " + filename);
        }
        return req.responseText;
    }
    function loadObj(filename) {
        var verts = [];
        var norms = [];
        var tcs = [];
        var ret = {
            vertices: [],
            normals: [],
            texCoords: [],
            indices: [],
        };
        var text = loadFile(filename);
        // console.log(text);
        var objFile = text.split("\n");
        objFile.forEach(function (line) {
            line = line.trim();
            var type = line.substr(0, 2).trim();
            // Comments
            if (type === "#") {
                return; // stop processing this iteration
            }
            // Vertices
            if (type === "v") {
                var values = splitLineToFloats(line);
                verts.push(values);
            }
            // Normals
            if (type === "vn") {
                var values = splitLineToFloats(line);
                norms.push(values);
            }
            // Tex Coords
            if (type === "vt") {
                var values = splitLineToFloats(line);
                tcs.push(values);
            }
            if (type === "f") {
                var values = splitFace(line);
                values.forEach(function (value) {
                    ret.indices.push(value - 1);
                });
            }
        });
        // Unindex
        for (var i = 0, size = ret.indices.length / 3; i < size; ++i) {
            for (var j = 0; j < verts[ret.indices[i * 3]].length; j++) {
                ret.vertices.push(verts[ret.indices[i * 3]][j]);
            }
            for (var j = 0; j < norms[ret.indices[i * 3 + 2]].length; j++) {
                ret.normals.push(norms[ret.indices[i * 3 + 2]][j]);
            }
            for (var j = 0; j < tcs[ret.indices[i * 3 + 1]].length; j++) {
                ret.texCoords.push(tcs[ret.indices[i * 3 + 1]][j]);
            }
        }
        return ret;
    }
    ObjLoader.loadObj = loadObj;
    function splitLineToFloats(line) {
        var values = new Array();
        var split = line.split(" ");
        split.forEach(function (value) {
            if (!isNaN(value)) {
                values.push(value);
            }
        });
        return values;
    }
    function splitFace(line) {
        var values = [];
        var split = line.split(" ");
        for (var i = 1; i < split.length; i++) {
            var splitFace_1 = split[i].split("/");
            splitFace_1.forEach(function (value) {
                if (!isNaN(value)) {
                    values.push(value);
                }
            });
        }
        return values;
    }
})(ObjLoader || (ObjLoader = {}));
/// <reference path="../core/core.ts" />
/// <reference path="drawable.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/objLoader.ts" />
"use strict";
/**
 * Mesh class
 * @class Mesh
 */
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    function Mesh(fileRoute) {
        _super.call(this);
        console.log("Loading file");
        this.loadJSON(fileRoute);
    }
    Mesh.prototype.createVAO = function (model, el) {
        var gl = Core.getInstance().getGL();
        this._handle = [];
        this._handle.push(new VertexBuffer(BufferType.ElementArray));
        this._vao.bind();
        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);
        // console.log(model.meshes[0]);
        if (model.meshes[0].vertices) {
            this._handle.push(new VertexBuffer(BufferType.Array));
            var v = model.meshes[0].vertices;
            this.addAttrib_(0, this.createBuffer(new Float32Array(v), this._handle[1]), 3);
        }
        if (model.meshes[0].normals) {
            this._handle.push(new VertexBuffer(BufferType.Array));
            var v = model.meshes[0].normals;
            this.addAttrib_(1, this.createBuffer(new Float32Array(v), this._handle[2]), 3);
        }
        if (model.meshes[0].texturecoords) {
            this._handle.push(new VertexBuffer(BufferType.Array));
            var v = model.meshes[0].texturecoords[0];
            this.addAttrib_(2, this.createBuffer(new Float32Array(v), this._handle[3]), 2);
        }
        this._vao.unbind();
        this._indicesLen = el.length;
    };
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
                console.log("Creating VAO");
                self.createVAO(modelObj, [].concat.apply([], modelObj.meshes[0].faces));
                console.log("Finish creating VAO");
            }
        };
        request.send();
    };
    return Mesh;
})(Drawable);
;
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
})();
/// <reference path="../core/core.ts" />
/// <reference path="..//maths/vector2.ts" />
"use strict";
// TODO: Redimension
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
/// <reference path="texture.ts" />
"use strict";
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
})();
/// <reference path="texture.ts" />
/// <reference path="..//maths/vector3.ts" />
"use strict";
var Texture3D = (function (_super) {
    __extends(Texture3D, _super);
    function Texture3D(data, size, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        if (!(gl instanceof WebGL2RenderingContext)) {
            throw new Error("Must provide a WebGL2 context ...");
        }
        _super.call(this, gl.TEXTURE_3D);
        options = options || {};
        console.log(this.target);
        this._handle = gl.createTexture();
        var compressed = options["compressed"] === true;
        var _internalformat = options["internalformat"] || gl.RGBA;
        var _format = options["format"] || gl.RGBA;
        var _type = options["type"] || gl.UNSIGNED_BYTE;
        this.bind();
        if (compressed) {
        }
        else {
            /*(<any>gl).texSubImage3D(
                this.target,
                0,  // level
                _internalformat,    // Internal format A GLenum specifying the format of the texel data
                size.x,
                size.y,
                size.z,
                0,
                _format,    // Format2
                _type,  // A GLenum specifying the data type of the texel data
                data
            );*/
            gl.texImage3D(this.target, 0, _internalformat, size.x, size.y, size.z, 0, _format, _type, data);
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
        var gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
    return Texture3D;
})(Texture);
/// <reference path="texture.ts" />
"use strict";
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
/// <reference path="..//maths/vector2.ts" />
/// <reference path="../core/Core.ts" />
"use strict";
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
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="..//maths/vector2.ts" />
"use strict";
// TODO: Redimension
// TODO: Blit FBO (https://www.opengl.org/wiki/Framebuffer#Blitting)
var Framebuffer = (function () {
    // TODO: Stencil unused
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
        this._size = size;
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
            for (var i = 0; i < numColors; i++) {
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
})();
/// <reference path="..//maths/vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="core.ts" />
/// <reference path="framebuffer.ts" />
"use strict";
var gbuffer_type;
(function (gbuffer_type) {
    gbuffer_type[gbuffer_type["position"] = 0] = "position";
    gbuffer_type[gbuffer_type["normal"] = 1] = "normal";
    gbuffer_type[gbuffer_type["diffuse"] = 2] = "diffuse";
    gbuffer_type[gbuffer_type["num_textures"] = 3] = "num_textures";
})(gbuffer_type || (gbuffer_type = {}));
var GBuffer = (function () {
    /**
     * @param {Vector2<number>}
     */
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
    /**
     *
     */
    GBuffer.prototype.bindForReading = function () {
        this.framebuffer.onlyBindTextures();
    };
    /**
     *
     */
    GBuffer.prototype.bindForWriting = function () {
        this.framebuffer.bind();
    };
    /**
     *
     */
    GBuffer.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        if (this.framebuffer) {
            this.framebuffer.destroy();
        }
    };
    return GBuffer;
})();
/// <reference path="core.ts" />
/// <reference path="..//maths/vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/texture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
"use strict";
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
    /**
     *
     */
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
    /**
     *
     */
    PostProcess.bind = function () {
        var gl = Core.getInstance().getGL();
        PostProcess._planeVAO.bind();
    };
    /**
     *
     */
    PostProcess.render = function () {
        // console.log("DRAW QUAD");
        var gl = Core.getInstance().getGL();
        PostProcess._planeVAO.bind();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        PostProcess._planeVAO.unbind();
    };
    /**
     * [_planeVAO description]
     * @type {VertexArray}
     */
    PostProcess._planeVAO = null;
    /**
     * [_planeVertexVBO description]
     * @type {VertexBuffer}
     */
    PostProcess._planeVertexVBO = null;
    return PostProcess;
})();
PostProcess.initialize();
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
// TODO: Change _color to Vector3
"use strict";
var Color = (function () {
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     */
    function Color(r, g, b) {
        /**
         * @param {[type]}
         */
        this._color = new Array(3);
        this.setRGB(r, g, b);
    }
    Object.defineProperty(Color.prototype, "r", {
        /**
         * @return {number}
         */
        get: function () { return this._color[0]; },
        /**
         * @param {number}
         */
        set: function (r) { this._color[0] = r; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        /**
         * @return {number}
         */
        get: function () { return this._color[1]; },
        /**
         * @param {number}
         */
        set: function (g) { this._color[1] = g; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        /**
         * @return {number}
         */
        get: function () { return this._color[2]; },
        /**
         * @param {number}
         */
        set: function (b) { this._color[2] = b; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     */
    Color.prototype.setRGB = function (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    };
    /**
     * @return {Color}
     */
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
/// <reference path="../extras/color.ts" />
/// <reference path="..//maths/vector3.ts" />
"use strict";
/**
 * Light abstract class
 * @class Light
 */
var Light = (function () {
    function Light() {
        this.intensity = 1.0;
        this.color = new Color(1.0, 1.0, 1.0);
        this._enable = true;
        this._attenuation = new Vector3(1.0, // Constant
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
    Object.defineProperty(Light.prototype, "attenuation", {
        /**
         * Get light attenuation value.
         * @return {Vector3<number>}
         */
        get: function () { return this._attenuation; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Light.prototype, "intensity", {
        /**
         * Get light intensity.
         * @return {number}
         */
        get: function () { return this._intensity; },
        /**
         * Set light intensity.
         * @param {number} intensity: Light intensity.
         */
        set: function (intensity) { this._intensity = intensity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Light.prototype, "color", {
        /**
         * Get light color.
         * @return {Color}
         */
        get: function () { return this._color; },
        /**
         * Set light color
         * @param {Color} color: Color value
         */
        set: function (color) { this._color = color; },
        enumerable: true,
        configurable: true
    });
    return Light;
})();
;
/// <reference path="light.ts" />
"use strict";
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
        if (position === void 0) { position = new Vector3(0.0, 0.0, 0.0); }
        _super.call(this);
        this.position = position;
    }
    Object.defineProperty(PointLight.prototype, "position", {
        /**
         * Get light position
         * @return {Vector3<number>}
         */
        get: function () { return this._position; },
        /**
         * Set light position
         * @param {Vector3<number>} position
         */
        set: function (position) { this._position = position; },
        enumerable: true,
        configurable: true
    });
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
})(Light);
/// <reference path="core/input.ts" />
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
})();
/// <reference path="core/core.ts" />
/// <reference path="resources/resourceMap.ts" />
/// <reference path="extras/timer.ts" />
"use strict";
;
;
;
var _init__;
(function (_init__) {
    var stats;
    var _drawSceneCB;
    var gui;
    function init(loadAssets, text) {
        Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);
        /**/
        if (Object.keys(text).length > 0) {
            gui = new dat.GUI();
            for (var index in text) {
                gui.add(text, index);
            }
        }
        /**/
        stats = new Stats();
        stats.setMode(0);
        document.body.appendChild(stats.domElement);
        loadAssets();
    }
    _init__.init = init;
    function start(initialize, drawScene) {
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
            _drawSceneCB = drawScene;
            requestAnimationFrame(render);
        });
    }
    _init__.start = start;
    function render(dt) {
        Input.getInstance().update();
        stats.begin();
        dt *= 0.001; // convert to seconds
        Timer.update();
        // resize();
        _drawSceneCB(dt); // Draw user function
        stats.end();
        requestAnimationFrame(render);
    }
    _init__.render = render;
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
        }
    }
})(_init__ || (_init__ = {}));
/// <reference path="library/core/core.ts" />
/// <reference path="library/core/program.ts" />
/// <reference path="library/resources/programManager.ts" />
/// <reference path="library/resources/resourceMap.ts" />
/// <reference path="library/resources/loaders.ts" />
/// <reference path="library/models/torus.ts" />
/// <reference path="library/models/sphere.ts" />
/// <reference path="library/models/plane.ts" />
/// <reference path="library/models/cube.ts" />
/// <reference path="library/models/mesh.ts" />
/// <reference path="library/textures/texture2d.ts" />
/// <reference path="library/textures/texture3d.ts" />
/// <reference path="library/core/gbuffer.ts" />
/// <reference path="library/core/gbufferSSAO.ts" />
/// <reference path="library/core/postprocess.ts" />
/// <reference path="library/extras/timer.ts" />
/// <reference path="library/lights/pointLight.ts" />
/// <reference path="library/_demoCamera.ts" />
/// <reference path="library/core/postProcess.ts" />
/// <reference path="library/_init_.ts" />
"use strict";
var camera = new Camera2(new Float32Array([-2.7, -1.4, 11.8]));
var gl_;
var esferita;
var cubito;
var SimpleConfig = function () {
    return {
        max: 10
    };
};
var torito;
var planito;
var m;
var view;
var projection;
var tex2d;
var light = new PointLight(new Vector3(-5.0, 0.0, 0.0));
var identityMatrix = mat4.create();
mat4.identity(identityMatrix);
var model = mat4.create();
var angle = 0;
var text = SimpleConfig();
function loadAssets() {
    loaders.loadImage("assets/images/example.png", "exampleImg");
}
var mainShader = "prog";
var framebuffer;
function initialize() {
    gl_ = Core.getInstance().getGL();
    esferita = new Sphere(1.0, 20, 20);
    torito = new Torus(3.7, 2.3, 25, 10);
    planito = new Plane(100.0, 100.0, 2.0, 2.0);
    m = new Mesh("assets/objects/teddy.json");
    cubito = new Cube(1.0);
    var canvasSize = new Vector2(gl_.canvas.width, gl_.canvas.height);
    framebuffer = new Framebuffer([
        new SimpleTexture2D(canvasSize, {
            "internalformat": gl_.RGB,
            "format": gl_.RGB,
            "type": gl_.FLOAT,
            "minFilter": gl_.NEAREST,
            "maxFilter": gl_.NEAREST
        })
    ], canvasSize, true, true, {});
    var vsize = new Vector3(100, 100, 100);
    ProgramManager.addWithFun("prog", function () {
        var prog = new Program();
        prog.addShader("./shaders/demoShader.vert", shader_type.vertex, mode.read_file);
        prog.addShader("./shaders/demoShader.frag", shader_type.fragment, mode.read_file);
        prog.compile();
        prog.addUniforms(["projection", "view", "model",
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });
    ProgramManager.addWithFun("blur", function () {
        var prog2 = new Program();
        prog2.addShader("#version 300 es\n            precision highp float;\n            layout(location = 0) in vec3 vertPosition;\n            out vec2 texCoord;\n            void main(void) {\n                texCoord = vec2(vertPosition.xy * 0.5) + vec2(0.5);\n                gl_Position = vec4(vertPosition, 1.0);\n            }", shader_type.vertex, mode.read_text);
        prog2.addShader("#version 300 es\n            precision highp float;\n            uniform sampler2D dataTexture;\n\n            out vec4 fragColor;\n            in vec2 texCoord;\n\n            void main() {\n\n                fragColor = vec4(texture(dataTexture, texCoord).rgb, 1.0);\n\n            }", shader_type.fragment, mode.read_text);
        prog2.compile();
        prog2.addUniforms(["time"]);
        return prog2;
    });
    var cubeImage = ResourceMap.retrieveAsset("exampleImg");
    var gl = Core.getInstance().getGL();
    tex2d = new Texture2D(cubeImage, {
        flipY: true,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrap: [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE]
    });
    cameraUpdateCb();
}
function cameraUpdateCb() {
    var canvas = Core.getInstance().canvas();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);
    var prog = ProgramManager.get(mainShader);
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
    framebuffer.bind();
    Core.getInstance().clearColorAndDepth();
    var prog = ProgramManager.get(mainShader);
    prog.use();
    tex2d.bind(0);
    prog.sendUniform1i("tex", 0);
    angle += Timer.deltaTime() * 0.001;
    /*light.addTransform(
        Math.sin(angle) * 0.06,
        Math.cos(angle) * 0.06,
        0.0 //5.0 + Math.cos(dt) * 0.06
    );*/
    var varvar = text.max;
    var i = 0, j = 0, k = 0;
    var dd = -1;
    /**/
    for (i = -varvar; i < varvar; i += 5.0) {
        for (j = -varvar; j < varvar; j += 5.0) {
            for (k = -varvar; k < varvar; k += 5.0) {
                dd *= -1;
                mat4.translate(model, identityMatrix, vec3.fromValues(j * 1.0, i * 1.0, k * 1.0));
                mat4.rotateY(model, model, 90.0 * Math.PI / 180);
                mat4.rotateY(model, model, angle * dd);
                mat4.scale(model, model, vec3.fromValues(0.1, 0.1, 0.1));
                prog.sendUniformMat4("model", model);
                m.render();
            }
        }
    }
    /**
    mat4.translate(model, identityMatrix, light.position);
    prog.sendUniformMat4("model", model);
    torito.render();
    /**/
    tex2d.unbind();
    framebuffer.onlyBindTextures();
    Core.getInstance().clearColorAndDepth();
    var prog2 = ProgramManager.get("blur");
    prog2.use();
    PostProcess.render();
}
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
window.onload = function () {
    _init__.init(loadAssets, text);
    _init__.start(initialize, drawScene);
};
/// <reference path="../tsd.d.ts" />
"use strict";
/**
 * Camera abstract class
 * @class Camera
 */
var Camera = (function () {
    /**
     * Camera definition
     * @param {Float32Array}
     * @param {number = 45.0}
     * @param {number = 0.01}
     * @param {number = 1000.0}
     * @param {number = 1.0}
     * @param {Float32Array = new Float32Array([0.0, 0.0, -1.0])}
     * @param {Float32Array = new Float32Array([0.0, 1.0, 0.0])}
     */
    function Camera(pos, fovy, near, far, aspRatio, target, up) {
        if (fovy === void 0) { fovy = 45.0; }
        if (near === void 0) { near = 0.01; }
        if (far === void 0) { far = 1000.0; }
        if (aspRatio === void 0) { aspRatio = 1.0; }
        if (target === void 0) { target = new Float32Array([0.0, 0.0, -1.0]); }
        if (up === void 0) { up = new Float32Array([0.0, 1.0, 0.0]); }
        this._position = pos;
        this._projection = mat4.create();
        this._view = mat4.create();
        this._up = up;
        this._look = target;
        this._fov = fovy;
        this._ar = aspRatio;
        this._near = near;
        this._far = far;
        this.update();
    }
    Object.defineProperty(Camera.prototype, "position", {
        /**
         * Get current camera position
         * @return {Float32Array}
         */
        get: function () { return this._position; },
        /**
         * Set camera position
         * @param {Float32Array}
         */
        set: function (pos) { this._position = pos; },
        enumerable: true,
        configurable: true
    });
    /**
     * Get current view matrix from camera
     * @return {Float32Array}
     */
    Camera.prototype.getViewMatrix = function () {
        return this._view;
    };
    /**
     * Get current projection matrix from camera
     * @return {Float32Array}
     */
    Camera.prototype.getProjectionMatrix = function () {
        return this._projection;
    };
    /**
     * Get current field of view from camera
     * @return {number}
     */
    Camera.prototype.getFOV = function () {
        return this._fov;
    };
    /**
     * Get current aspect radio from camera
     * @return {number}
     */
    Camera.prototype.getAspectRatio = function () {
        return this._ar;
    };
    Object.defineProperty(Camera.prototype, "near", {
        /**
         * Set near
         * @param {number} near
         */
        set: function (near) { this._near = near; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "far", {
        /**
         * Set far
         * @param {number} far
         */
        set: function (far) { this._far = far; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "fov", {
        /**
         * Set field of view
         * @param {number} fovy
         */
        set: function (fovy) { this._fov = fovy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "aspRatio", {
        /**
         * Set aspect ratio
         * @param {number} ar
         */
        set: function (ar) { this._ar = ar; },
        enumerable: true,
        configurable: true
    });
    return Camera;
})();
;
/// <reference path="camera.ts" />
"use strict";
/**
 * Orthograhic camera class
 * @class OrthoCamera
 */
var OrthoCamera = (function (_super) {
    __extends(OrthoCamera, _super);
    function OrthoCamera() {
        _super.apply(this, arguments);
    }
    /**
     * Update view and projection matrix based on orthographic projection
     */
    OrthoCamera.prototype.update = function () {
        var yMin = -this._near * Math.tan(this._fov * Math.PI / 360.0);
        var yMax = -yMin;
        var xMin = yMin + this.getAspectRatio();
        var xMax = yMax + this.getAspectRatio();
        this._projection = mat4.ortho(this._projection, xMin, xMax, yMin, yMax, this._near, this._far);
        this._view = mat4.lookAt(this._view, this.position, this._look, this._up);
        // target: vec3.add(vec3.create(), this.position, this._front) /* 
    };
    return OrthoCamera;
})(Camera);
/// <reference path="camera.ts" />
"use strict";
/**
 * Perspective camera class
 * @class PerspectiveCamera
 */
var PerspectiveCamera = (function (_super) {
    __extends(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        _super.apply(this, arguments);
    }
    /**
     * Update view and projection matrix based on perspective projection
     */
    PerspectiveCamera.prototype.update = function () {
        this._projection = mat4.perspective(this._projection, this._fov, this.getAspectRatio(), this._near, this._far);
        this._view = mat4.lookAt(this._view, this.position, this._look, this._up);
        // target: vec3.add(vec3.create(), this.position, this._front) /* 
    };
    return PerspectiveCamera;
})(Camera);
/// <reference path="core.ts" />
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
        gl.enable(gl.BLEND);
    };
    /**
     * Specify the equation used for both the RGB blend equation and the Alpha blend equation
     * @param {BlendingEq} mode: Specifies how source and destination colors are combined
     */
    Blend.equation = function (mode) {
        gl.blendEquation(mode);
    };
    /**
     * Set the RGB blend equation and the alpha blend equation separately
     * @param {BlendingEqu} modeRGB: Specifies the RGB blend equation, how the red, green, and blue
     *      components of the source and destination colors are combined.
     * @param {BlendingEqu} modeAlpha: Specifies the alpha blend equation, how the alpha component
     *      of the source and destination colors are combined.
     */
    Blend.equationSeparate = function (modeRGB, modeAlpha) {
        gl.blendEquationSeparate(modeRGB, modeAlpha);
    };
    Blend.prototype.getBlendEquRGB = function () {
        return gl.getParameter(gl.BLEND_EQUATION_RGB);
    };
    Blend.prototype.getBlendEquAlpha = function () {
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
        gl.blendColor(red, green, blue, alpha);
    };
    /**
     * Specify pixel arithmetic.
     * @param {BlendingType = BlendingType.One} sfactor: Specifies how the red, green, blue, and alpha source blending factors are computed.
     * @param {BlendingType = BlendingType.Zero} dfactor: Specifies how the red, green, blue, and alpha destination blending factors are computed.
     */
    Blend.func = function (sfactor, dfactor) {
        if (sfactor === void 0) { sfactor = BlendingType.One; }
        if (dfactor === void 0) { dfactor = BlendingType.Zero; }
        gl.blendFunc(sfactor, dfactor);
    };
    /**
     * Specify pixel arithmetic for RGB and alpha components separately.
     * @param {BlendingType = BlendingType.One} rcRGB: Specifies how the red, green, and blue blending factors are computed.
     * @param {BlendingType = BlendingType.Zero} dstRGB: Specifies how the red, green, and blue destination blending factors are computed.
     * @param {BlendingType = BlendingType.One} srcAlpha: Specified how the alpha source blending factor is computed.
     * @param {BlendingType = BlendingType.Zero} dstAlpha: Specified how the alpha destination blending factor is computed.
     */
    Blend.funcSeparate = function (srcRGB, dstRGB, srcAlpha, dstAlpha) {
        if (srcRGB === void 0) { srcRGB = BlendingType.One; }
        if (dstRGB === void 0) { dstRGB = BlendingType.Zero; }
        if (srcAlpha === void 0) { srcAlpha = BlendingType.One; }
        if (dstAlpha === void 0) { dstAlpha = BlendingType.Zero; }
        gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
    };
    /**
     * Disable blending
     */
    Blend.disable = function () {
        gl.disable(gl.BLEND);
    };
    /**
     * Checks if blending is activated
     * @return {boolean}: True if activated
     */
    Blend.isEnabled = function () {
        return gl.isEnabled(gl.BLEND);
    };
    Blend.gl = Core.getInstance().getGL();
    return Blend;
})();
// colormask, clear, ...
"use strict";
/// <reference path="core.ts" />
"use strict";
var Cull = (function () {
    function Cull() {
    }
    /**
     * Enable cullFace test.
     */
    Cull.enable = function () {
        gl.enable(gl.CULL_FACE);
    };
    /**
     * Get current cullFace mode
     * @return {Face}: Current cullFace mode
     */
    Cull.getMode = function () {
        return gl.getParameter(gl.CULL_FACE_MODE);
    };
    /**
     * Specify whether front/back-facing facets can be culled.
     * @param {Face} mode: Cull face mode
     */
    Cull.setMode = function (mode) {
        gl.cullFace(mode);
    };
    /**
     * Disable cullFace test.
     */
    Cull.disable = function () {
        gl.disable(gl.CULL_FACE);
    };
    /**
     * Checks if cullFace is activated
     * @return {boolean}: True if activated
     */
    Cull.isEnabled = function () {
        return gl.isEnabled(gl.CULL_FACE);
    };
    Cull.gl = Core.getInstance().getGL();
    return Cull;
})();
/// <reference path="core.ts" />
"use strict";
var Depth = (function () {
    function Depth() {
    }
    /**
     * Enable depth testing.
     */
    Depth.enable = function () {
        gl.enable(gl.DEPTH_TEST);
    };
    /**
     * Enable writing into the depth buffer.
     */
    Depth.use = function () {
        gl.depthMask(true);
    };
    /**
     * Specify the mode used for depth buffer comparisons.
     * @param {ComparisonFunc} compFunc: Comparisor mode.
     */
    Depth.comparison = function (compFunc) {
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
        gl.clear(gl.DEPTH_BUFFER_BIT);
    };
    /**
     * Disable writing into the depth buffer.
     */
    Depth.unuse = function () {
        gl.depthMask(false);
    };
    /**
     * Disable depth testing.
     */
    Depth.disable = function () {
        gl.disable(gl.DEPTH_TEST);
    };
    /**
     * Checks if depth test is activated
     * @return {boolean}: True if activated
     */
    Depth.isEnabled = function () {
        return gl.isEnabled(gl.DEPTH_TEST);
    };
    Depth.gl = Core.getInstance().getGL();
    return Depth;
})();
/// <reference path="core.ts" />
"use strict";
/**
 * scissor wrapper
 * @class Scissor
 */
var Scissor = (function () {
    function Scissor() {
    }
    /**
     * Enable scissor test.
     */
    Scissor.use = function () {
        gl.enable(gl.SCISSOR_TEST);
    };
    /**
     * Define the scissor box.
     * @param {number} x: Specifying the horizontal coordinate for the lower left corner of the box.
     * @param {number} y: Specifying the vertical coordinate for the lower left corner of the box.
     * @param {number} width: Specifying the width of the scissor box.
     * @param {number} height: Specifying the height of the scissor box.
     */
    Scissor.prototype.setRectangle = function (x, y, width, height) {
        gl.scissor(x, y, width, height);
    };
    /**
     * Get scissor rectangle in use.
     * @return {Int32Array}: Scissor box size [x, y, width, height]
     */
    Scissor.prototype.getRectangle = function () {
        return gl.getParameter(gl.SCISSOR_BOX);
    };
    /**
     * Disable scissor test.
     */
    Scissor.unuse = function () {
        gl.disable(gl.SCISSOR_TEST);
    };
    /**
     * Checks if scissor test is activated
     * @return {boolean}: True if activated
     */
    Scissor.isEnabled = function () {
        return gl.isEnabled(gl.SCISSOR_TEST);
    };
    Scissor.gl = Core.getInstance().getGL();
    return Scissor;
})();
;
/// <reference path="core.ts" />
"use strict";
/**
 * Stencil wrapper
 * @class Stencil
 */
var Stencil = (function () {
    function Stencil() {
    }
    /**
     * Enable stencil test
     */
    Stencil.use = function () {
        gl.enable(gl.STENCIL_TEST);
    };
    /**
     * Set front and back function and reference value for stencil testing
     * @param {ComparisonFunc} compFunc: Specifies the test function.
     * @param {number} ref: Specifies the reference value for the stencil test
     * @param {number} mask: Specifies a mask that is ANDed with both the reference value and the stored stencil value when the test is done.
     */
    Stencil.func = function (compFun, ref, mask) {
        gl.stencilFunc(compFun, ref, mask);
    };
    /**
     * Set front and back stencil test actions.
     * @param {StencilOp} fail: Action to take when the stencil test fails.
     * @param {StencilOp} zfail: Stencil action when the stencil test passes, but the depth test fails.
     * @param {StencilOp} zpass: Specifies the stencil action when both the stencil and depth test passes.
     */
    Stencil.operation = function (fail, zfail, zpass) {
        gl.stencilOp(fail, zfail, zpass);
    };
    /**
     * Control the front and back writing of individual bits in the stencil planes
     * @param {number} mask: Specifies a bit mask to enable and disable writing of individual bits in the stencil planes.
     */
    Stencil.mask = function (mask) {
        gl.stencilMask(mask);
    };
    /**
     * Fontrol the front and/or back writing of individual bits in the stencil planes
     * @param {Face} face: Specifies whether the front and/or back stencil writemask is updated
     * @param {number} mask: Specifies a bit mask to enable and disable writing of individual bits in the stencil planes.
     */
    Stencil.maskFace = function (face, mask) {
        gl.stencilMaskSeparate(face, mask);
    };
    Stencil.getFrontWriteMasks = function () {
        return gl.getParameter(gl.STENCIL_WRITEMASK);
    };
    Stencil.getBackWriteMask = function () {
        return gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
    };
    Stencil.getBits = function () {
        return gl.getParameter(gl.STENCIL_BITS);
    };
    /**
     * Clear stencil values
     */
    Stencil.clear = function () {
        gl.clear(gl.STENCIL_BUFFER_BIT);
    };
    /**
     * Disable stencil test
     */
    Stencil.unuse = function () {
        gl.disable(gl.STENCIL_TEST);
    };
    /**
     * Checks if stencil test is activated
     * @return {boolean}: True if activated
     */
    Stencil.isEnabled = function () {
        return gl.isEnabled(gl.STENCIL_TEST);
    };
    Stencil.gl = Core.getInstance().getGL();
    return Stencil;
})();
/// <reference path="../core/core.ts" />
"use strict";
var extensions;
(function (extensions) {
    /**
     * [_extensions description]
     * @type {Object}
     */
    var _extensions = {};
    /**
     * @param {string}
     */
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
// TODO: Add priority checking
"use strict";
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ALL"] = 0] = "ALL";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["INFO"] = 4] = "INFO";
    LogLevel[LogLevel["OFF"] = 5] = "OFF";
})(LogLevel || (LogLevel = {}));
;
/**
namespace logger {
    let priority: LogLevel = LogLevel.ALL;
    //export function trace(...args: string[]) {
    //  console.trace("", args);
    //}
    export function log(...args: string[]) {
        console.log(args);
    }
    export function debug(...args: string[]) {
        console.debug("", args);
    }
    export function warn(...args: string[]) {
        console.warn(args);
    }
    export function info(...args: string[]) {
        console.info(args);
    }
    export function error(...args: string[]) {
        console.error(args);
    }
    export function setPriority(p: LogLevel) {
        priority = p;
    }
}
/**/
/**
namespace logger {
    function _noop() {};
    export var logger = {};
    var _levels = ["trace", "debug", "info", "warn", "error", "fatal"];
    var _currLevel = _levels[2];
    function _shouldLog(level: string) {
        return _levels.indexOf(level) >= _levels.indexOf(_currLevel);
    }
    _levels.forEach((level: string) => {
        logger[level] = _shouldLog(level) ? log: _noop;
        function log() {
            var prefix: any = "";
            var normalizedLevel;
            switch (level) {
                case "trace":
                    normalizedLevel = "info";
                    break
                case "debug":
                    normalizedLevel = "info";
                    break
                case "fatal":
                    normalizedLevel = "error";
                    break
                default: normalizedLevel = level
            }
            if (prefix) {
                if (typeof prefix === 'function') prefix = prefix()
                //arguments[0] = util.format(prefix, arguments[0])
            }
            //console[normalizedLevel](util.format.apply(util, arguments))
        }
    });
}
/**/ 
/// <reference path="../core/core.ts" />
"use strict";
var Query = (function () {
    function Query() {
        var gl = Core.getInstance().getGL();
        this.handle = gl.createQuery();
    }
    Query.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.deleteQuery(this.handle);
    };
    Query.prototype.begin = function (target) {
        var gl = Core.getInstance().getGL();
        gl.beginQuery(target, this.handle);
    };
    Query.prototype.end = function (target) {
        var gl = Core.getInstance().getGL();
        gl.endQuery(target);
    };
    Query.prototype.oneUse = function (target, cb) {
        this.begin(target);
        cb();
        this.end(target);
    };
    Query.prototype.getParameters = function (param) {
        var gl = Core.getInstance().getGL();
        var res = gl.getQueryParameters(this.handle, param);
        return res;
    };
    Query.prototype.isResultAvailable = function () {
        var gl = Core.getInstance().getGL();
        return this.getParameters(gl.QUERY_RESULT_AVAILABLE);
    };
    Query.prototype.getResult = function () {
        var gl = Core.getInstance().getGL();
        return this.getParameters(gl.QUERY_RESULT);
    };
    return Query;
})();
/// <reference path="../maths/vector3.ts" />
var Ray = (function () {
    function Ray(origin, direction) {
        if (origin === void 0) { origin = new Vector3(0.0, 0.0, 0.0); }
        if (direction === void 0) { direction = new Vector3(0.0, 0.0, 0.0); }
        this._origin = origin;
        this._direction = direction;
    }
    Object.defineProperty(Ray.prototype, "origin", {
        get: function () { return this._origin; },
        set: function (origin) { this._origin = origin; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ray.prototype, "direction", {
        get: function () { return this._direction; },
        set: function (direction) { this._direction = direction; },
        enumerable: true,
        configurable: true
    });
    Ray.prototype.point_at = function (t) {
        return new Vector3(this._origin.x + t * this._direction.x, this._origin.y + t * this._direction.y, this._origin.z + t * this._direction.z);
    };
    return Ray;
})();
/// <reference path="../core/core.ts" />
"use strict";
var TransformFeedback = (function () {
    function TransformFeedback() {
        this._handle = TransformFeedback.gl.createTransformFeedback();
    }
    TransformFeedback.prototype.destroy = function () {
        TransformFeedback.gl.deleteTransformFeedback(this._handle);
    };
    TransformFeedback.prototype.bind = function (target) {
        TransformFeedback.gl.bindTranformFeedback(target, this._handle);
    };
    TransformFeedback.prototype.unbind = function (target) {
        TransformFeedback.gl.bindTransformFeedback(target, null);
    };
    TransformFeedback.prototype.begin = function (primitiveMode) {
        TransformFeedback.gl.beginTranformFeedback(primitiveMode);
    };
    TransformFeedback.prototype.pause = function () {
        TransformFeedback.gl.pauseTranformFeedback();
    };
    TransformFeedback.prototype.resume = function () {
        TransformFeedback.gl.resumeTransformFeedback();
    };
    TransformFeedback.prototype.end = function () {
        TransformFeedback.gl.endTranformFeedback();
    };
    TransformFeedback.prototype.varyings = function (program, varyings, bufferMode) {
        return TransformFeedback.gl.transformFeedbackVaryings(program, varyings, bufferMode);
    };
    TransformFeedback.prototype.getVarying = function (program, idx) {
        return TransformFeedback.gl.getTransformFeedbackVarying(program, idx);
    };
    TransformFeedback.gl = Core.getInstance().getGL();
    return TransformFeedback;
})();
/// <reference path="../core/core.ts" />
/// <reference path="../maths/vector2.ts" />
/// <reference path="../core/program.ts" />
/// <reference path="../core/blend.ts" />
/// <reference path="../core/cull.ts" />
/// <reference path="../core/depth.ts" />
var Woit = (function () {
    function Woit() {
        var gl = Core.getInstance().getGL();
        this.fbo = gl.createFramebuffer();
        this.accBufTexId = gl.createTexture();
        this.depthBuffTexId = gl.createTexture();
        this.revealBuffId = gl.createTexture();
        this.initPlane();
        this.color0 = new Float32Array([0.0, 0.0, 0.0, 0.0]);
        this.color1 = new Float32Array([1.0, 0.0, 0.0, 0.0]);
    }
    Woit.prototype.resize = function (size) {
        var w = size.x;
        var h = size.y;
        var gl = Core.getInstance().getGL();
        gl.bindTexture(gl.TEXTURE_2D, this.accBufTexId);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.bindTexture(gl.TEXTURE_2D, this.depthBuffTexId);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, w, h, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, this.revealBuffId);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.accBufTexId, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthBuffTexId, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this.revealBuffId, 0);
        /* const GLenum buffs[2] = { gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1 };
        glDrawBuffers(2, buffs);

        if (gl.FRAMEBUFFER_COMPLETE != glCheckFramebufferStatus(gl.FRAMEBUFFER))
        {
            std::cerr << "Error configurando el FBO" << std::endl;
            exit(-1);
        }*/
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    Woit.prototype.firstStep = function (prog, near, far, cullFace, alfa, w) {
        if (cullFace) {
            Cull.enable();
        }
        else {
            Cull.disable();
        }
        this.clearBuffers();
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        Core.getInstance().clearColorAndDepth();
        // fwShader.add_uniform("near");
        // fwShader.add_uniform("far");
        // fwShader.add_uniform("alfa");
        // fwShader.add_uniform("ww");
        // glUniform1f(fwShader.uniform("near"), near_);
        // glUniform1f(fwShader.uniform("far"), far_);
        // glUniform1f(fwShader.uniform("alfa"), alfa);
        // glUniform1f(fwShader.uniform("ww"), ww);
        Depth.unuse();
        Blend.enable();
        // glBlendFunci(0, GL_ONE, GL_ONE);
        // glBlendFunci(1, GL_ZERO, GL_ONE_MINUS_SRC_ALPHA);
    };
    Woit.prototype.secondStep = function (prog, near, far) {
        var gl = Core.getInstance().getGL();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        Blend.disable();
        Blend.func(BlendingType.OneMinusSrcAlpha, BlendingType.SrcAlpha);
        // postShader.use();
        // postShader.add_uniform("accumTexture");
        // postShader.add_uniform("revealageTexture");
        // postShader.add_uniform("near");
        // postShader.add_uniform("far");
        // if (postShader.uniform("accumTexture") != -1) {
        //  glActiveTexture(GL_TEXTURE0);
        //  glBindTexture(GL_TEXTURE_2D, accumBuffTexId);
        //  glUniform1i(postShader.uniform("accumTexture"), 0);
        // }
        // if (postShader.uniform("revealageTexture") != -1) {
        //  glActiveTexture(GL_TEXTURE1);
        //  glBindTexture(GL_TEXTURE_2D, revealageBuffTexId);
        //  glUniform1i(postShader.uniform("revealageTexture"), 1);
        // }
        // glUniform1f(postShader.uniform("near"), near_);
        // glUniform1f(postShader.uniform("far"), far_);
        Cull.disable();
        Blend.disable();
        // glBindVertexArray(planeVAO);
        // glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
        // glDepthMask(GL_TRUE);
        // glDisable(GL_BLEND);
        //// glEnable(GL_CULL_FACE);    // TODO: Activar/desactivar cullface
        // postShader.unuse();
    };
    Woit.prototype.clearBuffers = function () {
        var gl = Core.getInstance().getGL();
        gl.clearBufferfv(gl.COLOR, 0, this.color0);
        gl.clearBufferfv(gl.COLOR, 1, this.color1);
    };
    Woit.prototype.initPlane = function () {
    };
    return Woit;
})();
/// <reference path="light.ts" />
"use strict";
/**
 * Directional light class
 * @class DirectionalLight
 */
var DirectionalLight = (function (_super) {
    __extends(DirectionalLight, _super);
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction
     */
    function DirectionalLight(direction) {
        if (direction === void 0) { direction = new Vector3(0.0, 0.0, 0.0); }
        _super.call(this);
        this.direction = direction;
    }
    Object.defineProperty(DirectionalLight.prototype, "direction", {
        /**
         * Get light direction
         * @return {Vector3<number>}
         */
        get: function () { return this._direction; },
        /**
         * Set light direction
         * @param {Vector3<number>} direction
         */
        set: function (direction) { this._direction = direction; },
        enumerable: true,
        configurable: true
    });
    return DirectionalLight;
})(Light);
/// <reference path="light.ts" />
"use strict";
/**
 * Spot light class
 * @class SpotLight
 */
var SpotLight = (function (_super) {
    __extends(SpotLight, _super);
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction
     */
    function SpotLight(position, direction) {
        if (position === void 0) { position = new Vector3(0.0, 0.0, 0.0); }
        if (direction === void 0) { direction = new Vector3(0.0, 0.0, 0.0); }
        _super.call(this);
        this.direction = direction;
        this.position = position;
    }
    Object.defineProperty(SpotLight.prototype, "position", {
        /**
         * Get light position
         * @return {Vector3<number>}
         */
        get: function () { return this._position; },
        /**
         * Set light position
         * @param {Vector3<number>} position
         */
        set: function (position) { this._position = position; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpotLight.prototype, "direction", {
        /**
         * Get light direction
         * @return {Vector3<number>}
         */
        get: function () { return this._direction; },
        /**
         * Set light direction
         * @param {Vector3<number>} direction
         */
        set: function (direction) { this._direction = direction; },
        enumerable: true,
        configurable: true
    });
    return SpotLight;
})(Light);
/// <reference path="light.ts" />
/// <reference path="directionalLight.ts" />
/// <reference path="pointLight.ts" />
/// <reference path="spotLight.ts" />
"use strict";
/// <reference path="../../typings/gl-matrix.d.ts" />
"use strict";
/**
 * Mat2 class
 * @class Mat2
 */
var Mat2 = (function () {
    function Mat2() {
        var _this = this;
        this.toString = function () {
            return mat2.str(_this._value);
        };
        this._value = mat2.create();
    }
    Mat2.prototype.identity = function () {
        mat2.identity(this._value);
    };
    Mat2.prototype.transpose = function () {
        mat2.transpose(this._value, this._value);
    };
    Mat2.prototype.isExactEqual = function (other) {
        return this._value[0] === this._value[0] &&
            this._value[1] === this._value[1] &&
            this._value[2] === this._value[2] &&
            this._value[3] === this._value[3];
    };
    Mat2.prototype.isEqual = function (other) {
        return false; // this.x == other.x && this.y == other.y;
    };
    return Mat2;
})();
/// <reference path="../../typings/gl-matrix.d.ts" />
"use strict";
/**
 * Mat3 class
 * @class Mat3
 */
var Mat3 = (function () {
    function Mat3() {
        var _this = this;
        this.toString = function () {
            return mat3.str(_this._value);
        };
        this._value = mat3.create();
    }
    return Mat3;
})();
/// <reference path="../../typings/gl-matrix.d.ts" />
"use strict";
/**
 * Mat4 class
 * @class Mat4
 */
var Mat4 = (function () {
    function Mat4() {
        var _this = this;
        this.toString = function () {
            return mat4.str(_this._value);
        };
        this._value = mat4.create();
    }
    return Mat4;
})();
/// <reference path="../../typings/gl-matrix.d.ts" />
"use strict";
/**
 * Quaternion class
 * @class Quaternion
 */
var Quaternion = (function () {
    /**
     * Creates a new quaternion
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    function Quaternion(x, y, z, w) {
        var _this = this;
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        if (w === void 0) { w = 0.0; }
        this.toString = function () {
            return quat.str(_this._value);
        };
        this._value = quat.fromValues(x, y, z, w);
    }
    /**
     * Sets a quaternion to represent the shortest rotation from one
     *      vector to another.
     * @param {Float32Array} init: Initial vector
     * @param {Float32Array} dest: Destination vector
     */
    Quaternion.prototype.rotationTo = function (init, dest) {
        quat.rotationTo(this._value, init, dest);
    };
    /**
     * Set quaternion value to identity
     */
    Quaternion.prototype.setIdentity = function () {
        quat.identity(this._value);
    };
    /**
     * Create a copy of this quaternion
     * @return {Quaternion}
     */
    Quaternion.prototype.clone = function () {
        return new Quaternion(this._value[0], this._value[1], this._value[2], this._value[3]);
    };
    /**
     * Calculate dot product with another quaternion
     * @param {Quaternion}
     */
    Quaternion.prototype.dot = function (q) {
        quat.dot(this._value, q._value);
    };
    /**
     * Calculate multiplication with another quaternion
     * @param {Quaternion}
     */
    Quaternion.prototype.mult = function (q) {
        quat.multiply(this._value, this._value, q._value);
    };
    /**
     * Normalize quaternion
     */
    Quaternion.prototype.normalize = function () {
        quat.normalize(this._value, this._value);
    };
    /**
     * Invert quaternion
     */
    Quaternion.prototype.invert = function () {
        quat.invert(this._value, this._value);
    };
    /**
     * Rotates quaternion by the given angle (in radians) about the X axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    Quaternion.prototype.rotateX = function (angle) {
        quat.rotateX(this._value, this._value, angle);
    };
    /**
     * Rotates quaternion by the given angle (in radians) about the Y axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    Quaternion.prototype.rotateY = function (angle) {
        quat.rotateY(this._value, this._value, angle);
    };
    /**
     * Rotates quaternion by the given angle (in radians) about the Z axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    Quaternion.prototype.rotateZ = function (angle) {
        quat.rotateZ(this._value, this._value, angle);
    };
    /**
     * Performs a linear interpolation between this and another Quaternion
     * @param {Quaternion}
     * @param {number} t: Intepolation amount between quaternions
     */
    Quaternion.prototype.lerp = function (q, t) {
        // TODO
    };
    return Quaternion;
})();
/// <reference path="../../typings/gl-matrix.d.ts" />
"use strict";
/**
 * Vect2 class
 * @class Vect2
 */
var Vect2 = (function () {
    /**
     * Creates a new vect2
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     */
    function Vect2(x, y) {
        var _this = this;
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        this.toString = function () {
            return vec2.str(_this._value);
        };
        this._value = vec2.fromValues(x, y);
    }
    Vect2.prototype.add = function (v) {
        vec2.add(this._value, this._value, v._value);
    };
    Vect2.prototype.sub = function (v) {
        vec2.sub(this._value, this._value, v._value);
    };
    Vect2.prototype.mult = function (other) {
        vec2.multiply(this._value, this._value, other._value);
    };
    Vect2.prototype.div = function (other) {
        vec2.div(this._value, this._value, other._value);
    };
    Vect2.prototype.negate = function () {
        vec2.negate(this._value, this._value);
    };
    Vect2.prototype.scale = function (value) {
        vec2.scale(this._value, this._value, value);
    };
    Vect2.prototype.distance = function () {
        return vec2.squaredLength(this._value);
    };
    Object.defineProperty(Vect2.prototype, "x", {
        get: function () { return this._value[0]; },
        set: function (value) {
            this._value[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vect2.prototype, "y", {
        get: function () { return this._value[1]; },
        set: function (value) {
            this._value[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Vect2.prototype.lerp = function (other, t) {
        var ax = this._value[0], ay = this._value[1];
        return new Vect2(ax + t * (other.x - ax), ay + t * (other.y - ay));
    };
    Vect2.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    Vect2.prototype.dot = function (other) {
        return vec2.dot(this._value, other._value);
    };
    return Vect2;
})();
/// <reference path="../../typings/gl-matrix.d.ts" />
"use strict";
/**
 * Vect3 class
 * @class Vect3
 */
var Vect3 = (function () {
    /**
     * Creates a new vect3
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    function Vect3(x, y, z) {
        var _this = this;
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        this.toString = function () {
            return vec3.str(_this._value);
        };
        this._value = vec3.fromValues(x, y, z);
    }
    Vect3.prototype.add = function (v) {
        vec3.add(this._value, this._value, v._value);
    };
    Vect3.prototype.sub = function (v) {
        vec3.sub(this._value, this._value, v._value);
    };
    Vect3.prototype.mult = function (other) {
        vec3.multiply(this._value, this._value, other._value);
    };
    Vect3.prototype.div = function (other) {
        vec3.div(this._value, this._value, other._value);
    };
    Vect3.prototype.negate = function () {
        vec3.negate(this._value, this._value);
    };
    Vect3.prototype.scale = function (value) {
        vec3.scale(this._value, this._value, value);
    };
    Vect3.prototype.distance = function () {
        return vec3.squaredLength(this._value);
    };
    Object.defineProperty(Vect3.prototype, "x", {
        get: function () { return this._value[0]; },
        set: function (value) {
            this._value[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vect3.prototype, "y", {
        get: function () { return this._value[1]; },
        set: function (value) {
            this._value[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vect3.prototype, "z", {
        get: function () { return this._value[2]; },
        set: function (value) {
            this._value[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Vect3.prototype.lerp = function (other, t) {
        var ax = this._value[0], ay = this._value[1], az = this._value[2];
        return new Vect3(ax + t * (other.x - ax), ay + t * (other.y - ay), az + t * (other.z - az));
    };
    Vect3.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    };
    Vect3.prototype.dot = function (other) {
        return vec3.dot(this._value, other._value);
    };
    return Vect3;
})();
/// <reference path="../../typings/gl-matrix.d.ts" />
"use strict";
/**
 * Vect4 class
 * @class Vect4
 */
var Vect4 = (function () {
    /**
     * Creates a new vect2
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    function Vect4(x, y, z, w) {
        var _this = this;
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        if (w === void 0) { w = 0.0; }
        this.toString = function () {
            return vec4.str(_this._value);
        };
        this._value = vec4.fromValues(x, y, z, w);
    }
    Vect4.prototype.add = function (v) {
        vec4.add(this._value, this._value, v._value);
    };
    Vect4.prototype.sub = function (v) {
        vec4.sub(this._value, this._value, v._value);
    };
    Vect4.prototype.mult = function (other) {
        vec4.multiply(this._value, this._value, other._value);
    };
    Vect4.prototype.div = function (other) {
        vec4.div(this._value, this._value, other._value);
    };
    Vect4.prototype.negate = function () {
        vec4.negate(this._value, this._value);
    };
    Vect4.prototype.scale = function (value) {
        vec4.scale(this._value, this._value, value);
    };
    Vect4.prototype.distance = function () {
        return vec4.squaredLength(this._value);
    };
    Object.defineProperty(Vect4.prototype, "x", {
        get: function () { return this._value[0]; },
        set: function (value) {
            this._value[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vect4.prototype, "y", {
        get: function () { return this._value[1]; },
        set: function (value) {
            this._value[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vect4.prototype, "z", {
        get: function () { return this._value[2]; },
        set: function (value) {
            this._value[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vect4.prototype, "w", {
        get: function () { return this._value[3]; },
        set: function (value) {
            this._value[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    Vect4.prototype.lerp = function (other, t) {
        var ax = this._value[0], ay = this._value[1], az = this._value[2], aw = this._value[3];
        return new Vect4(ax + t * (other.x - ax), ay + t * (other.y - ay), az + t * (other.z - az), aw + t * (other.w - aw));
    };
    Vect4.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    };
    Vect4.prototype.dot = function (other) {
        return vec4.dot(this._value, other._value);
    };
    return Vect4;
})();
"use strict";
/**
 * Vector4<T> class
 * @class Vector4<T>
 */
var Vector4 = (function () {
    /**
     * Vector4<T> constructor
     * @param {T} x: First value
     * @param {T} y: Second value
     * @param {T} z: Third value
     * @param {T} z: Fourth value
     */
    function Vector4(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    /**
     * Check if two vector4<T> are equals
     * @param  {Vector4<T>} other: Second vector
     * @return {boolean}: True if both equals
     */
    Vector4.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    };
    return Vector4;
})();
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
"use strict";
var Icosphere = (function (_super) {
    __extends(Icosphere, _super);
    function Icosphere(its) {
        if (its === void 0) { its = 0; }
        _super.call(this);
        var ICO_POSITIONS = [
            -1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, 1.0,
            0.0, -1.0, 0.0,
            1.0, 0.0, 0.0
        ];
        var ICO_INDICES = [
            3, 4, 5, 3, 5, 1, 3, 1, 0, 3, 0, 4,
            4, 0, 2, 4, 2, 5, 2, 0, 1, 5, 2, 1
        ];
        /*
        let v = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let n = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
        let el = new Array(6 * xdivs * zdivs);*/
    }
    return Icosphere;
})(Drawable);
/// <reference path="resourceMap.ts" />
"use strict";
var AudioSource = (function () {
    /**
     *
     */
    function AudioSource() {
        /**
         * [_bgAudioNode description]
         * @type {AudioBufferSourceNode}
         */
        this._bgAudioNode = null;
        this.initAudioContext();
    }
    /**
     *
     */
    AudioSource.prototype.initAudioContext = function () {
        this._audioContext = new (window["AudioContext"] || window["webkitAudioContext"])();
    };
    /**
     *
     */
    AudioSource.prototype.stopBackgroundAudio = function () {
        // Check if the audio is playing
        if (this._bgAudioNode !== null) {
            this._bgAudioNode.stop(0);
            this._bgAudioNode = null;
        }
    };
    /**
     * @param {string}
     */
    AudioSource.prototype.playSound = function (clipName) {
        var clip = ResourceMap.retrieveAsset(clipName);
        if (clip) {
            var sourceNode = this._audioContext.createBufferSource();
            sourceNode.buffer = clip;
            sourceNode.connect(this._audioContext.destination);
            // TODO: Volume!!
            sourceNode.start(0);
        }
    };
    /**
     * @return {boolean}
     */
    AudioSource.prototype.isBackgroundAudioPlaying = function () {
        return this._bgAudioNode !== null;
    };
    /**
     * @param {string}
     */
    AudioSource.prototype.playBackgroundAudio = function (clipName) {
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
    /**
     *
     */
    AudioSource.prototype._stopBackgroundAudio = function () {
        // Check if audio is playing
        if (this._bgAudioNode !== null) {
            this._bgAudioNode.stop(0);
            this._bgAudioNode = null;
        }
    };
    return AudioSource;
})();
/// <reference path="resourceMap.ts" />
"use strict";
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
"use strict";
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
/// <reference path="../core/program.ts" />
/// <reference path="resourceMap.ts" />
/// <reference path="../textures/cubemapTexture.ts" />
/// <reference path="../core/depth.ts" />
"use strict";
var Skybox = (function () {
    /**
     * @param {string}
     */
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
        this._prog = new Program();
        var vs = "#version 300 es\n        precision highp float;\n        layout (location = 0) in vec3 position;\n        out vec3 TexCoords;\n        uniform mat4 projection;\n        uniform mat4 view;\n        void main() {\n            vec4 pos = projection * view * vec4(position, 1.0);\n            gl_Position = pos.xyww;\n            TexCoords = position;\n        }";
        this._prog.addShader(vs, shader_type.vertex, mode.read_text);
        var fg = "#version 300 es\n        precision highp float;\n        in vec3 TexCoords;\n        out vec4 color;\n        uniform samplerCube skybox;\n        void main() { \n            color = texture(skybox, TexCoords);\n        }";
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
    /**
     * @param {Float32Array}
     * @param {Float32Array}
     */
    Skybox.prototype.render = function (view, projection) {
        var gl = Core.getInstance().getGL();
        Depth.comparison(ComparisonFunc.LessEqual);
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
        Depth.comparison(ComparisonFunc.Less);
    };
    /**
     *
     */
    Skybox.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        this.cubeMapTexture.destroy();
    };
    /**
     * @param {Array<string>}
     */
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
/// <reference path="../core/program.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
"use strict";
var Sprite = (function () {
    function Sprite() {
    }
    Sprite.initialize = function () {
        Sprite.prog = new Program();
        Sprite.prog.addShader("#version 300 es\nprecision mediump float;\n\nlayout(location = 0) in vec3 position;\nlayout(location = 2) in vec2 texCoord;\n\nuniform mat4 projection;\nuniform mat4 view;\nuniform mat4 model;\n\nout vec2 outTexCoord;\n\nvoid main() {\n    gl_Position = projection * view * model * vec4(position, 1.0);\n    outTexCoord = texCoord;\n}", shader_type.vertex, mode.read_text);
        Sprite.prog.addShader("#version 300 es\nprecision mediump float;\n\nuniform sampler2D tex;\n\nin vec2 outTexCoord;\n\nout vec4 fragColor;\n\nvoid main() {\n    fragColor = texture(tex, outTexCoord);\n}", shader_type.fragment, mode.read_text);
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
var Material = (function () {
    function Material() {
    }
    return Material;
})();
/// <reference path="material.ts" />
/// <reference path="../../core/program.ts" />
var DepthMat = (function (_super) {
    __extends(DepthMat, _super);
    function DepthMat() {
        _super.apply(this, arguments);
    }
    DepthMat.initialize = function () {
        // const gl = Core.getInstance().getGL();
        // DepthMat.ss.addShader("shaders/depthShader.vert", shader_type.vertex, mode.read_file);
    };
    DepthMat.ss = new Program();
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
"use strict";
var Object3D = (function () {
    function Object3D() {
        this._childs = [];
        this._id = Object3D.uid();
    }
    Object3D.prototype.add = function () {
        var _this = this;
        var childs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childs[_i - 0] = arguments[_i];
        }
        childs.forEach(function (obj) {
            _this._childs.push(obj);
        });
    };
    Object3D.prototype.remove = function (child) {
        var indexOf = this._childs.indexOf(child);
        if (indexOf > -1) {
            this._childs.splice(indexOf, 1);
        }
    };
    Object3D.prototype.removeAll = function () {
        this._childs = [];
    };
    Object3D.uid = function (id) {
        if (id === void 0) { id = "id"; }
        Object3D.uidCounters[id] = Object3D.uidCounters[id] || 1;
        var count = Object3D.uidCounters[id]++;
        return id + "-" + count;
    };
    // ===========
    // ===========
    Object3D.uidCounters = {};
    return Object3D;
})();
"use strict";
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
/// <reference path="object3d.ts" />
/// <reference path="../lights/light.ts" />
"use strict";
var SceneGraph = (function () {
    function SceneGraph() {
        this._lights = [];
    }
    SceneGraph.prototype.addLight = function (l) {
        this._lights.push(l);
    };
    return SceneGraph;
})();
/// <reference path="texture2d.ts" />
"use strict";
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
/// <reference path="texture3d.ts" />
"use strict";
var SimpleTexture3D = (function (_super) {
    __extends(SimpleTexture3D, _super);
    function SimpleTexture3D(size, options) {
        if (options === void 0) { options = {}; }
        _super.call(this, null, size, options);
    }
    return SimpleTexture3D;
})(Texture3D);
/// <reference path="texture.ts" />
/// <reference path="..//maths/vector3.ts" />
"use strict";
var Texture2DArray = (function (_super) {
    __extends(Texture2DArray, _super);
    function Texture2DArray() {
        _super.call(this, gl.TEXTURE_2D_ARRAY);
        this._handle = gl.createTexture();
        this.bind();
    }
    Texture2DArray.prototype.bind = function (slot) {
        var gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this.target, this._handle);
    };
    Texture2DArray.prototype.destroy = function () {
        var gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    };
    return Texture2DArray;
})(Texture);
/// <reference path="texture2d.ts" />
"use strict";
var VideoTexture = (function (_super) {
    __extends(VideoTexture, _super);
    function VideoTexture(data, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        options["minFilter"] = gl.LINEAR;
        options["magFilter"] = gl.LINEAR;
        options["wrap"] = [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];
        _super.call(this, data, options);
        this._videoElem.play();
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
