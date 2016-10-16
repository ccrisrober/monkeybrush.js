namespace MBS {
    export class PostProcess {
        public _width: number = -1;
        public _height: number = -1;
        public _clearColor: MB.Color4 = null;
        public _scene: MBS.Scene;

        constructor(scene: MBS.Scene) {
            this._scene = scene;
        }

        public active(camera: MB.Camera2, srcTex?: MB.Texture2D) {
            if (this._clearColor) {
                this._scene.getEngine().context.state.color.setClearColor(this._clearColor);
            }
        }
        public destroy() {
            // TODO
        }
        public apply() {
            // TODO
        }
    };
};
