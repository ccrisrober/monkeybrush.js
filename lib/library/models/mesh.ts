/// /// <reference path="../core/core.ts" />
/// <reference path="drawable.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
/// <reference path="../constants/_constants.ts" />

import Core from "../core/core.ts";
import VertexArray from "../extras/vertexArray.ts";
import VertexBuffer from "../extras/vertexBuffer.ts";
import UsageType from "../constants/UsageType.ts";
import BufferType from "../constants/BufferType.ts";

import Drawable from "./drawable";

const gl: any = Core.getInstance().getGL();

"use strict";

/**
 * Mesh class
 * @class Mesh
 */
class Mesh extends Drawable {
    /**
     * Mesh definition
     * @param {string} fileRoute: Json file route
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
     * @param {string} url: Json file route
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

export default Mesh;
