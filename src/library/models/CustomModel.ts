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
    /**
     * ICustomModel interface
     * @interface ICustomModel
     */
    export interface ICustomModel {
        indices: Array<number>;
        vertices: Array<number>;
        normals?: Array<number>;
        regenerateNormals?: boolean;    // TODO: Unused
        generateTangents?: boolean;    // TODO: Unused
        texCoords?: Array<number>;
    };
    /**
     * CustomModel class
     * @class CustomModel
     */
    export class CustomModel extends Drawable {
        /**
         * CustomModel constructor
         * @param {ICustomModel} model: Model data
         */
        constructor(model: ICustomModel) {
            super();

            this._handle = [];
            this._vao.bind();

            let i = 0;

            if (model.indices && model.indices.length) {
                this.addElementArray(new Uint16Array(model.indices));
            } else {
                throw new Error("Indices undefined");
            }
            if (model.vertices && model.vertices.length && model.vertices.length % 3 === 0) {
                this.addBufferArray(i++, new Float32Array(model.vertices), 3);
                console.log("vertices");
                console.log(model.vertices);
            } else {
                throw new Error("Vertices undefined");
            }
            if (model.regenerateNormals === false || !model.regenerateNormals) {
                if (model.normals && model.normals.length && model.normals.length % 3 === 0) {
                    this.addBufferArray(i++, new Float32Array(model.normals), 3);
                    console.log("normals");
                    console.log(model.normals);
                }
            } else if (model.regenerateNormals === true) {
                this.recalculateNormals(); // TODO
            }
            if (model.texCoords && model.texCoords.length && model.texCoords.length % 2 === 0) {
                this.addBufferArray(i++, new Float32Array(model.texCoords), 2);
            }

            if (model.generateTangents === true) {
                this.addBufferArray(i++, new Float32Array([]), 3);
                // TODO: generateTangents
            }

            this._indicesLen = model.indices.length;

            this.vertices = model.vertices;
            this.faces = model.indices;
        };
        public vertices: Array<number>;
        public faces: Array<number>;

        public recalculateNormals() {
            // let normals: Array<number> = new Array(this.vertices.length);

            // function getPoint(face: number): Array<number> {
            //     let arr: Array<number> = new Array(3);

            //     arr[0] = this.vertices[face * 3];
            //     arr[1] = this.vertices[(face * 3) + 1];
            //     arr[2] = this.vertices[(face * 3) + 2];

            //     return arr;
            // }

            // for (let i = 0; i < this.faces.length; i += 3) {
            //     let p1 = new Vect3(getPoint(i)[0], getPoint(i)[1], getPoint(i)[2]) ;
            //     let p2 = new Vect3(getPoint(i + 1)[0], getPoint(i + 1)[1], getPoint(i + 1)[2]) ;
            //     let p3 = new Vect3(getPoint(i + 2)[0], getPoint(i + 2)[1], getPoint(i + 2)[2]) ;

            //     // let a = Vect3.rem(p2, p1);
            //     // let b = Vect3.rem(p3, p1);
            //     // let n = Vect3.cross(a, b).normalize();

            //     // normals[faces[i]] += n;
            //     // normals[faces[i+1]] += n;
            //     // normals[faces[i+2]] += n;
            // }

            // for (let i = 0; i < normals.length; ++i) {
            //     // normals[i] = glm::normalize(normals[i]);
            // }
        };
    };
};
