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

namespace MB {
    export abstract class Material {
        public id: string;
        public backFaceCull: boolean = true;
        public sideOrientation = MB.ctes.FaceDir.InvClockwise;
        public depthTest: boolean = true;
        public visible: boolean = true;
        /*public alpha: number = 1.0;
        public pointSize: number = 1.0;

        public isDirty: boolean = true;*/
        protected _context: MB.GLContext;
        protected _state: MB.GlobalState;
        constructor(context: MB.GLContext) {
            this._context = context;
            this._state = this._context.state;
        }
        public use() {
            this._state.culling.setStatus(this.backFaceCull);
            this._state.culling.setFlipSided(this.sideOrientation);

            this._state.depth.setStatus(this.depthTest);
        }
    }
}
