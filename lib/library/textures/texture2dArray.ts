/// <reference path="texture.ts" />
/// <reference path="..//maths/vector3.ts" />

import vector3 from "../maths/vector3";
import Texture from "./texture";
import Core from "../core/core";

"use strict";

class Texture2DArray extends Texture {
    constructor() {
        const gl = Core.getInstance().getGL();
        super((<any>gl).TEXTURE_2D_ARRAY);
        this._handle = gl.createTexture();
        this.bind();
    }
    public bind(slot?: number) {
        const gl = Core.getInstance().getGL();
        if (typeof slot === "number") {
            gl.activeTexture(gl.TEXTURE0 + slot);
        }
        gl.bindTexture(this._target, this._handle);
    }

    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteTexture(this._handle);
        this._handle = null;
    }
};

export default Texture2DArray;