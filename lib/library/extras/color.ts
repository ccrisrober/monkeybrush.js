// TODO: Change _color to Vector3

"use strict";

class Color {
	/**
	 * @param {[type]}
	 */
	protected _color = new Array(3);
	/**
	 * @param {number}
	 * @param {number}
	 * @param {number}
	 */
	constructor(r: number, g: number, b: number) {
		this.setRGB(r, g, b);
	}
	/**
	 * @return {number}
	 */
	get r(): number { return this._color[0]; }
	/**
	 * @return {number}
	 */
	get g(): number { return this._color[1]; }
	/**
	 * @return {number}
	 */
	get b(): number { return this._color[2]; }
	/**
	 * @param {number}
	 */
	set r(r: number) { this._color[0] = r; }
	/**
	 * @param {number}
	 */
	set g(g: number) { this._color[1] = g; }
	/**
	 * @param {number}
	 */
	set b(b: number) { this._color[2] = b; }
	/**
	 * @param {number}
	 * @param {number}
	 * @param {number}
	 */
	public setRGB(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	/**
	 * @return {Color}
	 */
	public toHSL(): Color {
		const max = Math.max(this.r, this.g, this.b), 
			min = Math.min(this.r, this.g, this.b);

		let h, s, l = (max + min) / 2;

		if (max === min) {
			h = s = 0; 	// achromatic
		} else {
			let d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch (max) {
	            case this.r: h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0); break;
	            case this.g: h = (this.b - this.r) / d + 2; break;
	            case this.b: h = (this.r - this.g) / d + 4; break;
	        }
	        h /= 6;
		}

		return new Color(h, s, l);
	}
}