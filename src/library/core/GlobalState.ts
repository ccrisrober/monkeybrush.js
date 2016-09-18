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
    /**
     * GlobalState class
     * @class GlobalState
     *
     * This class is used to manage the WebGL state
     *     machine through a common API.
     */
    export class GlobalState {
        public static initializeAll() {
            this.resetColors();
        }

        // ======================================================================
        // ======================================================================
        // ======================================================================
        // Color
        static _bgColor: MB.Color4;
        static _currentColorMask: MB.Vector4<boolean>;
        static _currentColorClear: MB.Color4;

        static setMask(colorMask: MB.Vector4<boolean>) {
            if (this._currentColorMask.isEqual(colorMask) === false) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.colorMask(colorMask.x, colorMask.y, colorMask.z, colorMask.w);
                this._currentColorMask = colorMask;
            }
        };
        /**
         * Set new clear color value
         * @param {number} r Red channel value
         * @param {number} g Green channel value
         * @param {number} b Blue channel value
         * @param {number = 1.0} a Alpha channel value
         */
        static setClearColor(r: number, g: number, b: number, a: number = 1.0) {
            this._bgColor.r = r;
            this._bgColor.g = g;
            this._bgColor.b = b;
            this._bgColor.a = a;

            if (this._currentColorClear.isEquals(this._bgColor) === false) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.clearColor(r, g, b, a);
                this._currentColorClear.copy(this._bgColor);
            }
        };
        static resetColors() {
            this._bgColor = new MB.Color4(0.0, 0.0, 0.0, 1.0);
            this._currentColorMask = new MB.Vector4<boolean>(true, true, true, true);
            this._currentColorClear = this._bgColor = new MB.Color4(0.0, 0.0, 0.0, 1);
        };


        // ======================================================================
        // ======================================================================
        // ======================================================================
        // Depth
        static _depthEnabled: boolean = false;
        static _currentDepthMask: boolean = false;
        static _currentDepthFunc: MB.ctes.ComparisonFunc = MB.ctes.ComparisonFunc.LessEqual;
        static _currentDepthClear = null;

        static getDepthComparison(): MB.ctes.ComparisonFunc {
            return this._currentDepthFunc;
        };
        /**
         * Specify mapping of depth values from normalized device coordinates to window coordinates.
         * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
         * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
         */
        static depthRange(znear: number = 0.0, zfar: number = 1.00) {
            // TODO: Cache
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            if (znear > zfar || znear < 0.0 || zfar > 1.0) {
                console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
                return;
            }
            gl.depthRange(znear, zfar);
        }
        static setDepthStatus(enabled: boolean) {
            if (this._depthEnabled !== enabled) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.DEPTH_TEST);
                } else {
                    gl.disable(gl.DEPTH_TEST);
                }
                this._depthEnabled = enabled;
            }
        };
        /**
         * Checks if depth test is activated
         * @return {boolean}: True if activated
         */
        static isDepthEnabled(): boolean {
            return this._depthEnabled === true;
        };
        static isDepthMask(): boolean {
            return this._currentDepthMask === true;
        };
        static setDepthMask(mask: boolean) {
            if (this._currentDepthMask !== mask) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.depthMask(mask);
                this._currentDepthMask = mask;
            }
        };
        /**
         * Specify the mode used for depth buffer comparisons.
         * @param {MB.ctes.ComparisonFunc} compFunc: Comparisor mode.
         */
        static setDepthComparisonFunc(depthFunc: MB.ctes.ComparisonFunc) {
            if (this._currentDepthFunc !== depthFunc) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.depthFunc(depthFunc);
                this._currentDepthFunc = depthFunc;
            }
        };
        static getCurrentDepthComparisonFunc(): MB.ctes.ComparisonFunc {
            return this._currentDepthFunc;
        }
        static setDepthClear(depth: number) {
            if (this._currentDepthClear !== depth) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.clearDepth(depth);
                this._currentDepthClear = depth;
            }
        };
        static resetDepth() {
            this._depthEnabled = true;
            this._currentDepthMask = true;
            this._currentDepthFunc = MB.ctes.ComparisonFunc.LessEqual;
            this._currentDepthClear = null;
        };
        /**
         * Clear depth buffer.
         */
        static clearDepth() {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.clear(gl.DEPTH_BUFFER_BIT);
        };

        // Stencil
        static _stencilEnabled: boolean = false;
        static _currentStencilMask: number = 0;
        static _currentStencilFunc: MB.ctes.ComparisonFunc = null;
        static _currentStencilRef: number = null;
        static _currentStencilFuncMask: number = null;
        static _currentStencilFail: MB.ctes.StencilOp  = null;
        static _currentStencilZFail: MB.ctes.StencilOp = null;
        static _currentStencilZPass: MB.ctes.StencilOp = null;
        static _currentStencilClear: number = null;

        static setStencilTest(enabled: boolean) {
            if (this._stencilEnabled !== enabled) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.STENCIL_TEST);
                } else {
                    gl.disable(gl.STENCIL_TEST);
                }
                this._stencilEnabled = enabled;
            }
        };
        /**
         * Control the front and back writing of individual bits in the stencil planes
         * @param {number} mask Specifies a bit mask to enable and disable writing of
         *    individual bits in the stencil planes.
         */
        static setStencilMask(mask: number) {
            if (this._currentStencilMask !== mask) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.stencilMask(mask);
                this._currentStencilMask = mask;
            }
        };
        /**
         * Set front and back function and reference value for stencil testing
         * @param {MB.ctes.ComparisonFunc} compFunc Specifies the test function.
         * @param {number} ref Specifies the reference value for the stencil test
         * @param {number} mask Specifies a mask that is ANDed with both the
         *    reference value and the stored stencil value when the test is done.
         */
        static setStencilFunc(compFun: MB.ctes.ComparisonFunc, ref: number, mask: number) {
            if (this._currentStencilFunc !== compFun && this._currentStencilRef !== ref
                && this._currentStencilFuncMask !== mask) {

                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.stencilFunc(compFun, ref, mask);

                this._currentStencilFunc = compFun;
                this._currentStencilRef = ref;
                this._currentStencilFuncMask = mask;
            }
        };
        /**
         * Set front and back stencil test actions.
         * @param {MB.ctes.StencilOp} fail Action to take when the stencil test fails.
         * @param {MB.ctes.StencilOp} zfail Stencil action when the stencil test passes,
         *    but the depth test fails.
         * @param {MB.ctes.StencilOp} zpass Specifies the stencil action when both the stencil
         *    and depth test passes.
         */
        static setStencilOp(fail: MB.ctes.StencilOp, zfail: MB.ctes.StencilOp, zpass: MB.ctes.StencilOp) {
            if (this._currentStencilFail !== fail && this._currentStencilZFail !== zfail
                && this._currentStencilZPass !== zpass) {

                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.stencilOp(fail, zfail, zpass);

                this._currentStencilFail = fail;
                this._currentStencilZFail = zfail;
                this._currentStencilZPass = zpass;
            }
        }
        public static getStencilMask(mask: number) {
            return this._currentStencilMask;
        }
        static setStencilClear(s: number) {
            if (this._currentStencilClear !== s) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.clearStencil(s);
                this._currentStencilClear = s;
            }
        };
        /**
         * Control the front and/or back writing of individual bits in the stencil planes
         * @param {MB.ctes.FaceSide} face Specifies whether the front and/or back stencil writemask is updated
         * @param {number} mask Specifies a bit mask to enable and disable writing of individual
         *    bits in the stencil planes.
         */
        public static setStencilMaskFace(face: MB.ctes.FaceSide, mask: number) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.stencilMaskSeparate(face, mask);
        }
        /**
         * Get front write mask
         * @return {number}
         */
        public static getStencilFrontWriteMask(): number {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_WRITEMASK);
        }
        /**
         * Get back write mask
         * @return {number}
         */
        public static getStencilBackWriteMask(): number {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
        }
        /**
         * Get stencil bits
         * @return {number}
         */
        public static getStencilBits(): number {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_BITS);
        }
        /**
         * Clear stencil values
         */
        public static clearStencil() {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.clear(gl.STENCIL_BUFFER_BIT);
        }
        /**
         * Checks if stencil test is activated
         * @return {boolean} True if activated
         */
        public static isStencilEnabled(): boolean {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.isEnabled(gl.STENCIL_TEST);
        }
        static resetStencil() {
            // TODO
        };

        // =================================================================
        // =================================================================
        // =================================================================
        // Culling
        static _cullingEnabled: boolean = false;
        static _cullingFaceMode: MB.ctes.FaceSide = MB.ctes.FaceSide.FrontAndBack;
        /**
         * Cull face enable/disable
         * @param {boolean} enabled True if cull face enable
         */
        static setCullingStatus(enabled: boolean) {
            if (this._cullingEnabled !== enabled) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.CULL_FACE);
                } else {
                    gl.disable(gl.CULL_FACE);
                }
                this._cullingEnabled = enabled;
            }
        };
        /**
         * Get current cullFace mode
         * @return {MB.ctes.FaceSide}: Current cullFace mode
         */
        static getCullingMode(): MB.ctes.FaceSide {
            return this._cullingFaceMode;
        };
        /**
         * Specify whether front/back-facing facets can be culled.
         * @param {MB.ctes.FaceSide} mode: Cull face mode
         */
        public static setCullingMode(mode: MB.ctes.FaceSide) {
            if (this._cullingFaceMode !== mode) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.cullFace(mode);
                this._cullingFaceMode = mode;
            }
        }
        /**
         * Checks if cullFace is activated
         * @return {boolean}: True if activated
         */
        public static isCullingEnabled(): boolean {
            return this._cullingEnabled === true;
        };
        public static resetCulling() {
            this._cullingEnabled = false;
            this._cullingFaceMode = MB.ctes.FaceSide.FrontAndBack;
        };


        // =================================================================
        // =================================================================
        // =================================================================
        // Blending
        static _blendingEnabled: boolean = false;
        static _blendingMode: MB.ctes.BlendingEq; // TODO
        /**
         * Change blending status (eables or disabled)
         * @param {boolean} enabled Enable/disable blending
         */
        static setBlendingStatus(enabled: boolean) {
            if (this._blendingEnabled !== enabled) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.BLEND);
                } else {
                    gl.disable(gl.BLEND);
                }
                this._blendingEnabled = enabled;
            }
        };
        /**
         * Specify the equation used for both the RGB blend equation and
         *     the Alpha blend equation
         * @param {MB.ctes.BlendingEq} mode Specifies how source and destination
         *     colors are combined
         */
        static setBlendingEquation(mode: MB.ctes.BlendingEq) {
            if (mode !== this._blendingMode) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.blendEquation(mode);
                this._blendingMode = mode;
            }
        };
        /**
         * Set the RGB blend equation and the alpha blend equation separately
         * @param {MB.ctes.BlendingEq} modeRGB Specifies the RGB blend equation,
         *      how thered, green, and blue components of the source and
         *      destination colors are combined.
         * @param {MB.ctes.BlendingEq} modeAlpha Specifies the alpha blend equation,
         *      how the alpha component of the source and destination colors
         *      are combined.
         */
        public static blendingEquationSeparate(modeRGB: MB.ctes.BlendingEq, modeAlpha: MB.ctes.BlendingEq) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.blendEquationSeparate(modeRGB, modeAlpha); // TODO: Cache
        };
        public getBlendingEquationRGB(): MB.ctes.BlendingEq {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.BLEND_EQUATION_RGB); // TODO: Cache
        };
        public getBlendingEquationAlpha(): MB.ctes.BlendingEq {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.BLEND_EQUATION_ALPHA); // TODO: Cache
        };
        /**
         * Set the blend color
         * @param {number = 0.0} red
         * @param {number = 0.0} green
         * @param {number = 0.0} blue
         * @param {number = 0.0} alpha
         */
        public static setBlendingColor(red: number = 0.0,
            green: number = 0.0,
            blue: number = 0.0,
            alpha: number = 0.0) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.blendColor(red, green, blue, alpha); // TODO: Cache
        };
        /**
         * Specify pixel arithmetic.
         * @param {MB.ctes.BlendingType = MB.ctes.BlendingType.One} sfactor Specifies how the red,
         *     green, blue, and alpha source blending factors are computed.
         * @param {MB.ctes.BlendingType = MB.ctes.BlendingType.Zero} dfactor Specifies how the red,
         *     green, blue, and alpha destination blending factors are computed.
         */
        public static setBlendingFunc(sfactor: MB.ctes.BlendingType = MB.ctes.BlendingType.One,
            dfactor: MB.ctes.BlendingType = MB.ctes.BlendingType.Zero) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.blendFunc(sfactor, dfactor); // TODO: Cache
        };
        /**
         * Specify pixel arithmetic for RGB and alpha components separately.
         * @param {MB.ctes.BlendingType = MB.ctes.BlendingType.One} rcRGB Specifies how the red, green,
         *      and blue blending factors are computed.
         * @param {MB.ctes.BlendingType = MB.ctes.BlendingType.Zero} dstRGB Specifies how the red, green,
         *      and blue destination blending factors are computed.
         * @param {MB.ctes.BlendingType = MB.ctes.BlendingType.One} srcAlpha Specified how the alpha source
         *      blending factor is computed.
         * @param {MB.ctes.BlendingType = MB.ctes.BlendingType.Zero} dstAlpha Specified how the alpha destination
         *      blending factor is computed.
         */
        public static setBlendingFuncSeparate(srcRGB: MB.ctes.BlendingType = MB.ctes.BlendingType.One,
            dstRGB: MB.ctes.BlendingType = MB.ctes.BlendingType.Zero,
            srcAlpha: MB.ctes.BlendingType = MB.ctes.BlendingType.One,
            dstAlpha: MB.ctes.BlendingType = MB.ctes.BlendingType.Zero) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha); // TODO: Cache
        };
        /**
         * Checks if blending is activated
         * @return {boolean} True if activated
         */
        static isBlendingEnabled(): boolean {
            return this._blendingEnabled === true;
        };



        // Scissors
        static _scissorsEnabled: boolean = false;
        static _scissorsBox: MB.Box2D = new MB.Box2D();

        public static setScissorStatus(enabled: boolean) {
            if (this._scissorsEnabled !== enabled) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.SCISSOR_TEST);
                } else {
                    gl.disable(gl.SCISSOR_TEST);
                }
                this._scissorsEnabled = enabled;
            }
        };
        /**
         * Define the scissor box.
         * @param {number} x: Specifying the horizontal coordinate for the lower left corner of the box.
         * @param {number} y: Specifying the vertical coordinate for the lower left corner of the box.
         * @param {number} width: Specifying the width of the scissor box.
         * @param {number} height: Specifying the height of the scissor box.
         */
        public static setScissorsRectangle(x: number, y: number, width: number, height: number) {
            let b: MB.Box2D = new MB.Box2D(new MB.Vect2(x, y), new MB.Vect2(width, height));
            if (!this._scissorsBox.isEqual(b)) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.scissor(b.min.x, b.min.y, b.max.x, b.max.y);
                this._scissorsBox = b;
            }
        };
        /**
         * Define the scissor box.
         * @param {number} x: Specifying the horizontal coordinate for the lower left corner of the box.
         * @param {number} y: Specifying the vertical coordinate for the lower left corner of the box.
         * @param {number} width: Specifying the width of the scissor box.
         * @param {number} height: Specifying the height of the scissor box.
         */
        public static setScissorsRectangleBox2D(b: MB.Box2D) {
            if (!this._scissorsBox.isEqual(b)) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.scissor(b.min.x, b.min.y, b.max.x, b.max.y);
                this._scissorsBox = b;
            }
        };
        /**
         * Get scissor rectangle in use.
         * @return {MB.Box2D}: Scissor box size
         */
        public static getScissorsRectangle(): MB.Box2D {
            return this._scissorsBox;
        };
        /**
         * Checks if scissor test is activated
         * @return {boolean}: True if activated
         */
        public static isScissorsEnabled(): boolean {
            return this._scissorsEnabled === true;
        }





        static _currentLineWidth: number = 1.0;
        static setLineWidth(width: number) {
            if (width !== this._currentLineWidth) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.lineWidth(width);
                this._currentLineWidth = width;
            }
        }

        // Polygon offset
    };
};
