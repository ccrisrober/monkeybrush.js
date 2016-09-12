/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


"use strict";

enum BlendingEq {
    Add = 0x8006,
    Substract = 0x800A,
    RevSubstract = 0x800B,
    Min = 0x8007,
    Max = 0x8008
};
enum BlendingMode {
    // gl.disable(gl.BLEND);
    None,
    // gl.enable(BLEND)
    // gl.blenEquation(FuncAdd)
    // gl.blendFuncSeparate(SrcAlpha, OneMinusSrcAlpha, One, OneMinusSrcAlpha)
    Normal,
    // gl.enable(BLEND)
    // gl.blenEquation(FuncAdd)
    // gl.blendFunc(SrcAlpha, One)
    Additive,
    // gl.enable(BLEND)
    // gl.blenEquation(FuncAdd)
    // gl.blendFunc(Zero, OneMinusSrcColor)
    Substractive,
    // gl.enable(BLEND)
    // gl.blenEquation(FuncAdd)
    // gl.blendFunc(Zero, SrcColor)
    Multiply,
    // ???
    Custom
};
enum BlendingType {
    Zero = 0,
    One = 1,
    SrcColor = 0x0300,
    OneMinusSrcColor = 0x0301,
    SrcAlpha = 0x0302,
    OneMinusSrcAlpha = 0x0303,
    DstAlpha = 0x0304,
    OneMinusDstAlpha = 0x0305,
    DstColor = 0x0306,
    OneMinusDstColor = 0x0307,
    SrcAlphaSaturate = 0x0308,
    CteColor = 0x8001,
    OneMinusCteColor = 0x8002,
    CteAlpha = 0x8003,
    OneMinusCteAlpha = 0x8004
};
enum BufferType {
    Array = 0x8892,
    ElementArray = 0x8893,
    TransformFeedback = 0x8C8E,
    Uniform = 0x8A11,
    PixelPack = 0x88EB,
    PixelUnpack = 0x88EC,
    CopyRead = 0x8F36,
    CopyWrite = 0x8F37,
};
enum ComparisonFunc {
    /**
     * Comparison always fails.
     */
    Never = 0x0200,
    /**
     * Passes if source is less than the destination.
     */
    Less = 0x0201,
    /**
     * Passes if source is equal to the destination.
     */
    Equal = 0x0202,
    /**
     * Passes if source is less than or equal to the destination.
     */
    LessEqual = 0x0203,
    /**
     * Passes if source is greater than to the destination.
     */
    Greater = 0x0204,
    /**
     * Passes if source is not equal to the destination.
     */
    NotEqual = 0x0205,
    /**
     * Passes if source is greater than or equal to the destination.
     */
    GreaterEqual = 0x0206,
    /**
     * Comparison always succeeds.
     */
    Always = 0x0207
};
enum CompressedTex {
    R11EAC = 0x9270,
    SignedR11EAC = 0x9271,
    RG11EAC = 0x9272,
    SignedRG11EAC = 0x9273,
    RGB8ETC2 = 0x9274,
    SRGB8ETC2 = 0x9275,
    RGB8PunchAlphaETC2 = 0x9276,
    SRGB8PunchAlphaETC = 0x9277,
    RGBA8ETC2EAC = 0x9278,
    SRGBA8ETC2EAC = 0x9279,
};
enum DataType {
    UnsignedByte = 0x1401,
    Byte = 0x1400,
    Short = 0x1402,
    UnsignedShort = 0x1403,
    Int = 0x1404,
    UnsignedInt = 0x1405,
    Float = 0x1406,
    HalfFloat = 0x140B
};
enum DrawBuffer {
    MaxDrawBuffers = 0x8824,
    DrawBuffer0  = 0x8825,
    DrawBuffer1  = 0x8826,
    DrawBuffer2  = 0x8827,
    DrawBuffer3  = 0x8828,
    DrawBuffer4  = 0x8829,
    DrawBuffer5  = 0x882A,
    DrawBuffer6  = 0x882B,
    DrawBuffer7  = 0x882C,
    DrawBuffer8  = 0x882D,
    DrawBuffer9  = 0x882E,
    DrawBuffer10 = 0x882F,
    DrawBuffer11 = 0x8830,
    DrawBuffer12 = 0x8831,
    DrawBuffer13 = 0x8832,
    DrawBuffer14 = 0x8833,
    DrawBuffer15 = 0x8834,

