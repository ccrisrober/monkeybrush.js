/// <reference path="../core/core.ts" />

class TransformFeedback {
	protected _handle;
	constructor() {
        const gl = Core.getInstance().getGL();
    	this._handle = (<any>gl).createTransformFeedback();
	}

	public destroy() {
        const gl = Core.getInstance().getGL();
		(<any>gl).deleteTransformFeedback(this._handle);
	}

	public bind(target: number) {
        const gl = Core.getInstance().getGL();
		(<any>gl).bindTranformFeedback(target, this._handle);
	}

	public unbind(target) {
        const gl = Core.getInstance().getGL();
		(<any>gl).bindTransformFeedback(target, null);
	}

	public begin(primitiveMode) {
        const gl = Core.getInstance().getGL();
		(<any>gl).beginTranformFeedback(primitiveMode);
	}

	public pause() {
        const gl = Core.getInstance().getGL();
		(<any>gl).pauseTranformFeedback();
	}

	public resume() {
        const gl = Core.getInstance().getGL();
        (<any>gl).resumeTransformFeedback();
	}

	public end() {
        const gl = Core.getInstance().getGL();
		(<any>gl).endTranformFeedback();
	}

	public varyings(program: number, varyings, bufferMode) {
        const gl = Core.getInstance().getGL();
		return (<any>gl).transformFeedbackVaryings(program, varyings, bufferMode);
	}

	public getVarying(program: number, idx) {
        const gl = Core.getInstance().getGL();
    	return (<any>gl).getTransformFeedbackVarying(program, idx);
	}
}