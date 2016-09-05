
import { Core } from "../core/Core";
import { UsageType } from "../constants/UsageType";
import { BufferType } from "../constants/BufferType";
import { VertexBuffer } from "../core/VertexBuffer";
import { Vect3 } from "../maths/Vect3";

class PointCloud {
    protected _points: Array<number>;
    protected _size: number;
    protected _vb: VertexBuffer;
    constructor() {
        this._points = [];
        this._size = 0;
        /*this._vb = this.addBufferArray(0, new Float32Array([
              0.0,  0.5, 0.0,
             -0.5, -0.5, 0.0,
              0.5, -0.5, 0.0,
              1.5, -0.0, 0.0,
        ]), 3);
        this._size = 4;*/

        const range = 50;
        for (let i = 0; i < 500; ++i) {
            let particle = new Vect3(
                Math.random() * range - range / 2,
                Math.random() * range - range / 2,
                Math.random() * range - range / 2
            );
            //console.log(particle._value);
            this._points.push(particle.x, particle.y, particle.z);
        }
        this._size = 500;
    }
    protected addBufferArray(attribLocation: number,
        data: Float32Array, numElems: number, type: UsageType = UsageType.StaticDraw): VertexBuffer {
        const gl = Core.getInstance().getGL();
        let vb: VertexBuffer = new VertexBuffer(BufferType.Array);
        vb.bufferData(data, type);
        vb.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
        return vb;
    };
    public addPoint(point: Vect3) {
        //this._points.push(point.x, point.y, point.z);
        //++this._size;
    }
    public render() {
        if (!this._vb) {
            this._vb = this.addBufferArray(0, new Float32Array(this._points), 3);
        }
        var buffer = this._vb.getBuffer();
        const gl = Core.getInstance().getGL();
        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.drawArrays(gl.POINTS, 0, this._size);
        this._vb.unbind();
    }
};

export { PointCloud };
