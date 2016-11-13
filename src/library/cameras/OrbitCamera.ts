namespace MB {
    export class OrbitCamera extends AbstractCamera {
        protected _rotation: MB.Quat;
        protected _scratch0: MB.Mat4;
        protected _scratch1: MB.Mat4;
        protected _center: MB.Vect3;
        protected _distance: number;
        protected _viewMatrix: MB.Mat4;

        /**
         * @param {MB.Vect3 = new MB.Vect3(0.0, 0.0, -1.0)} Eye vector of the camera.
         * @param {MB.Vect3 = new MB.Vect3(0.0, 0.0, 0.0)} Target the camera is looking at.
         * @param {MB.Vect3 = new MB.Vect3(0.0, 1.0, 0.0)} Up direction for the camera.
         */
        constructor(
            eye: MB.Vect3 = new MB.Vect3(0.0, 0.0, -1.0),
            target: MB.Vect3 = new MB.Vect3(0.0, 0.0, 0.0),
            up: MB.Vect3 = new MB.Vect3(0.0, 1.0, 0.0)
        ) {
            super();
            this._rotation = new MB.Quat();
            this._center = new MB.Vect3();
            this._distance = 1.0;
            this._scratch0 = new MB.Mat4();
            this._scratch1 = new MB.Mat4();

            this.lookAt(eye, target, up);
        };
        /**
         * Moves the center of the camera by dist.
         * @param {MB.Vect3}
         */
        public pan(dist: MB.Vect3) {
            this._scratch0._value[0] = -this._distance * dist[0] || 0;
            this._scratch0._value[1] = -this._distance * dist[1] || 0;
            this._scratch0._value[2] = -this._distance * dist[2] || 0;
        };
        /**
         * Zooms in or out by some amount.
         * @param {number}
         */
        public zoom(dist: number) {
            this._distance += dist;
            if (this._distance < 0.0) {
                this._distance = 0.0;
            }
        };
        /**
         * Return the current view matrix associated to the camera.
         * @return {MB.Mat4}
         */
        public view(): MB.Mat4 {
            this._scratch1[0] = this._scratch1[1] = 0.0;
            this._scratch1[2] = -this._distance;

            return this._viewMatrix;
        };
        /**
         * Applies a rotation to the camera. The two vectors representing the mouse coordinate in distance
         *  relative to the center of the screen.
         * @param {MB.Vect2} Current location.
         * @param {MB.Vect2} Previous location.
         */
        public rotate(da: MB.Vect2, db: MB.Vect2) {
            console.log(da, db);
        };
        /**
         * Move the camera to look at the new position
         * @param {MB.Vect3}
         * @param {MB.Vect3}
         * @param {MB.Vect3}
         */
        public lookAt(eye: MB.Vect3, target: MB.Vect3, up: MB.Vect3) {
            // this._scratch0.lookAt(eye, center, up);

        };
    };
};

/**
 * Example:
 *  new MB.OrbitCamera(
 *      new MB.Vect3(0.0, 10.0, 20.0),
 *      new MB.Vect3(0.0, 3.0, 0.0),
 *      new MB.Vect3(0.0, 1.0, 0.0)
 * )
 */
