namespace MB {
    export interface TFMaterialParams {
        name: string;
        uniforms?: { [key: string]: MB.IUniformMaterial; };
        tfs: {
            varying: Array<string>,
            mode: MB.ctes.TFMode
        };
        vertexShader: string;
        fragmentShader: string;
    };
    export class TFMaterial extends MB.Material {
        protected _uniforms: { [key: string]: MB.Uniform; } = {};
        protected _program: MB.Program;
        protected _context: MB.GLContext;
        constructor(context: MB.GLContext, params: MB.TFMaterialParams) {
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
            this._context = context;
            this.id = params.name || "";
            this._program = new MB.Program(context);
            this._program.addShader(params.vertexShader, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_script);
            this._program.addShader(params.fragmentShader, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_script);
            this._program.compileWithTF(params.tfs.varying, params.tfs.mode);
            this._program.autocatching();

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
