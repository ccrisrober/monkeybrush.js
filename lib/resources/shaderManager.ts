/// <reference path="../core/shaderProgram.ts" />

"use strict";

interface ShaderCallback {
	(): ShaderProgram;
};
interface ShaderUseCallback {
	(prog: ShaderProgram): void;
};
namespace ShaderManager {
    let _progDictionary: { [ key: string ]: ShaderProgram; } = {};
	export function get(name: string): ShaderProgram {
		return _progDictionary[name];
	}
	export function addWithFun(name: string, fn: ShaderCallback) {
		_progDictionary[name] = fn();
	}
	export function add(name: string, prog: ShaderProgram) {
		// if (name in ShaderManager._progDictionary) {
		// if (_progDictionary.hasOwnProperty(name)) {
		// 	console.warn(name + " key exist ...");
		// }
		_progDictionary[name] = prog;
	}
	export function destroy() {
		for (let key in _progDictionary) {
			_progDictionary[key].destroy();
		}
	}
	export function getCB(name: string, cb: ShaderUseCallback) {
		let prog = get(name);
		cb(prog);
	}
};