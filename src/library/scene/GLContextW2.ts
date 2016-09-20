namespace MB {
    export class GLContextW2 extends GLContext {
        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
            this._init("webgl2");
        }
    }
}
