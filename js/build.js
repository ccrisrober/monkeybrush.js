;
/// <reference path="icamera.ts" />
var OrthoCamera = (function () {
    function OrthoCamera() {
    }
    return OrthoCamera;
})();
/// <reference path="icamera.ts" />
var ProjCamera = (function () {
    function ProjCamera() {
    }
    return ProjCamera;
})();
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
var Texture = (function () {
    function Texture() {
    }
    Texture.prototype.loadTexture = function (textureName) {
        var _this = this;
        // Create texture object
        var img = new Image();
        img.onload = function () {
            _this._processLoadedImage(textureName, img);
        };
        img.src = textureName;
    };
    Texture.prototype.unloadTexture = function (textureName) {
        var gl = Core.getInstance().getGL();
        //gl.deleteTexture()
    };
    Texture.prototype.activateTexture = function () { };
    Texture.prototype.deactivateTexture = function () { };
    Texture.prototype._processLoadedImage = function (textureName, img) {
        var gl = Core.getInstance().getGL();
        // Generate a texture reference to webgl ctx
        var textureID = gl.createTexture();
        // bind the texture reference with the current texture functionality in the webGL
        gl.bindTexture(gl.TEXTURE_2D, textureID);
    };
    return Texture;
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
/// <reference path="core/core.ts" />
/// <reference path="resources/quadToneMap.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
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
window.onload = function () {
    gl = Core.getInstance().getGL();
    ToneMap.init(gl);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    var text = FizzyText();
    var gui = new dat.GUI();
    for (var index in text) {
        gui.add(text, index);
    }
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
