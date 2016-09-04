import { Color4 } from "../extras/Color4";
import { Camera } from "../camera/Camera";
import { SimpleTexture2D } from "../textures/SimpleTexture2D";
import { Core } from "../core/Core";

class PostProcess2 {
    public width: number = -1;
    public height: number = -1;
    public clearColor: Color4 = null;

    constructor() {
        /*
        in vec2 position;

        uniform vec2 scale;

        out vec2 tc;

        void main(void) {
            tc = (position * 0.5 + 0.5) * scale;
            gl_Position = vec4(position, 0.0, 1.0);
        }*/
    }

    public active(camera: Camera, srcTex?: SimpleTexture2D) {
        const gl = Core.getInstance().getGL();
        if (this.clearColor) {
            gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a);
        }
    }
    public destroy() {
        // TODO
    }
};

export { PostProcess2 };
