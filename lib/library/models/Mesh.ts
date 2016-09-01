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


/// <reference path="Drawable.ts" />

import { Drawable } from "./Drawable";

"use strict";

/**
 * Mesh class
 * @class Mesh
 */
class Mesh extends Drawable {
    /**
     * Mesh definition
     * @param {string} fileRoute: JSON file route
     */
    constructor(fileRoute: string) {
        super();
        this.loadJSON(fileRoute);
    }

    /**
     * Vao construction
     * @param {[type]} model: Model object in JSON format
     * @param {[type]} el: Indices array
     */
    private createVAO(model, el: Array<number>) {
        this._handle = [];
        this._vao.bind();
        // console.log(model.meshes[0]);

        if (model.meshes[0].vertices) {
            let verts = model.meshes[0].vertices;
            this.addBufferArray(0, new Float32Array(verts), 3);
        }
        if (model.meshes[0].normals) {
            let norms = model.meshes[0].normals;
            this.addBufferArray(1, new Float32Array(norms), 3);
        }
        if (model.meshes[0].texturecoords) {
            let tc = model.meshes[0].texturecoords[0];
            this.addBufferArray(2, new Float32Array(tc), 2);
        }

        this.addElementArray(new Uint16Array(el));

        this._vao.unbind();
        this._indicesLen = el.length;
    }

    /**
     * Read JSON file
     * @param {string} url: JSON file route
     */
    private loadJSON(url: string) {
        let request = new XMLHttpRequest();
        request.open("GET", url, false);
        let self = this;
        request.onload = function () {
            if (request.status < 200 || request.status > 299) {
                console.log(`Error: HTTP Status ${request.status} on resource ${url}`);
                return {};
            } else {
                let modelObj = JSON.parse(request.responseText);
                self.createVAO(modelObj, [].concat.apply([], modelObj.meshes[0].faces));
            }
        };
        request.send();
    }
};

export { Mesh };
