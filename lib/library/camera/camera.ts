/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";
/**
 * Camera abstract class
 * @class Camera
 */
abstract class Camera {
    protected _position: Float32Array;
    protected _view: Float32Array;
    protected _projection: Float32Array;
    protected _fov: number;
    protected _ar: number;
    protected _near: number;
    protected _far: number;

    protected _up: Float32Array;
    protected _look: Float32Array;
    /**
     * Camera definition
     * @param {Float32Array}
     * @param {number = 45.0}
     * @param {number = 0.01}
     * @param {number = 1000.0}
     * @param {number = 1.0}
     * @param {Float32Array = new Float32Array([0.0, 0.0, -1.0])}
     * @param {Float32Array = new Float32Array([0.0, 1.0, 0.0])}
     */
    constructor(pos: Float32Array, fovy: number = 45.0, 
        near: number = 0.01, far: number = 1000.0, 
        aspRatio: number = 1.0, 
        target: Float32Array = new Float32Array([0.0, 0.0, -1.0]), 
        up: Float32Array = new Float32Array([0.0, 1.0, 0.0])) {

        this._position = pos;
        this._projection = mat4.create();
        this._view = mat4.create();

        this._up = up;
        this._look = target;
        this._fov = fovy;
        this._ar = aspRatio;
        this._near = near;
        this._far = far;

        this.update();
    }
    /**
     * Update view and projection matrix
     */
    abstract update();
    /**
     * Get current camera position
     * @return {Float32Array}
     */
    // TODO: get position(): Float32Array { return this._position; }
    /**
     * Set camera position
     * @param {Float32Array}
     */
    // TODO: set position(pos: Float32Array) { this._position = pos; }
    /**
     * Get current view matrix from camera
     * @return {Float32Array}
     */
    public getViewMatrix(): Float32Array {
        return this._view;
    }
    /**
     * Get current projection matrix from camera
     * @return {Float32Array}
     */
    public getProjectionMatrix(): Float32Array {
        return this._projection;
    }
    /**
     * Get current field of view from camera
     * @return {number}
     */
    public getFOV(): number {
        return this._fov;
    }
    /**
     * Get current aspect radio from camera
     * @return {number}
     */
    public getAspectRatio(): number {
        return this._ar;
    }
    /**
     * Set near
     * @param {number} near
     */
    // TODO: public set near(near: number) { this._near = near; }
    /**
     * Set far
     * @param {number} far
     */
    // TODO: public set far(far: number) { this._far = far; }
    /**
     * Set field of view
     * @param {number} fovy
     */
    // TODO: public set fov(fovy: number) { this._fov = fovy; }
    /**
     * Set aspect ratio
     * @param {number} ar
     */
    // TODO: public set aspRatio(ar: number) { this._ar = ar; }
};

export default Camera;