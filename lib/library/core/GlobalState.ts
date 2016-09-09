
import { Core } from "./Core";
import { Color4 } from "../extras/Color4";
import { Vector4 } from "../maths/Vector4";
import { BlendingEq } from "../constants/BlendingEq";
import { ComparisonFunc } from "../constants/ComparisonFunc";
import { FaceSide } from "../constants/FaceSide";

class GlobalState {
    static _bgColor: Color4 = new Color4(0.0, 0.0, 0.0, 1.0);
    static _currentColorMask: Vector4<boolean> = new Vector4<boolean>(true, true, true, true);
    static _currentColorClear: Color4 = new Color4(0.0, 0.0, 0.0, 1.0);

    static setMask(colorMask: Vector4<boolean>) {
        if (this._currentColorMask.isEqual(colorMask) === false) {
            const gl = Core.getInstance().getGL();
            gl.colorMask(colorMask.x, colorMask.y, colorMask.z, colorMask.w);
            this._currentColorMask = colorMask;
        }
    };
    static setClearColor(r, g, b, a) {
        this._bgColor.r = r;
        this._bgColor.g = g;
        this._bgColor.b = b;
        this._bgColor.a = a;

        if (this._currentColorClear.isEquals(this._bgColor) === false) {
            const gl = Core.getInstance().getGL();
            gl.clearColor(r, g, b, a);
            this._currentColorClear.copy(this._bgColor);
        }
    };
    static resetColors() {
        this._currentColorMask = new Vector4<boolean>(true, true, true, true);
        this._currentColorClear = this._bgColor = new Color4(0.0, 0.0, 0.0, 1);
    };

    // Depth
    static _depthEnabled: boolean = false;
    static _currentDepthMask: boolean = false;
    static _currentDepthFunc: ComparisonFunc = ComparisonFunc.LessEqual;
    static _currentDepthClear = null;

    static getDepthComparison(): ComparisonFunc {
        return this._currentDepthFunc;
    };
    /**
     * Specify mapping of depth values from normalized device coordinates to window coordinates.
     * @param {number = 0.0} znear: Specifies the mapping of the near clipping plane to window coordinates.
     * @param {number = 1.0} zfar: Specifies the mapping of the far clipping plane to window coordinates.
     */
    static depthRange(znear: number = 0.0, zfar: number = 1.00) {
        // TODO
    }
    static setDepthTest(enabled: boolean) {
        if (this._depthEnabled !== enabled) {
            const gl = Core.getInstance().getGL();
            if (enabled === true) {
                gl.enable(gl.DEPTH_TEST);
            } else {
                gl.disable(gl.DEPTH_TEST);
            }
            this._depthEnabled = enabled;
        }
    };
    static isDepthEnabled(): boolean {
        return this._depthEnabled === true;
    };
    static isDepthMask(): boolean {
        return this._currentDepthMask === true;
    };
    static setDepthMask(mask: boolean) {
        if (this._currentDepthMask !== mask) {
            const gl = Core.getInstance().getGL();
            gl.depthMask(mask);
            this._currentDepthMask = mask;
        }
    };
    /**
     * Specify the mode used for depth buffer comparisons.
     * @param {ComparisonFunc} compFunc: Comparisor mode.
     */
    static setDepthFunc(depthFunc: ComparisonFunc) {
        if (this._currentDepthFunc !== depthFunc) {
            const gl = Core.getInstance().getGL();
            gl.depthFunc(depthFunc);
            this._currentDepthFunc = depthFunc;
        }
    };
    static setDepthClear(depth: number) {
        if (this._currentDepthClear !== depth) {
            const gl = Core.getInstance().getGL();
            gl.clearDepth(depth);
            this._currentDepthClear = depth;
        }
    };
    static resetDepth() {
        this._depthEnabled = true;
        this._currentDepthMask = true;
        this._currentDepthFunc = ComparisonFunc.LessEqual;
        this._currentDepthClear = null;
    };

    // Stencil
    static _stencilEnabled: boolean = false;
    static _currentStencilMask: number = 0;
    static _currentStencilFunc = null;
    static _currentStencilRef = null;
    static _currentStencilFuncMask = null;
    static _currentStencilFail  = null;
    static _currentStencilZFail = null;
    static _currentStencilZPass = null;
    static _currentStencilClear = null;

    static setStencilTest(enabled: boolean) {
        if (this._stencilEnabled !== enabled) {
            const gl = Core.getInstance().getGL();
            if (enabled === true) {
                gl.enable(gl.STENCIL_TEST);
            } else {
                gl.disable(gl.STENCIL_TEST);
            }
            this._stencilEnabled = enabled;
        }
    };
    static setStencilMask(mask: number) {
        if (this._currentStencilMask !== mask) {
            const gl = Core.getInstance().getGL();
            gl.stencilMask(mask);
            this._currentStencilMask = mask;
        }
    };
    static setStencilFunc(stencilFunc, stencilRef, stencilMask) {
        // TODO
    };
    static setStencilOp(stencilFail, stencilZFail, stencilZPass) {
        // TODO
    };
    static setStencilClear(s: number) {
        if (this._currentStencilClear !== s) {
            const gl = Core.getInstance().getGL();
            gl.clearStencil(s);
            this._currentStencilClear = s;
        }
    };
    static resetStencil() {
        // TODO
    };

    // =================================================================
    // =================================================================
    // =================================================================
    // Culling
    static _cullingEnabled: boolean = false;
    static _cullingFaceMode: FaceSide = FaceSide.FrontAndBack;
    /**
     * Cull face enable/disable
     * @param {boolean} enabled True if cull face enable
     */
    static setCullingEnabled(enabled: boolean) {
        if (this._cullingEnabled !== enabled) {
            const gl = Core.getInstance().getGL();
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
     * @return {FaceSide}: Current cullFace mode
     */
    static getCullingMode(): FaceSide {
        return this._cullingFaceMode;
    }
    /**
     * Checks if cullFace is activated
     * @return {boolean}: True if activated
     */
    public static isCullingEnabled(): boolean {
        return this._cullingEnabled === true;
    };


    // =================================================================
    // =================================================================
    // =================================================================
    // Blending
    static _blendingEnabled: boolean = false;
    static _blendingMode: BlendingEq; // TODO
    static setBlendingEnabled(enabled: boolean) {
        if (this._blendingEnabled !== enabled) {
            const gl = Core.getInstance().getGL();
            if (enabled === true) {
                gl.enable(gl.BLEND);
            } else {
                gl.disable(gl.BLEND);
            }
            this._blendingEnabled = enabled;
        }
    };
    /**
     * Specify the equation used for both the RGB blend equation and the Alpha blend equation
     * @param {BlendingEq} mode Specifies how source and destination colors are combined
     */
    static equation(mode: BlendingEq) {
        if (mode !== this._blendingMode) {
            const gl = Core.getInstance().getGL();
            gl.blendEquation(mode);
            this._blendingMode = mode;
        }
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



    static _currentLineWidth: number = 1.0;
    static setLineWidth(width: number) {
        if (width !== this._currentLineWidth) {
            const gl = Core.getInstance().getGL();
            gl.lineWidth(width);
            this._currentLineWidth = width;
        }
    }

    // Polygon offset
};

export { GlobalState };
