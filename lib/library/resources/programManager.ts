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


/// <reference path="../core/Program.ts" />

import { Program } from "../core/Program";

"use strict";

interface ProgramCallback {
    (): Program;
};
interface ProgramUseCallback {
    (prog: Program): void;
};

/**
 * Program manager class
 * @class ProgramManaager
 */
class ProgramManager {
    /**
     * Program cache dictionary
     */
    static _progDictionary: { [ key: string ]: Program; } = {};
    /**
     * Get Program from name
     * @param  {string} name: Program name
     * @return {Program}
     */
    public static get(name: string): Program {
        let prog = this._progDictionary[name];
        if (!prog) {
            throw new Error(`Program ${name} undefined`);
        }
        return prog;
    }
    /**
     * Execute a callback function using the specified Program (name).
     * @param  {string} name: Program name
     * @param {ProgramUseCallback}: Function to execute
     */
    public static getCB(name: string, cb: ProgramUseCallback) {
        let prog = this.get(name);
        if (!prog) {
            throw new Error(`Program ${name} undefined`);
        }
        cb(prog);
    }
    /**
     * Add a new Program with his name and a function that creates the Program.
     * @param {string} name: Program name
     * @param {ProgramCallback}: Function that creates the Program (return Program)
     */
    public static addWithFun(name: string, fn: ProgramCallback) {
        this.add(name, fn());
    }
    /**
     * Add a existing Program with his name and the Program.
     * @param {string} name: Program name.
     * @param {Program} prog: Existing Program.
     */
    public static add(name: string, prog: Program) {
        if (!prog) {
            throw new Error(`Program ${name} undefined`);
        }
        this._progDictionary[name] = prog;
    }
    /**
     * Destroy all Programs and clear cache.
     */
    public static destroy() {
        for (let key in this._progDictionary) {
            this._progDictionary[key].destroy();
        }
        this._progDictionary = {};
    }
};

export { ProgramCallback, ProgramUseCallback, ProgramManager };
