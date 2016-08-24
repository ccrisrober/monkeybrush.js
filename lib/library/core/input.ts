/// <reference path="context.ts" />

import Context from "./context";

"use strict";
// TODO: Remove Input singleton mode :S
class Input {
    private static _instance: Input = new Input();

    constructor() {
        if (Input._instance) {
            throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
        }

        for (let i = 0; i < this.keys["LastKeyCode"]; ++i) {
            this._isKeyPressed[i] = false;
            this._keyPreviusState[i] = false;
            this._isKeyClicked[i] = false;
        }

        for (let i = 0; i < 3; ++i) {
            this._buttonPreviousState[i] = false;
            this._isButtonClicked[i] = false;
            this._isButtonPressed[i] = false;
        }

        let self = this;
        // Register handles
        window.addEventListener("keyup", function(ev: KeyboardEvent) {
            if (ev.keyCode === 40 || ev.keyCode === 38) {
                ev.preventDefault();
            }
            self._onKeyUp(ev);
        });
        window.addEventListener("keydown", function(ev: KeyboardEvent) {
            if (ev.keyCode === 40 || ev.keyCode === 38) {
                ev.preventDefault();
            }
            self._onKeyDown(ev);
        });
        window.addEventListener("mousedown", function(ev: MouseEvent) {
            self._onMouseDown(ev);
        });
        window.addEventListener("mousemove", function(ev: MouseEvent) {
            self._onMouseMove(ev);
        });
        window.addEventListener("mouseup", function(ev: MouseEvent) {
            self._onMouseUp(ev);
        });

        Input._instance = this;
    }

    // Mouse states
    public static mouseButton = {
        Left: 0,
        Middle: 1,
        Right: 2
    };

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
        for (let i = 0; i < this.keys["LastKeyCode"]; ++i) {
            this._isKeyClicked[i] = (!this._keyPreviusState[i]) && this._isKeyPressed[i];
            this._keyPreviusState[i] = this._isKeyPressed[i];
        }
        for (let i = 0; i < 3; ++i) {
            this._isButtonClicked[i] = (!this._buttonPreviousState[i]) && this._isButtonPressed[i];
            this._buttonPreviousState[i] = this._isButtonPressed[i];
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
    public _buttonPreviousState: Array<boolean> = [];
    public _isButtonPressed: Array<boolean> = [];
    public _isButtonClicked: Array<boolean> = [];
    public _mousePosX = -1;
    public _mousePosY = -1;
    protected _onMouseMove(ev: MouseEvent): boolean {
        let inside = false;
        const canvas = Context.getContext().canvas;
        let bbox = canvas.getBoundingClientRect();

        // const x = Math.round((ev.clientX - bbox.left) * (canvas.width / bbox.width));
        // const y = Math.round((ev.clientY - bbox.top) * (canvas.width / bbox.width));

        const x = ((ev.clientX - bbox.left) - canvas.height / 2) / (canvas.height / 2);
        const y = (canvas.width / 2 - (ev.clientY - bbox.top)) / (canvas.width / 2);

        if ((x >= 0) && (x < canvas.width) &&
            (y >= 0) && (y < canvas.height)) {
            this._mousePosX = x;
            this._mousePosY = canvas.height - 1 - y;
            inside = true;
        }
        return inside;
    }

    protected _onMouseDown(ev: MouseEvent) {
        if (this._onMouseMove(ev)) {
            this._isButtonPressed[ev.button] = true;
        }
    };
    protected _onMouseUp(ev: MouseEvent) {
        this._onMouseMove(ev);
        this._isButtonPressed[ev.button] = false;
    };
    public static getInstance(): Input {
        return Input._instance;
    };
    public isButtonPressed(button): boolean {
        return this._isButtonPressed[button];
    }
    public isButtonClicked(button): boolean {
        return this._isButtonClicked[button];
    }
    public getMousePosX(): number {
        return this._mousePosX;
    }
    public getMousePosY(): number {
        return this._mousePosY;
    }
};

export default Input;
