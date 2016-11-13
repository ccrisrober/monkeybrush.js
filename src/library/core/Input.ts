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

"use strict";

namespace MB {
    /**
    * This class wrap Input
    * @class Input
    */
    export class Input {
        constructor() {
            if (Input._instance) {
                return;    // throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
            }

            for (let i = 0; i < MB.ctes.KeyState.LastKeyCode; ++i) {
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
                self._onKeyUp(ev);
                ev.preventDefault();
            });
            window.addEventListener("keydown", function(ev: KeyboardEvent) {
                self._onKeyDown(ev);
                ev.preventDefault();
            });
            window.addEventListener("mousedown", function(ev: MouseEvent) {
                self._onMouseDown(ev);
                ev.preventDefault();
            });
            window.addEventListener("mousemove", function(ev: MouseEvent) {
                self._onMouseMove(ev);
                ev.preventDefault();
            });
            window.addEventListener("mouseup", function(ev: MouseEvent) {
                self._onMouseUp(ev);
                ev.preventDefault();
            });
            window.addEventListener("mousewheel", function(ev: MouseEvent) {
                self._onMouseScroll(ev);
                ev.preventDefault();
            });
            window.addEventListener("DOMMouseScroll", function(ev: MouseEvent) {
                self._onMouseScroll(ev);
                ev.preventDefault();
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
            for (let i = 0; i < MB.ctes.KeyState.LastKeyCode; ++i) {
                this._isKeyClicked[i] = (!this._keyPreviusState[i]) && this._isKeyPressed[i];
                this._keyPreviusState[i] = this._isKeyPressed[i];
            }
            for (let i = 0; i < 3; ++i) {
                this._isButtonClicked[i] = (!this._buttonPreviousState[i]) && this._isButtonPressed[i];
                this._buttonPreviousState[i] = this._isButtonPressed[i];
            }
        };
        /**
         * Returns if given input key is pressed.
         * @param {MB.ctes.KeyState} keycode Key code.
         * @return {boolean}
         */
        public static isKeyPressed(keycode: MB.ctes.KeyState): boolean {
            return this._isKeyPressed[keycode];
        };
        /**
         * Returns if given input key is clicked.
         * @param {MB.ctes.KeyState} keycode Key code.
         * @return {boolean}
         */
        public static isKeyClicked(keycode: MB.ctes.KeyState): boolean {
            return this._isKeyClicked[keycode];
        };
        /**
         * Returns if given input button is pressed.
         * @param  {MB.ctes.MouseButton}  button Button code.
         * @return {boolean}
         */
        public static isButtonPressed(button: MB.ctes.MouseButton): boolean {
            return this._isButtonPressed[button];
        };
        /**
         * Returns if given input button is clicked.
         * @param  {MB.ctes.MouseButton}  button Button code.
         * @return {boolean}
         */
        public static isButtonClicked(button: MB.ctes.MouseButton): boolean {
            return this._isButtonClicked[button];
        };
        /**
         * Returns current mouse X position.
         * @return {number} Mouse X position.
         */
        public static getMousePosX(): number {
            return this._mousePosX;
        };
        /**
         * Returns current mouse Y position
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

            const canvas = <HTMLCanvasElement>ev.target;
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
        protected static _onMouseScroll(ev: MouseEvent) {
            // let e: any = window.event || ev; // old IE support
            // let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        }
    };
};
