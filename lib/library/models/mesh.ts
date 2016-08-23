/// /// <reference path="../core/core.ts" />
/// <reference path="drawable.ts" />
/// <reference path="../extras/vertexArray.ts" />
/// <reference path="../extras/vertexBuffer.ts" />
/// <reference path="../constants/_constants.ts" />
import Core from "../core/core.ts"
import VertexArray from "../extras/vertexArray.ts"
import VertexBuffer from "../extras/vertexBuffer.ts"
import UsageType from "../constants/UsageType.ts"
import BufferType from "../constants/BufferType.ts"

import Drawable from "./drawable"

const gl: any = Core.getInstance().getGL();

"use strict";

/**
 * Mesh class
 * @class Mesh
 */
class Mesh extends Drawable {
    constructor(fileRoute: string) {
        super();
        console.log("Loading file");
        this.loadJSON(fileRoute);
    }

    private createVAO(model, el) {
        this._handle = [];
        this._handle.push(new VertexBuffer(BufferType.ElementArray));
        this._vao.bind();

        this._handle[0].bufferData(new Uint16Array(el), UsageType.StaticDraw);

        // console.log(model.meshes[0]);

        if (model.meshes[0].vertices) {
            this._handle.push(new VertexBuffer(BufferType.Array));
            let v = model.meshes[0].vertices;
            this.addAttrib_(0, this.createBuffer(new Float32Array(v), this._handle[1]), 3);
        }
        if (model.meshes[0].normals) {
            this._handle.push(new VertexBuffer(BufferType.Array));
            let v = model.meshes[0].normals;
            this.addAttrib_(1, this.createBuffer(new Float32Array(v), this._handle[2]), 3);
        }
        if (model.meshes[0].texturecoords) {
            this._handle.push(new VertexBuffer(BufferType.Array));
            let v = model.meshes[0].texturecoords[0];
            this.addAttrib_(2, this.createBuffer(new Float32Array(v), this._handle[3]), 2);
        }

        this._vao.unbind();
        this._indicesLen = el.length;
    }

    private loadJSON(url) {
        let request = new XMLHttpRequest();
        request.open("GET", url, false);
        let self = this;
        request.onload = function () {
            if (request.status < 200 || request.status > 299) {
                console.log(`Error: HTTP Status ${request.status} on resource ${url}`);
                return {};
            } else {
                let modelObj = JSON.parse(request.responseText);
                console.log("Creating VAO");
                self.createVAO(modelObj, [].concat.apply([], modelObj.meshes[0].faces));
                console.log("Finish creating VAO");
            }
        };
        request.send();
    }
};

export default Mesh;