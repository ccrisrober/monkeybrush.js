/// <reference path="../lib/stats.d.ts" />
/// <reference path="../lib/dat-gui.d.ts" />
/// <reference path="../lib/gl-matrix.d.ts" />
declare abstract class ICamera {
    protected _position: Float32Array;
    constructor(pos: Float32Array);
    position: Float32Array;
}
declare class OrthoCamera extends ICamera {
}
declare class ProjectiveCamera extends ICamera {
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
declare class vec2<T> {
    x: T;
    y: T;
    constructor(x: T, y: T);
    isEqual(other: vec2<T>): boolean;
}
declare abstract class Texture {
    protected _target: number;
    protected _size: vec2<number>;
    constructor(target: number);
    target: number;
    abstract destroy(): void;
}
declare class Framebuffer {
    protected _size: vec2<number>;
    protected _handle: WebGLFramebuffer;
    protected _attachments: Array<number>;
    protected _depth: Texture;
    protected _renderBuffer: any;
    protected _colors: Array<Texture>;
    constructor(textures: Array<Texture>, size: vec2<number>, depth?: boolean, stencil?: boolean, options?: {});
    private _throwFBOError(status);
    bind(): void;
    unbind(): void;
    rebuild(size: vec2<number>): void;
    destroy(): void;
    protected createRenderBuffer(size: vec2<number>, format: number, attachment: number): WebGLRenderbuffer;
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
declare class _Texture {
    loadTexture(textureName: string): void;
    unloadTexture(textureName: string): void;
    activateTexture(): void;
    deactivateTexture(): void;
    protected _processLoadedImage(textureName: string, img: any): void;
}
declare class Color {
    protected _color: any[];
    constructor(r: number, g: number, b: number);
    r: number;
    g: number;
    b: number;
    setRGB(r: number, g: number, b: number): void;
    toHSL(): Color;
}
declare module extensions {
    function get(name: string): any;
}
declare class Timer {
    protected running: boolean;
    protected start_clock: number;
    protected start_time: number;
    protected acc_time: number;
    constructor();
    elapsed_time(): number;
    start(msg?: string): void;
    SetToZero(): void;
    restart(): void;
    stop(): void;
    check(): number;
}
declare class vec3<T> {
    x: T;
    y: T;
    z: T;
    constructor(x: T, y: T, z: T);
    isEqual(other: vec3<T>): boolean;
}
declare class vec4<T> {
    x: T;
    y: T;
    z: T;
    w: T;
    constructor(x: T, y: T, z: T, w: T);
    isEqual(other: vec4<T>): boolean;
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
declare abstract class Drawable {
    protected _vao: any;
    abstract render(): any;
    protected addAttrib(attribLocation: any, buffer: any, data: any, numElems: any): void;
}
declare class Quad extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _faces: number;
    constructor(xsize: number, zsize: number, xdivs: number, zdivs: number, smax?: number, tmax?: number);
    render(): void;
}
declare class Cube extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(side?: number);
    render(): void;
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
declare var quad: any, cube: any;
declare function drawScene(dt: number): void;
declare function resize(gl: WebGLRenderingContext): void;
declare var url: string;
declare var request: XMLHttpRequest;
declare abstract class Light {
    protected _intensity: number;
    protected _color: Color;
    constructor();
    intensity: number;
    color: Color;
}
declare class DirectionalLight extends Light {
    protected _direction: Float32Array;
    constructor(direction?: Float32Array);
    direction: Float32Array;
}
declare class PointLight extends Light {
    protected _position: Float32Array;
    constructor(position?: Float32Array);
    position: Float32Array;
}
declare class SpotLight extends Light {
    protected _position: Float32Array;
    protected _direction: Float32Array;
    constructor(position?: Float32Array, direction?: Float32Array);
    position: Float32Array;
    direction: Float32Array;
}
declare abstract class Material {
}
declare class DepthMat extends Material {
    static ss: ShaderProgram;
    static initialize(): void;
}
declare class LambertMat extends Material {
}
declare class NormalMat extends Material {
}
declare class PhongMat extends Material {
}
declare class ShaderMat extends Material {
}
declare class Sphere extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _elements: number;
    constructor();
    render(): void;
}
declare class Teaspot extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _elements: number;
    constructor();
    render(): void;
}
declare class Torus extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _faces: number;
    constructor();
    render(): void;
}
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
declare class RenderBufferTexture {
    protected _handle: WebGLRenderbuffer;
    constructor(size: vec2<number>, format: number, attachment: number);
}
declare class Texture2D extends Texture {
    protected _handle: WebGLTexture;
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;
    constructor(element: any, size: vec2<number>, options?: {});
    genMipMap(): void;
    wrap(modes: Array<number>): void;
    minFilter(filter: number): void;
    magFilter(filter: number): void;
    bind(slot?: number): void;
    unbind(): void;
    destroy(): void;
    setPixelStorage(): void;
}
declare class Texture3D {
}
