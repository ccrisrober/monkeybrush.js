namespace MBS {
    export class Transform {
        //protected _rotation: EulerAngle; // = new EulerAngle(0, 0, 0, RotSeq.XYZ);
        protected _quat: Float32Array = quat.create();
        protected _position: Float32Array = vec3.create();
        protected _scale: Float32Array = vec3.fromValues(1.0, 1.0, 1.0);
        public setRotationFromAxis(angle: number, axis: Float32Array) {

        };
        public rotateOnAxis(angle: number, axis: Float32Array) {
            var halfAngle = angle / 2,
              s = Math.sin( halfAngle );

            var x = axis[0] * s;
            var y = axis[1] * s;
            var z = axis[1] * s;
            var w = Math.cos( halfAngle );
            var q1 = quat.fromValues(x, y, z, w);

            this._quat = quat.mul(this._quat, this._quat, q1);
        };
        public rotateX(angle: number) {
            this.rotateOnAxis(angle, new Float32Array([1, 0, 0]));
        };
        public rotateY(angle: number) {
            this.rotateOnAxis(angle, new Float32Array([0, 1, 0]));
        };
        public rotateZ(angle: number) {
            this.rotateOnAxis(angle, new Float32Array([0, 0, 1]));
        };
        public translateOnAxis(dist: number, axis: Float32Array) {
            var v1 = vec3.create();
            v1 = vec3.copy(v1, axis);
            vec3.transformQuat(v1, v1, this._quat);
            v1[0] *= dist;
            v1[1] *= dist;
            v1[2] *= dist;
            this._position = vec3.add(this._position, this._position, v1);
        };
        public translateX(angle: number) {
            this.translateOnAxis(angle, new Float32Array([1, 0, 0]));
        };
        public translateY(angle: number) {
            this.translateOnAxis(angle, new Float32Array([0, 1, 0]));
        };
        public translateZ(angle: number) {
            this.translateOnAxis(angle, new Float32Array([0, 0, 1]));
        };

        /*public get rotation(): Float32Array {
            return this._rotation;
        };*/

        protected _rotationQuat: Float32Array;

        public rotate(axis: Float32Array, amount: number, space?) {
            vec3.normalize(axis, axis);
            /*if (!this._rotationQuat) {
                _rotationQuat = quat.rotationTo()
            }*/
        }

        public translate(axis: Float32Array, distance: number, space?) {
            var displ = vec3.create();
            displ = vec3.scale(displ, axis, distance);

            if(!space || space == "local") {
                //var tempV3 = this.
            }
        }

    };
};
