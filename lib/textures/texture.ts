/// <reference path="../core/core.ts" />
/// <reference path="../extras/vector2.ts" />

abstract class Texture {
	protected _target: number;
	protected _size: vector2<number>;
	constructor(target: number) { // todo: size!

	}
	get target(): number { return this._target; }
	abstract destroy() : void;
}