namespace MB {
    export class GLContextW1 extends GLContext {
        constructor(canvas: HTMLCanvasElement, params: ContextParams = {}) {
            super(canvas);
            this._init("webgl", 1, params);
        }
    }
}
