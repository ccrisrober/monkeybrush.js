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
/// <reference path="../../typings/gl-matrix.d.ts" />

namespace MB {
    export namespace extras {

    export interface BillboardOpts {
        texture: MB.textures.Texture2D;
        hi?: Array<number>;         // Upper tex. coordinate
        lo?: Array<number>;         // Lower tex. coordinate
        width?: number;             // Billboard width
        height?: number;            // Billboard height
        model?: Float32Array;
        view?: Float32Array;
        projection?: Float32Array;
    };

    export class Billboard {
            static mesh: MB.models.CustomModel = null;
            static program: MB.core.Program = null;
            static initialize() {
                if (!Billboard.mesh || !Billboard.program) {
                    Billboard.mesh = new MB.models.CustomModel({
                        indices: [0, 1, 2, 2, 3, 0],
                        vertices: [
                            -0.5,  0.5, 0.0,
                            -0.5, -0.5, 0.0,
                             0.5, -0.5, 0.0,
                             0.5,  0.5, 0.0],
                        texCoords: [
                            0.0, 0.0,
                            0.0, 1.0,
                            1.0, 1.0,
                            1.0, 0.0
                        ]
                    });

                    Billboard.program = new MB.core.Program();
                    Billboard.program.addShader(`#version 300 es
                    precision highp float;
                    in vec3 position;
                    in vec2 uv;

                    uniform vec3 pos;
                    uniform mat4 projection;
                    uniform mat4 view;
                    uniform mat4 model;

                    uniform vec2 lo;
                    uniform vec2 hi;
                    uniform vec2 size;

                    out vec2 tc;
                    out vec2 tt;
                    void main() {
                        tt = uv * size;

                        vec4 pos = vec4(uv.x * size.x, uv.y * size.y, 0.0, 0.0)
                            + view * model * vec4(pos, 1.0);
                        gl_Position = projection * pos;
                        tc = (0.5 * vec2(1.0+uv.x,1.0-uv.y) - lo) * (hi - lo);
                    }`,
                    MB.ctes.ProgramCte.shader_type.vertex, MB.ctes.ProgramCte.mode.read_text);
                    Billboard.program.addShader(`#version 300 es
                    precision highp float;

                    uniform sampler2D tex;

                    in vec2 tc;
                    in vec2 tt;
                    out vec4 fragColor;

                    void main() {
                        if (length(tt - 0.5) > 0.5) discard;
                        else fragColor = texture(tex, tc);
                    }`,
                    MB.ctes.ProgramCte.shader_type.fragment, MB.ctes.ProgramCte.mode.read_text);

                    Billboard.program.compile();

                    Billboard.program.addUniforms([
                        "pos", "projection", "model", "view", "lo", "hi", "size", "tex"
                    ]);
                }
            }
            static bind() {
                if (!Billboard.program) {
                    Billboard.initialize();
                }
                Billboard.program.use();
            }
            static draw(position: Float32Array = new Float32Array([0, 0, 0]),
                opts: BillboardOpts) {

                let tex = opts.texture;
                let hi = opts.hi || [1, 1];
                let lo = opts.lo || [0, 0];
                let width = opts.width || 1.0;
                let height = opts.height || 1.0;

                let model = opts.model || mat4.identity(mat4.create());
                let view = opts.view || mat4.identity(mat4.create());
                let projection = opts.projection || mat4.identity(mat4.create());

                if (!Billboard.program) {
                    Billboard.initialize();
                }
                // TODO: Bind all attributes
                Billboard.program.sendUniform2f("hi", hi[0], hi[1]);
                Billboard.program.sendUniform2f("lo", lo[0], lo[1]);
                Billboard.program.sendUniform2f("size", width, height);
                Billboard.program.sendUniformMat4("model", model);
                Billboard.program.sendUniformMat4("view", view);
                Billboard.program.sendUniformMat4("projection", projection);
                Billboard.program.sendUniformVec3("pos", position);
                tex.bind(0);
                Billboard.program.sendUniform1i("tex", 0);


                Billboard.mesh.render();
            }
            static unbind() {
                // TODO: Nothing to do here
            }
        };
    };
};
