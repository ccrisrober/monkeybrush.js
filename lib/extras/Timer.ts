module timer {
    var _lastTime = Date.now();
    var _deltaTime = 0.0;

    var _currentTime, _timeElapsed;
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