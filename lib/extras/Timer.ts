namespace Timer {
    let _lastTime = Date.now();
    let _deltaTime = 0.0;

    let _currentTime, _timeElapsed;
    export function update() {
        _currentTime = Date.now();
        _timeElapsed = _currentTime - _lastTime;
        _deltaTime = _timeElapsed;
        _lastTime = _currentTime;
    }
    export function deltaTime(): number {
        return _deltaTime;
    }
}