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

"use strict";
/// <reference path="../../typings/gl-matrix.d.ts" />

namespace MB {
    export interface WorkerReduceOptions {
        reduceFunc: Function;
        initialValue?: any;
        onComplete: Function;
    }
    export class WorkerGroup {
        protected _workers: Array<Worker>;
        protected _configs;
        constructor(filename: string, n: number) {
            this._workers = [];
            while (n--) {
                this._workers.push(new Worker(filename));
            }
        };
        public map(cb: Function) {
            this._configs = [];
            for (let i = 0, size = this._workers.length; i < size; ++i) {
                this._configs.push(cb && cb(i));
            }
        };
        public reduce(opt: WorkerReduceOptions) {
            let fn = opt.reduceFunc,
                l = this._workers.length,
                acum = opt.initialValue,
            message = function (e) {
                l--;
                if (acum === undefined) {
                    acum = e.data;
                } else {
                    acum = fn(acum, e.data);
                }
                if (l === 0) {
                    opt.onComplete(acum);
                }
            };
            for (let i = 0, size = l; i < size; ++i) {
                let w = this._workers[i];
                w.onmessage = message;
                w.postMessage(this._configs[i]);
            }
        }
    };
};
