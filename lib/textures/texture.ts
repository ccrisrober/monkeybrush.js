/// <reference path="../core/core.ts" />
/// <reference path="../extras/vec2.ts" />

abstract class Texture {
	protected _target: number;
	protected _size: vec2<number>;
	constructor(target: number) {

	}
	get target(): number { return this._target; }
	abstract destroy() : void;
}