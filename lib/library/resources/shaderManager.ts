/// <reference path="../core/program.ts" />

"use strict";

interface ShaderCallback {
	(): Program;
};
interface ShaderUseCallback {
	(prog: Program): void;
};
namespace ShaderManager {
	/**
	 * [Program description]
	 * @type {[type]}
	 */
    let _progDictionary: { [ key: string ]: Program; } = {};
    /**
     * @param  {string}
     * @return {Program}
     */
	export function get(name: string): Program {
		return _progDictionary[name];
	}
	/**
	 * @param {string}
	 * @param {ShaderCallback}
	 */
	export function addWithFun(name: string, fn: ShaderCallback) {
		_progDictionary[name] = fn();
	}
	/**
	 * @param {string}
	 * @param {Program}
	 */
	export function add(name: string, prog: Program) {
		_progDictionary[name] = prog;
	}
	/**
	 * 
	 */
	export function destroy() {
		for (let key in _progDictionary) {
			_progDictionary[key].destroy();
		}
	}
	/**
	 * @param {string}
	 * @param {ShaderUseCallback}
	 */
	export function getCB(name: string, cb: ShaderUseCallback) {
		let prog = get(name);
		cb(prog);
	}
};