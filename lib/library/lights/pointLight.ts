/// <reference path="light.ts" />

import Light from "./light";
import Vector3 from "../maths/vector3";

"use strict";

// TODO: Replace Vector3 to Vect3


/**
 * Point light class
 * @class PointLight
 */
class PointLight extends Light {
    /**
     * [Light position]
     * @type {Vector3<number>}
     */
    public/*protected*/ _position: Vector3<number>;
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
     */
    constructor(position: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)) {
        super();
        this._position = position;
    }
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    // TODO: get position(): Vector3<number> { return this._position; }
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    // TODO: set position(position: Vector3<number>) { this._position = position; }

    /**
     * Increment position from current position
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    public addTransform(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
    }
};

export default PointLight;
