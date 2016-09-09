
import { PostProcess2} from "./PostProcess2";
import { Core} from "../core/Core";
import { Framebuffer} from "../core/Framebuffer";
import { VertexArray } from "../core/VertexArray.ts";
import { VertexBuffer } from "../core/VertexBuffer.ts";
import { BufferType } from "../constants/BufferType.ts";
import { UsageType } from "../constants/UsageType.ts";

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

    public _finalize(targetTexture?: WebGLTexture, postProcess: Array<PostProcess2>) {
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
}
