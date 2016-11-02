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

namespace MB {
    export namespace ctes {
        /**
         * WebGL constants to clear buffer masks.
         */
        export enum ClearBuffer {
            DepthBuffer   = 0x00000100,
            StencilBuffer = 0x00000400,
            ColorBuffer   = 0x00004000
        };
        /**
         * WebGL constants primitives render modes
         */
        export enum RenderMode {
            Points = 0x0000,
            Lines = 0x0001,
            LineLoop = 0x0002,
            LineStrip = 0x0003,
            Triangles = 0x0004,
            TriangleStrip = 0x0005,
            TriangleFan = 0x0006,
        };
        /**
         * WebGL constants to specify blending mode
         */
        export enum BlendingMode {
            Zero = 0,
            One = 1,
            /**
             * Multiply a component by the source elements color.
             * @type {number}
             */
            SrcColor = 0x0300,
            /**
             * Multiply a component by one minus the source elements color.
             * @type {number}
             */
            OneMinusSrcColor = 0x0301,
            /**
             * Multiply a component by the source's alpha.
             * @type {number}
             */
            SrcAlpha = 0x0302,
            /**
             * Multiply a component by one minus the source's alpha.
             * @type {number}
             */
            OneMinusSrcAlpha = 0x0303,
            /**
             * Multiply a component by the destination's alpha.
             * @type {number}
             */
            DstAlpha = 0x0304,
            /**
             * Multiply a component by one minus the destination's alpha.
             * @type {number}
             */
            OneMinusDstAlpha = 0x0305,
            /**
             * Multiply a component by the destination's color.
             * @type {number}
             */
            DstColor = 0x0306,
            /**
             * Multiply a component by one minus the destination's color.
             * @type {number}
             */
            OneMinusDstColor = 0x0307,
            /**
             * Multiply a component by the minimum of source's alpha or
             *     one minus the destination's alpha.
             * @type {number}
             */
            SrcAlphaSaturate = 0x0308,
            /**
             * Specify a constant color blend function.
             * @type {number}
             */
            CteColor = 0x8001,
            /**
             * Specify one minus a constant color blend function.
             * @type {number}
             */
            OneMinusCteColor = 0x8002,
            /**
             * Specify a constant alpha blend function.
             * @type {number}
             */
            CteAlpha = 0x8003,
            /**
             * Specify one minus a constant alpha blend function.
             * @type {number}
             */
            OneMinusCteAlpha = 0x8004
        };
        /**
         * WebGL constants to control how the blending
         *     is calculated (for both, RBG and alpha, or separately).
         */
        export enum BlendingEq {
            /**
             * Set an addition blend function.
             * @type {number}
             */
            Add = 0x8006,
            /**
             * Specify a subtraction blend function (source - destination).
             * @type {number}
             */
            Substract = 0x800A,
            /**
             * Specify a reverse subtraction blend function (destination - source).
             * @type {number}
             */
            RevSubstract = 0x800B,
            /**
             * Produces the minimum color components of the source and destination colors.
             * @type {number}
             */
            Min = 0x8007,
            /**
             * Produces the maximum color components of the source and destination colors.
             * @type {number}
             */
            Max = 0x8008
        };
        /**
         * WebGL constants used with buffer management.
         */
        export enum BufferType {
            Array = 0x8892,
            ElementArray = 0x8893,
            TransformFeedback = 0x8C8E,
            Uniform = 0x8A11,
            PixelPack = 0x88EB,
            PixelUnpack = 0x88EC,
            CopyRead = 0x8F36,
            CopyWrite = 0x8F37,
        };
        export enum FaceSide {
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
        /**
         * WebGL constants used by enable and disable capabilites for context.
         * Example: gl.getParameter(ctes.GLParameters.BlendEq)
         */
        export enum GLStates {
            Blend = 0x0BE2,
            DepthTest = 0x0B71,
            Dither = 0x0BD0,
            PolygonOffsetFill = 0x8037,
            SAMPLE_ALPHA_TO_COVERAGE = 0x809E,
            SAMPLE_COVERAGE = 0x80A0,
            ScissorTest = 0x0C11,
            StencilTest = 0x0B90
        };
        /**
         * WebGL constants returned by gl.getError() method.
         */
        export enum GLErrors {
            NO_ERROR = 0,
            INVALID_ENUM = 0x0500,
            INVALID_VALUE = 0x0501,
            INVALID_OPERATION = 0x0502,
            OUT_OF_MEMORY = 0x0505,
            CONTEXT_LOST_WEBGL = 0x9242
        };
        /**
         * WebGL constants to specify front face direction.
         */
        export enum FaceDir {
            Clockwise = 0x0900,
            InvClockwise = 0x0901
        };
        /**
         * WebGL constants to specify data type.
         */
        export enum DataType {
            UnsignedByte = 0x1401,
            Byte = 0x1400,
            Short = 0x1402,
            UnsignedShort = 0x1403,
            Int = 0x1404,
            UnsignedInt = 0x1405,
            Float = 0x1406,
            HalfFloat = 0x140B
        };
        /**
         * WebGL constants to specify pixel format.
         */
        export enum PixelFormat {
            DepthComponent = 0x1902,
            Alpha = 0x1906,
            RGB = 0x1907,
            RGBA = 0x1908,
            Luminance = 0x1909,
            LuminanceAlpha = 0x190A,
            UNSIGNED_INT_2_10_10_10_REV = 0x8368,
            UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B,
            UNSIGNED_INT_5_9_9_9_REV = 0x8C3E,
            FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD,
            UNSIGNED_INT_24_8 = 0x84FA,
            HALF_FLOAT = 0x140B,
            RG = 0x8227,
            RgInt = 0x8228,
            INT_2_10_10_10_REV = 0x8D9f,

