/// <reference path="../core/program.ts" />

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
			throw new Error(`Program ${name} undefined`)
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
			throw new Error(`Program ${name} undefined`)
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
			throw new Error(`Program ${name} undefined`)
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