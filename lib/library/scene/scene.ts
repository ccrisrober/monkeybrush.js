
"use strict";

abstract class Scene {
	abstract initScene();
	abstract update(t: number);
	abstract render();
	abstract resize(width: number, height: number);

	constructor() {
		this._animate = false;
	}

	public animate(value: boolean) {
		this._animate = value;
	}

	public animating(): boolean {
		return this._animate;
	}

	protected _animate: boolean;
}