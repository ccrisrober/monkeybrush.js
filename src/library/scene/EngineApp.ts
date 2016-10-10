namespace MBS {
    export class EngineApp {
        public camera;
        public light;
        private _engine: MBS.Engine;
        private _scene: MBS.Scene;

        constructor(context: MB.GLContext) {
            this._engine = new MBS.Engine(context);
            this._scene = new MBS.Scene(this._engine);

        }

        public run() {
            this._engine.run((dt: number) => {
                this._scene.render(dt);
            });
        }
    }
}
