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


import { Core } from "../core/Core";
import { Program } from "../core/Program";
import { ResourceMap } from "../resources/ResourceMap";
import { CubeMapTexture } from "../textures/CubemapTexture";
import { GlobalState } from "../core/GlobalState";

import { Mat4 } from "../maths/Mat4";

import { VertexBuffer } from "../core/VertexBuffer";
import { VertexArray } from "../core/VertexArray";

import { ProgramCte, ComparisonFunc, UsageType, BufferType }
    from "../constants/Constants";

"use strict";

/**
 * Skybox class
 * @class Skybox
 */
class Skybox {
    /**
     * Internal VertexArray
     * @type {VertexArray}
     */
    protected _VertexArray: VertexArray;
    /**
     * Internal VertexBuffer
     * @type {VertexBuffer}
     */
    protected _VertexBuffer: VertexBuffer;
    /**
     * Internal program that draw skybox
     * @type {Program}
     */
    protected _prog: Program;
    /**
     * Internal CubeMap texture
     * @type {CubeMapTexture}
     */
    protected CubeMapTexture: CubeMapTexture;
    /**
     * Return internal CubeMap texture
     * @return {CubeMapTexture}
     */
    get texture(): CubeMapTexture {
        return this.CubeMapTexture;
    };
    /**
     * Skybox constructor
     * @param {string} dir Skybox directory (without "/")
     * @param {boolean = true} isWebGL2 [description]
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

        this._VertexArray = new VertexArray();
        this._VertexArray.bind();

        this._VertexBuffer = new VertexBuffer(BufferType.Array);
        this._VertexBuffer.bind();
        this._VertexBuffer.bufferData(skyboxVertices, UsageType.StaticDraw);
        this._VertexBuffer.vertexAttribPointer(0, 3, gl.FLOAT, false, 0);
        this._loadCubemap(faces);

        this._VertexArray.unbind();
    };
    /**
     * Render skybox using given view and projetion mat4
     * @param {Mat4} view       View matrix
     * @param {Mat4} projection Projection matrix
     */
    public render(view: Mat4, projection: Mat4) {
        const gl: WebGLRenderingContext = Core.getInstance().getGL();

        let currDepthComp = GlobalState.getCurrentDepthComparisonFunc();

        GlobalState.setDepthComparisonFunc(ComparisonFunc.LessEqual);
        this._prog.use();

        // Remove any translation
        let auxView = view.toMat3().toMat4();

        this._prog.sendUniformMat4("view", auxView._value);
        this._prog.sendUniformMat4("projection", projection._value);

        this.CubeMapTexture.bind(0);

        this._VertexArray.bind();
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        this._VertexArray.unbind();

        GlobalState.setDepthComparisonFunc(currDepthComp);
    }
   /**
    * Destroy skybox.
    */
    public destroy() {
        this.CubeMapTexture.destroy();
    }
    /**
     * Loads all cubemaps faces.
     * @param {Array<string>} faces Array of image routes.
     */
    protected _loadCubemap(faces: Array<string>) {
        this.CubeMapTexture = new CubeMapTexture();
        this.CubeMapTexture.bind();

        faces.forEach(function(face: string, i: number) {
            let img = ResourceMap.retrieveAsset(face);
            this.CubeMapTexture.addImage(i, img);
        }.bind(this));

        this.CubeMapTexture.finishTex();
        this.CubeMapTexture.unbind();
    }
};

export { Skybox };
