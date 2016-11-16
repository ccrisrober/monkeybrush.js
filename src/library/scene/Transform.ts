namespace MBS {
    export class Transform {
        constructor() {
            this._position = new MB.Vect3();
            this._rotation = new MB.EulerAngle();
            this._quaternion = new MB.Quat();
            this._scale = MB.Vect3.createFromScalar(1.0);

            this._rotation.onChange = () => {
                this._quaternion = this._quaternion.setFromEuler(this._rotation);
            };
            this._quaternion.onChange = () => {
                this._rotation = this._rotation.setFromQuaternion(this._quaternion, this.rotation.order, false);
            };
        };
        public get position(): MB.Vect3 { return this._position; };
        public get rotation(): MB.EulerAngle { return this._rotation; };
        public get quaternion(): MB.Quat { return this._quaternion; };
        public get scale(): MB.Vect3 { return this._scale; };
        public set position(p: MB.Vect3) { this._position = p; };
        public set rotation(r: MB.EulerAngle) { this._rotation = r; };
        public set quaternion(q: MB.Quat) { this._quaternion = q; };
        public set scale(s: MB.Vect3) { this._scale = s; };
        protected _translateOnAxis(axis: MB.Vect3, dist: number) {
            let v = new MB.Vect3();
            v.copy(axis).applyQuat(this._quaternion);
            this._position = this._position.add(v.multByScalar(dist));
        };
        protected _rotateOnAxis(axis: MB.Vect3, angle: number) {
            let q1 = new MB.Quat();
            q1.setFromAxisAngle(axis, angle);
            this._quaternion = this._quaternion.mult(q1);
        };
        public translateX(dist: number) { this._translateOnAxis(MB.Vect3.xAxis, dist); };
        public translateY(dist: number) { this._translateOnAxis(MB.Vect3.yAxis, dist); };
        public translateZ(dist: number) { this._translateOnAxis(MB.Vect3.zAxis, dist); };
        public rotateX(angle: number) { this._rotateOnAxis(MB.Vect3.xAxis, angle); };
        public rotateY(angle: number) { this._rotateOnAxis(MB.Vect3.yAxis, angle); };
        public rotateZ(angle: number) { this._rotateOnAxis(MB.Vect3.zAxis, angle); };
        public localWorld(v: MB.Vect3): MB.Vect3 {
            return v.applyMat4(this._matrixWorld);
        };
        public worldToLocal(v: MB.Vect3): MB.Vect3 {
            let mat = new MB.Mat4();
            return v.applyMat4(mat.inverse(this._matrixWorld));
        };
        protected _position: MB.Vect3;
        protected _rotation: MB.EulerAngle;
        protected _quaternion: MB.Quat;
        protected _scale: MB.Vect3;

        public _matrix: MB.Mat4 = new MB.Mat4();
        public _matrixWorld: MB.Mat4 = new MB.Mat4();
        public _autoUpdate: boolean = true;
        public _matrixWorldNeedUpdate: boolean = false;

        public updateMatrix() {
            this._matrix.compose(this.position, this.quaternion, this.scale);
            this._matrixWorldNeedUpdate = true;
        };
    };
};
