/// <reference path="core.ts" />

"use strict";

class Model {
    public indices;
    public vao: any; // TODO: WebGLVertexArrayObject;
    constructor(fileRoute: string) {
        console.log("Loading file");
        this.loadJSON(fileRoute);
    }

    public render() {
        var gl = Core.getInstance().getGL();
        (<any>gl).bindVertexArray(this.vao);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        (<any>gl).bindVertexArray(null);
    }
    public renderArrayInstance(numInstances) {
        var gl: any = Core.getInstance().getGL();
        gl.bindVertexArray(this.vao);
        gl.drawElementsInstanced(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 100);
        gl.bindVertexArray(null);
    }
    private createBuffer(data) {
        var gl: any = Core.getInstance().getGL();
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        return buffer;
    }

    private addAttrib(attribLocation, buffer, numElems) {
        var gl: any = Core.getInstance().getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(
            attribLocation, // Attribute location
            numElems, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            false,
            numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(attribLocation);
    }

    private createVAO(model, indicesArray) {
        var gl: any = Core.getInstance().getGL();
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);

        console.log(model.meshes[0]);

        if (model.meshes[0].vertices) this.addAttrib(0, this.createBuffer(model.meshes[0].vertices), 3);
        if (model.meshes[0].normals) this.addAttrib(1, this.createBuffer(model.meshes[0].normals), 3);
        if (model.meshes[0].texturecoords) this.addAttrib(2, this.createBuffer(model.meshes[0].texturecoords[0]), 2);

        gl.bindVertexArray(null);
    }

    private loadJSON(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        var self = this;
        request.onload = function () {
            if (request.status < 200 || request.status > 299) {
                console.log('Error: HTTP Status ' + request.status + ' on resource ' + url);
                return {};
            } else {
                var modelObj = JSON.parse(request.responseText);
                self.indices = [].concat.apply([], modelObj.meshes[0].faces);
                console.log("Creating VAO");
                self.createVAO(modelObj, self.indices);
                console.log("Finish creating VAO");
            }
        };
        request.send();
    }

    private _calculateTangents(vertices: Float32Array, normals: Float32Array) {
        var ts = [];
        for(var i = 0, size = vertices.length/3; i < size; i++) {
            ts[i] = [0.0, 0.0, 0.0];
        }
        // Not finished
        return ts;
    }

};