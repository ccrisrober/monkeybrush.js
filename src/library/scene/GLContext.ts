namespace MB {
    export abstract class GLContext {
        constructor(canvas: HTMLCanvasElement) {

        }
        protected _init(glVersion: string) {
            const contextName = glVersion;
            const contextName2 = `experimental-${glVersion}`;
        }
        get gl() {
            return null;
        }
        get canvas() {
            return null;
        }
    }
}
