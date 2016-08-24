/// <reference path="../core/core.ts" />
/// <reference path="../extras/extensions.ts" />

import Core from "../core/core";
import extensions from "../extras/extensions";

"use strict";

// TODO: Move to core

const gl = Core.getInstance().getGL();

declare var WebGL2RenderingContext: any;

class VertexArray {
    /**
     * [_handle description]
     * @type {WebGLVertexArrayObject}
     */
    protected _handle: any; // TODO: WebGLVertexArrayObject;
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
