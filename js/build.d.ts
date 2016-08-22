/// <reference path="../lib/library/tsd.d.ts" />
/// <reference path="../lib/typings/vanilla-toasts/vanilla-toasts.d.ts" />
/// <reference path="../lib/typings/gl-matrix.d.ts" />
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
declare enum mode {
    read_file = 0,
    read_script = 1,
    read_text = 2,
}
declare enum shader_type {
    vertex = 0,
    fragment = 1,
}
/**
 * Program class
 * @class Program
 */
declare class Program {
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
    /**
     * @param {string[]}
     */
    addAttributesArgs(...attrs: string[]): void;
    /**
     * @param {Array<string>}
     */
    addAttributes(attrs: Array<string>): void;
    /**
     * @param {string[]}
     */
    addUniformsArgs(...unifs: string[]): void;
    /**
     * @param {Array<string>}
     */
    addUniforms(unifs: Array<string>): void;
    /**
     * @return {WebGLProgram}
     */
    program(): WebGLProgram;
    /**
     * @param {string}
     * @param {shader_type}
     * @param {mode}
     */
    addShader(shader_: string, st: shader_type, _mode: mode): void;
    /**
     * Compile and link program
     * @return {boolean}: True if not errors
     */
    compile(): boolean;
    /**
     * @param {string}
     * @param {number}
     */
    private loadAndCompileWithFile(filePath, shaderType);
    /**
     * @param {string}
     * @param {number}
     */
    private loadAndCompileFromText(shaderSource, shaderType);
    /**
     * @param {string}
     * @param {number}
     */
    private loadAndCompile(id, shaderType);
    /**
     * @param {string}
     * @param {number}
     */
    private compileShader(shaderSource, shaderType);
    /**
     *
     */
    use(): void;
    /**
     *
     */
    destroy(): void;
    /**
     * @param {string}
     * @param {number}
     */
    sendUniform1f(name: string, value: number): void;
    /**
     * @param {string}
     * @param {number}
     */
    sendUniform1i(name: string, value: number): void;
    /**
     * @param {string}
     * @param {boolean}
     */
    sendUniform1b(name: string, value: boolean): void;
    /**
     * @param {string}
     * @param {Float32Array}
     */
    sendUniformVec3(name: string, value: Float32Array): void;
    /**
     * @param {string}
     * @param {Float32Array}
     * @param {boolean   = false}
     */
    sendUniformMat4(name: string, value: Float32Array, transpose?: boolean): void;
}
declare namespace ToneMap {
    /**
     * @param {WebGLRenderingContext}
     */
    function init(gl: WebGLRenderingContext): void;
    let textureQuadSimpleProgram: Program;
    let textureQuadGammaProgram: Program;
    let textureQuadReinhardProgram: Program;
    let textureQuadFilmicProgram: Program;
    let textureQuadsRGBProgram: Program;
    let textureQuadUncharted2Program: Program;
}
declare var WebGL2RenderingContext: any;
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
    * Return global WebGL context
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
declare enum Face {
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
declare enum BlendingEqu {
    Add,
    Substract,
    RevSubstract,
    Min,
    Max,
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
interface ProgramCallback {
    (): Program;
}
interface ProgramUseCallback {
    (prog: Program): void;
}
declare namespace ProgramManager {
    /**
     * Get program from name
     * @param  {string} name: Program name
     * @return {Program}
     */
    function get(name: string): Program;
    /**
     * Execute a callback function using the specified program (name).
     * @param  {string} name: Program name
     * @param {ProgramUseCallback}: Function to execute
     */
    function getCB(name: string, cb: ProgramUseCallback): void;
    /**
     * Add a new program with his name and a function that creates the program.
     * @param {string} name: Program name
     * @param {ProgramCallback}: Function that creates the program (return program)
     */
    function addWithFun(name: string, fn: ProgramCallback): void;
    /**
     * Add a existing program with his name and the program.
     * @param {string} name: Program name.
     * @param {Program} prog: Existing program.
     */
    function add(name: string, prog: Program): void;
    /**
     * Destroy all programs and clear cache.
     */
    function destroy(): void;
}
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
    /**
     * @param {string}
     */
    function asyncLoadRequested(resName: string): void;
    /**
     * @param {string}
     */
    function asyncLoadFailed(resName: string): void;
    /**
     * @param {string}
     * @param {[type]}
     */
    function asyncLoadCompleted(resName: string, loadedAsset: any): void;
    /**
     * Set callback function that called when all assets have finished loading.
     * @param {Function}
     */
    function setLoadCompleteCallback(fn: any): void;
    /**
     * Get asset from alias/name
     * @param {string} resName
     */
    function retrieveAsset(resName: string): any;
    /**
     * Check whether the resource has already been loaded.
     * @param  {string} resName: Resource name
     * @return {boolean}: True if resource exist
     */
    function isAssetLoaded(resName: string): boolean;
    /**
     * @param {string}
     */
    function incAssetRefCount(resName: string): void;
    /**
     * Unload a existing resource.
     * @param {string}
     */
    function unloadAsset(resName: string): number;
}
declare namespace loaders {
    /**
     * @param {string}
     * @param {string = ""}
     */
    function loadImage(imageSrc: string, alias?: string): void;
    /**
     * @param {string}
     */
    function unloadImage(imageSrc: string): void;
    /**
     * @param {string}
     */
    function loadAudio(clipName: string, alias?: string): void;
    /**
     * @param {string}
     */
    function unloadAudio(clipName: string): void;
    /**
     * @param {string}
     * @param {number}
     * @param {number}
     * @param {string = ""}
     */
    function loadHDRImage(imageSrc: string, width: number, height: number, alias?: string): void;
    /**
     * @param {string}
     */
    function unloadHDRImage(imageSrc: string): void;
}
declare class VertexArray {
    /**
     * [_handle description]
     * @type {WebGLVertexArrayObject}
     */
    protected _handle: any;
    /**
     * @param {WebGLVertexArrayObject}
     */
    constructor(vao?: any);
    /**
     * @param {WebGLVertexArrayObject}
     */
    static wrap(vao: any): VertexArray;
    /**
     *
     */
    bind(): void;
    /**
     *
     */
    unbind(): void;
    /**
     *
     */
    destroy(): void;
    /**
     * @return {boolean}
     */
    static isSupported(): boolean;
    /**
     * @return {boolean}
     */
    is(): boolean;
}
declare class VertexBuffer {
    static gl: WebGLRenderingContext;
    /**
     * [_buffer description]
     * @type {WebGLBuffer}
     */
    protected _buffer: WebGLBuffer;
    /**
     * [_type description]
     * @type {BufferType}
     */
    protected _type: BufferType;
    /**
     * @param {BufferType = BufferType.Array}
     */
    constructor(type?: BufferType);
    /**
     * @param {BufferType}
     */
    bind(type?: BufferType): void;
    /**
     *
     */
    unbind(): void;
    /**
     * @return {BufferType}
     */
    getBufferType(): BufferType;
    /**
     * @return {WebGLBuffer}
     */
    getBuffer(): WebGLBuffer;
    /**
     *
     */
    destroy(): void;
    /**
     * @param {Float32Array | Uint16Array}
     * @param {UsageType    = UsageType.StaticDraw}
     */
    bufferData(data: Float32Array | Uint16Array, usage?: UsageType): void;
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     * @param {number = 0}
     */
    attribDivisor(position: number, length: number, divisor: number, stride?: number): void;
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     * @param {boolean = false}
     * @param {number  = 0}
     */
    vertexAttribPointer(attribLocation: number, numElems: number, type: number, normalized?: boolean, offset?: number): void;
}
/**
 * Drawable abstract class
 * @class Drawable
 */
declare abstract class Drawable {
    protected _indicesLen: number;
    protected _handle: Array<VertexBuffer>;
    protected _vao: VertexArray;
    constructor();
    protected createBuffer(data: Float32Array | Uint16Array, handle: VertexBuffer): VertexBuffer;
    protected addAttrib_(attribLocation: number, buffer: VertexBuffer, numElems: number): void;
    /**
     * Normal render
     */
    render(): void;
    /**
     * Render with array instance mode
     * @param {number} numInstances: Instances to render
     */
    renderArrayInstance(numInstances: number): void;
}
/**
 * Torus class
 * @class Torus
 */
declare class Torus extends Drawable {
    protected _faces: number;
    constructor(outerRadius?: number, innerRadius?: number, sides?: number, rings?: number);
}
/**
 * Sphere class
 * @class Sphere
 */
declare class Sphere extends Drawable {
    constructor(radius: number, slices: number, stacks: number);
}
/**
 * Quad class
 * @class Quad
 */
declare class Plane extends Drawable {
    constructor(xsize: number, zsize: number, xdivs: number, zdivs: number, smax?: number, tmax?: number);
}
/**
 * Cube class
 * @class Cube
 */
declare class Cube extends Drawable {
    /**
     * @param {number = 1.0} side: Number of sides
     */
    constructor(side?: number);
}
declare namespace ObjLoader {
    function loadObj(filename: string): Object;
}
/**
 * Mesh class
 * @class Mesh
 */
declare class Mesh extends Drawable {
    constructor(fileRoute: string);
    private createVAO(model, el);
    private loadJSON(url);
}
/**
 * Vector2<T> class
 * @class Vector2<T>
 */
declare class Vector2<T> {
    x: T;
    y: T;
    /**
     * Vector2<T> constructor
     * @param {T} x: First value
     * @param {T} y: Second value
     */
    constructor(x: T, y: T);
    /**
     * Check if two vector2<T> are equals
     * @param  {Vector2<T>} other: Second vector
     * @return {boolean}: True if both equals
     */
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
/**
 * Vector3<T> class
 * @class Vector3<T>
 */
declare class Vector3<T> {
    x: T;
    y: T;
    z: T;
    /**
     * Vector3<T> constructor
     * @param {T} x: First value
     * @param {T} y: Second value
     * @param {T} z: Third value
     */
    constructor(x: T, y: T, z: T);
    /**
     * Check if two vector3<T> are equals
     * @param  {Vector3<T>} other: Second vector
     * @return {boolean}: True if both equals
     */
    isEqual(other: Vector3<T>): boolean;
}
declare class Texture3D extends Texture {
    constructor(data: any, size: Vector3<number>, options?: {});
    bind(slot?: number): void;
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
    _depth: SimpleTexture2D;
    _colors: Array<Texture>;
    constructor(textures: Array<Texture>, size: Vector2<number>, depth?: boolean, stencil?: boolean, options?: {});
    private checkStatus(status);
    bind(): void;
    onlyBindTextures(): void;
    unbind(): void;
    rebuild(size: Vector2<number>): void;
    destroy(): void;
}
declare enum gbuffer_type {
    position = 0,
    normal = 1,
    diffuse = 2,
    num_textures = 3,
}
declare class GBuffer {
    /**
     * [framebuffer description]
     * @type {Framebuffer}
     */
    protected framebuffer: Framebuffer;
    /**
     * @param {Vector2<number>}
     */
    constructor(size: Vector2<number>);
    /**
     *
     */
    bindForReading(): void;
    /**
     *
     */
    bindForWriting(): void;
    /**
     *
     */
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
/**
* This class wrap PostProcess effects
*
* @class core.PostProcess
*/
declare class PostProcess {
    /**
     *
     */
    static initialize(): void;
    /**
     *
     */
    static bind(): void;
    /**
     *
     */
    static render(): void;
    /**
     * [_planeVAO description]
     * @type {VertexArray}
     */
    protected static _planeVAO: VertexArray;
    /**
     * [_planeVertexVBO description]
     * @type {VertexBuffer}
     */
    protected static _planeVertexVBO: VertexBuffer;
}
declare namespace Timer {
    /**
     *
     */
    function update(): void;
    /**
     * @return {number}
     */
    function deltaTime(): number;
}
declare class Color {
    /**
     * @param {[type]}
     */
    protected _color: any[];
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     */
    constructor(r: number, g: number, b: number);
    /**
     * @return {number}
     */
    /**
     * @param {number}
     */
    r: number;
    /**
     * @return {number}
     */
    /**
     * @param {number}
     */
    g: number;
    /**
     * @return {number}
     */
    /**
     * @param {number}
     */
    b: number;
    /**
     * @param {number}
     * @param {number}
     * @param {number}
     */
    setRGB(r: number, g: number, b: number): void;
    /**
     * @return {Color}
     */
    toHSL(): Color;
}
/**
 * Light abstract class
 * @class Light
 */
declare abstract class Light {
    /**
     * [Intensity value]
     * @type {number}
     */
    protected _intensity: number;
    /**
     * [Light color]
     * @type {Color}
     */
    protected _color: Color;
    protected _enable: boolean;
    /**
     * [Attenuation light value]
     * @type {Vector3<number>}
     */
    protected _attenuation: Vector3<number>;
    constructor();
    /**
     * Set constant attenuation value.
     * @param {number} v: Constant attenuation value.
     */
    setConstantAtt(value: number): void;
    /**
     * Set linear attenuation value.
     * @param {number} v: Linear attenuation value.
     */
    setLinearAtt(value: number): void;
    /**
     * Set quadratic attenuation value.
     * @param {number} v: Quadratic attenuation value.
     */
    setQuadraticAtt(value: number): void;
    /**
     * Get light attenuation value.
     * @return {Vector3<number>}
     */
    attenuation: Vector3<number>;
    /**
     * Get light intensity.
     * @return {number}
     */
    /**
     * Set light intensity.
     * @param {number} intensity: Light intensity.
     */
    intensity: number;
    /**
     * Get light color.
     * @return {Color}
     */
    /**
     * Set light color
     * @param {Color} color: Color value
     */
    color: Color;
}
/**
 * Point light class
 * @class PointLight
 */
declare class PointLight extends Light {
    /**
     * [Light position]
     * @type {Vector3<number>}
     */
    protected _position: Vector3<number>;
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
     */
    constructor(position?: Vector3<number>);
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    position: Vector3<number>;
    /**
     * Increment position from current position
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    addTransform(x?: number, y?: number, z?: number): void;
}
declare class Camera2 {
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
    GetOrthoProjectionMatrix(w: number, h: number): Float32Array;
    GetProjectionMatrix(w: number, h: number): Float32Array;
}
interface LoadAssets {
    (): void;
}
interface Initialize {
    (): void;
}
interface DrawCallback {
    (dt: number): void;
}
declare namespace _init__ {
    function init(loadAssets: LoadAssets, text: any): void;
    function start(initialize: Initialize, drawScene: DrawCallback): void;
    function render(dt: number): void;
}
declare let camera: Camera2;
declare let gl_: any;
declare let esferita: Sphere;
declare let cubito: Cube;
declare let SimpleConfig: () => {
    max: number;
};
declare let torito: Torus;
declare let planito: Plane;
declare let m: Mesh;
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
declare let framebuffer: Framebuffer;
declare function initialize(): void;
declare function cameraUpdateCb(): void;
declare function drawScene(dt: number): void;
/**
 * Camera abstract class
 * @class Camera
 */
declare abstract class Camera {
    protected _position: Float32Array;
    protected _view: Float32Array;
    protected _projection: Float32Array;
    protected _fov: number;
    protected _ar: number;
    protected _near: number;
    protected _far: number;
    protected _up: Float32Array;
    protected _look: Float32Array;
    /**
     * Camera definition
     * @param {Float32Array}
     * @param {number = 45.0}
     * @param {number = 0.01}
     * @param {number = 1000.0}
     * @param {number = 1.0}
     * @param {Float32Array = new Float32Array([0.0, 0.0, -1.0])}
     * @param {Float32Array = new Float32Array([0.0, 1.0, 0.0])}
     */
    constructor(pos: Float32Array, fovy?: number, near?: number, far?: number, aspRatio?: number, target?: Float32Array, up?: Float32Array);
    /**
     * Update view and projection matrix
     */
    abstract update(): any;
    /**
     * Get current camera position
     * @return {Float32Array}
     */
    /**
     * Set camera position
     * @param {Float32Array}
     */
    position: Float32Array;
    /**
     * Get current view matrix from camera
     * @return {Float32Array}
     */
    getViewMatrix(): Float32Array;
    /**
     * Get current projection matrix from camera
     * @return {Float32Array}
     */
    getProjectionMatrix(): Float32Array;
    /**
     * Get current field of view from camera
     * @return {number}
     */
    getFOV(): number;
    /**
     * Get current aspect radio from camera
     * @return {number}
     */
    getAspectRatio(): number;
    /**
     * Set near
     * @param {number} near
     */
    near: number;
    /**
     * Set far
     * @param {number} far
     */
    far: number;
    /**
     * Set field of view
     * @param {number} fovy
     */
    fov: number;
    /**
     * Set aspect ratio
     * @param {number} ar
     */
    aspRatio: number;
}
/**
 * Orthograhic camera class
 * @class OrthoCamera
 */
declare class OrthoCamera extends Camera {
    /**
     * Update view and projection matrix based on orthographic projection
     */
    update(): void;
}
/**
 * Perspective camera class
 * @class PerspectiveCamera
 */
declare class PerspectiveCamera extends Camera {
    /**
     * Update view and projection matrix based on perspective projection
     */
    update(): void;
}
/**
 * Blend wrapper
 * @class Blend
 */
declare class Blend {
    static gl: WebGLRenderingContext;
    /**
     * Enable blending
     */
    static enable(): void;
    /**
     * Specify the equation used for both the RGB blend equation and the Alpha blend equation
     * @param {BlendingEq} mode: Specifies how source and destination colors are combined
     */
    static equation(mode: BlendingEq): void;
    /**
     * Set the RGB blend equation and the alpha blend equation separately
     * @param {BlendingEqu} modeRGB: Specifies the RGB blend equation, how the red, green, and blue
     *      components of the source and destination colors are combined.
     * @param {BlendingEqu} modeAlpha: Specifies the alpha blend equation, how the alpha component
     *      of the source and destination colors are combined.
     */
    static equationSeparate(modeRGB: BlendingEqu, modeAlpha: BlendingEqu): void;
    getBlendEquRGB(): BlendingEqu;
    getBlendEquAlpha(): BlendingEqu;
    /**
     * Set the blend color
     * @param {number = 0.0} red
     * @param {number = 0.0} green
     * @param {number = 0.0} blue
     * @param {number = 0.0} alpha
     */
    static color(red?: number, green?: number, blue?: number, alpha?: number): void;
    /**
     * Specify pixel arithmetic.
     * @param {BlendingType = BlendingType.One} sfactor: Specifies how the red, green, blue, and alpha source blending factors are computed.
     * @param {BlendingType = BlendingType.Zero} dfactor: Specifies how the red, green, blue, and alpha destination blending factors are computed.
     */
    static func(sfactor?: BlendingType, dfactor?: BlendingType): void;
    /**
     * Specify pixel arithmetic for RGB and alpha components separately.
     * @param {BlendingType = BlendingType.One} rcRGB: Specifies how the red, green, and blue blending factors are computed.
     * @param {BlendingType = BlendingType.Zero} dstRGB: Specifies how the red, green, and blue destination blending factors are computed.
     * @param {BlendingType = BlendingType.One} srcAlpha: Specified how the alpha source blending factor is computed.
     * @param {BlendingType = BlendingType.Zero} dstAlpha: Specified how the alpha destination blending factor is computed.
     */
    static funcSeparate(srcRGB?: BlendingType, dstRGB?: BlendingType, srcAlpha?: BlendingType, dstAlpha?: BlendingType): void;
    /**
     * Disable blending
     */
    static disable(): void;
    /**
     * Checks if blending is activated
     * @return {boolean}: True if activated
     */
    static isEnabled(): boolean;
}
declare class Cull {
    static gl: WebGLRenderingContext;
    /**
     * Enable cullFace test.
     */
    static enable(): void;
    /**
     * Get current cullFace mode
     * @return {Face}: Current cullFace mode
     */
    static getMode(): Face;
    /**
     * Specify whether front/back-facing facets can be culled.
     * @param {Face} mode: Cull face mode
     */
    static setMode(mode: Face): void;
    /**
     * Disable cullFace test.
     */
    static disable(): void;
    /**
     * Checks if cullFace is activated
     * @return {boolean}: True if activated
     */
    static isEnabled(): boolean;
}
declare class Depth {
    static gl: WebGLRenderingContext;
    /**
     * Enable depth testing.
     */
    static enable(): void;
    /**
     * Enable writing into the depth buffer.
     */
    static use(): void;
    /**
     * Specify the mode used for depth buffer comparisons.
     * @param {ComparisonFunc} compFunc: Comparisor mode.
     */
    static comparison(compFunc: ComparisonFunc): void;
    /**
     * Specify mapping of depth values from normalized device coordinates to window coordinates.
     * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
     * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
     */
    static depthRange(znear?: number, zfar?: number): void;
    /**
     * Clear depth buffer.
     */
    static clear(): void;
    /**
     * Disable writing into the depth buffer.
     */
    static unuse(): void;
    /**
     * Disable depth testing.
     */
    static disable(): void;
    /**
     * Checks if depth test is activated
     * @return {boolean}: True if activated
     */
    static isEnabled(): boolean;
}
/**
 * scissor wrapper
 * @class Scissor
 */
declare class Scissor {
    static gl: WebGLRenderingContext;
    /**
     * Enable scissor test.
     */
    static use(): void;
    /**
     * Define the scissor box.
     * @param {number} x: Specifying the horizontal coordinate for the lower left corner of the box.
     * @param {number} y: Specifying the vertical coordinate for the lower left corner of the box.
     * @param {number} width: Specifying the width of the scissor box.
     * @param {number} height: Specifying the height of the scissor box.
     */
    setRectangle(x: number, y: number, width: number, height: number): void;
    /**
     * Get scissor rectangle in use.
     * @return {Int32Array}: Scissor box size [x, y, width, height]
     */
    getRectangle(): Int32Array;
    /**
     * Disable scissor test.
     */
    static unuse(): void;
    /**
     * Checks if scissor test is activated
     * @return {boolean}: True if activated
     */
    static isEnabled(): boolean;
}
/**
 * Stencil wrapper
 * @class Stencil
 */
declare class Stencil {
    static gl: WebGLRenderingContext;
    /**
     * Enable stencil test
     */
    static use(): void;
    /**
     * Set front and back function and reference value for stencil testing
     * @param {ComparisonFunc} compFunc: Specifies the test function.
     * @param {number} ref: Specifies the reference value for the stencil test
     * @param {number} mask: Specifies a mask that is ANDed with both the reference value and the stored stencil value when the test is done.
     */
    static func(compFun: ComparisonFunc, ref: number, mask: number): void;
    /**
     * Set front and back stencil test actions.
     * @param {StencilOp} fail: Action to take when the stencil test fails.
     * @param {StencilOp} zfail: Stencil action when the stencil test passes, but the depth test fails.
     * @param {StencilOp} zpass: Specifies the stencil action when both the stencil and depth test passes.
     */
    static operation(fail: StencilOp, zfail: StencilOp, zpass: StencilOp): void;
    /**
     * Control the front and back writing of individual bits in the stencil planes
     * @param {number} mask: Specifies a bit mask to enable and disable writing of individual bits in the stencil planes.
     */
    static mask(mask: number): void;
    /**
     * Fontrol the front and/or back writing of individual bits in the stencil planes
     * @param {Face} face: Specifies whether the front and/or back stencil writemask is updated
     * @param {number} mask: Specifies a bit mask to enable and disable writing of individual bits in the stencil planes.
     */
    static maskFace(face: Face, mask: number): void;
    static getFrontWriteMasks(): number;
    static getBackWriteMask(): number;
    static getBits(): number;
    /**
     * Clear stencil values
     */
    static clear(): void;
    /**
     * Disable stencil test
     */
    static unuse(): void;
    /**
     * Checks if stencil test is activated
     * @return {boolean}: True if activated
     */
    static isEnabled(): boolean;
}
declare namespace extensions {
    /**
     * @param {string}
     */
    function get(name: string): any;
}
declare enum LogLevel {
    ALL = 0,
    DEBUG = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    OFF = 5,
}
declare class Query {
    protected handle: any;
    constructor();
    destroy(): void;
    begin(target: any): void;
    end(target: any): void;
    oneUse(target: any, cb: any): void;
    getParameters(param: string): any;
    isResultAvailable(): any;
    getResult(): any;
}
declare class Ray {
    protected _origin: Vector3<number>;
    protected _direction: Vector3<number>;
    constructor(origin?: Vector3<number>, direction?: Vector3<number>);
    origin: Vector3<number>;
    direction: Vector3<number>;
    point_at(t: number): Vector3<number>;
}
declare class TransformFeedback {
    static gl: WebGLRenderingContext;
    protected _handle: any;
    constructor();
    destroy(): void;
    bind(target: number): void;
    unbind(target: any): void;
    begin(primitiveMode: any): void;
    pause(): void;
    resume(): void;
    end(): void;
    varyings(program: number, varyings: any, bufferMode: any): any;
    getVarying(program: number, idx: any): any;
}
declare class Woit {
    constructor();
    resize(size: Vector2<number>): void;
    firstStep(prog: Program, near: number, far: number, cullFace: boolean, alfa: number, w: number): void;
    secondStep(prog: Program, near: any, far: any): void;
    protected clearBuffers(): void;
    protected initPlane(): void;
    fbo: any;
    accBufTexId: any;
    depthBuffTexId: any;
    revealBuffId: any;
    planeVAO: any;
    planeVBO: any;
    color0: any;
    color1: any;
}
/**
 * Directional light class
 * @class DirectionalLight
 */
declare class DirectionalLight extends Light {
    /**
     * [Light direction]
     * @type {Vector3<number>}
     */
    protected _direction: Vector3<number>;
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction
     */
    constructor(direction?: Vector3<number>);
    /**
     * Get light direction
     * @return {Vector3<number>}
     */
    /**
     * Set light direction
     * @param {Vector3<number>} direction
     */
    direction: Vector3<number>;
}
/**
 * Spot light class
 * @class SpotLight
 */
declare class SpotLight extends Light {
    /**
     * [Light position]
     * @type {Vector3<number>}
     */
    protected _position: Vector3<number>;
    /**
     * [Light direction]
     * @type {Vector3<number>}
     */
    protected _direction: Vector3<number>;
    /**
     * [CutOff flashlight]
     * @type {number}
     */
    protected _cutOff: number;
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction
     */
    constructor(position?: Vector3<number>, direction?: Vector3<number>);
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    position: Vector3<number>;
    /**
     * Get light direction
     * @return {Vector3<number>}
     */
    /**
     * Set light direction
     * @param {Vector3<number>} direction
     */
    direction: Vector3<number>;
}
/**
 * Mat2 class
 * @class Mat2
 */
declare class Mat2 {
    protected _value: Float32Array;
    constructor();
    identity(): void;
    transpose(): void;
    toString: () => string;
    isExactEqual(other: Mat2): boolean;
    isEqual(other: Mat2): boolean;
}
/**
 * Mat3 class
 * @class Mat3
 */
declare class Mat3 {
    protected _value: Float32Array;
    constructor();
    toString: () => string;
}
/**
 * Mat4 class
 * @class Mat4
 */
declare class Mat4 {
    protected _value: Float32Array;
    constructor();
    toString: () => string;
}
/**
 * Quaternion class
 * @class Quaternion
 */
declare class Quaternion {
    protected _value: Float32Array;
    /**
     * Creates a new quaternion
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * Sets a quaternion to represent the shortest rotation from one
     *      vector to another.
     * @param {Float32Array} init: Initial vector
     * @param {Float32Array} dest: Destination vector
     */
    rotationTo(init: Float32Array, dest: Float32Array): void;
    /**
     * Set quaternion value to identity
     */
    setIdentity(): void;
    /**
     * Create a copy of this quaternion
     * @return {Quaternion}
     */
    clone(): Quaternion;
    /**
     * Calculate dot product with another quaternion
     * @param {Quaternion}
     */
    dot(q: Quaternion): void;
    /**
     * Calculate multiplication with another quaternion
     * @param {Quaternion}
     */
    mult(q: Quaternion): void;
    /**
     * Normalize quaternion
     */
    normalize(): void;
    /**
     * Invert quaternion
     */
    invert(): void;
    /**
     * Rotates quaternion by the given angle (in radians) about the X axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    rotateX(angle: number): void;
    /**
     * Rotates quaternion by the given angle (in radians) about the Y axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    rotateY(angle: number): void;
    /**
     * Rotates quaternion by the given angle (in radians) about the Z axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    rotateZ(angle: number): void;
    toString: () => string;
    /**
     * Performs a linear interpolation between this and another Quaternion
     * @param {Quaternion}
     * @param {number} t: Intepolation amount between quaternions
     */
    lerp(q: Quaternion, t: number): void;
}
/**
 * Vect2 class
 * @class Vect2
 */
declare class Vect2 {
    protected _value: Float32Array;
    /**
     * Creates a new vect2
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     */
    constructor(x?: number, y?: number);
    toString: () => string;
    add(v: Vect2): void;
    sub(v: Vect2): void;
    mult(other: Vect2): void;
    div(other: Vect2): void;
    negate(): void;
    scale(value: number): void;
    distance(): number;
    x: number;
    y: number;
    lerp(other: Vect2, t: number): Vect2;
    isEqual(other: Vect2): boolean;
    dot(other: Vect2): number;
}
/**
 * Vect3 class
 * @class Vect3
 */
declare class Vect3 {
    protected _value: Float32Array;
    /**
     * Creates a new vect3
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    constructor(x?: number, y?: number, z?: number);
    toString: () => string;
    add(v: Vect3): void;
    sub(v: Vect3): void;
    mult(other: Vect3): void;
    div(other: Vect3): void;
    negate(): void;
    scale(value: number): void;
    distance(): number;
    x: number;
    y: number;
    z: number;
    lerp(other: Vect3, t: number): Vect3;
    isEqual(other: Vect3): boolean;
    dot(other: Vect3): number;
}
/**
 * Vect4 class
 * @class Vect4
 */
declare class Vect4 {
    protected _value: Float32Array;
    /**
     * Creates a new vect2
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    constructor(x?: number, y?: number, z?: number, w?: number);
    toString: () => string;
    add(v: Vect4): void;
    sub(v: Vect4): void;
    mult(other: Vect4): void;
    div(other: Vect4): void;
    negate(): void;
    scale(value: number): void;
    distance(): number;
    x: number;
    y: number;
    z: number;
    w: number;
    lerp(other: Vect4, t: number): Vect4;
    isEqual(other: Vect4): boolean;
    dot(other: Vect4): number;
}
/**
 * Vector4<T> class
 * @class Vector4<T>
 */
declare class Vector4<T> {
    x: T;
    y: T;
    z: T;
    w: T;
    /**
     * Vector4<T> constructor
     * @param {T} x: First value
     * @param {T} y: Second value
     * @param {T} z: Third value
     * @param {T} z: Fourth value
     */
    constructor(x: T, y: T, z: T, w: T);
    /**
     * Check if two vector4<T> are equals
     * @param  {Vector4<T>} other: Second vector
     * @return {boolean}: True if both equals
     */
    isEqual(other: Vector4<T>): boolean;
}
declare class Icosphere extends Drawable {
    constructor(its?: number);
}
declare class AudioSource {
    /**
     * [_audioContext description]
     * @type {AudioContext}
     */
    protected _audioContext: AudioContext;
    /**
     * [_bgAudioNode description]
     * @type {AudioBufferSourceNode}
     */
    protected _bgAudioNode: AudioBufferSourceNode;
    /**
     *
     */
    constructor();
    /**
     *
     */
    initAudioContext(): void;
    /**
     *
     */
    stopBackgroundAudio(): void;
    /**
     * @param {string}
     */
    playSound(clipName: string): void;
    /**
     * @return {boolean}
     */
    isBackgroundAudioPlaying(): boolean;
    /**
     * @param {string}
     */
    playBackgroundAudio(clipName: string): void;
    /**
     *
     */
    protected _stopBackgroundAudio(): void;
}
declare class Font {
    loadFont(fontName: string): void;
    unloadFont(fontName: string): void;
}
declare namespace Font {
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
    /**
     * [skyboxVBO description]
     * @type {WebGLBuffer}
     */
    protected skyboxVBO: WebGLBuffer;
    /**
     * [_prog description]
     * @type {Program}
     */
    protected _prog: Program;
    /**
     * [cubeMapTexture description]
     * @type {CubeMapTexture}
     */
    protected cubeMapTexture: CubeMapTexture;
    /**
     * @param {string}
     */
    constructor(dir: string);
    /**
     * @param {Float32Array}
     * @param {Float32Array}
     */
    render(view: Float32Array, projection: Float32Array): void;
    /**
     *
     */
    destroy(): void;
    /**
     * @param {Array<string>}
     */
    protected _loadCubemap(faces: Array<string>): void;
}
declare class Sprite {
    static prog: Program;
    static buffer: VertexBuffer;
    static initialize(): void;
}
declare abstract class Material {
}
declare class DepthMat extends Material {
    static ss: Program;
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
declare class Object3D {
    protected _childs: Array<Object3D>;
    _id: string;
    constructor();
    add(...childs: Object3D[]): void;
    remove(child: Object3D): void;
    removeAll(): void;
    protected static uidCounters: {};
    protected static uid(id?: string): string;
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
declare class SceneGraph {
    protected _root: Object3D;
    protected _lights: Array<Light>;
    constructor();
    addLight(l: Light): void;
}
declare class FloatTexture extends Texture2D {
    constructor(image: any, size: Vector2<number>, options?: {});
}
declare class SimpleTexture3D extends Texture3D {
    constructor(size: Vector3<number>, options?: {});
}
declare class Texture2DArray extends Texture {
    constructor();
    bind(slot?: number): void;
    destroy(): void;
}
declare class VideoTexture extends Texture2D {
    _videoElem: HTMLVideoElement;
    constructor(data: any, options?: {});
    updateTexture(): void;
}