            RED = 0x1903,
            RGB8 = 0x8051,
            RGBA8 = 0x8058,


            RGB9_E5 = 0x8C3D,
            RGBA32UI = 0x8D70,
            RGB32UI = 0x8D71,
            RGBA16UI = 0x8D76,
            RGB16UI = 0x8D77,
            RGBA8UI = 0x8D7C,
            RGB8UI = 0x8D7D,
            RGBA32I = 0x8D82,
            RGB32I = 0x8D83,
            RGBA16I = 0x8D88,
            RGB16I = 0x8D89,
            RGBA8I = 0x8D8E,
            RGB8I = 0x8D8F,
            RED_INTEGER = 0x8D94,
            RGB_INTEGER = 0x8D98,
            RGBA_INTEGER = 0x8D99,
            R8 = 0x8229,
            RG8 = 0x822B,
            R16F = 0x822D,
            R32F = 0x822E,
            RG16F = 0x822F,
            RG32F = 0x8230,
            R8I = 0x8231,
            R8UI = 0x8232,
            R16I = 0x8233,
            R16UI = 0x8234,
            R32I = 0x8235,
            R32UI = 0x8236,
            RG8I = 0x8237,
            RG8UI = 0x8238,
            RG16I = 0x8239,
            RG16UI = 0x823A,
            RG32I = 0x823B,
            RG32UI = 0x823C,
            R8_SNORM = 0x8F94
        };
        /**
         * WebGL constants to specify shader type.
         */
        export enum ShaderType {
            vertex = 0x8B31,
            fragment = 0x8B30
        };
        /**
         * WebGL constants to specify read mode.
         */
        export enum ReadMode {
            read_file,
            read_script,
            read_text
        };
        /**
         * WebGL constants used by depth and stencil tests.
         */
        export enum ComparisonFunc {
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
        /**
         * WebGL constants used by stencil operations.
         */
        export enum StencilOp {
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
        export enum DrawBuffer {
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
        export enum QueryParams {
            QueryResult = 0x8866,
            QueryResultAvailable = 0x8867
        };
        export enum QueryTarget {
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
        export enum SamplerParameter {
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
        export enum SyncCondition {
            GPUCommandsComplete = 0x9117
        };
        export enum SyncStatus {
            Signaled = 0x9119,
            Unsignaled = 0x9118
        };
        export enum SyncType {
            Fence = 0x9116
        };
        export enum SyncWaitResult {
            ConditionSatisfied = 0x911C,
            AlreadySignaled = 0x911A,
            TimeoutExpired = 0x911B,
            WaitFailed = 0x911D
        };
        export enum TextureTarget {
            Texture2D = 0x0DE1,
            Texture3D = 0x806F,
            Texture2DArray = 0x8C1A,
            TextureCubeMap = 0x8513
        };
        export enum TextureFilter {
            // Returns the texel that is nearest to the center of the pixel begin renderer
            Nearest = 0x2600,
            // Returns the weighted average of the four texture elements that are closest
            //   to the center of the pixel being rendered.
            Linear = 0x2601,
            // Choose the mipmap that most closely matches the size of the pixel being
            //  textured and then apply the GL_NEAREST method to produce the sampled texture value.
            NearestMMNearest = 0x2700,
            // Choose the mipmap that most closely matches the size of the pixel being textured
            //  and then apply the GL_LINEAR method to produce the sampled texture value.
            LinearMMNearest = 0x2701,
            // Choose the two mipmaps that most closely matches the size of the pixel being textured.
            // Each of the two textures are sampled using the GL_NEAREST method and the weighted
            //   average of the two samples are used to produce the final value.
            NearestMMLinear = 0x2702,
            // Choose the two mipmaps that most closely matches the size of the pixel being textured.
            // Each of the two textures are sampled using the GL_LINEAR method and the weighted average
            //  of the two samples are used to produce the final value.
            LinearMMLinear = 0x2703,
        };
        export enum TFMode {
            Interleaved = 0x8C8C,
            Separate = 0x8C8D
        };
        export enum TFPrimitive {
            Points = 0x0000,
            Lines = 0x0001,
            Triangles = 0x0004
        };
        export enum TFTarget {
            TransformFeedback = 0x8E22
        };
        export enum UsageType {
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
        export enum WrapMode {
            Clamp2Edge = 0x812F,
            Repeat = 0x2901,
            MirroredRepeat = 0x8370
        };




