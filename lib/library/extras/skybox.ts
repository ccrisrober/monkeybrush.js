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


/// <reference path="../core/core.ts" />
/// <reference path="../core/program.ts" />
/// <reference path="../resources/resourceMap.ts" />
/// <reference path="../textures/cubemapTexture.ts" />
/// <reference path="../core/depth.ts" />
/// <reference path="../constants/ProgramCte.ts" />
/// <reference path="../constants/ComparisonFunc.ts" />
/// <reference path="../core/vertexBuffer.ts" />
/// <reference path="../core/vertexArray.ts" />

import { Core } from "../core/core.ts";
import { Program } from "../core/program.ts";
import { ResourceMap } from "../resources/resourceMap.ts";
import { CubeMapTexture } from "../textures/cubemapTexture.ts";
import { Depth } from "../core/depth.ts";
import { Mat3 } from "../maths/mat3.ts";
import { Mat4 } from "../maths/mat4.ts";

import { ProgramCte } from "../constants/ProgramCte";
import { ComparisonFunc } from "../constants/ComparisonFunc";

import { VertexBuffer } from "../core/vertexBuffer.ts";
import { VertexArray } from "../core/vertexArray";

import { UsageType } from "../constants/UsageType.ts";
import { BufferType } from "../constants/BufferType.ts";

"use strict";

class Skybox {
    /**
     * [skyboxVAO description]
     * @type {VertexArray}
     */
    protected skyboxVAO: VertexArray;
    /**
     * [skyboxVBO description]
     * @type {VertexBuffer}
     */
    protected skyboxVBO: VertexBuffer;
    /**
     * [_prog description]
     * @type {Program}
     */
    protected _prog: Program;
    /**
     * [cubeMapTexture description]
     * @type {CubeMapTexture}
     */
    protected cubeMapTexture: CubeMapTexture;
    get texture(): CubeMapTexture { return this.cubeMapTexture; }
    /**
     * @param {string}
     */
    constructor(dir: string, isWebGL2: boolean = true) {
        let faces: Array<string> = [];
        faces.push(dir + "/right.jpg");
        faces.push(dir + "/left.jpg");
        faces.push(dir + "/top.jpg");
        faces.push(dir + "/bottom.jpg");
        faces.push(dir + "/back.jpg");
        faces.push(dir + "/front.jpg");

        const gl: WebGLRenderingContext = Core.getInstance().getGL();

        this._prog = new Program();

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


        this._prog.addShader(vs, ProgramCte.shader_type.vertex, ProgramCte.mode.read_text);

        let fg: string;

        if (isWebGL2) {
            fg = `#version 300 es
            precision highp float;
            in vec3 TexCoords;
            out vec4 color;
            uniform samplerCube skybox;
            void main() {
                color = texture(skybox, TexCoords);
            }`;
        } else {
            fg = `precision highp float;
            varying vec3 TexCoords;
            uniform samplerCube skybox;
            void main() {
                gl_FragColor = textureCube(skybox, TexCoords);
            }`;
        }


        this._prog.addShader(fg, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);
        this._prog.compile();

        this._prog.addUniforms(["view", "projection"]);

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

        this.skyboxVAO = new VertexArray();
        this.skyboxVAO.bind();

        this.skyboxVBO = new VertexBuffer(BufferType.Array);
        this.skyboxVBO.bind();
        this.skyboxVBO.bufferData(skyboxVertices, UsageType.StaticDraw);
        this.skyboxVBO.vertexAttribPointer(0, 3, gl.FLOAT, false, 0);
        this._loadCubemap(faces);

        this.skyboxVAO.unbind();
    }
    public render(view, projection) {
        const gl: WebGLRenderingContext = Core.getInstance().getGL();

        let currDepthComp = Depth.currentComparation();

        Depth.comparison(ComparisonFunc.LessEqual);
        this._prog.use();

        // Remove any translation
        let auxView = view.toMat3().toMat4();

        this._prog.sendUniformMat4("view", auxView._value);
        this._prog.sendUniformMat4("projection", projection._value);

        this.cubeMapTexture.bind(0);

        this.skyboxVAO.bind();
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        this.skyboxVAO.unbind();

        Depth.comparison(currDepthComp);
    }
    /**
     *
     */
    public destroy() {
        this.cubeMapTexture.destroy();
    }
    /**
     * @param {Array<string>}
     */
    protected _loadCubemap(faces: Array<string>) {
        this.cubeMapTexture = new CubeMapTexture();
        this.cubeMapTexture.bind();

        faces.forEach(function(face: string, i: number) {
            let img = ResourceMap.retrieveAsset(face);
            this.cubeMapTexture.addImage(i, img);
        }.bind(this));

        this.cubeMapTexture.finishTex();
        this.cubeMapTexture.unbind();
    }
};

export { Skybox };
