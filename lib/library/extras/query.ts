/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


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
