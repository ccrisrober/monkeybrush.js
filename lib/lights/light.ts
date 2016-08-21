/// <reference path="../extras/color.ts" />

abstract class Light {
	protected _intensity: number;
	protected _color: Color;
	protected _enable: boolean;
	constructor() {
		this.intensity = 1.0;
		this.color = new Color(1.0, 1.0, 1.0);
		this._enable = true;
	}
	
	get intensity() { return this._intensity; }
    set intensity(intensity: number) { this._intensity = intensity; }
	
	get color() { return this._color; }
    set color(color: Color) { this._color = color; }
}

/**
 * TODO:
 *	- [] Attenuation (constant, linear, cuadratic)
 *	- [] http://www.learnopengl.com/code_viewer.php?code=lighting/multiple_lights-exercise1
 *
**/