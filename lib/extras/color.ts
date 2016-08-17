// TODO: Change _color to Vector3
class Color {
	protected _color = new Array(3);
	constructor(r: number, g: number, b: number) {
		this.setRGB(r, g, b);
	}
	get r() { return this._color[0]; }
	get g() { return this._color[1]; }
	get b() { return this._color[2]; }

	set r(r: number) { this._color[0] = r; }
	set g(g: number) { this._color[1] = g; }
	set b(b: number) { this._color[2] = b; }

	public setRGB(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

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