/// <reference path="light.ts" />

"use strict";

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
        this.direction = direction;
        this.position = position;
    }
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    get position() { return this._position; }
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    set position(position: Vector3<number>) { this._position = position; }

    /**
     * Get light direction
     * @return {Vector3<number>}
     */
    get direction() { return this._direction; }
    /**
     * Set light direction
     * @param {Vector3<number>} direction
     */
    set direction(direction: Vector3<number>) { this._direction = direction; }
}