    MaxColorAttch = 0x8CDF,
    ColorAttach0  = 0x8CE0,
    ColorAttach1  = 0x8CE1,
    ColorAttach2  = 0x8CE2,
    ColorAttach3  = 0x8CE3,
    ColorAttach4  = 0x8CE4,
    ColorAttach5  = 0x8CE4,
    ColorAttach6  = 0x8CE6,
    ColorAttach7  = 0x8CE7,
    ColorAttach8  = 0x8CE8,
    ColorAttach9  = 0x8CE9,
    ColorAttach10 = 0x8CEA,
    ColorAttach11 = 0x8CEB,
    ColorAttach12 = 0x8CEC,
    ColorAttach13 = 0x8CED,
    ColorAttach14 = 0x8CEE,
    ColorAttach15 = 0x8CEF
};
enum FaceDir {
    Clockwise = 0x0900,
    InvClockwise = 0x0901
};
enum FaceSide {
    /**
     * Cull front-facing primitives.
     */
    Front = 0x0404,
    /**
     * Cull back-facing primitives.
     */
    Back = 0x0405,
    /**
     * Cull Front and back-facing primitives.
     */
    FrontAndBack = 0x0408
};
enum PixelType {
    Byte = 0x1400,
    UByte = 0x1401,
    Short = 0x1402,
    UShort = 0x1403,
    Int = 0x1404,
    UInt = 0x1405,
    Float = 0x1406
};
namespace ProgramCte {
    export enum mode {
        read_file,
        read_script,
        read_text
    };
    export enum shader_type {
        vertex = 0x8B31,
        fragment = 0x8B30
    }
};
enum QueryParams {
    QueryResult = 0x8866,
    QueryResultAvailable = 0x8867
};
enum QueryTarget {
    /**
     * Specifies an occlusion query: these queries detect whether
     * an object is visible (whether the scoped drawing commands pass
     * the depth test and if so, how many samples pass).
     */
    AnySamplesPassed = 0x8C2F,
    /**
     * Same as AnySamplesPassed, but less accurate and faster version.
     */
    AnySamplesPassedConservative = 0x8D6A,
    /**
     * Number of primitives that are written to transform feedback buffers.
     */
    TransformFeedbackPrimitivesWritten = 0x8C88
};
enum RenderType {
    Points = 0x0000,
    Lines = 0x0001,
    LineLoop = 0x0002,
    LineStrip = 0x0003,
    Triangles = 0x0004,
    TriangleStrip = 0x0005,
    TriangleFan = 0x0006,
};
enum SamplerParameter {
    TextureCompareFunc = 0x884D,
    TextureCompareMode = 0x884C,
    TextureMinFilter = 0x2801,
    TextureMinLOD = 0x813A,
    TextureMagFilter = 0x2800,
    TextureMaxLOD = 0x813B,
    TextureWrapR = 0x8072,
    TextureWrapS = 0x2802,
    TextureWrapT = 0x2803
};
enum ShadingMode {
    None,
    Smooth,
    Flat
};
enum StencilOp {
    /**
     * Keep the stencil value.
     */
    Keep = 0x1E00,
    /**
     * Set the stencil value to zero.
     */
    Zero = 0,
    /**
     * Replace the stencil value with the reference value.
     */
    Replace = 0x1E01,
    /**
     * Increase the stencil value by one, wrap if necessary.
     */
    Increase = 0x1E02,
    /**
     * Increase the stencil value by one, clamp if necessary.
     */
    IncreaseSaturate = 0x8507,
    /**
     * Decrease the stencil value by one, wrap if necessary.
     */
    Decrease = 0x1E03,
    /**
     * Decrease the stencil value by one, clamp if necessary.
     */
    DecreaseSaturate = 0x8508,
    /**
     * Invert the stencil data (bitwise not).
     */
    Invert = 0x150A
};
enum SyncCondition {
    GPUCommandsComplete = 0x9117
};
enum SyncStatus {
    Signaled = 0x9119,
    Unsignaled = 0x9118
};
enum SyncType {
    Fence = 0x9116
};
enum SyncWaitResult {
    ConditionSatisfied = 0x911C,
    AlreadySignaled = 0x911A,
    TimeoutExpired = 0x911B,
    WaitFailed = 0x911D
};
enum TextureFormat {
    RGB = 0x1907,
    RGBA = 0x1908,
    RED = 0x1903,
    LUMINANCE = 0x1909,
    LUMINANCEALPHA = 0x190A,
    ALPHA = 0x1906
};
enum TextureTarget {
    Texture2D = 0x0DE1,
    Texture3D = 0x806F,
    Texture2DArray = 0x8C1A,
    TextureCubeMap = 0x8513
};
enum TextureType {
    Nearest = 0x2600,
    Linear = 0x2601,
    NearestMMNearest = 0x2700,
    LinearMMNearest = 0x2701,
    NearestMMLinear = 0x2702,
    LinearMMLinear = 0x2703,
};
enum TFMode {
    Interleaved = 0x8C8C,
    Separate = 0x8C8D
};
enum TFPrimitive {
    Points = 0x0000,
    Lines = 0x0001,
    Triangles = 0x0004
};
enum TFTarget {
    TransformFeedback = 0x8E22
};
enum UsageType {
    StaticDraw = 0x88E4,
    DynamicDraw = 0x88E8,
    StreamDraw = 0x88E0,

    StaticRead = 0x88E5,
    DynamicRead = 0x88E9,
    StreamRead = 0x88E1,

    StaticCopy = 0x88E9,
    DynamicCopy = 0x88EA,
    StreamCopy = 0x88E2,
};
enum WrapMode {
    Clamp2Edge = 0x812F,
    Repeat = 0x2901,
    MirroredRepeat = 0x8370
};

export {
    BlendingEq, BlendingMode, BlendingType, BufferType, ComparisonFunc,
    CompressedTex, DataType, DrawBuffer, FaceDir, FaceSide,
    PixelType, ProgramCte, QueryParams, QueryTarget, RenderType, SamplerParameter,
    ShadingMode, StencilOp, SyncCondition, SyncStatus, SyncType,
    SyncWaitResult, TextureFormat, TextureTarget, TextureType,
    TFMode, TFPrimitive, TFTarget, UsageType, WrapMode
};
