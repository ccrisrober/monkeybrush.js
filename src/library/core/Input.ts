/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


import { Core } from "./Core";
import { KeyState, MouseButton } from "../constants/Constants";

"use strict";

/**
* This class wrap Input
* @class core.Input
*/
class Input {
    constructor() {
        if (Input._instance) {
            throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
        }

        for (let i = 0; i < KeyState.LastKeyCode; ++i) {
            Input._isKeyPressed[i] = false;
            Input._keyPreviusState[i] = false;
            Input._isKeyClicked[i] = false;
        }

        for (let i = 0; i < 3; ++i) {
            Input._buttonPreviousState[i] = false;
            Input._isButtonClicked[i] = false;
            Input._isButtonPressed[i] = false;
        }

        let self = Input;
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
    };
    /**
     * Initialize input
     */
    public static initialize() {
        Input._instance = new Input();
    };
    /**
     * Update event
     */
    public static update() {
        for (let i = 0; i < KeyState.LastKeyCode; ++i) {
            this._isKeyClicked[i] = (!this._keyPreviusState[i]) && this._isKeyPressed[i];
            this._keyPreviusState[i] = this._isKeyPressed[i];
        }
        for (let i = 0; i < 3; ++i) {
            this._isButtonClicked[i] = (!this._buttonPreviousState[i]) && this._isButtonPressed[i];
            this._buttonPreviousState[i] = this._isButtonPressed[i];
        }
    };
    /**
     * Return if given input key is pressed.
     * @param {KeyState} keycode Key code.
     * @return {boolean}
     */
    public static isKeyPressed(keycode: KeyState): boolean {
        return this._isKeyPressed[keycode];
    };
    /**
     * Return if given input key is clicked.
     * @param {KeyState} keycode Key code.
     * @return {boolean}
     */
    public static isKeyClicked(keycode: KeyState): boolean {
        return this._isKeyClicked[keycode];
    };
    /**
     * Return if given input button is pressed.
     * @param  {MouseButton}  button Button code.
     * @return {boolean}
     */
    public static isButtonPressed(button: MouseButton): boolean {
        return this._isButtonPressed[button];
    };
    /**
     * Return if given input button is clicked.
     * @param  {MouseButton}  button Button code.
     * @return {boolean}
     */
    public static isButtonClicked(button: MouseButton): boolean {
        return this._isButtonClicked[button];
    };
    /**
     * Return current mouse X position.
     * @return {number} Mouse X position.
     */
    public static getMousePosX(): number {
        return this._mousePosX;
    };
    /**
     * Return current mouse Y position
     * @return {number} Mouse Y position.
     */
    public static getMousePosY(): number {
        return this._mousePosY;
    };


    protected static _buttonPreviousState: Array<boolean> = [];
    protected static _isButtonPressed: Array<boolean> = [];
    protected static _isButtonClicked: Array<boolean> = [];
    protected static _mousePosX = -1;
    protected static _mousePosY = -1;
    // Previous key state
    protected static _keyPreviusState: Array<boolean> = [];
    // Pressed keys
    protected static _isKeyPressed: Array<boolean> = [];
    // Click events: once an event is set, it will remain there until polled
    protected static _isKeyClicked: Array<boolean> = [];
    private static _instance: Input;

    /**
     * OnKeyDown canvas callback
     * @param {KeyboardEvent} ev [description]
     */
    protected static _onKeyDown(ev: KeyboardEvent) {
        this._isKeyPressed[ev.keyCode] = true;
    };
    /**
     * OnKeyUp canvas callback
     * @param {KeyboardEvent} ev [description]
     */
    protected static _onKeyUp(ev: KeyboardEvent) {
        this._isKeyPressed[ev.keyCode] = false;
    };
    /**
     * OnMouseMove canvas callback
     * @param {KeyboardEvent} ev [description]
     */
    protected static _onMouseMove(ev: MouseEvent): boolean {
        let inside = false;

        const canvas = Core.getInstance().canvas();
        let bbox = canvas.getBoundingClientRect();

        const x = Math.round((ev.clientX - bbox.left) * (canvas.width / bbox.width));
        const y = Math.round((ev.clientY - bbox.top) * (canvas.width / bbox.width));

        // const x = ((ev.clientX - bbox.left) - canvas.height / 2) / (canvas.height / 2);
        // const y = (canvas.width / 2 - (ev.clientY - bbox.top)) / (canvas.width / 2);

        if ((x >= 0) && (x < canvas.width) &&
            (y >= 0) && (y < canvas.height)) {
            this._mousePosX = x;
            this._mousePosY = canvas.height - 1 - y;
            inside = true;
        }
        return inside;
    };
    /**
     * OnMouseDown canvas callback
     * @param {KeyboardEvent} ev [description]
     */
    protected static _onMouseDown(ev: MouseEvent) {
        if (this._onMouseMove(ev)) {
            this._isButtonPressed[ev.button] = true;
        }
    };
    /**
     * OnMouseUp canvas callback
     * @param {KeyboardEvent} ev [description]
     */
    protected static _onMouseUp(ev: MouseEvent) {
        this._onMouseMove(ev);
        this._isButtonPressed[ev.button] = false;
    };
};

export { MouseButton, KeyState, Input };
