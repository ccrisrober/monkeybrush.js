/// <reference path="object3d.ts" />
/// <reference path="../lights/light.ts" />

"use strict";

class SceneGraph {
    protected _root: Object3D;
    protected _lights: Array<Light>;
    constructor() {
        this._lights = [];
    }
    public addLight(l: Light) {
        this._lights.push(l);
    }
}