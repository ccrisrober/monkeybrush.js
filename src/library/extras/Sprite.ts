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

namespace MBX {
    /**
     * Sprite class
     * @class Sprite
     */
    export class Sprite {
        protected _customGeometry: MB.CustomModel;

        public position: MB.Vect3;
        public color: MB.Color4 = MB.Color4.fromColor3(MB.Color3.White);
        public width: number = 1.0;
        public height: number = 1.0;
        public angle: number = 0.0;
        public invertU: boolean = false;
        public invertV: boolean = false;
        protected _name: string;

        public setSize(s: number) {
            this.width = this.height = s;
        }

        protected _texture: MB.Texture2D;
        protected _context: MB.GLContext;

        constructor(context: MB.GLContext, name: string, texture: MB.Texture2D) {
            this._context = context;
            this._name = name;
            this._texture = texture;
            this.position = MB.Vect3.createFromScalar(0.0);

            this._customGeometry = new MB.CustomModel(context, {
                vertices: [
                    -0.5, -0.5, 0.0,
                     0.5, -0.5, 0.0,
                     0.5,  0.5, 0.0,
                    -0.5,  0.5, 0.0
                ],
                texCoords: [
                    0, 0,
                    1, 0,
                    1, 1,
                    0, 1
                ],
                indices: [
                    0, 1, 2,
                    0, 2, 3
                ]
            })
        };
        protected _animationStarted: boolean = false;
        protected _loop: boolean = false;
        protected _fromIndex: number = 0;
        protected _toIndex: number = 0;
        protected _delay: number = 0;
        protected _time: number = 0;
        protected _currentIndex: number = 0;
        protected _onFinish: Function;
        public playAnimation(from: number, to: number, delay: number,
            onFinish: Function = null) {
            this._onFinish = onFinish;
            this._fromIndex = from;
            this._toIndex = to;
            this._delay = delay;
            this._animationStarted = true;
            this._time = 0;
            this._currentIndex = this._fromIndex;
        };
        public stopAnimation(): void {
            this._animationStarted = false;
        }
        public get loop(): boolean { return this._loop; };
        public set loop(l: boolean) { this._loop = l; };
        public animate(dt: number) {
            if (this._animationStarted) {
                this._time += dt;
                if (this._time > this._delay) {
                    this._time = this._time % this._delay;
                    this._currentIndex++;
                    if (this._currentIndex === this._toIndex) {
                        if (this._loop) {
                            this._currentIndex = this._fromIndex;
                        } else {
                            this._animationStarted = false;
                            if (this._onFinish) {
                                this._onFinish();
                            }
                        }
                    }
                }
            }
        };

        public render() {
            this._texture.bind(0);
            this._customGeometry.render();
        }

        public destroy() {
            // TODO
        };
    };
};
