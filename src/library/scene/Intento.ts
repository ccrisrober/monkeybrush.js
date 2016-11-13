namespace MBSX {
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
        public translateX(dist: number) {
            let v = new MB.Vect3(1, 0, 0);
            this._translateOnAxis(v, dist);
        };
        public translateY(dist: number) {
            let v = new MB.Vect3(0, 1, 0);
            this._translateOnAxis(v, dist);
        };
        public translateZ(dist: number) {
            let v = new MB.Vect3(0, 0, 1);
            this._translateOnAxis(v, dist);
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
    export class Node {
        constructor() {
            this._children = new Array<Node>();
            this._components = new Array<Component>();
            this._parent = null;
            this._transform = new Transform();
        };
        public get parent(): Node { return this._parent; };
        public set parent(p: Node) { this._parent = p; };
        public addChild(n: Node) {
            n.parent = this;
            this._children.push(n);
        };
        public removeChild(n: Node) {
            let idx = this._children.indexOf(n);
            if (idx !== -1) {
                this._children.splice(idx, 1);
            }
        };
        public addComponent(c: Component) {
            c.node = this;
            this._components.push(c);
        }
        public get transform(): Transform { return this._transform; };
        public get children(): Array<Node> { return this._children; };
        protected _parent: Node;
        protected _children: Array<Node>;
        public _components: Array<Component>;
        protected _transform: Transform;

        public get worldPosition(): MB.Vect3 {
            let res = new MB.Vect3();
            this._updateMatrixWorld(true);
            return res.setFromMatrixPosition(this.transform._matrixWorld);
        };
        public get worldScale(): MB.Vect3 {
            let res = new MB.Vect3();
            let p = new MB.Vect3();
            let q = new MB.Quat();
            this._updateMatrixWorld(true);
            this.transform._matrixWorld.decompose(p, q, res);
            return res;
        };

        public _updateMatrixWorld(force: boolean = false) {
            if (this.transform._autoUpdate === true) {
                this.transform.updateMatrix();
            }
            if (this.transform._matrixWorldNeedUpdate === true || force === true) {
                if (!this.parent) {
                    this.transform._matrixWorld.copy(this.transform._matrix);
                } else {
                    this._transform._matrixWorld.mult2( this.parent._transform._matrixWorld, this._transform._matrix );
                    //this.parent.transform._matrixWorld.mult(this.transform._matrix, this.transform._matrixWorld);
                }

                this.transform._matrixWorldNeedUpdate = false;

                force = true;
            }

            for (let i = 0, l = this._children.length; i < l; ++i) {
                this._children[i]._updateMatrixWorld(force);
            }
        };
    };
    export abstract class Component {
        public node: Node;
        public update(dt: number) {
            // Override its neccesary
        }
    };
    export class MeshRenderer extends Component {
        protected _mesh: MB.Drawable;
        protected _material: MB.Material;
        constructor(mesh: MB.Drawable, material: MB.Material) {
            super();
            this._mesh = mesh;
            this._material = material;
        };
        public get material(): MB.Material {
            return this._material;
        };
        public set material(m: MB.Material) {
            this._material = m;
        };
        public get mesh(): MB.Drawable {
            return this._mesh;
        };
        public set mesh(m: MB.Drawable) {
            this._mesh = m;
        };
        public update(dt: number) {
        };
        public render() {
            this.node._updateMatrixWorld();
            this._material._uniforms["model"].value = this.node.transform._matrixWorld;
            this._material.use();
            this._mesh.render();
        };
    };
    export class Scene {
        protected _name: string;
        public camera = new MB.Camera2(new MB.Vect3(0,0.18,8.44));
        constructor(name: string, engine: MBS.Engine) {
            this._name = name;
            this._engine = engine;
            this._sceneGraph = new Node();

            let bgColor = MB.Color4.fromColor3(MB.Color3.Black);

            this._engine.context.state.depth.setStatus(true);
            this._engine.context.state.depth.setFunc(MB.ctes.ComparisonFunc.Less);

            this._engine.context.state.culling.setStatus(true);
            this._engine.context.state.blending.setStatus(false);
            this._engine.context.state.color.setClearColor(bgColor);
        }
        public get root(): Node { return this._sceneGraph; }
        protected _sceneGraph: Node;
        protected _engine: MBS.Engine;
        public getEngine(): MBS.Engine {
            return this._engine;
        };
        public render(dt: number) {
            this._engine.context.state.clearBuffers();
            this._sceneGraph.children.forEach((n: Node) => {
                this._subRender(n, dt);
            });
        };
        protected _subRender(n: Node, dt: number) {
            for (let i = 0; i < n.children.length; ++i) {
                this._subRender(n.children[i], dt);
            }
            for (let i = 0; i < n._components.length; ++i) {
                n._components[i].update(dt);
                if (n._components[i] instanceof MeshRenderer) {
                    let mr: MeshRenderer = <MeshRenderer>n._components[i];

                    mr.material._uniforms["viewPos"].value = this.camera.GetPos();
                    mr.material._uniforms["projection"].value = this.camera.GetProjectionMatrix(this._engine.context.canvas);
                    mr.material._uniforms["view"].value = this.camera.GetViewMatrix();
                    mr.render();
                }
            }
        }
    };
};
