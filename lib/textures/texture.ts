/// <reference path="../core/core.ts" />
/// <reference path="../extras/Vector2.ts" />

abstract class Texture {
	protected _handle: WebGLTexture;
	protected _target: number;
	protected _size: Vector2<number>;
	constructor(target: number) { // todo: size!
		this._target = target;
	}
	get target(): number { return this._target; }
	abstract destroy(): void;

	abstract bind(slot?: number);

	public handle(): WebGLTexture {
		return this._handle;
	}
}