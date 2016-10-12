namespace MBS {
    export type UniformType = "f"|"i"|"u"|"b"|"v2"|"v3"|"v4"|"m2"|"m3"|"m4";
    export interface IUniformMaterial {
        type: UniformType;
        value?: any;
    };
    export interface ShaderMaterialParams {
        uniforms: { [key: string]: MBS.IUniformMaterial; };
        vertexShader: string;
        fragmentShader: string;
    };
    export class ShaderMaterial extends MBS.Material {
        protected _uniforms: { [key: string]: MBS.Uniform; } = {};
        protected _program: MB.Program;
        protected _context: MB.GLContext;
        constructor(context: MB.GLContext, params: MBS.ShaderMaterialParams) {
            super();

            function diff2(o1, o2): { [key: string]: MBS.IUniformMaterial; } {
                let res: { [key: string]: MBS.IUniformMaterial; } = {};
                for (let key in o1) {
                    console.log(key);
                    if (o2.hasOwnProperty(key)) {
                        res[key] = o2[key];
                    }
                }
                return res;
            }

            this._context = context;
            this._program = new MB.Program(this._context);
            this._program.loadsFromScript(params.vertexShader, params.fragmentShader);

            let unifs = diff2(this._program.uniformLocations, params.uniforms);
            console.log(unifs);

            this._uniforms = {};
            let aux: MBS.IUniformMaterial;
            for (let key in unifs) {
                aux = unifs[key];
                this._uniforms[key] = new MBS.Uniform(aux.type, aux.value);
            }
        };
        get uniforms(): { [key: string]: MBS.IUniformMaterial; } {
            return this._uniforms;
        };
        public use() {
            this._program.use();
            let uniform: Uniform;
            for (let key in this._uniforms) {
                uniform = this._uniforms[key];
                if (!uniform.isDirty) continue;
                if (uniform.type === "f") {
                    this._program.sendUniform1f(key, <number>uniform.value);
                } else if (uniform.type === "i") {
                    this._program.sendUniform1i(key, <number>uniform.value);
                } else if (uniform.type === "b") {
                    this._program.sendUniform1b(key, <boolean>uniform.value);
                } else if (uniform.type === "u") {
                    this._program.sendUniform1u(key, <number>uniform.value);
                } else if (uniform.type === "m2") {
                    this._program.sendUniformMat2(key, <Float32Array>uniform.value);
                } else if (uniform.type === "m3") {
                    this._program.sendUniformMat3(key, <Float32Array>uniform.value);
                } else if (uniform.type === "m4") {
                    this._program.sendUniformMat4(key, <Float32Array>uniform.value);
                } else if (uniform.type === "v2") {
                    this._program.sendUniformVec2(key, <Float32Array>uniform.value);
                } else if (uniform.type === "v3") {
                    this._program.sendUniformVec3(key, <Float32Array>uniform.value);
                } else if (uniform.type === "v4") {
                    this._program.sendUniformVec4(key, <Float32Array>uniform.value);
                }
                uniform.isDirty = false;
            }
        }
    };
}
