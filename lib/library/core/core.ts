/// <reference path="../tsd.d.ts" />

/// <reference path="input.ts" />
/// <reference path="../resources/quadToneMap.ts" />

declare var WebGL2RenderingContext: any;
"use strict";
/**
* This class get WebGL2 context and animationFrame for your navigator.
*
* @class core.Core
*/
class Core {
    private static _instance: Core = new Core();

    private _gl: WebGLRenderingContext;

    constructor() {
        if (Core._instance) {
            throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
        }
        // var canvas = <HTMLCanvasElement>document.getElementById("canvas");
        let canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;

        document.body.appendChild(canvas);
        
        this._gl = this._getContext(canvas);
        if (!this._gl) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        this._getVendors();

        Input.getInstance();
        // this.init();

        Core._instance = this;
    }

    public initialize(color: Array<number>) {
        const gl = this._gl;
        this.init();
        // ToneMap.init(gl);
        gl.clearColor(color[0], color[1], color[2], color[3]);
    }

    public clearColorAndDepth() {
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    }
    public changeViewport(x: number, y: number, w: number, h: number) {
        this._gl.viewport(x, y, w, h);
    }
    public canvas(): HTMLCanvasElement {
        return this._gl.canvas;
    }
    protected init() {
        const gl = this._gl;

        Depth.enable();
        Depth.comparison(ComparisonFunc.Less);

        // Set images to flip y axis to match the texture coordinate space.
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

        Cull.enable();
        Blend.disable();

    }

    public static getInstance(): Core {
        return Core._instance;
    }

    /**
    * Return global WebGL context
    *
    * @method getGL
    * @return {WebGLRenderingContext} Returns WebGL rendering context
    */
    public getGL(): WebGLRenderingContext {
        return this._gl;
    }

