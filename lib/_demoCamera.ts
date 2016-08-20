/// <reference path="gl-matrix.d.ts" />
/// <reference path="core/input.ts" />


class Camera {
	// Camera attrs
	public position: Float32Array;
	protected front: Float32Array;
	protected up: Float32Array;
	protected right: Float32Array;
	protected worldUp: Float32Array;

	// Euler angles
	protected yaw: number;
	protected pitch: number;

	// Camera options
	protected movSpeed: number = 0.05;
	protected mouseSensivity: number = 0.25;
	protected _updateCamera: boolean = false;
	public timeElapsed: number;

	private view: Float32Array = mat4.create();
	private proj: Float32Array = mat4.create();

	public GetPos(): Float32Array {
		return this.position;
	}

	constructor(position: Float32Array = vec3.fromValues(0, 0, 0), 
		up: Float32Array = vec3.fromValues(0, 1, 0), yaw: number = -90.0, pitch: number = 0.0) {
		this.front = vec3.fromValues(0, 0, -1);
		this.position = position;
		this.worldUp = up;
		this.yaw = yaw;
		this.pitch = pitch;

		this.right = vec3.create();
		this.up = vec3.create();

		this.updateCameraVectors();
	}
	public update(callback: Function) {
		// TODO: Move input here
		this._updateCamera = false;

		let speed = 1.0;

		if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Left_Shift)) {
			speed = 2.5;
		}

		if (Input.getInstance().isKeyPressed(Input.getInstance().keys.W)) {
			this.processKeyboard(4, speed);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(Input.getInstance().keys.S)) {
			this.processKeyboard(5, speed);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(Input.getInstance().keys.A)) {
			this.processKeyboard(2, speed);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(Input.getInstance().keys.D)) {
			this.processKeyboard(3, speed);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(Input.getInstance().keys.E)) {
			this.processKeyboard(0, speed);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(Input.getInstance().keys.Q)) {
			this.processKeyboard(1, speed);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(38)) {
			this.processMouseMovement(0.0, 2.5);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(40)) {
			this.processMouseMovement(0.0, -2.5);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(37)) {
			// this.processMouseMovement(2.5, 0.0);
			this.processMouseMovement(-2.5, 0.0);
			this._updateCamera = true;
		}
		if (Input.getInstance().isKeyPressed(39)) {
			// this.processMouseMovement(-2.5, 0.0);
			this.processMouseMovement(2.5, 0.0);
			this._updateCamera = true;
		}
		if (this._updateCamera && callback) {
			callback();
		}
	}

	public processKeyboard(direction: number, speed: number = 1.0) {
		if (this.timeElapsed > 25) {
			return;
		}
		const velocity = this.movSpeed * this.timeElapsed * speed;
		// console.log(direction);
		if (direction === 0) {
			this.position = vec3.scaleAndAdd(this.position, this.position, this.front, velocity);
		} else if (direction === 1) {
			this.position = vec3.scaleAndAdd(this.position, this.position, this.front, -velocity);
		} else if (direction === 2) {
			this.position = vec3.scaleAndAdd(this.position, this.position, this.right, -velocity);
		} else if (direction === 3) {
			this.position = vec3.scaleAndAdd(this.position, this.position, this.right, velocity);
		} else if (direction === 4) {
			this.position = vec3.scaleAndAdd(this.position, this.position, this.up, velocity);
		} else if (direction === 5) {
			this.position = vec3.scaleAndAdd(this.position, this.position, this.up, -velocity);
		}
	}

	public processMouseMovement(xOffset: number, yOffset: number) {
		xOffset *= this.movSpeed * 2.0 * this.timeElapsed;
		yOffset *= this.movSpeed * 2.0 * this.timeElapsed;

		this.yaw += xOffset;
		this.pitch += yOffset;

		if (this.pitch > 89.0) {
			this.pitch = 89.0;
		}
		if (this.pitch < -89.0) {
			this.pitch = -89.0;
		}
		this.updateCameraVectors();
	}

	public updateCameraVectors() {
		const front: Float32Array = vec3.fromValues(
			Math.cos(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)),
			Math.sin(glMatrix.toRadian(this.pitch)),
			Math.sin(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch))
		);
		this.front = vec3.normalize(this.front, front);

		// Recalculate right and up vector
		this.right = vec3.cross(this.right, this.front, this.worldUp);
		this.right = vec3.normalize(this.right, this.right);
		this.up = vec3.cross(this.up, this.right, this.front);
		this.up = vec3.normalize(this.up, this.up);
	}

	public GetViewMatrix(): Float32Array {
		let aux = vec3.create();
		this.view = mat4.lookAt(this.view, this.position, vec3.add(aux, this.position, this.front), this.up);
		return this.view;
	}
	public GetOrthoProjectionMatrix(w: number, h: number): Float32Array {
	    const ymax = 0.001 * Math.tan(45.0 * Math.PI / 360);
	    const ymin = -ymax;
	    const xmin = ymin * (w * 1.0) / (h * 1.0);
	    const xmax = ymax * (w * 1.0) / (h * 1.0);
		this.proj = mat4.ortho(this.proj, xmin, xmax, ymin, ymax, 0.001, 1000.0);
		return this.proj;
	}
	public GetProjectionMatrix(w: number, h: number): Float32Array {
		this.proj = mat4.perspective(this.proj, 45.0, (w * 1.0) / (h * 1.0), 0.001, 1000.0);

		// this.proj = mat4.ortho(this.proj, -10.0, 10.0, -10.0, 10.0, 0.001, 1000.0);

		return this.proj;
	}
}