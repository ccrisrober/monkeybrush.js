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

namespace MB {

    declare var WebGL2RenderingContext: any;

    export interface IAttr {
        name: string;
        id: number;
        type: string;
    };
    export interface IUnif {
        name: string;
        id: number;
        type: string;
    };

    export interface ICachedUnifAttr {
        attributes: Array<IAttr>;
        uniforms: Array<IUnif>;
    };

    /**
     * Program class
     * @class Program
     */
    export class Program {
        protected _context: GLContext;

        /**
         * Program constructor
         */
        constructor(context: GLContext) {
            this._context = context;
            this._shaders = [];
            this._isLinked = false;
        };
        /**
         * Program internal handler.
         * @type {WebGLProgram}
         */
        private _handler: WebGLProgram;
        /**
         * Shaders vector.
         * @type {Array<WebGLShader>}
         */
        private _shaders: Array<WebGLShader>;
        /**
         * Program status.
         * @type {boolean}
         */
        private _isLinked: boolean;
        /**
         * Vertex shader raw code.
         * @type {string}
         */
        public _vertexSource: string;
        /**
         * Fragment shader raw code.
         * @type {string}
         */
        public _fragmentSource: string;
        /**
         * Program cacheable uniforms
         * @type { [key: string]: WebGLUniformLocation; }
         */
        public uniformLocations: { [key: string]: WebGLUniformLocation; } = {};
        /**
         * Program cacheable attributes
         * @type { [key: string]: number; }
         */
        public attribLocations: { [key: string]: number; } = {};
        /**
         * Caches a list of attributes using varying arguments
         * @param {string[]} ...attrs Attributes names
         */
        public addAttributesArgs(...attrs: string[]) {
            this.addAttributes(attrs);
        };
        /**
         * Caches a list of attributes using array of strings
         * @param {Array<string>} attrs Array of string that contains attributes names
         */
        public addAttributes(attrs: Array<string>) {
            const gl: WebGL2RenderingContext = this._context.gl;
            for (let attr in attrs) {
                attr = attrs[attr];
                const attrID = gl.getAttribLocation(this._handler, attr);
                if (attrID < 0) {
                    console.warn(attr + " undefined");
                    continue;
                }
                this.attribLocations[attr] = attrID;
            }
        };
        /**
         * Caches a list of uniforms using varying arguments
         * @param {string[]} ...unifs Uniforms names
         */
        public addUniformsArgs(...unifs: string[]) {
            this.addUniforms(unifs);
        };
        /**
         * Caches a list of uniforms using array of strings
         * @param {Array<string>} unifs Array of string that contains uniforms names
         */
        public addUniforms(unifs: Array<string>) {
            const gl: WebGL2RenderingContext = this._context.gl;
            for (let unif in unifs) {
                unif = unifs[unif];
                const unifID: WebGLUniformLocation = gl.getUniformLocation(this._handler, unif);
                if (unifID === null) continue;
                if (unifID < 0) {
                    console.warn(unif + " undefined");
                    continue;
                }
                this.uniformLocations[unif] = unifID;
            }
        };
        public loadsFromScript(vsShaderID: string, fsShaderID: string) {
            this.addShader(vsShaderID, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_script);
            this.addShader(fsShaderID, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_script);
            this.compile();
            this.autocatching();
        };
        public load(vsShaderCode: string, fsShaderCode: string) {
            this.addShader(vsShaderCode, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            this.addShader(fsShaderCode, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            this.compile();
            this.autocatching();
        };
        public loadWithTF(vsShaderCode: string, fsShaderCode: string, varyings: Array<string>, mode: MB.ctes.TFMode) {
            this.addShader(vsShaderCode, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            this.addShader(fsShaderCode, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            this._compile();
            this.feedbackVarying(varyings, mode);
            this._link();
            this.autocatching();
        };
        /**
         * Return internal program identifier
         * @return {WebGLProgram} [description]
         */
        public id(): WebGLProgram {
            return this._handler;
        };
        /**
         * Attach a new shader to this program.
         * @param {string}                 shader_ String that contains file route, script id or raw shader code.
         * @param {MB.ctes.ProgramCte.shader_type} type    Shader type (Vertex or Fragment).
         * @param {MB.ctes.ProgramCte.mode}        _mode   Shader read mode (from file, from script or raw mode).
         */
        public addShader(shader_: string, type: MB.ctes.ShaderType, _mode: MB.ctes.ReadMode) {
            let shader: WebGLShader;
            if (type < 0) {
                throw new Error("SHADER TYPE UNDEFINED");
            }
            if (_mode === MB.ctes.ReadMode.read_file) {
                shader = this.loadAndCompileWithFile(shader_, type);
            } else if (_mode === MB.ctes.ReadMode.read_script) {
                shader = this.loadAndCompile(shader_, type);
            } else if (_mode === MB.ctes.ReadMode.read_text) {
                shader = this.loadAndCompileFromText(shader_, type);
            }
            this._shaders.push(shader);
        };
        /**
         * Create shader program and attach vertex and fragment shader.
         */
        public _compile() {
            const gl: WebGL2RenderingContext = this._context.gl;
            // Create and compile shader
            this._handler = gl.createProgram();
            for (let i = 0; i < this._shaders.length; ++i) {
                gl.attachShader(this._handler, this._shaders[i]);
            }
        };
        /**
         * Link program to current WebGLRenderingContext.
         * @return {boolean} True if linked correctly. False otherwise.
         */
        public _link(): boolean {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.linkProgram(this._handler);

            // Checkin errors
            if (!gl.getProgramParameter(this._handler, gl.LINK_STATUS)) {
                alert("ERROR");
                console.warn("Error in Program linking:" + gl.getProgramInfoLog(this._handler));
                console.warn({
                    vertex: this._vertexSource,
                    fragment: this._fragmentSource
                });
                throw "SHADER ERROR";
            }
            this._isLinked = true;
            return true;
        };
        public compileWithTF(varyings: Array<string>, mode: MB.ctes.TFMode) {
            this._compile();
            this.feedbackVarying(varyings, mode);
            this._link();
        };
        /**
         * Compile and link program
         * @return {boolean}: True if not errors
         */
        public compile(): boolean {
            const gl: WebGL2RenderingContext = this._context.gl;
            // Create and compile shader
            this._handler = gl.createProgram();
            for (let i = 0; i < this._shaders.length; ++i) {
                gl.attachShader(this._handler, this._shaders[i]);
            }
            gl.linkProgram(this._handler);

            // Checkin errors
            if (!gl.getProgramParameter(this._handler, gl.LINK_STATUS)) {
                alert("ERROR");
                console.warn("Error in Program linking:" + gl.getProgramInfoLog(this._handler));
                console.warn({
                    vertex: this._vertexSource,
                    fragment: this._fragmentSource
                });
                throw "SHADER ERROR";
            }
            this._isLinked = true;
            return true;
        };

        public complete() {
            this.compile();
            this.autocatching();
        }
        /**
         * Create shader from file route.
         * @param {string} filePath   File route.
         * @param {number} shaderType Shader type.
         */
        private loadAndCompileWithFile(filePath: string, shaderType: number) {
            let request: XMLHttpRequest = new XMLHttpRequest();
            request.open("GET", filePath, false);
            try {
                request.send();
            } catch (err) {
                alert("ERROR: " + filePath);
                console.error("ERROR: " + filePath);
                return null;
            }
            let shaderSource: string = request.responseText;
            if (shaderSource === null) {
                alert("WARNING: " + filePath + " failed");
                console.warn(this._fragmentSource);
                throw "SHADER ERROR";
            }

            return this.compileShader(shaderSource, shaderType);
        };
        /**
         * Create shader from raw code.
         * @param {string} shaderSource Raw shader code.
         * @param {number} shaderType   Shader type.
         */
        private loadAndCompileFromText(shaderSource: string, shaderType: number) {
            if (shaderSource === null) {
                alert("WARNING: " + shaderSource + " failed");
                console.warn(this._fragmentSource);
                throw "SHADER ERROR";
            }

            return this.compileShader(shaderSource, shaderType);
        };
        /**
         * Create shader from HTML shader script
         * @param {string} id         HTML script ID.
         * @param {number} shaderType Shader type.
         */
        private loadAndCompile(id: string, shaderType: number) {
            let shaderText: HTMLElement, shaderSource: string;

            // Get shader from index.html
            shaderText = document.getElementById(id);
            shaderSource = shaderText.firstChild.textContent;

            if (shaderSource === null) {
                alert("WARNING: " + id + " failed");
                console.warn(this._fragmentSource);
                throw "SHADER ERROR";
            }

            return this.compileShader(shaderSource, shaderType);
        };

        protected _processImports(src: string): string {
            const regex = /#import<(.+)>(\[(.*)\])*(\((.*)\))*/g;
            let match = regex.exec(src);
            let ret = src.slice(0);
            while (match != null) {
                let includeFile = match[1];
                if (MB.ResourceShader.exist(includeFile)) {
                    let content = MB.ResourceShader.get(includeFile);
                    if (match[4]) {
                        let splits = match[5].split(",");
                        let sp;
                        for (let idx = 0, size = splits.length; idx < size; ++idx) {
                            sp = splits[idx].split("=");
                            content = content.replace(new RegExp(sp[0], "g"), sp[1]);
                        }
                    }
                    if (match[2]) {
                        let idxStr = match[3];
                        if (idxStr.indexOf("..") !== -1) {
                            let idxSplits = idxStr.split("..");
                            let min = parseInt(idxSplits[0]);
                            let max = parseInt(idxSplits[1]);
                            let srcContent = content.slice(0);
                            content = "";
                            if (isNaN(max)) {
                                max = min;
                            }
                            for (let i = min; i <= max; i++) {
                                content += srcContent.replace(/\{N\}/g, i + "") + "\n";
                            }
                        } else {
                            content = content.replace(/\{N\}/g, idxStr);
                        }
                    }
                    ret = ret.replace(match[0], this._processImports(content));
                } else {
                    // ...
                    ret = ret.replace(match[0], "FAIL");
                }
                match = regex.exec(src);
            }
            return ret;
        }

        /**
         * Compile shader from shader source.
         * @param {string} shaderSource Raw shader code.
         * @param {number} shaderType   Shader type.
         */
        private compileShader(shaderSource: string, shaderType: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            let compiledShader: WebGLShader;

            shaderSource = this._processImports(shaderSource);

            if (shaderType === gl.VERTEX_SHADER) {
                this._vertexSource = shaderSource;
            } else if (shaderType === gl.FRAGMENT_SHADER) {
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
                console.error("ERROR: " + gl.getShaderInfoLog(compiledShader));
                console.warn({
                    vertex: this._vertexSource,
                    fragment: this._fragmentSource
                });
                throw "SHADER ERROR";
            }
            return compiledShader;
        };
        /**
         * Active program.
         */
        public use() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.useProgram(this._handler);
        };
        /**
         * Destroy program.
         */
        public destroy() {
            const gl: WebGL2RenderingContext = this._context.gl;
            this._shaders.forEach((shader) => {
                gl.detachShader(this.compileShader, shader);
            });
            gl.deleteShader(this._handler);
        };
        /**
         * Send uniform float value.
         * @param {string} name  Uniform name.
         * @param {number} value Float value.
         */
        public sendUniform1f(name: string, value: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.uniform1f(this.uniformLocations[name], value);
        };
        /**
         * Send uniform integer value.
         * @param {string} name  Uniform name.
         * @param {number} value Integer value.
         */
        public sendUniform1i(name: string, value: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.uniform1i(this.uniformLocations[name], value);
        };
        /**
         * Send uniform boolean value.
         * @param {string} name  Uniform name.
         * @param {boolean} value Boolean value.
         */
        public sendUniform1b(name: string, value: boolean) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
        };
        /**
         * Send uniform unsigned integer value.
         * @param {string} name  Uniform name.
         * @param {number} value Unsigned integer value.
         */
        public sendUniform1u(name: string, value: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.uniform1ui(this.uniformLocations[name], value);
        };
        /**
         * Send two separated uniform floats value.
         * @param {string} name  Uniform name.
         * @param {number} x    First float value.
         * @param {number} y    Second float value.
         */
        public sendUniform2f(name: string, x: number, y: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.uniform2f(this.uniformLocations[name], x, y);
        };
        /**
         * Send three separated uniform floats value.
         * @param {string} name  Uniform name.
         * @param {number} x    First float value.
         * @param {number} y    Second float value.
         * @param {number} z    Third float value.
         */
        public sendUniform3f(name: string, x: number, y: number, z: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.uniform3f(this.uniformLocations[name], x, y, z);
        };
        /**
         * Send four separated uniform floats value.
         * @param {string} name  Uniform name.
         * @param {number} x    First float value.
         * @param {number} y    Second float value.
         * @param {number} z    Third float value.
         * @param {number} w    Fourth float value.
         */
        public sendUniform4f(name: string, x: number, y: number, z: number, w: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.uniform4f(this.uniformLocations[name], x, y, z, w);
        };
        /**
         * Send uniform vector of float with 2 values.
         * @param {string} name  Uniform name.
         * @param {Float32Array | MB.Vect2} value Vector of floats.
         */
        public sendUniformVec2(name: string, value: Float32Array | MB.Vect2) {
            const gl: WebGL2RenderingContext = this._context.gl;
            let val: Float32Array;
            if (value instanceof MB.Vect2) {
                val = (<MB.Vect2>value).value;
            } else {
                val = <Float32Array>value;
            }
            gl.uniform2fv(this.uniformLocations[name], val);
        };
        /**
         * Send uniform vector of float with 3 values.
         * @param {string} name  Uniform name.
         * @param {Float32Array | MB.Vect3} value Vector of floats.
         */
        public sendUniformVec3(name: string, value: Float32Array | MB.Vect3) {
            const gl: WebGL2RenderingContext = this._context.gl;
            let val: Float32Array;
            if (value instanceof MB.Vect3) {
                val = (<MB.Vect3>value).value;
            } else {
                val = <Float32Array>value;
            }
            gl.uniform3fv(this.uniformLocations[name], val);
        };
        /**
         * Send uniform vector of float with 4 values.
         * @param {string} name  Uniform name.
         * @param {Float32Array | MB.Vect4} value Vector of floats.
         */
        public sendUniformVec4(name: string, value: Float32Array | MB.Vect4) {
            const gl: WebGL2RenderingContext = this._context.gl;
            let val: Float32Array;
            if (value instanceof MB.Vect4) {
                val = (<MB.Vect4>value).value;
            } else {
                val = <Float32Array>value;
            }
            gl.uniform4fv(this.uniformLocations[name], val);
        };
        /**
         * Send uniform mat2.
         * @param {string} name  Uniform name.
         * @param {Float32Array | MB.Mat2} value mat2.
         * @param {boolean = false} transpose Transpose mat2.
         */
        public sendUniformMat2(name: string, value: Float32Array | MB.Mat2, transpose: boolean = false) {
            const gl: WebGL2RenderingContext = this._context.gl;
            let val: Float32Array;
            if (value instanceof MB.Mat2) {
                val = (<MB.Mat2>value)._value;
            } else {
                val = <Float32Array>value;
            }
            gl.uniformMatrix2fv(this.uniformLocations[name], transpose, val);
        };
        /**
         * Send uniform mat3.
         * @param {string} name  Uniform name.
         * @param {Float32Array | MB.Mat3} value mat3.
         * @param {boolean = false} transpose Transpose mat3.
         */
        public sendUniformMat3(name: string, value: Float32Array | MB.Mat3, transpose: boolean = false) {
            const gl: WebGL2RenderingContext = this._context.gl;
            let val: Float32Array;
            if (value instanceof MB.Mat3) {
                val = (<MB.Mat3>value)._value;
            } else {
                val = <Float32Array>value;
            }
            gl.uniformMatrix3fv(this.uniformLocations[name], transpose, val);
        };
        /**
         * Send uniform mat4.
         * @param {string} name  Uniform name.
         * @param {Float32Array | MB.Mat4} value mat4.
         * @param {boolean = false} transpose Transpose mat4.
         */
        public sendUniformMat4(name: string, value: Float32Array | MB.Mat4, transpose: boolean = false) {
            const gl: WebGL2RenderingContext = this._context.gl;
            let val: Float32Array;
            if (value instanceof MB.Mat4) {
                val = (<MB.Mat4>value)._value;
            } else {
                val = <Float32Array>value;
            }
            gl.uniformMatrix4fv(this.uniformLocations[name], transpose, val);
        };
        protected static GL_TO_GLSL_TYPES = {
            // WebGL1 constants
            "FLOAT": "float",
            "FLOAT_VEC2": "vec2",
            "FLOAT_VEC3": "vec3",
            "FLOAT_VEC4": "vec4",
            "INT": "int",
            "INT_VEC2": "ivec2",
            "INT_VEC3": "ivec3",
            "INT_VEC4": "ivec4",
            "BOOL": "bool",
            "BOOL_VEC2": "bvec2",
            "BOOL_VEC3": "bvec3",
            "BOOL_VEC4": "bvec4",
            "FLOAT_MAT2": "Mat2",
            "FLOAT_MAT3": "Mat3",
            "FLOAT_MAT4": "Mat4",
            "SAMPLER_2D": "sampler2D",
            "SAMPLER_CUBE": "samplerCube",

            // WebGL2 constants
            "FLOAT_MAT2x3": "Mat2x3",
            "FLOAT_MAT2x4": "Mat2x4",
            "FLOAT_MAT3x2": "Mat3x2",
            "FLOAT_MAT3x4": "Mat3x4",
            "FLOAT_MAT4x2": "Mat4x2",
            "FLOAT_MAT4x3": "Mat4x3",
            "UNSIGNED_INT": "uint",
            "UNSIGNED_INT_VEC2": "uvec2",
            "UNSIGNED_INT_VEC3": "uvec3",
            "UNSIGNED_INT_VEC4": "uvec4",
            "UNSIGNED_INT_SAMPLER_2D": "usampler2D",
            "UNSIGNED_INT_SAMPLER_3D": "usampler3D",
            "UNSIGNED_INT_SAMPLER_2D_ARRAY": "usampler2DArray",
            "UNSIGNED_INT_SAMPLER_CUBE": "usamplerCube",
            "INT_SAMPLER_2D": "isampler2D",
            "INT_SAMPLER_3D": "isampler3D",
            "INT_SAMPLER_2D_ARRAY": "isampler2DArray",
            "INT_SAMPLER_CUBE": "isamplerCube",
        };
        protected static GL_TABLE = null;
        /**
         * Return uniform or attribute human readable type.
         * @param  {WebGL2RenderingContext} gl   WebGLRenderingContext
         * @param  {number} type WebGL internal uniform/attribute type.
         * @return {string}
         */
        public static getType(gl: WebGL2RenderingContext, type: number): string {
            if (!Program.GL_TABLE) {
                let typeNames = Object.keys(Program.GL_TO_GLSL_TYPES);
                Program.GL_TABLE = {};
                for (let tn of typeNames) {
                    let cte = gl[tn];
                    if (typeof cte !== "undefined") {
                        Program.GL_TABLE[cte] = Program.GL_TO_GLSL_TYPES[tn];
                    }
                }
            }
            return Program.GL_TABLE[type];
        };
        public ubos: { [key: string]: VertexUBO; } = {};
        /**
         * Caches a list of ubos using array of any (name, id)
         * @param {Array<any>} attrs Array of string that contains ubos names
         */
        public addUbos(ubos: Array<any>) {
            for (let ubo in ubos) {
                ubo = ubos[ubo];
                this.ubos[ubo["name"]] = new VertexUBO(this._context, this, ubo["name"], ubo["id"]);
            }
        };
        /**
         * Autocatching all actives uniforms and attributes for program.
         */
        public autocatching() {
            const gl: WebGL2RenderingContext = this._context.gl;
            const numUBOS = gl.getProgramParameter(this._handler, gl.ACTIVE_UNIFORM_BLOCKS);
            let ubos: Array<any> = [];
            for (let i = 0; i < numUBOS; ++i) {
                const name = gl.getActiveUniformBlockName(this._handler, i);
                // const size = gl.getActiveUniformBlockParameter(this._handler, i, gl.UNIFORM_BLOCK_DATA_SIZE);
                ubos.push({
                    name: name,
                    id: i
                });
            }
            this.addUbos(ubos);
            const numUniforms = gl.getProgramParameter(this._handler, gl.ACTIVE_UNIFORMS);
            let unifs: Array<string> = [];
            for (let i = 0; i < numUniforms; ++i) {
                const info = gl.getActiveUniform(this._handler, i);
                if (info.size > 1) {
                    for (let j = 0; j < info.size; ++j) {
                        unifs.push(info.name.replace("[0]", `[${j}]`));
                    }
                } else {
                    unifs.push(info.name);
                }
            }
            this.addUniforms(unifs);
            const numAttributes = gl.getProgramParameter(this._handler, gl.ACTIVE_ATTRIBUTES);
            let attrs: Array<string> = [];
            for (let i = 0; i < numAttributes; ++i) {
                const info = gl.getActiveAttrib(this._handler, i);
                if (info) {
                    attrs.push(info.name);
                }
            }
            this.addAttributes(attrs);
        }
        /**
         * Return a object that contains active attributes and uniforms in program.
         * @return {ICachedUnifAttr}
         */
        public unifAndAttribs(): ICachedUnifAttr {
            let ret: ICachedUnifAttr = {
                "attributes": [],
                "uniforms": []
            };
            const gl: WebGL2RenderingContext = this._context.gl;
            const numUniforms = gl.getProgramParameter(this._handler, gl.ACTIVE_UNIFORMS);
            let result = [];
            for (let i = 0; i < numUniforms; ++i) {
                const info = gl.getActiveUniform(this._handler, i);
                const type = Program.getType(gl, info.type);
                if (info.size > 1) {
                    for (let j = 0; j < info.size; ++j) {
                        result.push({
                            name: info.name.replace("[0]", `[${j}]`),
                            type: type,
                            id: i
                        });
                    }
                } else {
                    ret.uniforms.push({
                        name: info.name,
                        type: type,
                        id: i
                    });
                }
            }
            const numAttributes = gl.getProgramParameter(this._handler, gl.ACTIVE_ATTRIBUTES);
            result = [];
            for (let i = 0; i < numAttributes; ++i) {
                const info = gl.getActiveAttrib(this._handler, i);
                if (info) {
                    ret.attributes.push({
                        name: info.name,
                        type: Program.getType(gl, info.type),
                        id: i
                    });
                }
            }
            return ret;
        };
        /**
         * Return if program is linked
         * @return {boolean}
         */
        public isLinked(): boolean {
            return this._isLinked;
        };
        /**
         * Attach transform feedback varying to this program.
         * Only call this before linking program.
         * @param {Array<string>} varyings Array of string that contains varying attributes.
         * @param {MB.ctes.TFMode}        mode     Transform Feedback mode (record mode).
         */
        public feedbackVarying(varyings: Array<string>, mode: MB.ctes.TFMode) {
            if (this._isLinked === true) {
                alert("ONLY EXEC THIS BEFORE LINK");
                return;
            }
            const gl: WebGL2RenderingContext = this._context.gl;
            if (!(gl instanceof WebGL2RenderingContext)) {
                alert("NEED WEBGL2 CONTEXT");
                return;
            }
            TransformFeedback.varyings(this._context, this, varyings, mode);
        };
        /**
         * Add a foo fragment shader.
         * Useful for transform feedback or shadow techniques.
         */
        public setFooFragment() {
            const gl: WebGL2RenderingContext = this._context.gl;
            if (gl instanceof WebGL2RenderingContext) {
                this.addShader(
                    `#version 300 es
                    precision highp float;
                    out vec4 fragColor;
                    void main() {
                        fragColor = vec4(1.0);
                    }`, MB.ctes.ShaderType.fragment,
                    MB.ctes.ReadMode.read_text);
            } else {
                this.addShader(
                    `
                    precision highp float;
                    void main() {
                        gl_FragColor = vec4(1.0);
                    }`, MB.ctes.ShaderType.fragment,
                    MB.ctes.ReadMode.read_text);
            }
        };
        // --enable-privileged-webgl-extension
        public debugShaders() {
            const ext = MB.Extensions.get(this._context, "WEBGL_debug_shaders");
            console.log({
                "vertex": ext.getTranslatedShaderSource(this._shaders[0]),
                "fragment": ext.getTranslatedShaderSource(this._shaders[1])
            });
        }
    };
};
