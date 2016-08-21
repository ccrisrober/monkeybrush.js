/// <reference path="drawable.ts" />

"use strict";

class Icosphere extends Drawable {
	constructor(its: number = 0) {
		super();

		const ICO_POSITIONS = [
			-1.0,  0.0,  0.0, 
			 0.0,  1.0,  0.0, 
			 0.0,  0.0, -1.0, 
			 0.0,  0.0,  1.0, 
			 0.0, -1.0,  0.0, 
			 1.0,  0.0,  0.0
		];
		const ICO_INDICES = [
			3, 4, 5, 3, 5, 1, 3, 1, 0, 3, 0, 4, 
			4, 0, 2, 4, 2, 5, 2, 0, 1, 5, 2, 1
		];

		
	    /*
		let v = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
		let n = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
		let tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
		let el = new Array(6 * xdivs * zdivs);*/
	}
}