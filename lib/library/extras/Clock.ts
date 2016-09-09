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

/**
 * Clock class
 * @class Clock
 */
class Clock {
    /**
     * Keeps track whether the clock is running or not.
     * @type {boolean}
     */
    protected _running: boolean;
    /**
     * It hold the start time of the clock.
     * @type {number}
     */
    protected _startTime: number;
    /**
     * It hold the previous time from a update.
     * @type {number}
     */
    protected _oldTime: number;
    /**
     * It hold the time elapsed between the start
     *     of the clock to the previous update.
     * @type {number}
     */
    protected _elapsed: number;
    /**
     * Clock constructor.
     * Used for keeping track of time.
     * @param {boolean = true} autostart Automatically start the clock.
     */
    constructor(protected _autostart: boolean = true) {
        this._startTime = 0.0;
        this._oldTime = 0.0;
        this._elapsed = 0.0;

        this._running = false;

        if (this._autostart) {
            this.start();
        }
    };
    /**
     * Starts clock
     */
    public start() {
        this._autostart = true;
        this._startTime = (performance || Date).now();
        this._oldTime = this._startTime;
        this._running = true;
    };
    /**
     * Stop clock
     */
    public stop() {
        this.elapsedTime;
        this._running = false;
    };
    /**
     * Return the seconds passed since the clock started.
     * @return {number} Elapsed time
     */
    get elapsedTime(): number {
        this.delta;
        return this._elapsed;
    }
    /**
     * Return the seconds passed since the last call of this method
     * @return {number} Delta time
     */
    get delta(): number {
        let diff = 0;
        if (this._autostart && !this._running) {
            this.start();
        }
        if (this._running) {
            const newTime = (performance || Date).now();
            diff = (newTime - this._oldTime) / 1000;
            this._oldTime = newTime;
            this._elapsed += diff;
        }
        return diff;
    }
};

export { Clock };
