"use strict";

class Input {
	private static _instance: Input = new Input();

	constructor() {
		if (Input._instance) {
			throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
		}
		
		for (let i = 0; i < this.keys["LastKeyCode"]; i++) {
			this._isKeyPressed[i] = false;
			this._keyPreviusState[i] = false;
			this._isKeyClicked[i] = false;
		}

		let self = this;
		// Register handles
		window.addEventListener("keyup", function(ev) {
			if (ev.keyCode === 40 || ev.keyCode === 38) {
				ev.preventDefault();
			}
			self._onKeyUp(ev);
		});
		window.addEventListener("keydown", function(ev) {
			if (ev.keyCode === 40 || ev.keyCode === 38) {
				ev.preventDefault();
			}
			self._onKeyDown(ev);
		});

		Input._instance = this;
	}

	// Key code constants
	public keys = {
		Left_Shift: 16,
		// arrows
		Left: 37,
		Up: 38,
		Right: 39,
		Down: 40,

		// space bar
		Space: 32,

		// numbers
		Zero: 48,
		One: 49,
		Two: 50,
		Three: 51,
		Four: 52,
		Five: 53,
		Six: 54,
		Seven: 55,
		Eight: 56,
		Nine: 57,

		// Alphabets
		A: 65,
		D: 68,
		E: 69,
		F: 70,
		G: 71,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		W: 87,
		LastKeyCode: 222
	};

	public update() {
		for (let i = 0; i < this.keys["LastKeyCode"]; i++) {
			this._isKeyClicked[i] = (!this._keyPreviusState[i]) && this._isKeyPressed[i];
			this._keyPreviusState[i] = this._isKeyPressed[i];
		}
	}

	public isKeyPressed(keycode: number) {
		return this._isKeyPressed[keycode];
	}

	public isKeyClicked(keycode: number) {
		return this._isKeyClicked[keycode];
	}

	// Previous key state
	protected _keyPreviusState: Array<boolean> = [];
	// Pressed keys
	protected _isKeyPressed: Array<boolean> = [];
	// Click events: once an event is set, it will remain there until polled
	protected _isKeyClicked: Array<boolean> = [];

	protected _onKeyDown(ev: KeyboardEvent) {
		this._isKeyPressed[ev.keyCode] = true;
	}

	protected _onKeyUp(ev: KeyboardEvent) {
		this._isKeyPressed[ev.keyCode] = false;
	}

	public static getInstance(): Input {
		return Input._instance;
	}
}