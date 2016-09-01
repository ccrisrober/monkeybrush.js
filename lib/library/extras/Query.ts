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


/// <reference path="../core/Core.ts" />

import { Core } from "../core/Core";

"use strict";

class Query {
    protected _handle: WebGLQuery;
    constructor() {
        const gl = Core.getInstance().getGL();
        this._handle = gl.createQuery();
    }
    public destroy() {
        const gl = Core.getInstance().getGL();
        gl.deleteQuery(this._handle);
    }
    public begin(target) {
        const gl = Core.getInstance().getGL();
        gl.beginQuery(target, this._handle);
    }
    public end(target) {
        const gl = Core.getInstance().getGL();
        gl.endQuery(target);
    };
    public useAnySamples(cb: Function) {
        const gl = Core.getInstance().getGL();
        this.oneUse(gl.ANY_SAMPLES_PASSED, cb);
    };
    public useAnySamplesConservative(cb: Function) {
        const gl = Core.getInstance().getGL();
        this.oneUse(gl.ANY_SAMPLES_PASSED_CONSERVATIVE, cb);
    };
    public useTransfFeedbackPrimWritten(cb: Function) {
        const gl = Core.getInstance().getGL();
        this.oneUse(gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN, cb);
    };
    public oneUse(target, cb: Function) {
        this.begin(target);
        cb();
        this.end(target);
    }
    public getParameter(param: number) {
        const gl = Core.getInstance().getGL();
        return gl.getQueryParameter(this._handle, param);
    }
    public isResultAvailable() {
        const gl = Core.getInstance().getGL();
        return this.getParameter(gl.QUERY_RESULT_AVAILABLE);
    }
    public getResult() {
        const gl = Core.getInstance().getGL();
        return this.getParameter(gl.QUERY_RESULT);
    }
};

export { Query };
