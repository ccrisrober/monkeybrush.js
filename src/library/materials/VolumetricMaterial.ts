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
    export class VolumetricMaterial extends MB.Material {
        protected _uniforms: { [key: string]: MB.Uniform; } = {};
        protected _program: MB.Program;
        protected _tex3D: MB.Texture3D;
        constructor(context: MB.GLContext, tex3D: MB.Texture3D) {
            super(context);

            let params =  {
                name: "volumetricShader",
                uniforms: {
                    projection: { type: MB.UniformType.Matrix4 },
                    view: { type: MB.UniformType.Matrix4 },
                    model: { type: MB.UniformType.Matrix4 },
                    tex: {
                        type: MB.UniformType.Integer,
                        value: 0
                    },
                    step_size: { type: MB.UniformType.Float }
                }
            };

            this.id = params.name;
            this._program = new MB.Program(context);
            this._tex3D = tex3D;
            this._program.addShader(`#version 300 es
                precision highp float;

                layout(location = 0) in vec3 position;

                out vec3 outUV;

                uniform mat4 projection;
                uniform mat4 view;
                uniform mat4 model;

                out vec3 viewPos;

                void main() {
                    gl_Position = projection * view * model * vec4(position, 1.0);
                    outUV = position + vec3(0.5);
                    mat4 MV = view * model;
                    MV = inverse(MV);
                    viewPos = (MV * vec4(0.0, 0.0, 0.0, 1.0)).rgb;
                }`, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            this._program.addShader(`#version 300 es
                precision highp float;
                precision highp sampler3D;

                in vec3 outUV;
                uniform sampler3D tex;

                const int MAX_SAMPLES = 300;        // total samples for each ray march step
                const vec3 texMin = vec3(0.0);      // minimum texture access coordinate
                const vec3 texMax = vec3(1.0);      // maximum texture access coordinate

                in vec3 viewPos;

                out vec4 fragColor;

                bool stop = false;

                uniform float step_size;

                void main() {
                    fragColor = vec4(0.0);
                    vec3 dataPos = outUV;
                    vec3 geomDir = normalize((outUV-vec3(0.5)) - viewPos);
                    vec3 dirStep = geomDir * vec3(step_size);

                    for (int i = 0; i < MAX_SAMPLES; ++i) {
                        dataPos += dirStep;
                        stop = dot(sign(dataPos-texMin),sign(texMax-dataPos)) < 3.0;

                        // If the stopping condition is true we brek out of the ray marching loop
                        if (stop)
                            break;

                        float samp = texture(tex, dataPos).r;

                        float prev_alpha = samp - (samp * fragColor.a);
                        fragColor.rgb = prev_alpha * vec3(samp) + fragColor.rgb;
                        fragColor.a += prev_alpha;

                        if (fragColor.a > 0.99) {
                            break;
                        }
                    }
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
            // this._context.state.blending.setStatus(true);
            // this._context.state.blending.setFunc(MB.ctes.BlendingMode.SrcAlpha,
            //         MB.ctes.BlendingMode.OneMinusSrcAlpha);
        };
        get uniforms(): { [key: string]: MB.IUniformMaterial; } {
            return this._uniforms;
        };
        public render(model: MB.Drawable) {
            this.use();

            this._context.state.blending.setStatus(true);
            this._context.state.blending.setFunc(MB.ctes.BlendingMode.SrcAlpha, MB.ctes.BlendingMode.OneMinusSrcAlpha);
            model.render();
            this._context.state.blending.setStatus(false);
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
