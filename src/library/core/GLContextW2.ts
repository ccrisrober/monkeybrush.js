namespace MB {
    export class GLContextW2 extends GLContext {
        constructor(canvas: HTMLCanvasElement, params: ContextParams = {}) {
            super(canvas);
            this._init("webgl2", 2, params);
        }
    }
}
