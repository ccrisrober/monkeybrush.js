/// <reference path="texture3d.ts" />
/// <reference path="texOptions.ts" />

import Vector3 from "../maths/vector3";
import Texture3D from "./texture3d";
import TexOptions from "./texOptions";

"use strict";

class SimpleTexture3D extends Texture3D {
    constructor(size: Vector3<number>, options: TexOptions = {}, onSuccess: () => void) {
        super(null, size, options);
    }
};

export default SimpleTexture3D;
