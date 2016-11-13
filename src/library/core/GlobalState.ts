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
    export class CullingState {
        protected _context: GLContext;
        constructor(context: GLContext) {
            this._context = context;
        };
        protected _currentFrontFace: ctes.FaceDir = null;
        protected _cullingEnabled: boolean = false;
        protected _cullingFaceMode: ctes.FaceSide = MB.ctes.FaceSide.FrontAndBack;
        /**
         * Cull face enable/disable
         * @param {boolean} enabled True if cull face enable
         */
        public setStatus(enabled: boolean) {
            if (this._cullingEnabled !== enabled) {
                const gl: WebGL2RenderingContext = this._context.gl;
                if (enabled === true) {
                    gl.enable(gl.CULL_FACE);
                } else {
                    gl.disable(gl.CULL_FACE);
                }
                this._cullingEnabled = enabled;
            }
        };
        public setFlipSided(flipSided: ctes.FaceDir) {
            if (this._currentFrontFace !== flipSided) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.frontFace(flipSided);
                this._currentFrontFace = flipSided;
            }
        };
        /**
         * Get current cullFace mode
         * @return {MB.ctes.FaceSide}: Current cullFace mode
         */
        public getMode(): MB.ctes.FaceSide {
            return this._cullingFaceMode;
        };
        /**
         * Specify whether front/back-facing facets can be culled.
         * @param {MB.ctes.FaceSide} mode: Cull face mode
         */
        public setMode(mode: MB.ctes.FaceSide) {
            if (this._cullingFaceMode !== mode) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.cullFace(mode);
                this._cullingFaceMode = mode;
            }
        }
        /**
         * Checks if cullFace is activated
         * @return {boolean}: True if activated
         */
        public isEnabled(): boolean {
            return this._cullingEnabled === true;
        };
        public resetCulling() {
            this._cullingEnabled = false;
            this._cullingFaceMode = MB.ctes.FaceSide.FrontAndBack;
        };
    };
    export class DepthState {
        protected _context: GLContext;
        constructor(context: GLContext) {
            this._context = context;
        };
        protected _depthEnabled: boolean = false;
        protected _currentDepthMask: boolean = false;
        protected _currentDepthFunc: ctes.ComparisonFunc = null;
        protected _currentDepthClear = null;
        protected _znear: number = 0.0;
        protected _zfar: number = 1.0;

        /**
         * Checks if depth test is activated
         * @return {boolean}: True if activated
         */
        public isEnabled(): boolean {
            return this._depthEnabled === true;
        };
        public isMask(): boolean {
            return this._currentDepthMask === true;
        };
        public getCurrentComparisonFunc(): ctes.ComparisonFunc {
            return this._currentDepthFunc;
        };
        /**
         * Specify the mode used for depth buffer comparisons.
         * @param {MB.ctes.ComparisonFunc} compFunc: Comparisor mode.
         */
        public setFunc(depthFunc: ctes.ComparisonFunc) {
            if (this._currentDepthFunc !== depthFunc) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.depthFunc(depthFunc);
                this._currentDepthFunc = depthFunc;
            }
        };
        public setStatus(enabled: boolean) {
            if (this._depthEnabled !== enabled) {
                const gl: WebGL2RenderingContext = this._context.gl;
                if (enabled === true) {
                    gl.enable(gl.DEPTH_TEST);
                } else {
                    gl.disable(gl.DEPTH_TEST);
                }
                this._depthEnabled = enabled;
            }
        };
        public setMask(mask: boolean) {
            if (this._currentDepthMask !== mask) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.depthMask(mask);
                this._currentDepthMask = mask;
            }
        };
        public setClear(depth: number) {
            if (this._currentDepthClear !== depth) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.clearDepth(depth);
                this._currentDepthClear = depth;
            }
        };
        /**
         * Clear depth buffer.
         */
        public clearBuffer() {
            const gl = this._context.gl;
            gl.clear(gl.DEPTH_BUFFER_BIT);
        };
        public reset() {
            // this._depthEnabled = true;
            // this._currentDepthMask = true;
            this.setFunc(ctes.ComparisonFunc.Less);
            // this._currentDepthClear = null;
        };
        /**
         * Specify mapping of depth values from normalized device coordinates to window coordinates.
         * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
         * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
         */
        public depthRange(znear: number = 0.0, zfar: number = 1.0) {
            if (!(znear === this._znear && zfar === this._zfar)) {
                const gl: WebGL2RenderingContext = this._context.gl;
                if (znear > zfar || znear < 0.0 || zfar > 1.0) {
                    console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
                    return;
                }
                gl.depthRange(znear, zfar);
                this._znear = znear;
                this._zfar = zfar;
            }
        };
    };
    export class ColorState {
        protected _context: GLContext;
        constructor(context: GLContext) {
            this._context = context;
        };
        protected _currentColorMask: Vector4<boolean>;
        protected _currentColorClear: Color4 = null; // new Color4(0.0, 0.0, 0.0, 1.0);

        public setMask(colorMask: MB.Vector4<boolean>) {
            if (!this._currentColorMask || this._currentColorMask.isEqual(colorMask) === false) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.colorMask(colorMask.x, colorMask.y, colorMask.z, colorMask.w);
                this._currentColorMask = colorMask.clone();
            }
        };
        public setClear(r: number, g: number, b: number, a: number) {
            this.setClearColor(new MB.Color4(r, g, b, a));
        }
        /**
         * Set new clear color value.
         * @param {Color4} bgColor: New clear color.
         */
        public setClearColor(bgColor: Color4) {
            if (!this._currentColorClear || this._currentColorClear.isEquals(bgColor) === false) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.clearColor(bgColor.r, bgColor.g, bgColor.b, bgColor.a);
                this._currentColorClear = bgColor.clone();
            }
        }
        public reset() {
            this._currentColorMask = null;
            this.setClearColor(new MB.Color4(0.0, 0.0, 0.0, 1.0));
        };
        /**
         * Clear color values
         */
        public clearBuffer() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    };
    export class ScissorsState {
        protected _context: GLContext;
        protected _scissorsEnabled: boolean = false;
        protected _scissorsBox: MB.Box2D = new MB.Box2D();
        constructor(context: GLContext) {
            this._context = context;
        };

        set status(enabled: boolean) {
            if (this._scissorsEnabled !== enabled) {
                const gl: WebGL2RenderingContext = this._context.gl;
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
        public setRectangle(x: number, y: number, width: number, height: number) {
            let b: MB.Box2D = new MB.Box2D(new MB.Vect2(x, y), new MB.Vect2(width, height));
            if (!this._scissorsBox.isEqual(b)) {
                const gl: WebGL2RenderingContext = this._context.gl;
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
        public setRectangleBox2D(b: MB.Box2D) {
            if (!this._scissorsBox.isEqual(b)) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.scissor(b.min.x, b.min.y, b.max.x, b.max.y);
                this._scissorsBox = b;
            }
        };
        /**
         * Get scissor rectangle in use.
         * @return {MB.Box2D}: Scissor box size
         */
        public getRectangle(): MB.Box2D {
            return this._scissorsBox;
        };
        /**
         * Checks if scissor test is activated
         * @return {boolean}: True if activated
         */
        public isEnabled(): boolean {
            return this._scissorsEnabled === true;
        }
    };
    export class StencilState {
        protected _context: GLContext;
        protected _stencilEnabled: boolean = false;
        protected _currentStencilMask: number = 0;
        protected _currentStencilFunc: MB.ctes.ComparisonFunc = null;
        protected _currentStencilRef: number = null;
        protected _currentStencilFuncMask: number = null;
        protected _currentStencilFail: MB.ctes.StencilOp  = null;
        protected _currentStencilZFail: MB.ctes.StencilOp = null;
        protected _currentStencilZPass: MB.ctes.StencilOp = null;
        protected _currentStencilClear: number = null;
        constructor(context: GLContext) {
            this._context = context;
        };

        public setTest(enabled: boolean) {
            if (this._stencilEnabled !== enabled) {
                const gl: WebGL2RenderingContext = this._context.gl;
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
        public setMaskValue(mask: number) {
            if (this._currentStencilMask !== mask) {
                const gl: WebGL2RenderingContext = this._context.gl;
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
        public setFunc(compFun: MB.ctes.ComparisonFunc, ref: number, mask: number) {
            if (this._currentStencilFunc !== compFun ||
                this._currentStencilRef !== ref ||
                this._currentStencilFuncMask !== mask) {

                const gl: WebGL2RenderingContext = this._context.gl;
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
        public setOp(fail: MB.ctes.StencilOp, zfail: MB.ctes.StencilOp, zpass: MB.ctes.StencilOp) {
            if (this._currentStencilFail !== fail
                || this._currentStencilZFail !== zfail
                || this._currentStencilZPass !== zpass) {

                const gl: WebGL2RenderingContext = this._context.gl;
                gl.stencilOp(fail, zfail, zpass);

                this._currentStencilFail = fail;
                this._currentStencilZFail = zfail;
                this._currentStencilZPass = zpass;
            }
        }
        public getMaskValue(mask: number) {
            return this._currentStencilMask;
        }
        public setClear(s: number) {
            if (this._currentStencilClear !== s) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.clearStencil(s);
                this._currentStencilClear = s;
            }
        };
        public reset() {
            this._currentStencilClear = null;
            this._currentStencilFail = null;
            this._currentStencilFunc = null;
            this._currentStencilMask = null;
            this._currentStencilRef = null;
            this._currentStencilZFail = null;
            this._currentStencilZPass = null;
            this._currentStencilFuncMask = null;
        }
        /**
         * Control the front and/or back writing of individual bits in the stencil planes
         * @param {MB.ctes.FaceSide} face Specifies whether the front and/or back stencil writemask is updated
         * @param {number} mask Specifies a bit mask to enable and disable writing of individual
         *    bits in the stencil planes.
         */
        public setMaskFace(face: MB.ctes.FaceSide, mask: number) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.stencilMaskSeparate(face, mask);
        }
        /**
         * Get front write mask.
         * @return {number}
         */
        public getFrontWriteMask(): number {
            const gl: WebGL2RenderingContext = this._context.gl;
            return gl.getParameter(gl.STENCIL_WRITEMASK);
        }
        /**
         * Get back write mask.
         * @return {number}
         */
        public getBackWriteMask(): number {
            const gl: WebGL2RenderingContext = this._context.gl;
            return gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
        }
        /**
         * Get stencil bits.
         * @return {number}
         */
        public getBits(): number {
            const gl: WebGL2RenderingContext = this._context.gl;
            return gl.getParameter(gl.STENCIL_BITS);
        }
        /**
         * Clear stencil values.
         */
        public clearBuffer() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.clear(gl.STENCIL_BUFFER_BIT);
        }
        /**
         * Checks if stencil test is activated.
         * @return {boolean} True if activated.
         */
        public isEnabled(): boolean {
            const gl: WebGL2RenderingContext = this._context.gl;
            return gl.isEnabled(gl.STENCIL_TEST);
        }
    };
    export class BlendingState {
        protected _context: GLContext;
        protected _modeRGB: MB.ctes.BlendingEq = MB.ctes.BlendingEq.Add;
        protected _modeAlpha: MB.ctes.BlendingEq = MB.ctes.BlendingEq.Add;
        protected _color: MB.Vect4 = null;
        constructor(context: GLContext) {
            this._context = context;
        };
        protected _blendingEnabled: boolean = false;
        /**
         * Change blending status (eables or disabled)
         * @param {boolean} enabled Enable/disable blending
         */
        public setStatus(enabled: boolean) {
            if (this._blendingEnabled !== enabled) {
                const gl: WebGL2RenderingContext = this._context.gl;
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
         *     the Alpha blend equation.
         * @param {MB.ctes.BlendingEq} mode Specifies how source and destination
         *     colors are combined.
         */
        public setEquation(mode: MB.ctes.BlendingEq) {
            if (this._modeRGB !== mode && this._modeAlpha !== mode) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.blendEquation(mode);
                this._modeRGB = mode;
                this._modeAlpha = mode;
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
        public setEquationSeparate(modeRGB: MB.ctes.BlendingEq, modeAlpha: MB.ctes.BlendingEq) {
            if (this._modeRGB !== modeRGB && this._modeAlpha !== modeAlpha) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.blendEquationSeparate(modeRGB, modeAlpha);
                this._modeRGB = modeRGB;
                this._modeAlpha = modeAlpha;
            }
        };
        public getquationRGB(): MB.ctes.BlendingEq {
            return this._modeRGB;
        };
        public getEquationAlpha(): MB.ctes.BlendingEq {
            return this._modeAlpha;
        };
        /**
         * Set the source and destination blending factors.
         * @param {number = 0.0} red
         * @param {number = 0.0} green
         * @param {number = 0.0} blue
         * @param {number = 0.0} alpha
         */
        public setColor(red: number = 0.0,
            green: number = 0.0,
            blue: number = 0.0,
            alpha: number = 0.0) {
            let blendColor = new MB.Vect4(red, green, blue, alpha);
            if (!this._color || this._color.isEquals(blendColor) === false) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.blendColor(red, green, blue, alpha);
                this._color = blendColor;
            }
        };
        public getColor(): MB.Vect4 {
            return this._color;
        };
        /**
         * Specify pixel arithmetic.
         * @param {MB.ctes.BlendingMode = MB.ctes.BlendingMode.One} sfactor Specifies how the red,
         *     green, blue, and alpha source blending factors are computed.
         * @param {MB.ctes.BlendingMode = MB.ctes.BlendingMode.Zero} dfactor Specifies how the red,
         *     green, blue, and alpha destination blending factors are computed.
         */
        public setFunc(sfactor: MB.ctes.BlendingMode = MB.ctes.BlendingMode.One,
            dfactor: MB.ctes.BlendingMode = MB.ctes.BlendingMode.Zero) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.blendFunc(sfactor, dfactor); // TODO: Cache
        };
        /**
         * Specify pixel arithmetic for RGB and alpha components separately.
         * @param {MB.ctes.BlendingMode = MB.ctes.BlendingMode.One} rcRGB Specifies how the red, green,
         *      and blue blending factors are computed.
         * @param {MB.ctes.BlendingMode = MB.ctes.BlendingMode.Zero} dstRGB Specifies how the red, green,
         *      and blue destination blending factors are computed.
         * @param {MB.ctes.BlendingMode = MB.ctes.BlendingMode.One} srcAlpha Specified how the alpha source
         *      blending factor is computed.
         * @param {MB.ctes.BlendingMode = MB.ctes.BlendingMode.Zero} dstAlpha Specified how the alpha destination
         *      blending factor is computed.
         */
        public setFuncSeparate(srcRGB: MB.ctes.BlendingMode = MB.ctes.BlendingMode.One,
            dstRGB: MB.ctes.BlendingMode = MB.ctes.BlendingMode.Zero,
            srcAlpha: MB.ctes.BlendingMode = MB.ctes.BlendingMode.One,
            dstAlpha: MB.ctes.BlendingMode = MB.ctes.BlendingMode.Zero) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha); // TODO: Cache
        };
        /**
         * Checks if blending is activated
         * @return {boolean} True if activated
         */
        public isEnabled(): boolean {
            return this._blendingEnabled === true;
        };

        protected _currentBlending = MB.ctes.BlendingMode2.None;
        public set(blend: MB.ctes.BlendingMode2) {
            if (blend !== MB.ctes.BlendingMode2.None) {
                this.setStatus(true);
            } else {
                this.setStatus(false);
                this._currentBlending = blend;
            }
            if (blend !== this._currentBlending) {
                if (blend === MB.ctes.BlendingMode2.Additive) {
                    this.setEquation(MB.ctes.BlendingEq.Add);
                    this.setFunc(
                        MB.ctes.BlendingMode.SrcAlpha,
                        MB.ctes.BlendingMode.One
                    );
                } else if (blend === MB.ctes.BlendingMode2.Substractive) {
                    this.setEquation(MB.ctes.BlendingEq.Add);
                    this.setFunc(
                        MB.ctes.BlendingMode.Zero,
                        MB.ctes.BlendingMode.OneMinusSrcColor
                    );
                } else if (blend === MB.ctes.BlendingMode2.Multiply) {
                    this.setEquation(MB.ctes.BlendingEq.Add);
                    this.setFunc(
                        MB.ctes.BlendingMode.Zero,
                        MB.ctes.BlendingMode.SrcColor
                    );
                } else {
                    this.setEquationSeparate(
                        MB.ctes.BlendingEq.Add,
                        MB.ctes.BlendingEq.Add
                    );
                    this.setFuncSeparate(
                        MB.ctes.BlendingMode.SrcAlpha,
                        MB.ctes.BlendingMode.OneMinusSrcAlpha,
                        MB.ctes.BlendingMode.One,
                        MB.ctes.BlendingMode.OneMinusSrcAlpha
                    );
                }
            }
        };
    };
    /**
     * GlobalState class
     * @class GlobalState
     *
     * This class is used to manage the WebGL state
     *     machine through a common API.
     */
    export class GlobalState {
        protected _context: GLContext;
        constructor(context: GLContext) {
            this._context = context;
            this.depth = new DepthState(context);
            this.culling = new CullingState(context);
            this.color = new ColorState(context);
            this.stencil = new StencilState(context);
            this.blending = new BlendingState(context);

            this.color.setClear(0.0, 0.0, 0.0, 1.0);
            this.depth.setClear(1.0);
            this.stencil.setClear(0.0);

            this.depth.setStatus(true);
            this.depth.setFunc(MB.ctes.ComparisonFunc.LessEqual);

            this.culling.setFlipSided(MB.ctes.FaceDir.InvClockwise);
            this.culling.setMode(MB.ctes.FaceSide.Back);
            this.culling.setStatus(true);

            this.blending.set(MB.ctes.BlendingMode2.Normal);

            this._capabilites = {};
        };
        public depth: DepthState;
        public culling: CullingState;
        public color: ColorState;
        public stencil: StencilState;
        public blending: BlendingState;

        _currentLineWidth: number = 1.0;
        public setLineWidth(width: number) {
            if (width !== this._currentLineWidth) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.lineWidth(width);
                this._currentLineWidth = width;
            }
        };

        protected _viewport: Vector4<number> = new Vector4<number>(0.0, 0.0, 0.0, 0.0);
        protected _poligonOffsetEnable: boolean;
        protected _currentPolygonOffsetFactor: number;
        protected _currentPolygonOffsetUnits: number;

        public setViewport(viewport: Vector4<number>) {
            if (this._viewport.isEqual(viewport) === false) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
                this._viewport = viewport.clone();
            }
        };
        /**
         * Specifies the scale factors and units to calculate depth values.
         * The offset is added before the depth test is performed and
         *     before the value is written into the depth buffer.
         * @param {boolean} enable [description]
         * @param {number}  factor [description]
         * @param {number}  units  [description]
         */
        public setPolygonOffset(enable: boolean, factor: number, units: number) {
            if (enable) {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.enable(gl.POLYGON_OFFSET_FILL);
                if (this._currentPolygonOffsetFactor !== factor
                    || this._currentPolygonOffsetUnits !== units ) {
                    gl.polygonOffset( factor, units );
                    this._currentPolygonOffsetFactor = factor;
                    this._currentPolygonOffsetUnits = units;
                }
            } else {
                const gl: WebGL2RenderingContext = this._context.gl;
                gl.disable(gl.POLYGON_OFFSET_FILL);
            }
        };

        public clearBuffers() {
            const gl = this._context.gl;
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        };

        public clearAllBuffers() {
            const gl = this._context.gl;
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BITS);
        };

        public enable(cap: number) {
            if (this._capabilites[cap] !== true) {
                const gl = this._context.gl;
                gl.enable(cap);
                this._capabilites[cap] = true;
            }
        };
        public disable(cap: number) {
            if (this._capabilites[cap] !== false) {
                const gl = this._context.gl;
                gl.disable(cap);
                this._capabilites[cap] = false;
            }
        };

        protected _capabilites: { [key: number]: boolean};

        // Polygon offset
    };
};
