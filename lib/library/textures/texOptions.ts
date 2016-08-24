
"use strict";

interface TexOptions {
    internalFormat?: number;
    type?: number;
    level?: number;
    minFilter?: number;
    magFilter?: number;
    flipY?: boolean;
    wrapS?: number;
    wrapT?: number;
    wrapR?: number;
    autoMipMap?: boolean;
    format?: number;
    border?: number;
};

export default TexOptions;
