namespace MBS {
    export class Scene {
        protected _clearColor: MB.Color3 = new MB.Color3(1, 1, 1);
        protected _lights = new Array<MB.Light>();
        protected _engine: Engine;
        protected _fogEnabled: boolean = false;
        protected _fogColor: MB.Color3 = new MB.Color3(0.2, 0.2, 0.3);
        get fogEnabled(): boolean {
            return this._fogEnabled;
        }
        set fogEnabled(b: boolean) {
            this._fogEnabled = b;
        }
        get fogColor(): MB.Color3 {
            return this._fogColor;
        }
        set fogColor(c: MB.Color3) {
            this._fogColor = c;
        }

        protected _sceneGraph: MBS.Node;
        get root(): MBS.Node {
            return this._sceneGraph;
        }

        constructor(engine: Engine) {
            this._engine = engine;
            engine._scenes.push(this);
            this._sceneGraph = new MBS.Node("root", this);
        }
        public getEngine(): Engine {
            return this._engine;
        }
        public render(dt: number) {
            this._engine.context.state.clearBuffers();
            // console.log("Render", dt);
        }
        get clearColor(): MB.Color3 {
            return this._clearColor;
        };
        set clearColor(c: MB.Color3) {
            this._clearColor = c;
        }

        protected _totalMeshes: number = 0;
        protected _totalVertices: number = 0;
        protected _drawCalls: number = 0;
        protected _totalIndices: number = 0;
    }
}
