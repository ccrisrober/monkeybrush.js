class Sound {
    protected _volume: number = 1.0;
    protected _paused: boolean = false;

    public play() {}
    public pause() {}
    public stop() {}
    public fade() {}
    public fadeIn() {}
    public fadeOut() {}
    public isPlaying(): boolean { return true; }
}
