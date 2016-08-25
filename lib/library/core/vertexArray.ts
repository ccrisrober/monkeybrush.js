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


/// <reference path="../core/core.ts" />
/// <reference path="../extras/extensions.ts" />

import Core from "../core/core";
import extensions from "../extras/extensions";

"use strict";

const gl = Core.getInstance().getGL();

declare var WebGL2RenderingContext: any;
declare var WebGLVertexArrayObject: any;

class VertexArray {
    /**
     * [_handle description]
     * @type {WebGLVertexArrayObject}
     */
    protected _handle: WebGLVertexArrayObject;
    /**
     * Vertex array constructor
     * @param {WebGLVertexArrayObject} vao [description]
     */
    constructor(vao?: any /**/) {
        if (vao !== undefined) {
            this._handle = vao;
        } else {
            if (gl instanceof WebGL2RenderingContext) {
                this._handle = (<any>gl).createVertexArray();
            } else {
                const ext = extensions.get("OES_vertex_array_object");
                if (ext) {
                    this._handle = ext.createVertexArrayOES();
                }
            }
        }
        this.bind();
    }
    /**
     * [wrap description]
     * @param {WebGLVertexArrayObject} vao [description]
     */
    public static wrap(vao: any /*WebGLVertexArrayObject*/) {
        return new VertexArray(vao);
    }
    /**
     * [bind description]
     */
    public bind() {
        if (gl instanceof WebGL2RenderingContext) {
            (<any>gl).bindVertexArray(this._handle);
            return;
        }
        const ext = extensions.get("OES_vertex_array_object");
        if (ext) {
            ext.bindVertexArrayOES(this._handle);
        }
    }
    /**
     * [unbind description]
     */
    public unbind() {
        if (gl instanceof WebGL2RenderingContext) {
            (<any>gl).bindVertexArray(null);
            return;
        }
        const ext = extensions.get("OES_vertex_array_object");
        if (ext) {
            ext.bindVertexArrayOES(null);
        }
    }
    /**
     * Destroy vertex array
     */
    public destroy() {
        this.bind();
        if (gl instanceof WebGL2RenderingContext) {
            (<any>gl).deleteVertexArray(this._handle);
            return;
        }
        const ext = extensions.get("OES_vertex_array_object");
        if (ext) {
            ext.deleteVertexArrayOES(this._handle);
        }
    }
    /**
     * Check if current context supports VertexArray
     * @return {boolean} True if current context supports VertexArray
     */
    public static isSupported(): boolean {
        return gl instanceof WebGL2RenderingContext ||
            extensions.get("OES_vertex_array_object");
    }
    /**
    public is(): boolean {
        if (gl instanceof WebGL2RenderingContext) {
            return (<any>gl).isVertexArray(this._handle);
        }
        const ext = extensions.get("OES_vertex_array_object");
        if (ext) {
            return ext.isVertexArrayOES(this._handle);
        }
        return false;
    }
    /**/
};

export default VertexArray;
