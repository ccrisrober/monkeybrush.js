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
    protected _handle: WebGLQuery;
    constructor() {
        this._handle = gl.createQuery();
    }
    public destroy() {
        gl.deleteQuery(this._handle);
    }
    public begin(target) {
        gl.beginQuery(target, this._handle);
    }
    public end(target) {
        gl.endQuery(target);
    }
    public oneUse(target, cb) {
        this.begin(target);
        cb();
        this.end(target);
    }
    public getParameters(param: number) {
        return gl.getQueryParameter(this._handle, param);
    }
    public isResultAvailable() {
        return this.getParameters(gl.QUERY_RESULT_AVAILABLE);
    }
    public getResult() {
        return this.getParameters(gl.QUERY_RESULT);
    }
};

export default Query;
