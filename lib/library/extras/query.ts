/// <reference path="../core/core.ts" />

"use strict";

class Query {
	protected handle;
	constructor() {
        const gl = Core.getInstance().getGL();
		this.handle = (<any>gl).createQuery();
	}
	public destroy() {
        const gl = Core.getInstance().getGL();
		(<any>gl).deleteQuery(this.handle);
	}
	public begin(target) {
        const gl = Core.getInstance().getGL();
		(<any>gl).beginQuery(target, this.handle);
	}
	public end(target) {
        const gl = Core.getInstance().getGL();
		(<any>gl).endQuery(target);
	}
	public oneUse(target, cb) {
		this.begin(target);
		cb();
		this.end(target);
	}
	public getParameters(param: string) {
        const gl = Core.getInstance().getGL();
	    const res = (<any>gl).getQueryParameters(this.handle, param);
	    return res;
	}
	public isResultAvailable() {
        const gl = Core.getInstance().getGL();
		return this.getParameters((<any>gl).QUERY_RESULT_AVAILABLE);
	}
	public getResult() {
        const gl = Core.getInstance().getGL();
		return this.getParameters((<any>gl).QUERY_RESULT);
	}
}