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

namespace MB {
    export interface ProgramCallback {
        (): MB.Program;
    };
    export interface ProgramUseCallback {
        (prog: MB.Program): void;
    };

    /**
     * MB.Program manager class
     * @class ProgramManaager
     */
    export class ProgramManager {
        /**
         * MB.Program cache dictionary
         */
        static _progDictionary: { [ key: string ]: MB.Program; } = {};
        /**
         * Return cached program from name
         * @param  {string} name: MB.Program name
         * @return {MB.Program}
         */
        public static get(name: string): MB.Program {
            let prog = this._progDictionary[name];
            if (!prog) {
                throw new Error(`MB.Program ${name} undefined`);
            }
            return prog;
        }
        /**
         * Execute a callback function using the specified program (name).
         * @param  {string} name: MB.Program name
         * @param {ProgramUseCallback}: Function to execute
         */
        public static getCB(name: string, cb: ProgramUseCallback) {
            let prog = this.get(name);
            if (!prog) {
                throw new Error(`MB.Program ${name} undefined`);
            }
            cb(prog);
        }
        /**
         * Add a new MB.Program with his name and a function that creates the program.
         * @param {string} name: MB.Program name
         * @param {ProgramCallback}: Function that creates the program
         *                                    (return program)
         */
        public static addWithFun(name: string, fn: ProgramCallback) {
            this.add(name, fn());
        }
        /**
         * Add a existing MB.Program with his name and the MB.Program.
         * @param {string} name: MB.Program name.
         * @param {MB.Program} prog: Existing program.
         */
        public static add(name: string, prog: MB.Program) {
            if (!prog) {
                throw new Error(`MB.Program ${name} undefined`);
            }
            this._progDictionary[name] = prog;
        }
        /**
         * Destroy all programs and clear cache.
         */
        public static destroy() {
            for (let key in this._progDictionary) {
                this._progDictionary[key].destroy();
            }
            this._progDictionary = {};
        }
    };
};
