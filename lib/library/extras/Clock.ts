class Clock {
    protected _running: boolean;
    protected _startTime: number;
    protected _oldTime: number;
    protected _et: number;
    constructor(protected _autostart: boolean = true) {
        this._startTime = 0.0;
        this._oldTime = 0.0;
        this._et = 0.0;

        this._running = false;

        if (this._autostart) {
            this.start();
        }
    };
    public start() {
        this._autostart = true;
        this._startTime = (performance || Date).now();
        this._oldTime = this._startTime;
        this._running = true;
    };
    public stop() {
        this.elapsedTime;
        this._running = false;
    };
    get elapsedTime(): number {
        this.delta;
        return this._et;
    }
    get delta(): number {
        let diff = 0;
        if (this._autostart && !this._running) {
            this.start();
        }
        if (this._running) {
            const newTime = (performance || Date).now();
            diff = (newTime - this._oldTime) / 1000;
            this._oldTime = newTime;
            this._et += diff;
        }
        return diff;
    }
};

export { Clock };
