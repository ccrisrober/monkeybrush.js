/// <reference path="core.ts" />

"use strict";

enum mode {
    read_file,
    read_script,
    read_text
};

class ShaderProgram {
    
    private mCompiledShader: WebGLProgram;
    private shaders: Array<WebGLShader>;
    private fragmentShader: WebGLShader;

    public vertexSource : string;
    public fragmentSource : string;

    public uniformLocations : any = {};//Array<WebGLUniformLocation>;
    public attribLocations : any = {};//Array<number>;
    
    public addAttributes(attrs : Array<string>) {
        var gl = Core.getInstance().getGL();
        for(var attr in attrs) {
            attr = attrs[attr];
            var attrID = gl.getAttribLocation(this.mCompiledShader, attr);
            if(attrID < 0) {
                console.error(attr + " undefined");
                continue;
            }
            this.attribLocations[attr] = attrID;
        }
    }

    public addUniforms(unifs : Array<string>) {
        var gl = Core.getInstance().getGL();
        for(var unif in unifs) {
            unif = unifs[unif];
            var unifID : WebGLUniformLocation = gl.getUniformLocation(this.mCompiledShader, unif);
            if(unifID < 0) {
                console.error(unif + " undefined");
                continue;
            }
            this.uniformLocations[unif] = unifID;
        }
    }

    public program(): WebGLProgram {
        return this.mCompiledShader;
    }
    constructor() {
        this.shaders = [];
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
        this.shaders.push(shader);
    }
    public compile_and_link() : boolean {
        var gl = Core.getInstance().getGL();
        // Creamos y linkamos shaders
        this.mCompiledShader = gl.createProgram();
        for(var i = 0; i < this.shaders.length; i++) {
            gl.attachShader(this.mCompiledShader, this.shaders[i]);
        }
        gl.linkProgram(this.mCompiledShader);
        
        // Consultamos errores
        if(!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            alert("ERROR");
            console.warn("Error in program linking:" + gl.getProgramInfoLog(this.mCompiledShader));
            console.log(this.fragmentSource);
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
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        } "SHADER ERROR"
        
        return this.compileShader(shaderSource, shaderType);
    }
    
    private loadAndCompileFromText(shaderSource: string, shaderType: number) {
        if(shaderSource === null) {
            alert("WARNING: " + shaderSource + " failed");
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        }
        
        return this.compileShader(shaderSource, shaderType);
    }
    
    private loadAndCompile(id: string, shaderType: number) {
        var shaderText : HTMLElement, shaderSource : string;
        
        // Obtenemos el shader del index.html
        shaderText = document.getElementById(id);
        shaderSource = shaderText.firstChild.textContent;
        
        if(shaderSource === null) {
            alert("WARNING: " + id + " failed");
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        }
        
        return this.compileShader(shaderSource, shaderType);
    }
    
    private compileShader(shaderSource: string, shaderType: number) {
        var gl = Core.getInstance().getGL();
        var compiledShader : WebGLShader;

        if(shaderType == gl.VERTEX_SHADER) {
            this.vertexSource = shaderSource;
        } else if(shaderType == gl.FRAGMENT_SHADER) {
            this.fragmentSource = shaderSource;
        }
        
        // Creamos el shader
        compiledShader = gl.createShader(shaderType);
        
        // Compilamos el shader
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);
        
        // Consultamos si hay errores
        if(!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
            console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
            console.log(this.fragmentSource);
            throw "SHADER ERROR";
        }
        return compiledShader;
    }
    
    public use() {
        gl.useProgram(this.mCompiledShader);
    }

    public dispose() {
        /*this.shaders.forEach(function(s) {
            gl.detachShader(this.mCompiledShader, s);
        });
        gl.deleteShader(this.mCompiledShader);*/
    }
}