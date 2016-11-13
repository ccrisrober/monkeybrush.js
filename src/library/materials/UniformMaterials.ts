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
    export namespace UniformMaterials {
        export function bumpMapping(): { [key: string]: MB.IUniformMaterial; } {
            return {
                bumpTex: { type: MB.UniformType.Integer },
                bumpScale: { type: MB.UniformType.Float }
            };
        };
        export function normalMapping(): { [key: string]: MB.IUniformMaterial; } {
            return {
                normalTex: { type: MB.UniformType.Integer },
                normalScale: { type: MB.UniformType.Float }
            };
        };
        export function texture(): { [key: string]: MB.IUniformMaterial; } {
            return {
                text: { type: MB.UniformType.Integer }
            };
        };
        export function fog(): { [key: string]: MB.IUniformMaterial; } {
            return {
                fogDensity: {
                    type: MB.UniformType.Float,
                    value: 0.04
                },
                fogNear: {
                    type: MB.UniformType.Float,
                    value: 1
                },
                fogFar: {
                    type: MB.UniformType.Float,
                    value: 1000
                },
                fogColor: {
                    type: MB.UniformType.Vector3,
                    value: MB.Vect3.createFromScalar(1.0)
                }
            };
        };
    };
};
