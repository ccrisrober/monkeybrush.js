/// <reference path="../core/core.ts" />
/// <reference path="../maths/vector2.ts" />

import Vector2 from "../maths/vector2";

"use strict";

// TODO: Redimension
abstract class Texture {
    protected _handle: WebGLTexture;
    public _target: number; // TODO: protected
    protected _size: Vector2<number>;
    constructor(target: number) { // todo: size!
        this._target = target;
    }
    // TODO: get target(): number { return this._target; }
    abstract destroy(): void;

    abstract bind(slot?: number);

    public handle(): WebGLTexture {
        return this._handle;
    }

    // TODO: Move to abstract methods
    public getHeight(): number { return -1; }
    public getWidth(): number { return -1; }
};

export default Texture;