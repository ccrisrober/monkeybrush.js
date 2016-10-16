namespace MB {
    export class NormalMaterial extends MB.Material {
        protected _uniforms: { [key: string]: MB.Uniform; } = {};
        protected _program: MB.Program;
        constructor(context: MB.GLContext) {
            super();

            let params =  {
                name: "normalShader",
                uniforms: {
                    projection: { type: MB.UniformType.Matrix4 },
                    view: { type: MB.UniformType.Matrix4 },
                    model: { type: MB.UniformType.Matrix4 }
                }
            };

            this.id = params.name;
            this._program = new MB.Program(context);
            this._program.addShader(`#version 300 es
                precision highp float;

                layout(location = 0) in vec3 position;
                layout(location = 1) in vec3 normal;

                out vec3 outNormal;

                uniform mat4 projection;
                uniform mat4 view;
                uniform mat4 model;

                void main() {
                    mat3 normalMatrix = mat3(inverse(transpose(view * model)));
                    outNormal = normalize(normalMatrix * normal);
                    gl_Position = projection * view * model * vec4(position, 1.0);
                }`, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            this._program.addShader(`#version 300 es
                precision highp float;

                in vec3 outNormal;

                out vec4 fragColor;

                void main() {
                    fragColor = vec4(normalize(outNormal), 1.0);
                }`, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            this._program.compile();
            this._program.autocatching();

            MB.ProgramManager.add(this.id, this._program);

            let unifs = params.uniforms;

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
