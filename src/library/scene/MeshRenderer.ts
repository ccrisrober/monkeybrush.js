namespace MBSX {
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
};
