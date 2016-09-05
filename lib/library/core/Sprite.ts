
import { Vect3 } from "../maths/Vect3";
import { BufferAttribute, VertexBufferGeometry }
    from "../extras/VertexBufferGeometry";

class Sprite {
    protected _geometry: VertexBufferGeometry;

    constructor() {
        this._geometry = new VertexBufferGeometry();
        this._geometry.addAttr("position",
            new BufferAttribute(new Float32Array([
                -0.5, -0.5, 0.0,
                 0.5, -0.5, 0.0,
                 0.5,  0.5, 0.0,
                -0.5,  0.5, 0.0
            ]), 3));
        this._geometry.addAttr("uv",
            new BufferAttribute(new Float32Array([
                0, 0,
                1, 0,
                1, 1,
                0, 1
            ]), 2));
        this._geometry.setIndex(new Uint16Array([
            0, 1, 2,
            0, 2, 3
        ]));
    }

    public setPosition(pos: Vect3) {
        /**
         * sprite.position.set(
         *         Math.random() * range - range / 2,
         *         Math.random() * range - range / 2,
         *         Math.random() * range - range / 2
         * );
         * sprite.scale.set(4, 4, 4);
         */
    }
}
