/// <reference path="../constants/_constants.ts" />
/// <reference path="context.ts" />

import Context from "./context";

import BlendingEq from "../constants/BlendingEq";
import BlendingEqu from "../constants/BlendingEqu";
import BlendingType from "../constants/BlendingType";

"use strict";

/**
 * Blend wrapper
 * @class Blend
 */
class Blend {
    /**
     * Enable blending
     */
    public static enable() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.enable(gl.BLEND);
    }
    /**
     * Specify the equation used for both the RGB blend equation and the Alpha blend equation
     * @param {BlendingEq} mode: Specifies how source and destination colors are combined
     */
    public static equation(mode: BlendingEq) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.blendEquation(mode);
    }
    /**
     * Set the RGB blend equation and the alpha blend equation separately
     * @param {BlendingEqu} modeRGB: Specifies the RGB blend equation, how the red, green, and blue 
     *      components of the source and destination colors are combined.
     * @param {BlendingEqu} modeAlpha: Specifies the alpha blend equation, how the alpha component 
     *      of the source and destination colors are combined.
     */
    public static equationSeparate(modeRGB: BlendingEqu, modeAlpha: BlendingEqu) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.blendEquationSeparate(modeRGB, modeAlpha);
    }

    public getBlendEquRGB(): BlendingEqu {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        return gl.getParameter(gl.BLEND_EQUATION_RGB);
    }
    public getBlendEquAlpha(): BlendingEqu {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        return gl.getParameter(gl.BLEND_EQUATION_ALPHA);
    }
    /**
     * Set the blend color
     * @param {number = 0.0} red
     * @param {number = 0.0} green
     * @param {number = 0.0} blue
     * @param {number = 0.0} alpha
     */
    public static color(red: number = 0.0, 
        green: number = 0.0, 
        blue: number = 0.0, 
        alpha: number = 0.0) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.blendColor(red, green, blue, alpha);
    }
    /**
     * Specify pixel arithmetic.
     * @param {BlendingType = BlendingType.One} sfactor: Specifies how the red, green, blue, and alpha source blending factors are computed.
     * @param {BlendingType = BlendingType.Zero} dfactor: Specifies how the red, green, blue, and alpha destination blending factors are computed. 
     */
    public static func(sfactor: BlendingType = BlendingType.One, 
        dfactor: BlendingType = BlendingType.Zero) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.blendFunc(sfactor, dfactor);
    }

    /**
     * Specify pixel arithmetic for RGB and alpha components separately.
     * @param {BlendingType = BlendingType.One} rcRGB: Specifies how the red, green, and blue blending factors are computed.
     * @param {BlendingType = BlendingType.Zero} dstRGB: Specifies how the red, green, and blue destination blending factors are computed.
     * @param {BlendingType = BlendingType.One} srcAlpha: Specified how the alpha source blending factor is computed. 
     * @param {BlendingType = BlendingType.Zero} dstAlpha: Specified how the alpha destination blending factor is computed. 
     */
    public static funcSeparate(srcRGB: BlendingType = BlendingType.One, 
        dstRGB: BlendingType = BlendingType.Zero, 
        srcAlpha: BlendingType = BlendingType.One, 
        dstAlpha: BlendingType = BlendingType.Zero) {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
    }

    /**
     * Disable blending
     */
    public static disable() {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        gl.disable(gl.BLEND);
    }

    /**
     * Checks if blending is activated
     * @return {boolean}: True if activated
     */
    public static isEnabled(): boolean {
        const gl = Context.getContext(); // Core.getInstance().getGL();
        return gl.isEnabled(gl.BLEND);
    }

};

export default Blend;