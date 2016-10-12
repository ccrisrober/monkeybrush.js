namespace MBS {
    export class Node {
        public _scene: Scene;
        public _parentNode: Node;
        public _children: Array<Node>;


        public position = new MB.Vect3();
        public rotation = new MB.EulerAngle();
        public quaternion = new MB.Quat();
        public scale = new MB.Vect3(1.0, 1.0, 1.0);


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
            this.parent = this._scene.root;
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
                this._children.push( object );
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
            this._matrix.compose( this.position,
                this.quaternion.setFromEuler(this.rotation),// this.quaternion,
                this.scale );
        };
    }
}
