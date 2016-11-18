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
    export class Scene {
        protected _clearColor: MB.Color3 = new MB.Color3(1, 1, 1);
        protected _lights = new Array<MB.Light>();
        protected _postProcess: MBS.PostProcess = null;
        protected _name: string;
        public addLight(lg: MB.Light) {
            for (let i = 0, l = this._lights.length; i < l; ++i) {
                if (this._lights[i] === lg) {
                    return;
                }
            }
            this._lights.push(lg);
        };
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

            this._postProcess = new MBS.PostProcess(this);
        }
        public get root(): Node { return this._sceneGraph; }
        protected _sceneGraph: Node;
        protected _engine: MBS.Engine;
        public getEngine(): MBS.Engine {
            return this._engine;
        };
        public render(dt: number) {
            this._totalMeshes = this._totalVertices = this._drawCalls = this._totalIndices = 0;
            // this._engine.context.state.clearBuffers();
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

                    this._totalVertices += (<any>mr)._geometry._attrs.vertices.count;

                    this._totalMeshes++;
                    mr.material._uniforms["viewPos"].value = this.camera.GetPos();
                    mr.material._uniforms["projection"].value = this.camera.GetProjectionMatrix(this._engine.context.canvas);
                    mr.material._uniforms["view"].value = this.camera.GetViewMatrix();
                    mr.render();
                }
            }
        };
        get clearColor(): MB.Color3 {
            return this._clearColor;
        };
        set clearColor(c: MB.Color3) {
            this._clearColor = c;
            let bgColor = MB.Color4.fromColor3(this._clearColor);
            this._engine.context.state.color.setClearColor(bgColor);
        };
        public get totalMeshes(): number { return this._totalMeshes; };

        protected _totalMeshes: number = 0;
        protected _totalVertices: number = 0;
        protected _drawCalls: number = 0;
        protected _totalIndices: number = 0;


        protected _beforeRender: Array<Function> = [];
        protected _afterRender: Array<Function> = [];
        public registerBeforeRender(cb: Function) {
            this._beforeRender.push(cb);
        };
        public registerAfterRender(cb: Function) {
            this._afterRender.push(cb);
        };

        public autoClear: boolean = true;
        public autoClearColor: boolean = true;
        public autoClearDepth: boolean = true;
        public autoClearStencil: boolean = true;

        protected clear(clearColor: boolean = this.autoClearColor,
            clearDepth: boolean = this.autoClearDepth,
            clearStencil: boolean = this.autoClearStencil
           ) {
            let bits = 0;
            const gl = this._engine.context.gl;
            if (clearDepth === undefined || clearDepth) bits |= gl.COLOR_BUFFER_BIT;
            if (clearDepth === undefined || clearDepth) bits |= gl.DEPTH_BUFFER_BIT;
            if (clearStencil === undefined || clearStencil) bits |= gl.STENCIL_BUFFER_BIT;

            gl.clear(bits);
        }
        public clearColor_() {
            this.clear(true, false, false);
        };

        public clearDepth_() {
            this.clear(false, true, false);
        };

        public clearStencil_() {
            this.clear(false, false, true);
        };
    };
};
