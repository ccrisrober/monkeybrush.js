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


/// <reference path="Core.ts" />
/// <reference path="../constants/ProgramCte.ts" />

import { Core } from "./Core";
import { ProgramCte } from "../constants/ProgramCte";
import { Vect2 } from "../maths/Vect2";
import { Vect3 } from "../maths/Vect3";
import { Vect4 } from "../maths/Vect4";
import { Mat2 } from "../maths/Mat2";
import { Mat3 } from "../maths/Mat3";
import { Mat4 } from "../maths/Mat4";

"use strict";

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
    }
    private _compiledShader: WebGLProgram;
    private _shaders: Array<WebGLShader>;

    public _vertexSource: string;
    public _fragmentSource: string;

    public uniformLocations: { [key: string]: WebGLUniformLocation; } = {};
    public attribLocations: { [key: string]: number; } = {};

    /**
     * [addAttributesArgs description]
     * @param {string[]} ...attrs [description]
     */
    public addAttributesArgs(...attrs: string[]) {
        this.addAttributes(attrs);
    }
    /**
     * [addAttributes description]
     * @param {Array<string>} attrs [description]
     */
    public addAttributes(attrs: Array<string>) {
        const gl = Core.getInstance().getGL();
        for (let attr in attrs) {
            attr = attrs[attr];
            const attrID = gl.getAttribLocation(this._compiledShader, attr);
            if (attrID < 0) {
                console.error(attr + " undefined");
                continue;
            }
            this.attribLocations[attr] = attrID;
        }
    }
    /**
     * [addUniformsArgs description]
     * @param {string[]} ...unifs [description]
     */
    public addUniformsArgs(...unifs: string[]) {
        this.addUniforms(unifs);
    }
    /**
     * [addUniforms description]
     * @param {Array<string>} unifs [description]
     */
    public addUniforms(unifs: Array<string>) {
        const gl = Core.getInstance().getGL();
        for (let unif in unifs) {
            unif = unifs[unif];
            const unifID: WebGLUniformLocation = gl.getUniformLocation(this._compiledShader, unif);
            if (unifID < 0) {
                console.error(unif + " undefined");
                continue;
            }
            this.uniformLocations[unif] = unifID;
        }
    }
    /**
     * [id description]
     * @return {WebGLProgram} [description]
     */
    public id(): WebGLProgram {
        return this._compiledShader;
    }
    /**
     * [addShader description]
     * @param {string}                 shader_ [description]
     * @param {ProgramCte.shader_type} type    [description]
     * @param {ProgramCte.mode}        _mode   [description]
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
    }

    public _compile() {
        const gl = Core.getInstance().getGL();
        // Create and compile shader
        this._compiledShader = gl.createProgram();
        for (let i = 0; i < this._shaders.length; ++i) {
            gl.attachShader(this._compiledShader, this._shaders[i]);
        }
    }

    public _link(): boolean {
        const gl = Core.getInstance().getGL();
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
        return true;
    }

    /**
     * Compile and link Program
     * @return {boolean}: True if not errors
     */
    public compile(): boolean {
        const gl = Core.getInstance().getGL();
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
        return true;
    }
    /**
     * @param {string}
     * @param {number}
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
    }
    /**
     * @param {string}
     * @param {number}
     */
    private loadAndCompileFromText(shaderSource: string, shaderType: number) {
        if (shaderSource === null) {
            alert("WARNING: " + shaderSource + " failed");
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }

        return this.compileShader(shaderSource, shaderType);
    }
    /**
     * @param {string}
     * @param {number}
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
    }
    /**
     * @param {string}
     * @param {number}
     */
    private compileShader(shaderSource: string, shaderType: number) {
        const gl = Core.getInstance().getGL();
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
    }
    /**
     *
     */
    public use() {
        const gl = Core.getInstance().getGL();
        gl.useProgram(this._compiledShader);
    }
    /**
     *
     */
    public destroy() {
        const gl = Core.getInstance().getGL();
        this._shaders.forEach((shader) => {
            gl.detachShader(this.compileShader, shader);
        });
        gl.deleteShader(this._compiledShader);
    }

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
     * [sendUniform1f description]
     * @param {string} name  [description]
     * @param {number} value [description]
     */
    public sendUniform1f(name: string, value: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform1f(this.uniformLocations[name], value);
    }
    /**
     * [sendUniform1i description]
     * @param {string} name  [description]
     * @param {number} value [description]
     */
    public sendUniform1i(name: string, value: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value);
    }
    /**
     * [sendUniform1b description]
     * @param {string}  name  [description]
     * @param {boolean} value [description]
     */
    public sendUniform1b(name: string, value: boolean) {
        const gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
    }
    /**
     * [sendUniform1u description]
     * @param {string} name  [description]
     * @param {number} value [description]
     */
    public sendUniform1u(name: string, value: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform1ui(this.uniformLocations[name], value);
    }
    /**
     * [sendUniform2f description]
     * @param {string} name [description]
     * @param {number} x    [description]
     * @param {number} y    [description]
     */
    public sendUniform2f(name: string, x: number, y: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform2f(this.uniformLocations[name], x, y);
    }
    /**
     * [sendUniform3f description]
     * @param {string} name [description]
     * @param {number} x    [description]
     * @param {number} y    [description]
     * @param {number} z    [description]
     */
    public sendUniform3f(name: string, x: number, y: number, z: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform3f(this.uniformLocations[name], x, y, z);
    }
    /**
     * [sendUniform4f description]
     * @param {string} name [description]
     * @param {number} x    [description]
     * @param {number} y    [description]
     * @param {number} z    [description]
     * @param {number} w    [description]
     */
    public sendUniform4f(name: string, x: number, y: number, z: number, w: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform4f(this.uniformLocations[name], x, y, z, w);
    }
    /**
     * [sendUniformVec2 description]
     * @param {string}          name [description]
     * @param {Float32Array |    Vect2}       value [description]
     */
    public sendUniformVec2(name: string, value: Float32Array | Vect2) {
        const gl = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Vect2) {
            val = (<Vect2>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniform3fv(this.uniformLocations[name], val);
    }
    /**
     * [sendUniformVec3 description]
     * @param {string}          name [description]
     * @param {Float32Array |    Vect3}       value [description]
     */
    public sendUniformVec3(name: string, value: Float32Array | Vect3) {
        const gl = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Vect3) {
            val = (<Vect3>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniform3fv(this.uniformLocations[name], val);
    }
    /**
     * [sendUniformVec4 description]
     * @param {string}          name [description]
     * @param {Float32Array |    Vect4}       value [description]
     */
    public sendUniformVec4(name: string, value: Float32Array | Vect4) {
        const gl = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Vect4) {
            val = (<Vect4>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniform3fv(this.uniformLocations[name], val);
    }
    /**
     * [sendUniformMat2 description]
     * @param {string}          name [description]
     * @param {Float32Array |    Mat2}        value     [description]
     * @param {boolean      =    false}       transpose [description]
     */
    public sendUniformMat2(name: string, value: Float32Array | Mat2, transpose: boolean = false) {
        const gl = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Mat2) {
            val = (<Mat2>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniformMatrix2fv(this.uniformLocations[name], transpose, val);
    }
    /**
     * [sendUniformMat3 description]
     * @param {string}          name [description]
     * @param {Float32Array |    Mat3}        value     [description]
     * @param {boolean      =    false}       transpose [description]
     */
    public sendUniformMat3(name: string, value: Float32Array | Mat3, transpose: boolean = false) {
        const gl = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Mat3) {
            val = (<Mat3>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniformMatrix3fv(this.uniformLocations[name], transpose, val);
    }
    /**
     * [sendUniformMat4 description]
     * @param {string}          name [description]
     * @param {Float32Array |    Mat4}        value     [description]
     * @param {boolean      =    false}       transpose [description]
     */
    public sendUniformMat4(name: string, value: Float32Array | Mat4, transpose: boolean = false) {
        const gl = Core.getInstance().getGL();
        let val: Float32Array;
        if (value instanceof Mat4) {
            val = (<Mat4>value)._value;
        } else {
            val = <Float32Array>value;
        }
        gl.uniformMatrix4fv(this.uniformLocations[name], transpose, val);
    }


    protected static GL_TO_GLSL_TYPES = {
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
    protected static getType(gl, type) {
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
    }

    public unifAndAttribs() {
        const gl = Core.getInstance().getGL();
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
                result.push({
                    name: info.name,
                    type: type,
                    id: i
                });
            }
        }
        console.log(result);
        console.log("ATTRIBUTES");
        const numAttributes = gl.getProgramParameter(this._compiledShader, gl.ACTIVE_ATTRIBUTES);
        result = [];
        for (let i = 0; i < numAttributes; ++i) {
            const info = gl.getActiveAttrib(this._compiledShader, i);
            if (info) {
                result.push({
                    name: info.name,
                    type: Program.getType(gl, info.type),
                    id: i
                });
            }
        }
        console.log(result);
    };
};

export { Program };