    protected _getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
        let contexts: string[] = "webgl2,experimental-webgl2".split(",");
        let gl: WebGLRenderingContext;
        let ctx;
        for (let i = 0; i < contexts.length; i++) {
            ctx = contexts[i];
            gl = <WebGLRenderingContext>canvas.getContext(contexts[i]);
            if (gl) {
                return gl;
            }
        }
        return null;
    }
    private _getVendors() {
        let vendors: string[] = "ms,moz,webkit,o".split(",");
        if (!window.requestAnimationFrame) {
            let vendor;
            for (let i = 0; i < vendors.length; i++) {
                vendor = vendors[i];
                window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
                window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
                if (window.requestAnimationFrame) {
                    break;
                }
            }
        }
        // Manual fallback
        if (!window.requestAnimationFrame) {
            let lastTime = 0;
            window.requestAnimationFrame = function(cb) {
                const currTime = Date.now();
                const timeToCall = Math.max(0, 16 - (currTime - lastTime));
                const id = window.setTimeout(function() {
                    cb(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        };
    }
}

const gl = Core.getInstance().getGL();

// Stencil operation
enum StencilOp {
    Keep = gl.KEEP,                         ///< Keep the stencil value
    Zero = gl.ZERO,                         ///< Set the stencil value to zero
    Replace = gl.REPLACE,                   ///< Replace the stencil value with the reference value
    Increase = gl.INCR,                     ///< Increase the stencil value by one, wrap if necessary
    IncreaseSaturate = gl.INCR_WRAP,        ///< Increase the stencil value by one, clamp if necessary
    Decrease = gl.DECR,                     ///< Decrease the stencil value by one, wrap if necessary
    DecreaseSaturate = gl.DECR_WRAP,        ///< Decrease the stencil value by one, clamp if necessary
    Invert = gl.INVERT                      ///< Invert the stencil data (bitwise not)
};

// Comparison function
enum ComparisonFunc {
    // TODO (glDisable(gl.DEPTH_TEST) Disabled,       ///< Comparison is disabled
    Never = gl.NEVER,                       ///< Comparison always fails
    Always = gl.ALWAYS,                     ///< Comparison always succeeds
    Less = gl.LESS,                         ///< Passes if source is less than the destination
    Equal = gl.EQUAL,                       ///< Passes if source is equal to the destination
    NotEqual = gl.NOTEQUAL,                 ///< Passes if source is not equal to the destination
    LessEqual = gl.LEQUAL,                  ///< Passes if source is less than or equal to the destination
    Greater = gl.GREATER,                   ///< Passes if source is greater than to the destination
    GreaterEqual = gl.GEQUAL                ///< Passes if source is greater than or equal to the destination
}

// Cull mode
enum Face {
    // TODO (glDisable(gl.CULL_FACE) None = gl.NONE,               ///< No culling
    Front = gl.FRONT,                       ///< Cull front-facing primitives
    Back = gl.BACK,                         ///< Cull back-facing primitives
    FrontAndBack = gl.FRONT_AND_BACK        ///< Cull Front and back-facing primitives
};

// Front face directions
enum FaceDir {
    Clockwise = gl.CW,                      ///< Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction
    InvClockwise = gl.CCW                   ///< Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction
}

// Array buffer type
enum BufferType {
    Array = gl.ARRAY_BUFFER,
    ElementArray = gl.ELEMENT_ARRAY_BUFFER,
    TransformFeedback = (<any>gl).TRANSFORM_FEEDBACK_BUFFER,
    Uniform = (<any>gl).UNIFORM_BUFFER,
    PixelPack = (<any>gl).PIXEL_PACK_BUFFER,
    PixelUnpack = (<any>gl).PIXEL_UNPACK_BUFFER,
    CopyRead = (<any>gl).COPY_READ_BUFFER,
    CopyWrite = (<any>gl).COPY_WRITE_BUFFER,
};

// Usage type
enum UsageType {
    StaticDraw = gl.STATIC_DRAW,
    DynamicDraw = gl.DYNAMIC_DRAW,
    StreamDraw = gl.STREAM_DRAW,

    StaticRead = (<any>gl).STATIC_READ,
    DynamicRead = (<any>gl).DYNAMIC_READ,
    StreamRead = (<any>gl).STREAM_READ,

    StaticCopy = (<any>gl).STATIC_COPY,
    DynamicCopy = (<any>gl).DYNAMIC_COPY,
    StreamCopy = (<any>gl).STREAM_COPY,
};

// Blending type
enum BlendingType {
    Zero = gl.ZERO,
    One = gl.ONE,
    SrcColor = gl.SRC_COLOR,
    OneMinusSrcColor = gl.ONE_MINUS_SRC_COLOR,
    SrcAlpha = gl.SRC_ALPHA,
    OneMinusSrcAlpha = gl.ONE_MINUS_SRC_ALPHA,
    DstAlpha = gl.DST_ALPHA,
    OneMinusDstAlpha = gl.ONE_MINUS_DST_ALPHA,
    DstColor = gl.DST_COLOR,
    OneMinusDstColor = gl.ONE_MINUS_DST_COLOR,
    SrcAlphaSaturate = gl.SRC_ALPHA_SATURATE,
    CteColor = gl.CONSTANT_COLOR,
    OneMinusCteColor = gl.ONE_MINUS_CONSTANT_COLOR,
    CteAlpha = gl.CONSTANT_ALPHA,
    OneMinusCteAlpha = gl.ONE_MINUS_CONSTANT_ALPHA,
};

enum BlendingEqu {
    Add = gl.FUNC_ADD,
    Substract = gl.FUNC_SUBTRACT,
    RevSubstract = gl.FUNC_REVERSE_SUBTRACT,
    Min = (<any>gl).MIN,        // TODO: EXT_blend_minmax
    Max = (<any>gl).MAX         // TODO: EXT_blend_minmax
};

// Render Primitive type
enum RenderType {
    Points = gl.POINTS,
    Lines = gl.LINES,
    LineLoop = gl.LINE_LOOP,
    LineStrip = gl.LINE_STRIP,
    Triangles = gl.TRIANGLES,
    TriangleStrip = gl.TRIANGLE_STRIP,
    TriangleFan = gl.TRIANGLE_FAN,
};

// Blending equaiton
enum BlendingEq {
    FuncAdd = gl.FUNC_ADD,
    FuncSub = gl.FUNC_SUBTRACT,
    FuncRevSub = gl.FUNC_REVERSE_SUBTRACT,
    /**
    When using the EXT_blend_minmax extension:
    ext.MIN_EXT: Minimum of source and destination,
    ext.MAX_EXT: Maximum of source and destination.
    When using a WebGL 2 context, the following values are available additionally:
    gl.MIN: Minimum of source and destination,
    gl.MAX: Maximum of source and destination.
    /**/
}

// TODO: Texture Filter