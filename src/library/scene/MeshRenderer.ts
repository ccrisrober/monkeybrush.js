/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

namespace MBS {
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
        public render() {
            this.node._updateMatrixWorld();
            this._material._uniforms["model"].value = this.node.transform._matrixWorld;
            this._material.use();
            this._mesh.render();
        };
    };
};
