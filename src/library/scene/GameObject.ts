namespace MBSS {
    export class Transform {
        private _parent: MBSS.Transform;
        private _parentMatrix: MB.Mat4;

        private _pos: MB.Vect3;
        private _rot: MB.Quat;
        private _scale: MB.Vect3;

        private _oldPos: MB.Vect3;
        private _oldRot: MB.Quat;
        private _oldScale: MB.Vect3;

        constructor() {
            this._pos = new MB.Vect3(0.0, 0.0, 0.0);
            this._rot = new MB.Quat(0.0, 0.0, 0.0, 1.0);
            this._scale = new MB.Vect3(1.0, 1.0, 1.0);

            this._parentMatrix = MB.Mat4.identity.clone();
        };
        public get position(): MB.Vect3 {
            return this._pos;
        };
    };
    export abstract class GameComponent {
        public update(dt: number) {

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
};
