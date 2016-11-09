namespace MBSS {
    export class Transform {
        protected matrix: MB.Mat4 = new MB.Mat4();
        protected matrixWorld: MB.Mat4 = new MB.Mat4();
        protected autoUpdate: boolean = true;
        protected matrixWorldNeedUpdate: boolean = false;

        public applyMatrix(m: MB.Mat4) {
            this.matrix.mult(m, this.matrix);
            this.matrix.decompose(this._position, this._quaternion, this.scale);
        };

        public rotateOnAxis(axis: MB.Vect3, angle: number) {
            let q1 = new MB.Quat();
            q1.setFromAxisAngle(axis, angle);
            this._quaternion = this._quaternion.mult(q1);
        };

        public rotateX(angle: number) {
            this.rotateOnAxis(new MB.Vect3(1, 0, 0), angle);
        };
        public rotateY(angle: number) {
            this.rotateOnAxis(new MB.Vect3(0, 1, 0), angle);
        };
        public rotateZ(angle: number) {
            this.rotateOnAxis(new MB.Vect3(0, 0, 1), angle);
        };

        public translateOnAxis(axis: MB.Vect3, dist: number) {
            // translate object by distance along axis in object space
            // axis is assumed to be normalized
            let v = new MB.Vect3();
            v.copy(axis).applyQuat(this._quaternion);
            this._position = this._position.add(v.multByScalar(dist));
        };
        public translateX(dist: number) {
            let v = new MB.Vect3(1, 0, 0);
            this.translateOnAxis(v, dist);
        };
        public translateY(dist: number) {
            let v = new MB.Vect3(0, 1, 0);
            this.translateOnAxis(v, dist);
        };
        public translateZ(dist: number) {
            let v = new MB.Vect3(0, 0, 1);
            this.translateOnAxis(v, dist);
        };

        public get worldPosition(): MB.Vect3 {
            let res = new MB.Vect3();
            this.updateMatrixWorld(true);
            return res.setFromMatrixPosition(this.matrixWorld);
        };
        public getWorldQuaternion(target: MB.Quat = new MB.Quat()): MB.Quat {
            let res = new MB.Quat();
            this.updateMatrixWorld(true);
            this.matrixWorld.decompose(this.position, res, this.scale);
            return res;
        };
        public get worldRotation(): MB.EulerAngle {
            let res = new MB.EulerAngle();
            let q = new MB.Quat();
            this.getWorldQuaternion(q);
            return res.setFromQuaternion(q, this.rotation.order, false);
        };
        public get worldScale(): MB.Vect3 {
            let res = new MB.Vect3();
            let p = new MB.Vect3();
            let q = new MB.Quat();
            this.updateMatrixWorld(true);
            this.matrixWorld.decompose(p, q, res);
            return res;
        };
        public localWorld(v: MB.Vect3): MB.Vect3 {
            return v.applyMat4(this.matrixWorld);
        };
        public worldToLocal(v: MB.Vect3): MB.Vect3 {
            let mat = new MB.Mat4();
            return v.applyMat4(mat.inverse(this.matrixWorld));
        };
        public updateMatrix() {
            this.matrix.compose(this.position, this.quaternion, this.scale);
            this.matrixWorldNeedUpdate = true;
        };
        public updateMatrixWorld(force: boolean) {
            // TODO
        };
        constructor() {
            this._position = new MB.Vect3();
            this._rotation = new MB.EulerAngle();
            this._quaternion = new MB.Quat();
            this._scale = MB.Vect3.createFromScalar(1.0);
            this._modelViewMatrix = new MB.Mat4();

            this._rotation.onChange = () => {
                this._quaternion = this._quaternion.setFromEuler(this._rotation);
            };
            this._quaternion.onChange = () => {
                this._rotation = this._rotation.setFromQuaternion(this._quaternion, this.rotation.order, false);
            };
        }
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
        public set quaternion(q:  MB.Quat) {
            this._quaternion = q;
        };
        public set scale(s: MB.Vect3)  {
            this._scale = s;
        };
        protected _position: MB.Vect3;
        protected _rotation: MB.EulerAngle;
        protected _quaternion: MB.Quat;
        protected _scale: MB.Vect3;

        protected _modelViewMatrix: MB.Mat4;
    };
    export class SuperNode extends Transform {

        public updateMatrixWorld(force: boolean) {
            if (this.autoUpdate === true) {
                this.updateMatrix();
            }
            if (this.matrixWorldNeedUpdate === true || force === true) {
                if (this.parent == null) {
                    this.matrixWorld.copy(this.matrix);
                } else {
                    this.parent.matrixWorld.mult(this.matrix, this.matrixWorld);
                }

                this.matrixWorldNeedUpdate = false;

                force = true;
            }

            let children = this._children;
            if (children) {
                for (let i = 0, l = children.length; i < l; ++i) {
                    children[i].updateMatrixWorld(force);
                }
            }
        };
        public _parentNode: MBSS.SuperNode;
        public _children: Array<MBSS.SuperNode>;
        public get parent(): MBSS.SuperNode {
            return this._parentNode;
        };
        public set parent(parent: MBSS.SuperNode) {
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
                    this._parentNode._children = new Array<MBSS.SuperNode>();
                }
                this._parentNode._children.push(this);
            }
        };
        public add(object: MBSS.SuperNode) {

            if (arguments.length > 1) {
                for (let i = 0, l = arguments.length; i < l; ++i) {
                    this.add(arguments[i]);
                }
                return this;
            }

            if (object === this) {
                console.error("MBS.Node.add: object can't be added as a child of itself.", object);
                return this;
            }
            // if ((object && object.isObject3D)) {
                if (object.parent !== null) {
                    object.parent.remove(object);
                }
                object.parent = this;
                // this._children.push(object);
            // } else {
            //     console.error("MBS.Node.add: object not an instance of MBS.Node.", object);
            // }

            return this;
        };

        public remove(object: MBSS.SuperNode) {
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
    };
    export abstract class GameComponent {
        public update(dt: number) {
            //
        };
    };
    export class MeshRenderer extends GameComponent {
        protected _mesh: MB.Drawable;
        protected _material: MB.Material;
        constructor(mesh: MB.Drawable, material: MB.Material) {
            super();
            this._mesh = mesh;
            this._material = material;
        };
        public update(dt: number) {
            this._material.use();
            this._mesh.render();
        };
    };
    export class GameObject {
        private _children: Array<MBSS.GameObject>;
        private _components: Array<MBSS.GameComponent>;
        private _transform: MBSS.Transform;

        constructor() {
            this._children = [];
            this._components = [];
            this._transform = new MBSS.Transform();
        };
        public addChild(child: MBSS.GameObject) {
            this._children.push(child);
            // child.transform.parent = m_transform;
        };
        public getChildren(): Array<MBSS.GameObject> {
            return this._children;
        }
        public updateAll(dt: number) {
            this.update(dt);
            for (let i = 0, l = this._children.length; i < l; ++i) {
                this._children[i].updateAll(dt);
            }
        };
        public update(dt: number) {
            for (let i = 0, l = this._components.length; i < l; ++i) {
                this._components[i].update(dt);
            }
        };
        public get transform(): MBSS.Transform {
            return this._transform;
        };
    };
    export class Node {
        constructor() {
            // TODO
        }
        public update() {
            // Override if neccesary
        }
    };
    export class Object3D extends Node {
        constructor() {
            super();
            this._components = new Array<MBSS.GameComponent>();
        }
        public update() {
            // TODO
        }
        public addComponent(comp: MBSS.GameComponent) {
            this._components.push(comp);
        }
        public getComponent(compName: string): MBSS.GameComponent {
            return null;
        }
        protected _components: Array<MBSS.GameComponent>;
        protected _transform;
    };
    export class Group extends Node {
        constructor() {
            super();
        }
    };
    export class Scene {
        constructor() {
            // TODO
        }
        public get root(): MBSS.Node {
            return this._root;
        }
        public set root(r: MBSS.Node) {
            this._root = r;
        }
        protected _root: MBSS.Node = null;
    }
};
