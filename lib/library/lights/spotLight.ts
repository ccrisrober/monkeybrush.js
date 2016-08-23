/// <reference path="light.ts" />

import Light from "./light";
import Vector3 from "../maths/vector3";

"use strict";

// TODO: Replace Vector3 to Vect3


/**
 * Spot light class
 * @class SpotLight
 */
class SpotLight extends Light {
    /**
     * [Light position]
     * @type {Vector3<number>}
     */
    protected _position: Vector3<number>;
    /**
     * [Light direction]
     * @type {Vector3<number>}
     */
    protected _direction: Vector3<number>;
    /**
     * [CutOff flashlight]
     * @type {number}
     */
    protected _cutOff: number;  // TODO: Unused

    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} direction
     */
    constructor(position: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0),
        direction: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)) {
        super();
        this._direction = direction;
        this._position = position;
    }
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    // TODO: get position() { return this._position; }
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    // TODO: set position(position: Vector3<number>) { this._position = position; }

    /**
     * Get light direction
     * @return {Vector3<number>}
     */
    // TODO: get direction() { return this._direction; }
    /**
     * Set light direction
     * @param {Vector3<number>} direction
     */
    // TODO: set direction(direction: Vector3<number>) { this._direction = direction; }
};

export default SpotLight;
