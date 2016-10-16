namespace MBS {
    export class Node {
        public _scene: Scene;
        public _parentNode: Node;
        public _children: Array<Node>;

        public _position = new MB.Vect3();
        public _rotation = new MB.EulerAngle();
        public _quaternion = new MB.Quat();
        public _scale = new MB.Vect3(1.0, 1.0, 1.0);

        public hasParent(): boolean {
            return this._parentNode !== null;
        };
        protected _translateFromAxis(axis: MB.Vect3, dist: number) {
            let v1 = axis.clone();
            v1.applyQuat(this._quaternion);
            v1.multByScalar(dist);
            this._position.add(v1);
        };
        public TranslateX(dist: number) {
            this._translateFromAxis(MB.Vect3.xAxis, dist);
        };
        public TranslateY(dist: number) {
            this._translateFromAxis(MB.Vect3.yAxis, dist);
        };
        public TranslateZ(dist: number) {
            this._translateFromAxis(MB.Vect3.zAxis, dist);
        };
        protected _rotateFromAxis(axis: MB.Vect3, angle: number) {
            let q1 = MB.Quat.fromAxis(axis, angle);
            this._quaternion.mult(q1);
        };
        public RotateX(angle: number) {
            this._rotateFromAxis(MB.Vect3.xAxis, angle);
        };
        public RotateY(angle: number) {
            this._rotateFromAxis(MB.Vect3.yAxis, angle);
        };
        public RotateZ(angle: number) {
            this._rotateFromAxis(MB.Vect3.zAxis, angle);
        };
        public get position(): MB.Vect3 {
            return this._position;
        };
        public get rotation(): MB.EulerAngle {
            return this._rotation;
        };
        public get quaternion(): MB.Quat {
            return this._quaternion;
        };
        public get scale(): MB.Vect3 {
            return this._scale;
        };
        public set position(p: MB.Vect3) {
            this._position = p;
        };
        public set rotation(r: MB.EulerAngle) {
            this._rotation = r;
        };
        public set quaternion(q: MB.Quat) {
            this._quaternion = q;
        };
        public set scale(s: MB.Vect3) {
            this._scale = s;
        };
        public LocalToWorld(v: MB.Vect3): MB.Vect3 {
            // let m = this._matrixWorld.clone();
            // return v.applyMat4(m);
            return null;
        };
        public WorldToLocal(v: MB.Vect3): MB.Vect3 {
            // let m = this._matrixWorld.clone();
            // return v.applyMat4(m.inverse());
            return null;
        };


        protected _name: string;
        protected _id: string;

        protected _isEnabled: boolean = true;

        public isEnabled(): boolean {
            if (!this._isEnabled) {
                return false;
            }

            if (this._parentNode) {
                return this._parentNode.isEnabled();
            }

            return true;
        };
        public setEnabled(v: boolean) {
            this._isEnabled = v;
        }

        constructor(name: string, scene: Scene) {
            this._name = name;
            this._id = this._generateUUID();
            this._scene = scene;
            this.parent = null; // this._scene.root;

            this._rotation.onChange = function() {
                this._quaternion = this._quaternion.setFromEuler(this._rotation);
            }.bind(this);
            this._quaternion.onChange = function() {
                // TODO: this._rotation = this._rotation.from
            }.bind(this);
        };

        public set parent(parent: Node) {
            if (this._parentNode === parent) {
                return;
            }
            if (this._parentNode) {
                let idx = this._parentNode._children.indexOf(this);
                if (idx !== -1) {
                    this._parentNode._children.splice(idx, 1);
                }
            }
            this._parentNode = parent;
            if (this._parentNode) {
                if (!this._parentNode._children) {
                    this._parentNode._children = new Array<Node>();
                }
                this._parentNode._children.push(this);
            }
        }

        public get parent(): Node {
            return this._parentNode;
        }
        public getScene(): Scene {
            return this._scene;
        }
        protected _generateUUID(): string {
            let d = new Date().getTime();
            let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        public add(object: MBS.Node) {

            if (arguments.length > 1) {
                for (let i = 0, l = arguments.length; i < l; ++i) {
                    this.add(arguments[i]);
                }
                return this;
            }

            if (object === this) {
                MB.Log.error("MBS.Node.add: object can't be added as a child of itself.", object);
                return this;
            }
            // if ((object && object.isObject3D)) {
                if ( object.parent !== null ) {
                    object.parent.remove( object );
                }
                object.parent = this;
                // this._children.push( object );
            // } else {
            //     MB.Log.error("MBS.Node.add: object not an instance of MBS.Node.", object);
            // }

            return this;
        };

        public remove(object: MBS.Node) {
            if (arguments.length > 1) {
                for (let i = 0, l = arguments.length; i < l; ++i) {
                    this.remove(arguments[i]);
                }
            }
            let index = this._children.indexOf(object);
            if (index !== - 1) {
                object.parent = null;
                this._children.splice(index, 1);
            }
        };
        protected _matrix: MB.Mat4 = MB.Mat4.identity.clone();
        public get model(): MB.Mat4 {
            return this._matrix;
        }
        public updateMatrix() {
            this._matrix = MB.Mat4.identity.clone();
            this._matrix.compose(
                this._position,
                this.quaternion,
                this._scale);
        };
        public addChild(elem) {
            this.removeChild(elem);
            this._children.push(elem);
        };
        public removeChild(elem) {
            this._children = this._children.filter(function(e: MBS.Node) {
                if (elem === e) {
                    elem._parentNode = null;
                }
                return elem !== e;
            });
        };
        public removeAll() {
            this._children.length = 0;
        };
        public searchElem(name: string, elem = this): MBS.Node {
            if (elem._name === name) {
                return elem;
            }
            // Search in childrens
            for (let i = 0, l = elem._children.length; i < l; ++i) {
                let children = this.searchElem(name, elem);
                if (children) {
                    return children;
                }
            }
        };
        // TODO: Search by tag, type, layer ...
    }
}
