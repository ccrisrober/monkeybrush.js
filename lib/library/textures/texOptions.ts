/// <reference path="../constants/TextureFormat.ts" />
/// <reference path="../constants/TextureType.ts" />

import TextureFormat from "../constants/TextureFormat";
import TextureType from "../constants/TextureType";

"use strict";

interface TexOptions {
    internalFormat?: TextureFormat;
    type?: TextureFormat;
    level?: number;
    minFilter?: TextureType;
    magFilter?: TextureType;
    flipY?: boolean;
    wrapS?: TextureType;
    wrapT?: TextureType;
    wrapR?: TextureType;
    autoMipMap?: boolean;
    format?: TextureFormat;
    border?: number;
};

export default TexOptions;
