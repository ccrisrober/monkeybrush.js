/// <reference path="../core/core.ts" />

import Core from "../core/core";

"use strict";

const gl = Core.getInstance().getGL();

class TransformFeedback {
    protected _handle;
    constructor() {
        this._handle = (<any>gl).createTransformFeedback();
    }

    public destroy() {
        (<any>gl).deleteTransformFeedback(this._handle);
    }

    public bind(target: number) {
        (<any>gl).bindTranformFeedback(target, this._handle);
    }

    public unbind(target) {
        (<any>gl).bindTransformFeedback(target, null);
    }

    public begin(primitiveMode) {
        (<any>gl).beginTranformFeedback(primitiveMode);
    }

    public pause() {
        (<any>gl).pauseTranformFeedback();
    }

    public resume() {
        (<any>gl).resumeTransformFeedback();
    }

    public end() {
        (<any>gl).endTranformFeedback();
    }

    public varyings(program: number, varyings, bufferMode) {
        return (<any>gl).transformFeedbackVaryings(program, varyings, bufferMode);
    }

    public getVarying(program: number, idx) {
        return (<any>gl).getTransformFeedbackVarying(program, idx);
    }
}

export default TransformFeedback;