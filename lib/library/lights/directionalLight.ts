/// <reference path="light.ts" />

import Light from "./light";
import Color from "../extras/color";
import Vector3 from "../maths/vector3";

"use strict";

// TODO: Replace Vector3 to Vect3

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
     * Directional light constructor
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction [description]
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
