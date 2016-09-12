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


import { Core } from "./Core";
import { Vect2 } from "../maths/Vect2";
import { Vect3 } from "../maths/Vect3";
import { Vect4 } from "../maths/Vect4";
import { Mat2 } from "../maths/Mat2";
import { Mat3 } from "../maths/Mat3";
import { Mat4 } from "../maths/Mat4";
import { TransformFeedback } from "./TransformFeedback";

import { ProgramCte, TFMode } from "../constants/Constants";

"use strict";

declare var WebGL2RenderingContext: any;

interface IAttr {
    name: string;
    id: number;
    type: string;
};
interface IUnif {
    name: string;
    id: number;
    type: string;
};

interface ICachedUnifAttr {
    attributes: Array<IAttr>;
    uniforms: Array<IUnif>;
};

/**
 * Program class
 * @class Program
 */
class Program {
    /**
     * Program constructor
     */
    constructor() {
        this._shaders = [];
        this._isLinked = false;
    };
    private _compiledShader: WebGLProgram;
    private _shaders: Array<WebGLShader>;
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

    public uniformLocations: { [key: string]: WebGLUniformLocation; } = {};
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
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        for (let attr in attrs) {
            attr = attrs[attr];
            const attrID = gl.getAttribLocation(this._compiledShader, attr);
            if (attrID < 0) {
                console.error(attr + " undefined");
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
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        for (let unif in unifs) {
            unif = unifs[unif];
            const unifID: WebGLUniformLocation = gl.getUniformLocation(this._compiledShader, unif);
            if (unifID < 0) {
                console.error(unif + " undefined");
                continue;
            }
            this.uniformLocations[unif] = unifID;
        }
    };
    /**
     * Return internal program identifier
     * @return {WebGLProgram} [description]
     */
    public id(): WebGLProgram {
        return this._compiledShader;
    };
    /**
     * Attach a new shader to this program.
     * @param {string}                 shader_ String that contains file route, script id or raw shader code.
     * @param {ProgramCte.shader_type} type    Shader type (Vertex or Fragment).
     * @param {ProgramCte.mode}        _mode   Shader read mode (from file, from script or raw mode).
     */
    public addShader(shader_: string, type: ProgramCte.shader_type, _mode: ProgramCte.mode) {
        let shader: WebGLShader;
        if (type < 0) {
            throw new Error("SHADER TYPE UNDEFINED");
        }
        if (_mode === ProgramCte.mode.read_file) {
            shader = this.loadAndCompileWithFile(shader_, type);
        } else if (_mode === ProgramCte.mode.read_script) {
            shader = this.loadAndCompile(shader_, type);
        } else if (_mode === ProgramCte.mode.read_text) {
            shader = this.loadAndCompileFromText(shader_, type);
        }
        this._shaders.push(shader);
    };
    /**
     * Create shader program and attach vertex and fragment shader.
     */
    public _compile() {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        // Create and compile shader
        this._compiledShader = gl.createProgram();
        for (let i = 0; i < this._shaders.length; ++i) {
            gl.attachShader(this._compiledShader, this._shaders[i]);
        }
    };
    /**
     * Link program to current WebGLRenderingContext.
     * @return {boolean} True if linked correctly. False otherwise.
     */
    public _link(): boolean {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.linkProgram(this._compiledShader);

        // Checkin errors
        if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
            alert("ERROR");
            console.warn("Error in Program linking:" + gl.getProgramInfoLog(this._compiledShader));
            console.log({
                vertex: this._vertexSource,
                fragment: this._fragmentSource
            });
            throw "SHADER ERROR";
        }
        this._isLinked = true;
        return true;
    };
    /**
     * Compile and link program
     * @return {boolean}: True if not errors
     */
    public compile(): boolean {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        // Create and compile shader
        this._compiledShader = gl.createProgram();
        for (let i = 0; i < this._shaders.length; ++i) {
            gl.attachShader(this._compiledShader, this._shaders[i]);
        }
        gl.linkProgram(this._compiledShader);

        // Checkin errors
        if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
            alert("ERROR");
            console.warn("Error in Program linking:" + gl.getProgramInfoLog(this._compiledShader));
            console.log({
                vertex: this._vertexSource,
                fragment: this._fragmentSource
            });
            throw "SHADER ERROR";
        }
        this._isLinked = true;
        return true;
    };
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
            console.log("ERROR: " + filePath);
            return null;
        }
        let shaderSource: string = request.responseText;
        if (shaderSource === null) {
            alert("WARNING: " + filePath + " failed");
            console.log(this._fragmentSource);
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
            console.log(this._fragmentSource);
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
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }

        return this.compileShader(shaderSource, shaderType);
    };
    /**
     * Compile shader from shader source.
     * @param {string} shaderSource Raw shader code.
     * @param {number} shaderType   Shader type.
     */
    private compileShader(shaderSource: string, shaderType: number) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        let compiledShader: WebGLShader;

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
     * Active program.
     */
    public use() {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.useProgram(this._compiledShader);
    };
    /**
     * Destroy program.
     */
    public destroy() {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        this._shaders.forEach((shader) => {
            gl.detachShader(this.compileShader, shader);
        });
        gl.deleteShader(this._compiledShader);
    };
    /**
     * Send uniform float value.
     * @param {string} name  Uniform name.
     * @param {number} value Float value.
     */
    public sendUniform1f(name: string, value: number) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.uniform1f(this.uniformLocations[name], value);
    };
    /**
     * Send uniform integer value.
     * @param {string} name  Uniform name.
     * @param {number} value Integer value.
     */
    public sendUniform1i(name: string, value: number) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value);
    };
    /**
     * Send uniform boolean value.
     * @param {string} name  Uniform name.
     * @param {boolean} value Boolean value.
     */
    public sendUniform1b(name: string, value: boolean) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
    };
    /**
     * Send uniform unsigned integer value.
     * @param {string} name  Uniform name.
     * @param {number} value Unsigned integer value.
     */
    public sendUniform1u(name: string, value: number) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.uniform1ui(this.uniformLocations[name], value);
    };
    /**
     * Send two separated uniform floats value.
     * @param {string} name  Uniform name.
     * @param {number} x    First float value.
     * @param {number} y    Second float value.
     */
    public sendUniform2f(name: string, x: number, y: number) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
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
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
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
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        gl.uniform4f(this.uniformLocations[name], x, y, z, w);
    };
    /**
     * Send uniform vector of float with 2 values.
     * @param {string} name  Uniform name.
     * @param {Float32Array | Vect2} value Vector of floats.
     */
    public sendUniformVec2(name: string, value: Float32Array | Vect2) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Vect2) {
            val = (<Vect2>value).value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniform3fv(this.uniformLocations[name], val);
    };
    /**
     * Send uniform vector of float with 3 values.
     * @param {string} name  Uniform name.
     * @param {Float32Array | Vect3} value Vector of floats.
     */
    public sendUniformVec3(name: string, value: Float32Array | Vect3) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Vect3) {
            val = (<Vect3>value).value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniform3fv(this.uniformLocations[name], val);
    };
    /**
     * Send uniform vector of float with 4 values.
     * @param {string} name  Uniform name.
     * @param {Float32Array | Vect4} value Vector of floats.
     */
    public sendUniformVec4(name: string, value: Float32Array | Vect4) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Vect4) {
            val = (<Vect4>value).value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniform3fv(this.uniformLocations[name], val);
    };
    /**
     * Send uniform mat2.
     * @param {string} name  Uniform name.
     * @param {Float32Array | Mat2} value mat2.
     * @param {boolean = false} transpose Transpose mat2.
     */
    public sendUniformMat2(name: string, value: Float32Array | Mat2, transpose: boolean = false) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Mat2) {
            val = (<Mat2>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniformMatrix2fv(this.uniformLocations[name], transpose, val);
    };
    /**
     * Send uniform mat3.
     * @param {string} name  Uniform name.
     * @param {Float32Array | Mat3} value mat3.
     * @param {boolean = false} transpose Transpose mat3.
     */
    public sendUniformMat3(name: string, value: Float32Array | Mat3, transpose: boolean = false) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Mat3) {
            val = (<Mat3>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniformMatrix3fv(this.uniformLocations[name], transpose, val);
    };
    /**
     * Send uniform mat4.
     * @param {string} name  Uniform name.
     * @param {Float32Array | Mat4} value mat4.
     * @param {boolean = false} transpose Transpose mat4.
     */
    public sendUniformMat4(name: string, value: Float32Array | Mat4, transpose: boolean = false) {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Mat4) {
            val = (<Mat4>value)._value;
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
    protected static getType(gl: WebGL2RenderingContext, type: number): string {
        if (!Program.GL_TABLE) {
            let typeNames = Object.keys(Program.GL_TO_GLSL_TYPES);
            Program.GL_TABLE = {};
            for (let tn of typeNames) {
                let cte = gl[tn];
                if (typeof cte !== "undefined") {
                    Program.GL_TABLE[cte] = Program.GL_TO_GLSL_TYPES[tn];
                }
            }
            console.log(Program.GL_TABLE);
        }
        return Program.GL_TABLE[type];
    };
    /**
     * Return a object that contains active attributes and uniforms in program.
     * @return {ICachedUnifAttr}
     */
    public unifAndAttribs(): ICachedUnifAttr {
        let ret: ICachedUnifAttr = {
            "attributes": [],
            "uniforms": []
        }
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        console.log("UNIFORMS");
        const numUniforms = gl.getProgramParameter(this._compiledShader, gl.ACTIVE_UNIFORMS);
        let result = [];
        for (let i = 0; i < numUniforms; ++i) {
            const info = gl.getActiveUniform(this._compiledShader, i);
            console.log(info);
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
        console.log(ret.uniforms);
        console.log("ATTRIBUTES");
        const numAttributes = gl.getProgramParameter(this._compiledShader, gl.ACTIVE_ATTRIBUTES);
        result = [];
        for (let i = 0; i < numAttributes; ++i) {
            const info = gl.getActiveAttrib(this._compiledShader, i);
            if (info) {
                ret.attributes.push({
                    name: info.name,
                    type: Program.getType(gl, info.type),
                    id: i
                });
            }
        }
        console.log(ret.attributes);
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
     * @param {TFMode}        mode     Transform Feedback mode (record mode).
     */
    public feedbackVarying(varyings: Array<string>, mode: TFMode) {
        if (this._isLinked === true) {
            alert("ONLY EXEC THIS BEFORE LINK");
            return;
        }
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        if (!(gl instanceof WebGL2RenderingContext)) {
            alert("NEED WEBGL2 CONTEXT");
            return;
        }
        TransformFeedback.varyings(this, varyings, mode);
    };
    /**
     * Add a foo fragment shader.
     * Useful for transform feedback or shadow techniques.
     */
    public setFooFragment() {
        const gl: WebGL2RenderingContext = Core.getInstance().getGL();
        if (gl instanceof WebGL2RenderingContext) {
            this.addShader(
                `#version 300 es
                out vec4 fragColor;
                void main() {
                    fragColor = vec4(0.0, 0.0, 0.0, 1.0);
                }`, ProgramCte.shader_type.fragment,
                ProgramCte.mode.read_text);
        } else {
            this.addShader(
                `void main() {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                }`, ProgramCte.shader_type.fragment,
                ProgramCte.mode.read_text);
        }
    };
};

export { Program };
