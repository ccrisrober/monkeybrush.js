/// <reference path="../core/shaderProgram.ts" />

"use strict";
/**
class ShaderManager {
	public static get(name: string): ShaderProgram {
		return ShaderManager._progDictionary[name];
	}
	public static add(name: string, prog: ShaderProgram) {
		//if (name in ShaderManager._progDictionary) {
		if (ShaderManager._progDictionary.hasOwnProperty(name)) {
			console.warn(name + " key exist ...");
		}
		ShaderManager._progDictionary[name] = prog;
	}
	public static destroy() {
		for (var key in ShaderManager._progDictionary) {
			ShaderManager._progDictionary[key].destroy();
		}
	}
    protected static _progDictionary: { [ key:string ]: ShaderProgram; };
};
/**/

interface ShaderCallback {
	(): ShaderProgram;
}
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
};