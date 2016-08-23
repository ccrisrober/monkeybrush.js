/// <reference path="texture2d.ts" />
/// <reference path="texOptions.ts" />

import Texture2D from "./texture2d";
import Vector2 from "../maths/vector2";
import TexOptions from "./texOptions";

"use strict";

class FloatTexture extends Texture2D {
    constructor(image, size: Vector2<number>, options: TexOptions = {}) {
        options = options || {};
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.FLOAT, null);
        super(image, options);
    }
};

export default FloatTexture;
