
"use strict";

interface TexOptions {
    internalFormat?: number;
    type?: number;
    level?: number;
    minFilter?: number;
    magFilter?: number;
    flipY?: boolean;
    //wrap?: Array<number>; // TODO: Remove ...
    wrapS?: number;
    wrapT?: number;
    wrapR?: number;
    autoMipMap?: boolean;
    format?: number;
    border?: number;
};

export default TexOptions;
