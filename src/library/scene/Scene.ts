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

        public addModel(m) {

        }
        public addLight(lg: MB.Light) {
            for (let i = 0, l = this._lights.length; i < l; ++i) {
                if (this._lights[i] == lg) {
                    return;
                }
            }
            this._lights.push(lg);
        }

        protected _postProcess: MBS.PostProcess = null;
        protected _name: string;

        constructor(name: string, engine: Engine) {
            this._engine = engine;
            this._name = name;
            engine._scenes.push(this);
            this._sceneGraph = new MBS.Node("root", this);


            let bgColor = MB.Color4.fromColor3(MB.Color3.Black);

            this._engine.context.state.depth.setStatus(true);
            this._engine.context.state.depth.setFunc(MB.ctes.ComparisonFunc.Less);

            this._engine.context.state.culling.setStatus(true);
            this._engine.context.state.blending.setStatus(false);
            this._engine.context.state.color.setClearColor(bgColor);


            this._postProcess = new MBS.PostProcess(this);

        }
        public getEngine(): Engine {
            return this._engine;
        }
        public render(dt: number) {
            // TODO: Shadow mapping time
            this._totalMeshes = this._totalVertices = this._drawCalls = this._totalIndices = 0;

            this._engine.context.state.clearBuffers();

            // Clear color
            // console.log("Render", dt);
            // TODO: DRAW OBJECTS
            /*
                For each object in scene
                    - Set material => Setear cullface, blending, dephts, ...
             */
        }
        get clearColor(): MB.Color3 {
            return this._clearColor;
        };
        set clearColor(c: MB.Color3) {
            this._clearColor = c;
            let bgColor = MB.Color4.fromColor3(this._clearColor);
            this._engine.context.state.color.setClearColor(bgColor);
        }

        protected _totalMeshes: number = 0;
        protected _totalVertices: number = 0;
        protected _drawCalls: number = 0;
        protected _totalIndices: number = 0;

        public camera: MB.Camera2;
    }
}
