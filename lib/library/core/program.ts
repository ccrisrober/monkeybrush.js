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


/// <reference path="core.ts" />
/// <reference path="../constants/ProgramCte.ts" />

import Core from "./core";
import ProgramCte from "../constants/ProgramCte";

"use strict";

/**
 * Program class
 * @class Program
 */
class Program {
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
     * @param {string[]}
     */
    public addAttributesArgs(...attrs: string[]) {
        this.addAttributes(attrs);
    }
    /**
     * @param {Array<string>}
     */
    public addAttributes(attrs: Array<string>) {
        const gl = Core.getInstance().getGL();
        for (let attr in attrs) {
            attr = attrs[attr];
            let attrID = gl.getAttribLocation(this._compiledShader, attr);
            if (attrID < 0) {
                console.error(attr + " undefined");
                continue;
            }
            this.attribLocations[attr] = attrID;
        }
    }
    /**
     * @param {string[]}
     */
    public addUniformsArgs(...unifs: string[]) {
        this.addUniforms(unifs);
    }
    /**
     * @param {Array<string>}
     */
    public addUniforms(unifs: Array<string>) {
        const gl = Core.getInstance().getGL();
        for (let unif in unifs) {
            unif = unifs[unif];
            let unifID: WebGLUniformLocation = gl.getUniformLocation(this._compiledShader, unif);
            if (unifID < 0) {
                console.error(unif + " undefined");
                continue;
            }
            this.uniformLocations[unif] = unifID;
        }
    }
    /**
     * @return {WebGLProgram}
     */
    public program(): WebGLProgram {
        return this._compiledShader;
    }
    /**
     * @param {string}
     * @param {shader_type}
     * @param {mode}
     */
    public addShader(shader_: string, /*type: number*/ st: ProgramCte.shader_type, _mode: ProgramCte.mode) {
        const gl = Core.getInstance().getGL();

        let shader: WebGLShader;

        let type: number = -1;
        if (st === ProgramCte.shader_type.vertex) {
            type = gl.VERTEX_SHADER;
        } else if (st === ProgramCte.shader_type.fragment) {
            type = gl.FRAGMENT_SHADER;
        }
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
            console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
            console.log({
                vertex: this._vertexSource,
                fragment: this._fragmentSource
            });
            throw "SHADER ERROR";
        }
        return true;
    }

    /**
     * Compile and link program
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
            console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
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
     * @param {string}
     * @param {number}
     */
    public sendUniform1f(name: string, value: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform1f(this.uniformLocations[name], value);
    }
    /**
     * @param {string}
     * @param {number}
     */
    public sendUniform1i(name: string, value: number) {
        const gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value);
    }
    /**
     * @param {string}
     * @param {boolean}
     */
    public sendUniform1b(name: string, value: boolean) {
        const gl = Core.getInstance().getGL();
        gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
    }
    /**
     * @param {string}
     * @param {Float32Array}
     */
    public sendUniformVec3(name: string, value: Float32Array) {
        const gl = Core.getInstance().getGL();
        gl.uniform3fv(this.uniformLocations[name], value);
    }
    /**
     * @param {string}
     * @param {Float32Array}
     * @param {boolean   = false}
     */
    public sendUniformMat4(name: string, value: Float32Array, transpose: boolean = false) {
        const gl = Core.getInstance().getGL();
        gl.uniformMatrix4fv(this.uniformLocations[name], transpose, value);
    }
};

export default Program;
