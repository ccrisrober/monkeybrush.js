/// <reference path="../extras/color.ts" />
/// <reference path="..//maths/vector3.ts" />

"use strict";

/**
 * Light abstract class
 * @class Light
 */
abstract class Light {
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
    constructor() {
        this.intensity = 1.0;
        this.color = new Color(1.0, 1.0, 1.0);
        this._enable = true;
        this._attenuation = new Vector3<number>(
            1.0,        // Constant
            0.014,      // Linear
            0.0007      // Quadratic
        );
    }

    /**
     * Set constant attenuation value.
     * @param {number} v: Constant attenuation value.
     */
    public setConstantAtt(value: number) {
        this._attenuation.x = value;
    }
    /**
     * Set linear attenuation value.
     * @param {number} v: Linear attenuation value.
     */
    public setLinearAtt(value: number) {
        this._attenuation.y = value;
    }
    /**
     * Set quadratic attenuation value.
     * @param {number} v: Quadratic attenuation value.
     */
    public setQuadraticAtt(value: number) {
        this._attenuation.z = value;
    }
    /**
     * Get light attenuation value.
     * @return {Vector3<number>}
     */
    get attenuation(): Vector3<number> { return this._attenuation; }
    
    /**
     * Get light intensity.
     * @return {number}
     */
    get intensity(): number { return this._intensity; }
    /**
     * Set light intensity.
     * @param {number} intensity: Light intensity.
     */
    set intensity(intensity: number) { this._intensity = intensity; }
    
    /**
     * Get light color.
     * @return {Color}
     */
    get color(): Color { return this._color; }
    /**
     * Set light color
     * @param {Color} color: Color value
     */
    set color(color: Color) { this._color = color; }
};