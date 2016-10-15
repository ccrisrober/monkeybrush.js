namespace MB {
    // export type UniformType = "f"|"i"|"u"|"b"|"v2"|"v3"|"v4"|"m2"|"m3"|"m4";
    export enum UniformType {
        Float,
        Integer,
        Unsigned,
        Boolean,
        Vector2,
        Vector3,
        Vector4,
        Matrix2,
        Matrix3,
        Matrix4
    };
    export interface IUniformMaterial {
        type: UniformType;
        value?: any;
    };
    export interface ShaderMaterialParams {
        name: string,
        uniforms?: { [key: string]: MB.IUniformMaterial; };
        vertexShader: string;
        fragmentShader: string;
    };
    export class ShaderMaterial extends MB.Material {
        protected _uniforms: { [key: string]: MB.Uniform; } = {};
        protected _program: MB.Program;
        protected _context: MB.GLContext;
        constructor(context: MB.GLContext, params: MB.ShaderMaterialParams) {
            super();

            function diff2(o1, o2): { [key: string]: MB.IUniformMaterial; } {
                let res: { [key: string]: MB.IUniformMaterial; } = {};
                for (let key in o1) {
                    if (o2.hasOwnProperty(key)) {
                        res[key] = o2[key];
                    }
                }
                return res;
            }

            this.id = params.name || "";
            this._context = context;
            this._program = new MB.Program(this._context);
            this._program.loadsFromScript(params.vertexShader, params.fragmentShader);

            MB.ProgramManager.add(this.id, this._program);

            let unifs = diff2(this._program.uniformLocations, params.uniforms);

            this._uniforms = {};
            let aux: MB.IUniformMaterial;
            for (let key in unifs) {
                aux = unifs[key];
                this._uniforms[key] = new MB.Uniform(aux.type, aux.value);
            }
        };
        get uniforms(): { [key: string]: MB.IUniformMaterial; } {
            return this._uniforms;
        };
        public render(model: MB.Drawable) {
            this.use();
            model.render();
        };
        public render2(model: MB.Drawable) {
            this.use();
            model.render2();
        };
        public render3(model: MB.Drawable) {
            this.use();
            model.render3();
        };
        public use() {
            this._program.use();
            let uniform: Uniform;
            for (let key in this._uniforms) {
                uniform = this._uniforms[key];
                if (!uniform.isDirty) continue;
                if (uniform.type === MB.UniformType.Float) {
                    this._program.sendUniform1f(key, <number>uniform.value);
                } else if (uniform.type === MB.UniformType.Integer) {
                    this._program.sendUniform1i(key, <number>uniform.value);
                } else if (uniform.type === MB.UniformType.Boolean) {
                    this._program.sendUniform1b(key, <boolean>uniform.value);
                } else if (uniform.type === MB.UniformType.Unsigned) {
                    this._program.sendUniform1u(key, <number>uniform.value);
                } else if (uniform.type === MB.UniformType.Matrix2) {
                    this._program.sendUniformMat2(key, <Float32Array>uniform.value);
                } else if (uniform.type === MB.UniformType.Matrix3) {
                    this._program.sendUniformMat3(key, <Float32Array>uniform.value);
                } else if (uniform.type === MB.UniformType.Matrix4) {
                    this._program.sendUniformMat4(key, <Float32Array>uniform.value);
                } else if (uniform.type === MB.UniformType.Vector2) {
                    this._program.sendUniformVec2(key, <Float32Array>uniform.value);
                } else if (uniform.type === MB.UniformType.Vector3) {
                    this._program.sendUniformVec3(key, <Float32Array>uniform.value);
                } else if (uniform.type === MB.UniformType.Vector4) {
                    this._program.sendUniformVec4(key, <Float32Array>uniform.value);
                }
                uniform.isDirty = false;
            }
        }
    };
}
