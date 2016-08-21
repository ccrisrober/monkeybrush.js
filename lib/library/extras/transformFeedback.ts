/// <reference path="../core/core.ts" />

"use strict";

class TransformFeedback {
	static gl = Core.getInstance().getGL();
	protected _handle;
	constructor() {
    	this._handle = (<any>TransformFeedback.gl).createTransformFeedback();
	}

	public destroy() {
		(<any>TransformFeedback.gl).deleteTransformFeedback(this._handle);
	}

	public bind(target: number) {
		(<any>TransformFeedback.gl).bindTranformFeedback(target, this._handle);
	}

	public unbind(target) {
		(<any>TransformFeedback.gl).bindTransformFeedback(target, null);
	}

	public begin(primitiveMode) {
		(<any>TransformFeedback.gl).beginTranformFeedback(primitiveMode);
	}

	public pause() {
		(<any>TransformFeedback.gl).pauseTranformFeedback();
	}

	public resume() {
        (<any>TransformFeedback.gl).resumeTransformFeedback();
	}

	public end() {
		(<any>TransformFeedback.gl).endTranformFeedback();
	}

	public varyings(program: number, varyings, bufferMode) {
		return (<any>TransformFeedback.gl).transformFeedbackVaryings(program, varyings, bufferMode);
	}

	public getVarying(program: number, idx) {
    	return (<any>TransformFeedback.gl).getTransformFeedbackVarying(program, idx);
	}
}