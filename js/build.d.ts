/// <reference path="../lib/stats.d.ts" />
/// <reference path="../lib/dat-gui.d.ts" />
/// <reference path="../lib/gl-matrix.d.ts" />
interface ICamera {
}
declare class OrthoCamera implements ICamera {
}
declare class ProjCamera implements ICamera {
}
declare class Core {
    private static _instance;
    private _gl;
    constructor();
    protected init(): void;
    static getInstance(): Core;
    getGL(): WebGLRenderingContext;
    protected _getContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
    protected _getVendors(): void;
}
declare class Model {
    indices: any;
    vao: any;
    constructor(fileRoute: string);
    render(): void;
    renderArrayInstance(numInstances: any): void;
    private createBuffer(data);
    private addAttrib(attribLocation, buffer, numElems);
    private createVAO(model, indicesArray);
    private loadJSON(url);
    private _calculateTangents(vertices, normals);
}
declare enum mode {
    read_file = 0,
    read_script = 1,
    read_text = 2,
}
declare class ShaderProgram {
    private mCompiledShader;
    private shaders;
    private fragmentShader;
    vertexSource: string;
    fragmentSource: string;
    uniformLocations: any;
    attribLocations: any;
    addAttributes(attrs: Array<string>): void;
    addUniforms(unifs: Array<string>): void;
    program(): WebGLProgram;
    constructor();
    addShader(shader_: string, type: number, _mode: mode): void;
    compile_and_link(): boolean;
    private loadAndCompileWithFile(filePath, shaderType);
    private loadAndCompileFromText(shaderSource, shaderType);
    private loadAndCompile(id, shaderType);
    private compileShader(shaderSource, shaderType);
    use(): void;
    dispose(): void;
}
declare class Texture {
    loadTexture(textureName: string): void;
    unloadTexture(textureName: string): void;
    activateTexture(): void;
    deactivateTexture(): void;
    protected _processLoadedImage(textureName: string, img: any): void;
}
declare var vertexCode: string;
declare module ToneMap {
    function init(gl: WebGLRenderingContext): void;
    var textureQuadSimpleProgram: ShaderProgram;
    var textureQuadGammaProgram: ShaderProgram;
    var textureQuadReinhardProgram: ShaderProgram;
    var textureQuadFilmicProgram: ShaderProgram;
    var textureQuadsRGBProgram: ShaderProgram;
    var textureQuadUncharted2Program: ShaderProgram;
}
declare function getContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
declare function getVendors(): void;
declare var gl: WebGLRenderingContext;
declare var stats: Stats;
declare var FizzyText: () => {
    message: string;
    speed: number;
    displayOutline: boolean;
    explode: () => void;
};
declare function drawScene(dt: number): void;
declare function resize(gl: WebGLRenderingContext): void;
declare var url: string;
declare var request: XMLHttpRequest;
declare class AudioClip {
    protected _audioCtx: any;
    protected _bgAudioNode: any;
}
declare class ResourceMap {
    protected _numOutstandingLoads: number;
    protected _loadCompleteCallback: Function;
    protected _resourceMap: {
        [key: string]: ResourceMap.MapEntry;
    };
    private static _instance;
    constructor();
    static getInstance(): ResourceMap;
    asyncLoadRequested(resName: string): void;
    asyncLoadCompleted(resName: string, loadedAsset: any): void;
    setLoadCompleteCallback(fun: Function): void;
    retrieveAsset(resName: string): any;
    unloadAsset(resName: string): number;
    isAssetLoaded(resName: string): boolean;
    incAssetRefCount(resName: string): void;
    protected _checkForAllLoadCompleted(): void;
}
declare module ResourceMap {
    class MapEntry {
        protected _asset: string;
        protected _refCount: number;
        constructor(resName: string);
        getAsset(): string;
        setAsset(name: string): void;
        count(): number;
        incCount(): void;
        decCount(): void;
    }
}
declare class Font {
    constructor(fontName: string);
    unloadFont(fontName: string): void;
}
declare module Font {
    class CharacterInfo {
        protected mTexCoordLeft: number;
        protected mTexCoordRight: number;
        protected mTexCoordBottom: number;
        protected mTexCoordTop: number;
        protected mCharWidth: number;
        protected mCharHeight: number;
        protected mCharWidthOffset: number;
        protected mCharHeightOffset: number;
        protected mCharAspectRatio: number;
    }
}
declare class Skybox {
    constructor(dir: string);
    render(): void;
    destroy(): void;
    protected skyboxVAO: any;
    protected skyboxVBO: WebGLBuffer;
    protected cubeMapTexture: any;
    protected ss: ShaderProgram;
    protected model: Float32Array;
    protected tex: Texture;
    protected _loadCubemap(faces: Array<string>): void;
}
