/// <reference path="../lib/gl-matrix.d.ts" />
/// <reference path="../lib/stats.d.ts" />
/// <reference path="../lib/dat-gui.d.ts" />
declare class Input {
    private static _instance;
    constructor();
    keys: {
        Left_Shift: number;
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
    protected _updateCamera: boolean;
    timeElapsed: number;
    private view;
    private proj;
    GetPos(): Float32Array;
    constructor(position?: Float32Array, up?: Float32Array, yaw?: number, pitch?: number);
    update(callback: Function): void;
    processKeyboard(direction: number, speed?: number): void;
    processMouseMovement(xOffset: number, yOffset: number): void;
    updateCameraVectors(): void;
    GetViewMatrix(): Float32Array;
    GetProjectionMatrix(w: number, h: number): Float32Array;
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
    sendUniform1b(name: string, value: boolean): void;
    sendUniformVec3(name: string, value: Float32Array): void;
    sendUniformMat4(name: string, value: Float32Array, transpose?: boolean): void;
}
declare namespace ToneMap {
    function init(gl: WebGLRenderingContext): void;
    let textureQuadSimpleProgram: ShaderProgram;
    let textureQuadGammaProgram: ShaderProgram;
    let textureQuadReinhardProgram: ShaderProgram;
    let textureQuadFilmicProgram: ShaderProgram;
    let textureQuadsRGBProgram: ShaderProgram;
    let textureQuadUncharted2Program: ShaderProgram;
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
declare const gl: WebGLRenderingContext;
declare enum StencilOp {
    Keep,
    Zero,
    Replace,
    Increase,
    IncreaseSaturate,
    Decrease,
    DecreaseSaturate,
    Invert,
}
declare enum ComparisonFunc {
    Never,
    Always,
    Less,
    Equal,
    NotEqual,
    LessEqual,
    Greater,
    GreaterEqual,
}
declare enum CullMode {
    Front,
    Back,
    FrontAndBack,
}
declare enum FaceDir {
    Clockwise,
    InvClockwise,
}
declare enum BufferType {
    Array,
    ElementArray,
    TransformFeedback,
    Uniform,
    PixelPack,
    PixelUnpack,
    CopyRead,
    CopyWrite,
}
declare enum UsageType {
    StaticDraw,
    DynamicDraw,
    StreamDraw,
    StaticRead,
    DynamicRead,
    StreamRead,
    StaticCopy,
    DynamicCopy,
    StreamCopy,
}
declare enum BlendingType {
    Zero,
    One,
    SrcColor,
    OneMinusSrcColor,
    SrcAlpha,
    OneMinusSrcAlpha,
    DstAlpha,
    OneMinusDstAlpha,
    DstColor,
    OneMinusDstColor,
    SrcAlphaSaturate,
    CteColor,
    OneMinusCteColor,
    CteAlpha,
    OneMinusCteAlpha,
}
declare enum RenderType {
    Points,
    Lines,
    LineLoop,
    LineStrip,
    Triangles,
    TriangleStrip,
    TriangleFan,
}
declare enum BlendingEq {
    FuncAdd,
    FuncSub,
    FuncRevSub,
}
declare class Vector2<T> {
    x: T;
    y: T;
    constructor(x: T, y: T);
    isEqual(other: Vector2<T>): boolean;
}
declare abstract class Texture {
    protected _handle: WebGLTexture;
    protected _target: number;
    protected _size: Vector2<number>;
    constructor(target: number);
    target: number;
    abstract destroy(): void;
    abstract bind(slot?: number): any;
    handle(): WebGLTexture;
    getHeight(): number;
    getWidth(): number;
}
declare class RenderBufferTexture {
    protected _handle: WebGLRenderbuffer;
    constructor(size: Vector2<number>, format: number, attachment: number);
    destroy(): void;
}
declare class Framebuffer {
    protected _size: Vector2<number>;
    protected _handle: WebGLFramebuffer;
    protected _attachments: Array<number>;
    _renderBuffer: RenderBufferTexture;
    _colors: Array<Texture>;
    constructor(textures: Array<Texture>, size: Vector2<number>, depth?: boolean, stencil?: boolean, options?: {});
    private _throwFBOError(status);
    bind(): void;
    onlyBindTextures(): void;
    unbind(): void;
    rebuild(size: Vector2<number>): void;
    destroy(): void;
}
declare class SimpleTexture2D extends Texture {
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;
    constructor(size: Vector2<number>, options?: {});
    genMipMap(): void;
    wrap(modes: Array<number>): void;
    minFilter(filter: number): void;
    magFilter(filter: number): void;
    bind(slot?: number): void;
    unbind(): void;
    destroy(): void;
}
declare enum gbuffer_type {
    position = 0,
    normal = 1,
    diffuse = 2,
    num_textures = 3,
}
declare class GBuffer {
    protected framebuffer: Framebuffer;
    constructor(size: Vector2<number>);
    bindForReading(): void;
    bindForWriting(): void;
    destroy(): void;
}
declare class Texture2D extends Texture {
    protected _flipY: boolean;
    protected _minFilter: number;
    protected _magFilter: number;
    protected _wraps: Array<number>;
    constructor(data: any, options?: {});
    genMipMap(): void;
    wrap(modes: Array<number>): void;
    minFilter(filter: number): void;
    magFilter(filter: number): void;
    bind(slot?: number): void;
    unbind(): void;
    destroy(): void;
}
declare enum gbufferssao_type {
    position = 0,
    normal = 1,
    diffuse = 2,
    num_textures = 3,
}
declare class GBufferSSAO {
    protected _fbo: WebGLFramebuffer;
    protected kernelSize: number;
    protected ssaoKernel: Array<Float32Array>;
    protected ssaoNoise: Array<number>;
    protected _depthTexture: any;
    RenderBufferTexture: any;
    protected _textures: Array<SimpleTexture2D>;
    constructor(size: Vector2<number>);
    bindForReading(): void;
    bindForWriting(): void;
    bindForSSAO(): void;
    sendSamplesSSAOTexture(progName: string): void;
    destroy(): void;
}
declare class VertexArray {
    protected _handle: any;
    constructor();
    bind(): void;
    unbind(): void;
    destroy(): void;
    is(): boolean;
}
declare class Model {
    indices: Array<number>;
    vao: any;
    constructor(fileRoute: string);
    private createBuffer(data);
    private addAttrib(attribLocation, buffer, numElems);
    private createVAO(model, indicesArray);
    private loadJSON(url);
    render(): void;
    renderArrayInstance(numInstances: number): void;
}
declare class VertexBuffer {
    constructor(type: BufferType);
    bind(type?: BufferType): void;
    unbind(): void;
    getBufferType(): BufferType;
    getBuffer(): WebGLBuffer;
    destroy(): void;
    bufferData(data: Float32Array | Uint16Array, usage?: UsageType): void;
    attribDivisor(position: number, length: number, divisor: number): void;
    vertexAttribPointer(attribLocation: number, numElems: number, type: number, normalized?: boolean, offset?: number): void;
    protected _buffer: WebGLBuffer;
    protected _type: BufferType;
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
    protected static _planeVAO: VertexArray;
    protected static _planeVertexVBO: VertexBuffer;
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
declare class Stencil {
    use(): void;
    func(compFun: ComparisonFunc, ref: number, mask: number): void;
    operation(fail: StencilOp, zfail: StencilOp, zpass: StencilOp): void;
    mask(mask: number): void;
    clear(): void;
    unuse(): void;
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
declare namespace extensions {
    function get(name: string): any;
}
declare namespace Timer {
    function update(): void;
    function deltaTime(): number;
}
declare class Vector3<T> {
    x: T;
    y: T;
    z: T;
    constructor(x: T, y: T, z: T);
    isEqual(other: Vector3<T>): boolean;
}
declare class Vector4<T> {
    x: T;
    y: T;
    z: T;
    w: T;
    constructor(x: T, y: T, z: T, w: T);
    isEqual(other: Vector4<T>): boolean;
}
interface ShaderCallback {
    (): ShaderProgram;
}
interface ShaderUseCallback {
    (prog: ShaderProgram): void;
}
declare namespace ShaderManager {
    function get(name: string): ShaderProgram;
    function addWithFun(name: string, fn: ShaderCallback): void;
    function add(name: string, prog: ShaderProgram): void;
    function destroy(): void;
    function getCB(name: string, cb: ShaderUseCallback): void;
}
declare var VanillaToasts: any;
declare namespace ResourceMap {
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
    protected _vao: VertexArray;
    constructor();
    abstract render(): any;
    protected createBuffer(data: Float32Array | Uint16Array, handle: VertexBuffer): VertexBuffer;
    protected addAttrib_(attribLocation: any, buffer: VertexBuffer, numElems: any): void;
}
declare class Torus extends Drawable {
    protected _handle: Array<VertexBuffer>;
    protected _faces: number;
    constructor(outerRadius?: number, innerRadius?: number, sides?: number, rings?: number);
    protected _indicesLen: any;
    render(): void;
    renderArrayInstance(numInstances: number): void;
}
declare class Sphere extends Drawable {
    protected _handle: Array<VertexBuffer>;
    constructor(radius: number, slices: number, stacks: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Quad extends Drawable {
    protected _handle: Array<VertexBuffer>;
    constructor(xsize: number, zsize: number, xdivs: number, zdivs: number, smax?: number, tmax?: number);
    protected _indicesLen: any;
    render(): void;
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
declare let camera: Camera;
declare var gl_: any;
declare let stats: Stats;
declare let deferred: GBuffer;
declare let ssao: GBufferSSAO;
declare let esferita: Sphere;
declare let SimpleConfig: () => {
    max: number;
};
declare let gui: dat.GUI;
declare let torito: Torus;
declare let planito: Quad;
declare let m: Model;
declare let view: any;
declare let projection: any;
declare let tex2d: Texture2D;
declare let light: PointLight;
declare let identityMatrix: Float32Array;
declare let model: Float32Array;
declare let angle: number;
declare let text: {
    max: number;
};
declare function loadAssets(): void;
declare const mainShader: string;
declare let offsetBuffer: VertexBuffer;
declare let numInstancias: number;
declare function maxOffsetUpdate(): void;
declare function initialize(): void;
declare function cameraUpdateCb(): void;
declare function drawScene(dt: number): void;
declare function myImageLoader(src: any): void;
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
declare class Cube extends Drawable {
    protected _handle: Array<VertexBuffer>;
    constructor(side?: number);
    protected _indicesLen: any;
    render(): void;
}
declare class Teaspot extends Drawable {
    protected _handle: Array<VertexBuffer>;
    protected _faces: number;
    constructor();
    render(): void;
}
declare class AudioClip {
    protected _audioContext: AudioContext;
    protected _bgAudioNode: AudioBufferSourceNode;
    constructor();
    initAudioContext(): void;
    loadAudio(clipName: string): void;
    unloadAudio(clipName: string): void;
    stopBackgroundAudio(): void;
    playSound(clipName: string): void;
    isBackgroundAudioPlaying(): boolean;
    playBackgroundAudio(clipName: string): void;
    protected _stopBackgroundAudio(): void;
}
declare class Font {
    loadFont(fontName: string): void;
    unloadFont(fontName: string): void;
}
declare module Font {
    class CharacterInfo {
        protected _texCoordLeft: number;
        protected _texCoordRight: number;
        protected _texCoordBottom: number;
        protected _texCoordTop: number;
        protected _charWidth: number;
        protected _charHeight: number;
        protected _charWidthOffset: number;
        protected _charHeightOffset: number;
        protected _charAspectRatio: number;
    }
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
declare class Sprite {
    static prog: ShaderProgram;
    static buffer: VertexBuffer;
    static initialize(): void;
}
declare class FloatTexture extends Texture2D {
    constructor(image: any, size: Vector2<number>, options?: {});
}
declare class Texture3D extends Texture {
    constructor(data: any, size: Vector3<number>, options?: {});
    bind(slot?: number): void;
    destroy(): void;
}
declare class VideoTexture extends Texture2D {
    _videoElem: HTMLVideoElement;
    constructor(data: any, options?: {});
    updateTexture(): void;
}
