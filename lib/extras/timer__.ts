/*class Timer__ {
	protected running: boolean;
	protected start_clock: number;
	protected start_time: number;
	protected acc_time: number;
	constructor() {
		this.running = false;
		this.start_clock = 0;
		this.start_time = 0;
		this.acc_time = 0;
	}
	public elapsed_time(): number {
		var acc_sec = (performance || Date).now();
		return -1;
	}
	public start(msg: string = ""): void {

	}
	public SetToZero(): void {
		this.acc_time = 0;
	}
	public restart(): void {
		// Set timer status to running, reset accumulated time, and set start time
		this.running = true;
		this.acc_time = 0;
		this.start_clock = //clock();
		this.start_time = (performance || Date).now();
	}
	public stop(): void {
		// Compute accumulated running time and set timer status to not running
		if (this.running) this.acc_time += this.elapsed_time();
		this.running = false;
	}
	public check(): number {
		return -1;
	}
}
		// newTime = ( performance || Date ).now()
		// https://bitbucket.org/masterurjc/practica1/src/1b9cfa67f4b68e8c6a570ce58cfdb2c02d9ee32e/RenderingAvanzado1/Timer.h?at=master&fileviewer=file-view-default
		*/