        export enum BlendingMode2 {
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
        export enum CompressedTex {
            /**
             * One-channel (red) unsigned format compression.
             * @type {number}
             */
            R11EAC = 0x9270,
            /**
             * One-channel (red) signed format compression.
             * @type {number}
             */
            SignedR11EAC = 0x9271,
            /**
             * Two-channel (red and green) unsigned format compression.
             * @type {number}
             */
            RG11EAC = 0x9272,
            /**
             * Two-channel (red and green) signed format compression.
             * @type {number}
             */
            SignedRG11EAC = 0x9273,
            /**
             * Compresses RBG8 data with no alpha channel.
             * @type {number}
             */
            RGB8ETC2 = 0x9274,
            /**
             * Compresses RGBA8 data. The RGB part is encoded the same as RGB8ETC2,
             *     but the alpha part is encoded separately.
             * @type {number}
             */
            SRGB8ETC2 = 0x9275,
            /**
             * Compresses sRBG8 data with no alpha channel.
             * @type {number}
             */
            RGB8PunchAlphaETC2 = 0x9276,
            /**
             * Compresses sRBG8 data with no alpha channel.
             * @type {number}
             */
            SRGB8PunchAlphaETC = 0x9277,
            /**
             * Similar to RGB8ETC2, but with ability to punch through the alpha channel,
             *     which means to make it completely opaque or transparent.
             * @type {number}
             */
            RGBA8ETC2EAC = 0x9278,
            /**
             * Similar to SRGB8ETC2, but with ability to punch through the alpha channel,
             *     which means to make it completely opaque or transparent.
             * @type {number}
             */
            SRGBA8ETC2EAC = 0x9279,
        };
        export enum ShadingMode {
            None,
            Smooth,
            Flat
        };



        // Key code constants
        export enum KeyState {
            Delete = 8,
            Tab = 9,
            Enter = 13,
            Left_Shift = 16,
            Left_Control = 17,
            Alt = 18,
            Esc = 27,
            Space = 32,

            // arrows
            Left = 37,
            Up = 38,
            Right = 39,
            Down = 40,

            // numbers
            Zero = 48,
            One = 49,
            Two = 50,
            Three = 51,
            Four = 52,
            Five = 53,
            Six = 54,
            Seven = 55,
            Eight = 56,
            Nine = 57,

            // Alphabets
            A = 65,
            B = 66,
            C = 67,
            D = 68,
            E = 69,
            F = 70,
            G = 71,
            H = 72,
            I = 73,
            J = 74,
            K = 75,
            L = 76,
            M = 77,
            N = 78,
            O = 79,
            P = 80,
            Q = 81,
            R = 82,
            S = 83,
            T = 84,
            U = 85,
            V = 86,
            W = 87,
            X = 88,
            Y = 89,
            Z = 90,

            // NumPad
            Num0 = 96,
            Num1 = 97,
            Num2 = 98,
            Num3 = 99,
            Num4 = 100,
            Num5 = 101,
            Num6 = 102,
            Num7 = 103,
            Num8 = 104,
            Num9 = 105,

            // FX codes
            F1 = 112,
            F2 = 113,
            F3 = 114,
            F4 = 115,
            F5 = 116,
            F6 = 117,
            F7 = 118,
            F8 = 119,
            F9 = 120,
            F10 = 121,
            F11 = 122,
            F12 = 123,
            LastKeyCode = 222
        };


        // Mouse states
        export enum MouseButton {
            Left = 0,
            Middle = 1,
            Right = 2
        };
    };
};
