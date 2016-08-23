/// <reference path="texture3d.ts" />

import Vector3 from "../maths/vector3"
import Texture3D from "./texture3d"

"use strict";

class SimpleTexture3D extends Texture3D {
    constructor(size: Vector3<number>, options = {}) {
        super(null, size, options);
    }
};

export default SimpleTexture3D;