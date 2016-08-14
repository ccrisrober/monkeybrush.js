class Core {
	private static _instance: Core = new Core();

	private _gl : WebGLRenderingContext;

	constructor() {
		if(Core._instance) {
			throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
		}
		var canvas = <HTMLCanvasElement>document.getElementById("canvas");
		this._gl = this._getContext(canvas);
		if(!this._gl) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
		}
		this._getVendors();
		Core._instance = this;
	}

	protected init() {
		this._gl.enable(this._gl.DEPTH_TEST);
		this._gl.depthFunc(this._gl.LEQUAL);

        // Set images to flip y axis to match the texture coordinate space.
        this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, 1);
	}

	public static getInstance() : Core {
		return Core._instance;
	}

	public getGL() : WebGLRenderingContext {
		return this._gl;
	}

	protected _getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
		var contexts: string[] = "webgl,webgl2,experimental-webgl2".split(",");
		var gl: WebGLRenderingContext;
		var ctx;
		for (var i = 0; i < contexts.length; i++) {
			ctx = contexts[i];
			gl = <WebGLRenderingContext>canvas.getContext(contexts[i]);
			if (gl) {
				return gl;
			}
		}
		return null;
	}
	protected _getVendors() {
		var vendors: string[] = "ms,moz,webkit,o".split(",");
		if (!window.requestAnimationFrame) {
			var vendor;
			for (var i = 0; i < vendors.length; i++) {
				vendor = vendors[i];
				window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
				if (window.requestAnimationFrame) {
					break;
				}
			}
		}
	}

	
}