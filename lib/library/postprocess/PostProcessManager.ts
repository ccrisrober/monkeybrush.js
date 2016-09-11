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


import { PostProcess2} from "./PostProcess2";
import { Core} from "../core/Core";
import { Framebuffer} from "../core/Framebuffer";
import { VertexArray } from "../core/VertexArray.ts";
import { VertexBuffer } from "../core/VertexBuffer.ts";

import { BufferType, UsageType } from "../constants/Constants.ts";

class PostProcessManager {
    protected static _planeVAO: VertexArray = null;
    protected static _planeVBO: VertexBuffer = null;
    private _prepareBuffers() {
        if (!PostProcessManager._planeVAO) {
            const gl = Core.getInstance().getGL();
            const positions = [
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                 1.0,  1.0
            ];
            PostProcessManager._planeVAO = new VertexArray();
            // TODO: Unnecesary gl.bindVertexArray(PostProcess._planeVAO);
            PostProcessManager._planeVBO = new VertexBuffer(BufferType.Array);
            // TODO: Unnecesary gl.bindBuffer(gl.ARRAY_BUFFER, this._planeVBO);
            PostProcessManager._planeVBO.bufferData(new Float32Array(positions), UsageType.StaticDraw);
            PostProcessManager._planeVBO.vertexAttribPointer(0, 2, gl.FLOAT);
            PostProcessManager._planeVAO.unbind();
        }
    };

    public _finalize(targetTexture?: WebGLTexture, postProcess: Array<PostProcess2> = []) {
        if (postProcess.length === 0) return;

        const finishPP: number = postProcess.length - 1;

        postProcess.forEach((pp: PostProcess2, idx: number) => {
            if (idx === finishPP) {
                if (targetTexture) {
                    // BindFBO
                } else {
                    // RestoreDefaultFBO
                    Framebuffer.RestoreDefaultFBO();
                }
            }
            pp.active(null);
            pp.apply();

            this._prepareBuffers();
            this._drawQuad();
        });

        // Enable depth buffer
        // Enable depth write
    }
    private _drawQuad() {
        const gl = Core.getInstance().getGL();
        PostProcessManager._planeVAO.bind();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        PostProcessManager._planeVAO.unbind();
    }

    public destroy() {
        // Destroy vertices and indices buffers
        PostProcessManager._planeVBO.destroy();
        PostProcessManager._planeVAO.destroy();
    }
};

export { PostProcessManager };
