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
declare enum mode {
    read_file = 0,
    read_script = 1,
    read_text = 2,
}
declare enum shader_type {
    vertex = 0,
    fragment = 1,
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
    addShader(shader_: string, st: shader_type, _mode: mode): void;
    compile(): boolean;
    private loadAndCompileWithFile(filePath, shaderType);
    private loadAndCompileFromText(shaderSource, shaderType);
    private loadAndCompile(id, shaderType);
    private compileShader(shaderSource, shaderType);
    use(): void;
    destroy(): void;
    sendUniform1f(name: string, value: number): void;
    sendUniform1i(name: string, value: number): void;
    sendUniformVec3(name: string, value: Float32Array): void;
    sendUniformMat4(name: string, value: Float32Array, transpose?: boolean): void;
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
/**
* This class get WebGL2 context and animationFrame for your navigator.
*
* @class core.Core
*/
declare class Core {
    private static _instance;
    private _gl;
    constructor();
    initialize(color: Array<number>): void;
    clearColorAndDepth(): void;
    changeViewport(x: number, y: number, w: number, h: number): void;
    canvas(): HTMLCanvasElement;
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
    private _getVendors();
}
declare class vector2<T> {
    x: T;
    y: T;
    constructor(x: T, y: T);
    isEqual(other: vector2<T>): boolean;
}
declare abstract class Texture {
    protected _handle: WebGLTexture;
    protected _target: number;
    protected _size: vector2<number>;
    constructor(target: number);
    target: number;
    abstract destroy(): void;
    abstract bind(slot?: number): any;
    handle(): WebGLTexture;
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
/**
* This class wrap PostProcess effects
*
* @class core.PostProcess
*/
declare class PostProcess {
    static initialize(): void;
    static bind(): void;
    static render(): void;
    static _planeVAO: any;
    static _planeVertexVBO: WebGLBuffer;
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
declare class Timer__ {
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
declare module timer {
    function update(): void;
    function deltaTime(): number;
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
declare class VertexBuffer {
    constructor();
    bind(type: number): void;
    getBufferType(): number;
    getBuffer(): WebGLBuffer;
    destroy(): void;
    protected _buffer: WebGLBuffer;
    protected _type: number;
}
/**
class ShaderManager {
    public static get(name: string): ShaderProgram {
        return ShaderManager._progDictionary[name];
    }
    public static add(name: string, prog: ShaderProgram) {
        //if(name in ShaderManager._progDictionary) {
        if(ShaderManager._progDictionary.hasOwnProperty(name)) {
            console.warn(name + " key exist ...");
        }
        ShaderManager._progDictionary[name] = prog;
    }
    public static destroy() {
        for(var key in ShaderManager._progDictionary) {
            ShaderManager._progDictionary[key].destroy();
        }
    }
    protected static _progDictionary: { [ key:string ] : ShaderProgram; };
};
/**/
interface ShaderCallback {
    (): ShaderProgram;
}
declare module ShaderManager {
    function get(name: string): ShaderProgram;
    function addWithFun(name: string, fn: ShaderCallback): void;
    function add(name: string, prog: ShaderProgram): void;
    function destroy(): void;
}
declare var VanillaToasts: any;
declare module ResourceMap {
    class MapEntry {
        _asset: string;
        _refCount: number;
        constructor(resName: string);
        getAsset(): string;
        setAsset(name: string): void;
        count(): number;
        incCount(): void;
        decCount(): void;
    }
    function asyncLoadRequested(resName: string): void;
    function asyncLoadFailed(resName: string): void;
    function asyncLoadCompleted(resName: string, loadedAsset: any): void;
    function setLoadCompleteCallback(fn: any): void;
    function retrieveAsset(resName: string): any;
    function isAssetLoaded(resName: string): boolean;
    function incAssetRefCount(resName: string): void;
    function unloadAsset(resName: string): number;
}
declare abstract class Drawable {
    protected _vao: any;
    abstract render(): any;
    protected addAttrib(attribLocation: any, buffer: any, data: any, numElems: any): void;
    protected createBuffer(data: any, handle: any): any;
    protected addAttrib_(attribLocation: any, buffer: any, numElems: any): void;
}
declare class Torus extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _faces: number;
    constructor(outerRadius?: number, innerRadius?: number, sides?: number, rings?: number);
    protected _indicesLen: any;
    render(): void;
    render2(counter: number): void;
}
declare class Texture2D extends Texture {
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;
    constructor(image: ImageData, options?: {});
    genMipMap(): void;
    wrap(modes: Array<number>): void;
    minFilter(filter: number): void;
    magFilter(filter: number): void;
    bind(slot?: number): void;
    unbind(): void;
    destroy(): void;
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
declare class CubeMapTexture extends Texture {
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;
    protected finished: boolean;
    constructor(options?: {});
    addImage(i: number, data: any): void;
    bind(slot?: number): void;
    unbind(): void;
    destroy(): void;
    finishTex(): void;
}
declare class Skybox {
    constructor(dir: string);
    render(view: Float32Array, projection: Float32Array): void;
    destroy(): void;
    protected skyboxVBO: WebGLBuffer;
    protected _prog: ShaderProgram;
    protected cubeMapTexture: CubeMapTexture;
    protected _loadCubemap(faces: Array<string>): void;
}
declare var skybox: Skybox;
declare var camera: Camera;
declare var stats: Stats;
declare var SimpleConfig: () => {};
declare var gui: dat.GUI;
declare var torito: Torus;
declare var m: Model;
declare var view: any;
declare var projection: any;
declare function loadAssets(): void;
declare function initialize(): void;
declare var tex2d: Texture2D;
declare var light: PointLight;
declare var identityMatrix: Float32Array;
declare var model: Float32Array;
declare var angle: number;
declare function cameraUpdateCb(): void;
declare function drawScene(dt: number): void;
declare var myImageLoader: (src: any) => void;
declare function loop(dt: number): void;
declare function resize(): void;
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
declare class Capsule extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(segments?: number, radius?: number, length?: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Cube extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(side?: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Quad extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(xsize: number, zsize: number, xdivs: number, zdivs: number, smax?: number, tmax?: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Sphere extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    constructor(radius: number, slices: number, stacks: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Teaspot extends Drawable {
    protected _handle: Array<WebGLBuffer>;
    protected _faces: number;
    constructor();
    render(): void;
}
declare class FloatTexture extends Texture2D {
    constructor(image: any, size: vector2<number>, options?: {});
}
declare class RenderBufferTexture {
    protected _handle: WebGLRenderbuffer;
    constructor(size: vector2<number>, format: number, attachment: number);
}
declare class SimpleTexture2D extends Texture2D {
    constructor(size: vector2<number>, options?: {});
}
declare class Texture3D extends Texture {
    constructor(data: any, size: vector3<number>, options?: {});
    bind(slot?: number): void;
    destroy(): void;
}
