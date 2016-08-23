/// <reference path="../core/core.ts" />

import Core from "../core/core";

"use strict";

const gl = Core.getInstance().getGL();

class Query {
    protected handle;
    constructor() {
        this.handle = (<any>gl).createQuery();
    }
    public destroy() {
        (<any>gl).deleteQuery(this.handle);
    }
    public begin(target) {
        (<any>gl).beginQuery(target, this.handle);
    }
    public end(target) {
        (<any>gl).endQuery(target);
    }
    public oneUse(target, cb) {
        this.begin(target);
        cb();
        this.end(target);
    }
    public getParameters(param: string) {
        const res = (<any>gl).getQueryParameters(this.handle, param);
        return res;
    }
    public isResultAvailable() {
        return this.getParameters((<any>gl).QUERY_RESULT_AVAILABLE);
    }
    public getResult() {
        return this.getParameters((<any>gl).QUERY_RESULT);
    }
};

export default Query;