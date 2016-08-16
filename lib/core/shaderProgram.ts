/// <reference path="core.ts" />
"use strict";

enum mode {
    read_file,
    read_script,
    read_text
};

class ShaderProgram {
    constructor() {
        this._shaders = [];
    }
    
    private _compiledShader: WebGLProgram;
    private _shaders: Array<WebGLShader>;

    public _vertexSource : string;
    public _fragmentSource : string;

    public uniformLocations : { [key:string] : WebGLUniformLocation; } = {};
    public attribLocations : { [key:string] : number; } = {};
    
    //public addAttributes(..attrs: string) {
    
    public addAttributes(attrs : Array<string>) {
        var gl = Core.getInstance().getGL();
        for(var attr in attrs) {
            attr = attrs[attr];
            var attrID = gl.getAttribLocation(this._compiledShader, attr);
            if(attrID < 0) {
                console.error(attr + " undefined");
                continue;
            }
            this.attribLocations[attr] = attrID;
        }
    }

    //public addUniforms(..attrs: string) {

    public addUniforms(unifs : Array<string>) {
        var gl = Core.getInstance().getGL();
        for(var unif in unifs) {
            unif = unifs[unif];
            var unifID : WebGLUniformLocation = gl.getUniformLocation(this._compiledShader, unif);
            if(unifID < 0) {
                console.error(unif + " undefined");
                continue;
            }
            this.uniformLocations[unif] = unifID;
        }
    }

    public program(): WebGLProgram {
        return this._compiledShader;
    }
    
    public addShader(shader_: string, type: number, _mode: mode) {
        var shader: WebGLShader;
        if(_mode == mode.read_file) {
            shader = this.loadAndCompileWithFile(shader_, type);
        } else if (_mode == mode.read_script) {
            shader = this.loadAndCompile(shader_, type);
        } else if(_mode == mode.read_text) {
            shader = this.loadAndCompileFromText(shader_, type);
        }
        this._shaders.push(shader);
    }
    
    public compile() : boolean {
        var gl = Core.getInstance().getGL();
        // Create and compile shader
        this._compiledShader = gl.createProgram();
        for(var i = 0; i < this._shaders.length; i++) {
            gl.attachShader(this._compiledShader, this._shaders[i]);
        }
        gl.linkProgram(this._compiledShader);
        
        // Checkin errors
        if(!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
            alert("ERROR");
            console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        return true;
    }
    
    private loadAndCompileWithFile(filePath: string, shaderType: number) {
        var request  : XMLHttpRequest = new XMLHttpRequest();
        request.open("GET", filePath, false);
        try {
            request.send();
        } catch(err) {
            alert("ERROR: " + filePath);
            console.log("ERROR: " + filePath);
            return null;
        }
        var shaderSource : string = request.responseText;
        if(shaderSource === null) {
            alert("WARNING: " + filePath + " failed");
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        
        return this.compileShader(shaderSource, shaderType);
    }
    
    private loadAndCompileFromText(shaderSource: string, shaderType: number) {
        if(shaderSource === null) {
            alert("WARNING: " + shaderSource + " failed");
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        
        return this.compileShader(shaderSource, shaderType);
    }
    
    private loadAndCompile(id: string, shaderType: number) {
        var shaderText : HTMLElement, shaderSource : string;
        
        // Get shader from index.html
        shaderText = document.getElementById(id);
        shaderSource = shaderText.firstChild.textContent;
        
        if(shaderSource === null) {
            alert("WARNING: " + id + " failed");
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        
        return this.compileShader(shaderSource, shaderType);
    }
    
    private compileShader(shaderSource: string, shaderType: number) {
        var gl = Core.getInstance().getGL();
        var compiledShader : WebGLShader;

        if(shaderType == gl.VERTEX_SHADER) {
            this._vertexSource = shaderSource;
        } else if(shaderType == gl.FRAGMENT_SHADER) {
            this._fragmentSource = shaderSource;
        }
        
        // Create shader
        compiledShader = gl.createShader(shaderType);
        
        // Compilate shader
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);
        
        // Check errors
        if(!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
            console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
            console.log(this._fragmentSource);
            throw "SHADER ERROR";
        }
        return compiledShader;
    }
    
    public use() {
        var gl = Core.getInstance().getGL();
        gl.useProgram(this._compiledShader);
    }

    public destroy() {
        var gl = Core.getInstance().getGL();
        this._shaders.forEach((shader) => {
            gl.detachShader(this.compileShader, shader);
        });
        gl.deleteShader(this._compiledShader);
    }

    public getPropSetter(path, location, type) {
        // Check primitive types
        switch(type) {
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
            var dims = type.substring(type.length - 3)
            return 'gl.uniformMatrix' + dims + 'fv(location, Boolean(transposed), value)'
        }

        // Checksimple type
        var vecIdx = type.indexOf('vec');
        var count = parseInt(type.charAt(type.length - 1), 10) || -1;

        if ((vecIdx === 0 || vecIdx === 1) && (count >= 1 && count <= 4)) {
            var vtype = type.charAt('0')
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

        var matIdx = type.indexOf('mat');
        count = parseInt(type.charAt(type.length - 1), 10) || -1;
        console.log(count);
        
        if ((matIdx === 0 || matIdx === 1) && (count >= 2 && count <= 4)) {
            return 'gl.uniformMatrix' + count + 'fv(location, Boolean(transposed), value)';
        }
        throw new Error('unrecognized uniform type ' + type + ' for ' + path);
    }

    public sendUniform(uniform, type) {
        var path = uniform;
        var location = this.uniformLocations[path];
        var setter = this.getPropSetter(path, location, type);
        
        var srcfn = `
        return function uniformGetSet (value, transposed) {
            transposed = typeof transposed !== 'undefined' ? transposed : false;
            location = prog.uniformLocations[name];
                if (!location) {
                    prog.addUniforms([name]);
                    location = prog.uniformLocations[name];
                }
                if (location) {
                    ${setter}
                    console.log("SENDED");
                } else {
                    console.error("ERROR");
                }
        }`;

        var generated = new Function('prog', 'gl', 'name', 'location', srcfn);
        var gl = Core.getInstance().getGL();
        return generated(this, gl, uniform, location);
    }
}