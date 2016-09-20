namespace MB {
    export class SceneGraph {
        constructor(glContext: WebGLRenderingContext) {

        }
        /**
         * Returns child lights which belong to this scene.
         * @return {Array<Light>} [description]
         */
        get lights(): Array<Light> {
            return null;
        };
        /**
         * Returns child cameras which belong to this scene.
         * @return {Array<Camera2>} [description]
         */
        get cameras(): Array<Camera2> {
            return null;
        }
    }
}
