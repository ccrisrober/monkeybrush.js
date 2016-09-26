namespace MBS {
    export class Scene {
        protected clearColor: MB.Color3 = new MB.Color3(1, 1, 1);
        protected _lights = new Array<MB.Light>();
        protected _engine: Engine;

        constructor(engine: Engine) {
            this._engine = engine;
            engine._scenes.push(this);
        }
        public getEngine(): Engine {
            return this._engine;
        }
    }
}
