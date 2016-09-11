interface SamplerParams {
    minFilter?: number;
    magFilter?: number;
    wrapS?: number;
    wrapT?: number;
    wrapR?: number;
    minLOD?: number;
    maxLOD?: number;
    compareFunc?: number;
    compareMode?: number;
    anisotropic?: number;     // TODO ext.TEXTURE_MAX_ANISOTROPY_EXT
                              //     ( EXT_texture_filter_anisotropic)
    maxLevel?: number;        // TODO gl.TEXTURE_MAX_LEVEL
    baseLevel?: number;       // TODO gl.TEXTURE_BASE_LEVEL
};

export { SamplerParams };
