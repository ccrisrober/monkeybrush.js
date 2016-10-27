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

namespace MBX {
    /**
     * Skybox class
     * @class Skybox
     */
    export class Skybox {
        /**
         * Internal MB.VertexArray
         * @type {MB.VertexArray}
         */
        protected _VertexArray: MB.VertexArray;
        /**
         * Internal MB.VertexBuffer
         * @type {MB.VertexBuffer}
         */
        protected _VertexBuffer: MB.VertexBuffer;
        /**
         * Internal material that draw skybox
         * @type {MB.ShaderMaterial}
         */
        protected _prog: MB.ShaderMaterial;
        /**
         * Internal CubeMap texture
         * @type {MB.CubeMapTexture}
         */
        protected _cubeMapTexture: MB.CubeMapTexture;
        /**
         * Return internal CubeMap texture
         * @return {MB.CubeMapTexture}
         */
        get texture(): MB.CubeMapTexture {
            return this._cubeMapTexture;
        };
        protected _context: MB.GLContext;
        /**
         * Skybox constructor
         * @param {MB.GLContext} context [description]
         * @param {string} dir Skybox directory (without "/")
         * @param {boolean = true} isWebGL2 [description]
         */
        constructor(context: MB.GLContext, dir: string) {
            let faces: Array<string> = [];
            faces.push(dir + "/right.jpg");
            faces.push(dir + "/left.jpg");
            faces.push(dir + "/top.jpg");
            faces.push(dir + "/bottom.jpg");
            faces.push(dir + "/back.jpg");
            faces.push(dir + "/front.jpg");

            this._context = context;

            const gl: WebGLRenderingContext = this._context.gl;

            const isWebGL2: boolean = context instanceof MB.GLContextW2;

            let vs: string;

            if (isWebGL2) {
                vs = `#version 300 es
                precision highp float;
                layout (location = 0) in vec3 position;
                out vec3 TexCoords;
                uniform mat4 projection;
                uniform mat4 view;
                void main() {
                    vec4 pos = projection * view * vec4(position, 1.0);
                    gl_Position = pos.xyww;
                    TexCoords = position;
                }`;
            } else {
                vs = `precision highp float;
                attribute vec3 position;
                varying vec3 TexCoords;
                uniform mat4 projection;
                uniform mat4 view;
                void main() {
                    vec4 pos = projection * view * vec4(position, 1.0);
                    gl_Position = pos.xyww;
                    TexCoords = position;
                }`;
            }

            let fs: string;

            if (isWebGL2) {
                fs = `#version 300 es
                precision highp float;
                in vec3 TexCoords;
                out vec4 color;
                uniform samplerCube skybox;
                void main() {
                    color = texture(skybox, TexCoords);
                    color = vec4(1.0, 0.0, 0.0, 1.0);
                }`;
            } else {
                fs = `precision highp float;
                varying vec3 TexCoords;
                uniform samplerCube skybox;
                void main() {
                    gl_FragColor = textureCube(skybox, TexCoords);
                }`;
            }

            this._prog = new MB.ShaderMaterial(this._context, {
                name: "skyboxShader",
                vertexShader: vs,
                fragmentShader: fs,
                uniforms: {
                    projection: { type: MB.UniformType.Matrix4 },
                    view: { type: MB.UniformType.Matrix4 },
                    skybox: {
                        type: MB.UniformType.Integer,
                        value: 0
                    },
                }
            });

            let skyboxVertices = new Float32Array([
                // Positions
                -1.0,  1.0, -1.0,
                -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0,  1.0, -1.0,
                -1.0,  1.0, -1.0,

                -1.0, -1.0,  1.0,
                -1.0, -1.0, -1.0,
                -1.0,  1.0, -1.0,
                -1.0,  1.0, -1.0,
                -1.0,  1.0,  1.0,
                -1.0, -1.0,  1.0,

                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0, -1.0,
                 1.0, -1.0, -1.0,

                -1.0, -1.0,  1.0,
                -1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0, -1.0,  1.0,
                -1.0, -1.0,  1.0,

                -1.0,  1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0,  1.0, -1.0,

                -1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0
            ]);

            this._VertexArray = new MB.VertexArray(this._context);
            this._VertexArray.bind();

            this._VertexBuffer = new MB.VertexBuffer(this._context, MB.ctes.BufferType.Array);
            this._VertexBuffer.bind();
            this._VertexBuffer.bufferData(skyboxVertices, MB.ctes.UsageType.StaticDraw);
            this._VertexBuffer.vertexAttribPointer(0, 3, gl.FLOAT, false, 0);
            this._loadCubemap(faces);

            this._VertexArray.unbind();
        };
        /**
         * Render skybox using given view and projetion mat4
         * @param {MB.Mat4} view       View matrix
         * @param {MB.Mat4} projection Projection matrix
         */
        public render(view: MB.Mat4, projection: MB.Mat4) {
            const gl: WebGLRenderingContext = this._context.gl;

            let currDepthComp = this._context.state.depth.getCurrentComparisonFunc();

            this._context.state.depth.setFunc(MB.ctes.ComparisonFunc.LessEqual);

            // Remove any translation
            let auxView = view.toMat3().toMat4();

            this._prog.uniforms["view"].value = view._value;
            this._prog.uniforms["projection"].value = projection._value;

            this._prog.use();
            this._cubeMapTexture.bind(0);

            this._VertexArray.bind();
            gl.drawArrays(gl.TRIANGLES, 0, 36);
            this._VertexArray.unbind();

            this._context.state.depth.setFunc(currDepthComp);
        }
       /**
        * Destroy skybox.
        */
        public destroy() {
            this._cubeMapTexture.destroy();
        }
        /**
         * Loads all cubemaps faces.
         * @param {Array<string>} faces Array of image routes.
         */
        protected _loadCubemap(faces: Array<string>) {
            this._cubeMapTexture = new MB.CubeMapTexture(this._context);
            this._cubeMapTexture.bind();

            for (let i = 0; i < 6; ++i) {
                let img = MB.ResourceMap.retrieveAsset(faces[i]);
                this._cubeMapTexture.addImage(i, img);
            }

            this._cubeMapTexture.finishTex();
            this._cubeMapTexture.unbind();
        }
    };
};
