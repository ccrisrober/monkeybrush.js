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


/// <reference path="../core/program.ts" />

import Program from "../core/program";

"use strict";

interface ProgramCallback {
    (): Program;
};
interface ProgramUseCallback {
    (prog: Program): void;
};
namespace ProgramManager {
    /**
     * [Program cache]
     */
    let _progDictionary: { [ key: string ]: Program; } = {};
    /**
     * Get program from name
     * @param  {string} name: Program name
     * @return {Program}
     */
    export function get(name: string): Program {
        let prog = _progDictionary[name];
        if (!prog) {
            throw new Error(`Program ${name} undefined`);
        }
        return prog;
    }
    /**
     * Execute a callback function using the specified program (name).
     * @param  {string} name: Program name
     * @param {ProgramUseCallback}: Function to execute
     */
    export function getCB(name: string, cb: ProgramUseCallback) {
        let prog = get(name);
        if (!prog) {
            throw new Error(`Program ${name} undefined`);
        }
        cb(prog);
    }
    /**
     * Add a new program with his name and a function that creates the program.
     * @param {string} name: Program name
     * @param {ProgramCallback}: Function that creates the program (return program)
     */
    export function addWithFun(name: string, fn: ProgramCallback) {
        add(name, fn());
    }
    /**
     * Add a existing program with his name and the program.
     * @param {string} name: Program name.
     * @param {Program} prog: Existing program.
     */
    export function add(name: string, prog: Program) {
        if (!prog) {
            throw new Error(`Program ${name} undefined`);
        }
        _progDictionary[name] = prog;
    }
    /**
     * Destroy all programs and clear cache.
     */
    export function destroy() {
        for (let key in _progDictionary) {
            _progDictionary[key].destroy();
        }
        _progDictionary = {};
    }
};

export default ProgramManager;
