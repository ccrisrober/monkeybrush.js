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
    export class SimpleShadingMaterial extends MB.Material {
        // protected _uniforms: { [key: string]: MB.Uniform; } = {};
        protected _program: MB.Program;
        constructor(context: MB.GLContext) {
            super(context);

            let params =  {
                name: "simpleShadingShader",
                uniforms: {
                    projection: { type: MB.UniformType.Matrix4 },
                    view: { type: MB.UniformType.Matrix4 },
                    model: { type: MB.UniformType.Matrix4 },
                    viewPos: { type: MB.UniformType.Vector3 },
                    color: {
                        type: MB.UniformType.Vector3,
                        value: new MB.Vect3(1.0, 1.0, 1.0)
                    }
                }
            };

            this.id = params.name;
            this._program = new MB.Program(context);
            this._program.addShader(`#version 300 es
                precision highp float;

                layout(location = 0) in vec3 position;
                layout(location = 1) in vec3 normal;

                out vec3 outPosition;
                out vec3 outNormal;

                uniform mat4 projection;
                uniform mat4 view;
                uniform mat4 model;

                void main() {
                    outPosition = vec3(model * vec4(position, 1.0));

                    gl_Position = projection * view * vec4(outPosition, 1.0);
                    mat3 normalMatrix = mat3(inverse(transpose(model)));
                    outNormal = normalize(normalMatrix * normal);
                }`, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            this._program.addShader(`#version 300 es
                precision highp float;

                in vec3 outPosition;
                in vec3 outNormal;

                out vec4 fragColor;

                uniform vec3 viewPos;
                uniform vec3 color;

                void main() {
                    vec3 N = normalize(outNormal);
                    vec3 L = normalize(viewPos - outPosition);
                    float dif = dot(N, L);
                    dif = clamp(dif, 0.0, 1.0);
                    fragColor = vec4(color * dif, 1.0) + vec4(color * 0.3, 1.0);
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
            super.use();
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
