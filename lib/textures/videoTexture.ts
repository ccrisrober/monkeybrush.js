/// <reference path="texture2d.ts" />
class VideoTexture extends Texture2D {
	public _videoElem: HTMLVideoElement;
	constructor(data, options = {}) {
		const gl = Core.getInstance().getGL();
		options["minFilter"] = gl.LINEAR;
		options["magFilter"] = gl.LINEAR;
		options["wrap"] = [gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE];
		this._videoElem.play();
		super(data, options);
	}
	public updateTexture() {
		const gl = Core.getInstance().getGL();
		gl.bindTexture(this.target, this._handle);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
		gl.texImage2D(
			this.target,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			this._videoElem // TODO: videoElement
		);
	}
}