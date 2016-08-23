/// <reference path="light.ts" />

import Light from "./light";
import Color from "../extras/color";
import Vector3 from "../maths/vector3";

"use strict";

/**
 * Directional light class
 * @class DirectionalLight
 */
class DirectionalLight extends Light {
    /**
     * [Light direction]
     * @type {Vector3<number>}
     */
    protected _direction: Vector3<number>;
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction
     */
    constructor(direction: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)) {
        super();
        this._direction = direction;
    }
    /**
     * Get light direction
     * @return {Vector3<number>}
     */
    // TODO: get direction(): Vector3<number> { return this._direction; }
    /**
     * Set light direction
     * @param {Vector3<number>} direction
     */
    // TODO: set direction(direction: Vector3<number>) { this._direction = direction; }
};

export default DirectionalLight;