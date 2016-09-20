namespace MB {
    export class GLContextW1 extends GLContext {
        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
            this._init("webgl");
        }
    }
}
