/// <reference path="../lib/gl-matrix.d.ts" />
/// <reference path="../lib/stats.d.ts" />
/// <reference path="../lib/dat-gui.d.ts" />
declare class Input {
    private static _instance;
    constructor();
    keys: {
        Left: number;
        Up: number;
        Right: number;
        Down: number;
        Space: number;
        Zero: number;
        One: number;
        Two: number;
        Three: number;
        Four: number;
        Five: number;
        Six: number;
        Seven: number;
        Eight: number;
        Nine: number;
        A: number;
        D: number;
        E: number;
        F: number;
        G: number;
        I: number;
        J: number;
        K: number;
        L: number;
        M: number;
        N: number;
        O: number;
        P: number;
        Q: number;
        R: number;
        S: number;
        W: number;
        LastKeyCode: number;
    };
    update(): void;
    isKeyPressed(keycode: number): boolean;
    isKeyClicked(keycode: number): boolean;
    protected _keyPreviusState: Array<boolean>;
    protected _isKeyPressed: Array<boolean>;
    protected _isKeyClicked: Array<boolean>;
    protected _onKeyDown(ev: KeyboardEvent): void;
    protected _onKeyUp(ev: KeyboardEvent): void;
    static getInstance(): Input;
}
declare class Camera {
    position: Float32Array;
    protected front: Float32Array;
    protected up: Float32Array;
    protected right: Float32Array;
    protected worldUp: Float32Array;
    protected yaw: number;
    protected pitch: number;
    protected movSpeed: number;
    protected mouseSensivity: number;
    GetPos(): Float32Array;
    timeElapsed: number;
    constructor(position?: Float32Array, up?: Float32Array, yaw?: number, pitch?: number);
    protected _updateCamera: boolean;
    update(callback: Function): void;
    processKeyboard(direction: number): void;
    processMouseMovement(xOffset: number, yOffset: number): void;
    updateCameraVectors(): void;
    private view;
    private proj;
    GetViewMatrix(): Float32Array;
    GetProjectionMatrix(w: any, h: any): Float32Array;
}
declare abstract class ICamera {
    protected _position: Float32Array;
    protected _view: Float32Array;
    protected _projection: Float32Array;
    protected _fov: number;
    protected _ar: number;
    protected _look: Float32Array;
    protected _up: Float32Array;
    protected _right: Float32Array;
    constructor(pos: Float32Array);
    position: Float32Array;
    getViewMatrix(): Float32Array;
    getProjectionMatrix(): Float32Array;
    getFOV(): number;
    getAspectRatio(): number;
    setupProjection(fovy: number, aspRatio: number): void;
}
declare class FreeCamera extends ICamera {
    constructor(pos: Float32Array);
    update(): void;
    rotate(yaw: number, pitch: number, roll: number): void;
    walk(amount: number): void;
    strafe(amount: number): void;
    lift(amount: number): void;
    protected _yaw: number;
    protected _pitch: number;
    protected _roll: number;
    protected _translation: Float32Array;
}
declare class OrthoCamera extends ICamera {
}
declare class PerspectiveCamera extends ICamera {
}
/**
* This class get WebGL2 context and animationFrame for your navigator.
*
* @class core.Core
*/
declare class Core {
    private static _instance;
    private _gl;
    constructor();
    clearColorAndDepth(): void;
    protected init(): void;
    static getInstance(): Core;
    /**
    * Return global WebGL2 context
    *
    * @method getGL
    * @return {WebGLRenderingContext} Returns WebGL rendering context
    */
    getGL(): WebGLRenderingContext;
    protected _getContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
    protected _getVendors(): void;
}
declare class vector2<T> {
    x: T;
    y: T;
    constructor(x: T, y: T);
    isEqual(other: vector2<T>): boolean;
}
declare abstract class Texture {
    protected _target: number;
    protected _size: vector2<number>;
    constructor(target: number);
    target: number;
    abstract destroy(): void;
}
declare class Framebuffer {
    protected _size: vector2<number>;
    protected _handle: WebGLFramebuffer;
    protected _attachments: Array<number>;
    protected _depth: Texture;
    protected _renderBuffer: any;
    protected _colors: Array<Texture>;
    constructor(textures: Array<Texture>, size: vector2<number>, depth?: boolean, stencil?: boolean, options?: {});
    private _throwFBOError(status);
    bind(): void;
    unbind(): void;
    rebuild(size: vector2<number>): void;
    destroy(): void;
    protected createRenderBuffer(size: vector2<number>, format: number, attachment: number): WebGLRenderbuffer;
}
declare class Model {
    indices: any;
    vao: any;
    constructor(fileRoute: string);
    private createBuffer(data);
    private addAttrib(attribLocation, buffer, numElems);
    private createVAO(model, indicesArray);
    private loadJSON(url);
    render(): void;
    renderArrayInstance(numInstances: any): void;
}
declare abstract class Scene {
    abstract initScene(): any;
    abstract update(t: number): any;
    abstract render(): any;
    abstract resize(width: number, height: number): any;
    constructor();
    animate(value: boolean): void;
    animating(): boolean;
    protected _animate: boolean;
}
declare enum mode {
    read_file = 0,
    read_script = 1,
    read_text = 2,
}
declare class ShaderProgram {
    constructor();
    private _compiledShader;
    private _shaders;
    _vertexSource: string;
    _fragmentSource: string;
    uniformLocations: {
        [key: string]: WebGLUniformLocation;
    };
    attribLocations: {
        [key: string]: number;
    };
    addAttributes(attrs: Array<string>): void;
    addUniforms(unifs: Array<string>): void;
    program(): WebGLProgram;
    addShader(shader_: string, type: number, _mode: mode): void;
    compile(): boolean;
    private loadAndCompileWithFile(filePath, shaderType);
    private loadAndCompileFromText(shaderSource, shaderType);
    private loadAndCompile(id, shaderType);
    private compileShader(shaderSource, shaderType);
    use(): void;
    destroy(): void;
    getPropSetter(path: any, location: any, type: any): string;
    sendUniform(uniform: any, type: any): any;
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
declare class vector3<T> {
    x: T;
    y: T;
    z: T;
    constructor(x: T, y: T, z: T);
    isEqual(other: vector3<T>): boolean;
}
declare class vector4<T> {
    x: T;
    y: T;
    z: T;
    w: T;
    constructor(x: T, y: T, z: T, w: T);
    isEqual(other: vector4<T>): boolean;
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
    protected createBuffer(data: any, handle: any): any;
    protected addAttrib_(attribLocation: any, buffer: any, numElems: any): void;
}
declare class Quad extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(xsize: number, zsize: number, xdivs: number, zdivs: number, smax?: number, tmax?: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Cube extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(side?: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Sphere extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(radius: number, slices: number, stacks: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Texture2D extends Texture {
    protected _handle: WebGLTexture;
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;
    constructor(image: any, size: vector2<number>, options?: {});
    genMipMap(): void;
    wrap(modes: Array<number>): void;
    minFilter(filter: number): void;
    magFilter(filter: number): void;
    bind(slot?: number): void;
    unbind(): void;
    destroy(): void;
    setPixelStorage(): void;
}
declare abstract class Light {
    protected _intensity: number;
    protected _color: Color;
    constructor();
    intensity: number;
    color: Color;
}
declare class PointLight extends Light {
    protected _position: Float32Array;
    constructor(position?: Float32Array);
    position: Float32Array;
    addTransform(x?: number, y?: number, z?: number): void;
}
declare var camera: Camera;
declare var gl: WebGLRenderingContext;
declare var stats: Stats;
declare var SimpleConfig: () => {
    message: string;
    speed: number;
    displayOutline: boolean;
    explode: () => void;
};
declare var cc: Model;
declare var ss: ShaderProgram;
declare var cubito: Cube;
declare var planito: Quad;
declare var esferita: Sphere;
declare var view: any;
declare var projection: any;
declare var counterTextures: number;
declare function initTexture(str: string): void;
declare var tex2d: Texture2D;
declare var light: PointLight;
declare var lastTime: number;
declare var deltaTime: number;
declare var identityMatrix: Float32Array;
declare var model: Float32Array;
declare var angle: number;
declare function cameraUpdateCb(): void;
declare function drawScene(dt: number): void;
declare function resize(gl: WebGLRenderingContext): void;
declare class DirectionalLight extends Light {
    protected _direction: Float32Array;
    constructor(direction?: Float32Array);
    direction: Float32Array;
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
declare class Teaspot extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _faces: number;
    constructor();
    render(): void;
}
declare class Torus extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _faces: number;
    constructor();
    render(): void;
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
declare class AudioClip {
    protected _audioCtx: any;
    protected _bgAudioNode: any;
    protected _audioContext: AudioContext;
    constructor();
    initAudioContext(): void;
    loadAudio(clipName: string): void;
    unloadAudio(clipName: string): void;
    playACue(): void;
    playBackgroundAudio(clipName: string): void;
    stopBackgroundAudio(): void;
    isBackgroundAudioPlaying(): void;
    protected _stopBackgroundAudio(): void;
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
declare class FloatTexture extends Texture2D {
    constructor(image: any, size: vector2<number>, options?: {});
}
declare class RenderBufferTexture {
    protected _handle: WebGLRenderbuffer;
    constructor(size: vector2<number>, format: number, attachment: number);
}
declare class Texture3D {
}
