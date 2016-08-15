var ICamera = (function () {
    function ICamera(pos) {
        this._position = pos;
    }
    Object.defineProperty(ICamera.prototype, "position", {
        get: function () { return this._position; },
        set: function (pos) { this._position = pos; },
        enumerable: true,
        configurable: true
    });
    return ICamera;
})();
;
/// <reference path="icamera.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrthoCamera = (function (_super) {
    __extends(OrthoCamera, _super);
    function OrthoCamera() {
        _super.apply(this, arguments);
    }
    return OrthoCamera;
})(ICamera);
/// <reference path="icamera.ts" />
var ProjectiveCamera = (function (_super) {
    __extends(ProjectiveCamera, _super);
    function ProjectiveCamera() {
        _super.apply(this, arguments);
    }
    return ProjectiveCamera;
})(ICamera);
"use strict";
var Core = (function () {
    function Core() {
        if (Core._instance) {
            throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
        }
        var canvas = document.getElementById("canvas");
        this._gl = this._getContext(canvas);
        if (!this._gl) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        this._getVendors();
        Core._instance = this;
    }
    Core.prototype.init = function () {
        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);
        // Set images to flip y axis to match the texture coordinate space.
        this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, 1);
    };
    Core.getInstance = function () {
        return Core._instance;
    };
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
var vec2 = (function () {
    function vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    vec2.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    return vec2;
})();
/// <reference path="../core/core.ts" />
/// <reference path="../extras/vec2.ts" />
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
/// <reference path="../extras/vec2.ts" />
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
        this.addAttrib(0, this.createBuffer(model.meshes[0].vertices), 3);
        this.addAttrib(1, this.createBuffer(model.meshes[0].normals), 3);
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
    Model.prototype._calculateTangents = function (vertices, normals) {
        var ts = [];
        for (var i = 0, size = vertices.length / 3; i < size; i++) {
            ts[i] = [0.0, 0.0, 0.0];
        }
        // Not finished
        return ts;
    };
    return Model;
})();
;
/// <reference path="core.ts" />
// TODO: Add this https://github.com/mattdesl/gl-shader-extract!!
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
        this.uniformLocations = {}; //Array<WebGLUniformLocation>;
        this.attribLocations = {}; //Array<number>;
        this.shaders = [];
    }
    ShaderProgram.prototype.addAttributes = function (attrs) {
        var gl = Core.getInstance().getGL();
        for (var attr in attrs) {
            attr = attrs[attr];
            var attrID = gl.getAttribLocation(this.mCompiledShader, attr);
            if (attrID < 0) {
                console.error(attr + " undefined");
                continue;
            }
            this.attribLocations[attr] = attrID;
        }
    };
    ShaderProgram.prototype.addUniforms = function (unifs) {
        var gl = Core.getInstance().getGL();
        for (var unif in unifs) {
            unif = unifs[unif];
            var unifID = gl.getUniformLocation(this.mCompiledShader, unif);
            if (unifID < 0) {
                console.error(unif + " undefined");
                continue;
            }
            this.uniformLocations[unif] = unifID;
        }
    };
    ShaderProgram.prototype.program = function () {
        return this.mCompiledShader;
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
        this.shaders.push(shader);
    };
    ShaderProgram.prototype.compile_and_link = function () {
        var gl = Core.getInstance().getGL();
        // Creamos y linkamos shaders
        this.mCompiledShader = gl.createProgram();
        for (var i = 0; i < this.shaders.length; i++) {
            gl.attachShader(this.mCompiledShader, this.shaders[i]);
        }
        gl.linkProgram(this.mCompiledShader);
        // Consultamos errores
        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            alert("ERROR");
            console.warn("Error in program linking:" + gl.getProgramInfoLog(this.mCompiledShader));
            console.log(this.fragmentSource);
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
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        }
        "SHADER ERROR";
        return this.compileShader(shaderSource, shaderType);
    };
    ShaderProgram.prototype.loadAndCompileFromText = function (shaderSource, shaderType) {
        if (shaderSource === null) {
            alert("WARNING: " + shaderSource + " failed");
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        }
        return this.compileShader(shaderSource, shaderType);
    };
    ShaderProgram.prototype.loadAndCompile = function (id, shaderType) {
        var shaderText, shaderSource;
        // Obtenemos el shader del index.html
        shaderText = document.getElementById(id);
        shaderSource = shaderText.firstChild.textContent;
        if (shaderSource === null) {
            alert("WARNING: " + id + " failed");
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        }
        return this.compileShader(shaderSource, shaderType);
    };
    ShaderProgram.prototype.compileShader = function (shaderSource, shaderType) {
        var gl = Core.getInstance().getGL();
        var compiledShader;
        if (shaderType == gl.VERTEX_SHADER) {
            this.vertexSource = shaderSource;
        }
        else if (shaderType == gl.FRAGMENT_SHADER) {
            this.fragmentSource = shaderSource;
        }
        // Creamos el shader
        compiledShader = gl.createShader(shaderType);
        // Compilamos el shader
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);
        // Consultamos si hay errores
        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
            console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        }
        return compiledShader;
    };
    ShaderProgram.prototype.use = function () {
        gl.useProgram(this.mCompiledShader);
    };
    ShaderProgram.prototype.dispose = function () {
        /*this.shaders.forEach(function(s) {
            gl.detachShader(this.mCompiledShader, s);
        });
        gl.deleteShader(this.mCompiledShader);*/
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
// TODO: Change _color to vec3
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
var vec3 = (function () {
    function vec3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    vec3.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    };
    return vec3;
})();
var vec4 = (function () {
    function vec4(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    vec4.prototype.isEqual = function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    };
    return vec4;
})();
/// <reference path="../core/shaderProgram.ts" />
var vertexCode = "#version 300 es\nin vec3 vertex;\nout vec2 texCoord;\nvoid main() {\n  texCoord = vertex.xy * 0.5 + 0.5;\n  gl_Position = vec4( vertex, 1 );\n}";
var ToneMap;
(function (ToneMap) {
    function init(gl) {
        ToneMap.textureQuadSimpleProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadSimpleProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadSimpleProgram.compile_and_link();
        ToneMap.textureQuadSimpleProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadSimpleProgram.addUniforms(["texture_"]);
        ToneMap.textureQuadGammaProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadGammaProgram.addShader("#version 300 es\n\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadGammaProgram.compile_and_link();
        ToneMap.textureQuadGammaProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadGammaProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadReinhardProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadReinhardProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.rgb = fragColor.rgb / ( 1.0 + fragColor.rgb );\n        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadReinhardProgram.compile_and_link();
        ToneMap.textureQuadReinhardProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadReinhardProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadFilmicProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadFilmicProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        vec3 color = texture( texture_, texCoord ).rgb * pow( abs( brightness ), 2.2 );\n        color = max(vec3(0.), color - vec3(0.004));\n        color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);\n        fragColor = vec4( color, 1.0 );\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadFilmicProgram.compile_and_link();
        ToneMap.textureQuadFilmicProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadFilmicProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadsRGBProgram.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadsRGBProgram.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      out vec4 fragColor;\n      float sRGB_gamma_correct(float c) {\n       const float a = 0.055;\n       if(c < 0.0031308) return 12.92*c;\n       else return (1.0+a)*pow(c, 1.0/2.4) - a;\n      }\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        fragColor.r = sRGB_gamma_correct(fragColor.r);\n        fragColor.g = sRGB_gamma_correct(fragColor.g);\n        fragColor.b = sRGB_gamma_correct(fragColor.b);\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadsRGBProgram.compile_and_link();
        ToneMap.textureQuadsRGBProgram.addAttributes(["vertex"]);
        ToneMap.textureQuadsRGBProgram.addUniforms(["texture_", "brightness"]);
        ToneMap.textureQuadUncharted2Program.addShader(vertexCode, gl.VERTEX_SHADER, mode.read_text);
        ToneMap.textureQuadUncharted2Program.addShader("#version 300 es\n      precision highp float;\n      in vec2 texCoord;\n      uniform sampler2D texture_;\n      uniform float brightness;\n      out vec4 fragColor;\n      void main() {\n        fragColor = texture( texture_, texCoord );\n        float A = 0.15;\n        float B = 0.50;\n        float C = 0.10;\n        float D = 0.20;\n        float E = 0.02;\n        float F = 0.30;\n        float W = 11.2;\n        float exposure = brightness;//2.;\n        fragColor.rgb *= exposure;\n        fragColor.rgb = ((fragColor.rgb * \n          (A * fragColor.rgb + C * B) + D * E) / (fragColor.rgb * \n          (A * fragColor.rgb + B) + D * F)) - E / F;\n        float white = ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;\n        fragColor.rgb /= white;\n        fragColor.rgb = pow(fragColor.rgb, vec3(1. / 2.2));\n      }", gl.FRAGMENT_SHADER, mode.read_text);
        ToneMap.textureQuadUncharted2Program.compile_and_link();
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
    return Drawable;
})();
/// <reference path="drawable.ts" />
var Quad = (function (_super) {
    __extends(Quad, _super);
    function Quad(xsize, zsize, xdivs, zdivs, smax, tmax) {
        if (smax === void 0) { smax = 1.0; }
        if (tmax === void 0) { tmax = 1.0; }
        _super.call(this);
        this._faces = xdivs * zdivs;
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
        this.addAttrib(0, this._handle[0], v, 3);
        this.addAttrib(1, this._handle[1], n, 3);
        this.addAttrib(2, this._handle[2], tex, 2);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[3]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);
        gl.bindVertexArray(null);
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
        gl.bindVertexArray(this._handle);
        gl.drawElements(gl.TRIANGLES, 6 * this._faces, gl.UNSIGNED_INT, 0);
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
        for (var i = 0; i < 4; i++) {
            this._handle[i] = gl.createBuffer();
        }
        this._vao = gl.createVertexArray();
        gl.bindVertexArray(this._vao);
        this.addAttrib(0, this._handle[0], v, 3);
        this.addAttrib(1, this._handle[1], n, 3);
        this.addAttrib(2, this._handle[2], tex, 2);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._handle[3]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(el), gl.STATIC_DRAW);
        gl.bindVertexArray(null);
        // TODO: Clear v, n, tex and el
        console.log({
            vertices: v,
            normal: n,
            textureCoords: tex,
            indices: el
        });
    }
    Cube.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._handle);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_INT, 0);
    };
    return Cube;
})(Drawable);
/// <reference path="core/core.ts" />
/// <reference path="resources/quadToneMap.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="models/quad.ts" />
/// <reference path="models/cube.ts" />
function getContext(canvas) {
    var contexts = "webgl,webgl2,experimental-webgl2".split(",");
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
}
function getVendors() {
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
}
var gl;
var stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);
var FizzyText = function () {
    return {
        message: 'dat.gui',
        speed: 0.8,
        displayOutline: false,
        explode: function () { }
    };
};
var quad, cube;
window.onload = function () {
    gl = Core.getInstance().getGL();
    ToneMap.init(gl);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    var text = FizzyText();
    var gui = new dat.GUI();
    for (var index in text) {
        gui.add(text, index);
    }
    quad = new Quad(1.0, 1.0, 1, 1);
    quad = new Cube(1.0);
    requestAnimationFrame(drawScene);
};
function drawScene(dt) {
    stats.begin();
    dt *= 0.001; // convert to seconds
    //resize(gl);
    gl.clear(gl.COLOR_BUFFER_BIT);
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
var Sphere = (function (_super) {
    __extends(Sphere, _super);
    function Sphere() {
        _super.call(this);
    }
    Sphere.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._handle);
        gl.drawElements(gl.TRIANGLES, this._elements, gl.UNSIGNED_INT, 0);
    };
    return Sphere;
})(Drawable);
/// <reference path="drawable.ts" />
var Teaspot = (function (_super) {
    __extends(Teaspot, _super);
    function Teaspot() {
        _super.call(this);
    }
    Teaspot.prototype.render = function () {
        var gl = Core.getInstance().getGL();
        gl.bindVertexArray(this._handle);
        gl.drawElements(gl.TRIANGLES, this._elements, gl.UNSIGNED_INT, 0);
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
        gl.bindVertexArray(this._handle);
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
        this.ss.compile_and_link();
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
/// <reference path="../extras/vec2.ts" />
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
/// <reference path="texture.ts" />
var Texture2D = (function (_super) {
    __extends(Texture2D, _super);
    function Texture2D(element, size, options) {
        if (options === void 0) { options = {}; }
        var gl = Core.getInstance().getGL();
        _super.call(this, gl.TEXTURE_2D);
        options = options || {};
        this._flipY = options["flipY"] === true;
        this._handle = gl.createTexture();
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
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        this.wrap(wraps);
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
        this.bind();
        gl.generateMipmap(this.target);
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
// https://github.com/glo-js/glo-texture/tree/master/lib 
var Texture3D = (function () {
    function Texture3D() {
    }
    return Texture3D;
})();
