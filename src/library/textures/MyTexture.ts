namespace MB {
    export interface ITexture2D {
        pixels?: any;
        width: number;
        height: number;
    };
    export interface ITexture3D extends ITexture2D {
        depth: number;
    };
    export abstract class MyTexture {
        protected _handler: WebGLTexture;
        protected _target: ctes.TextureTarget;
        protected _context: GLContext;
        constructor(context: GLContext, target: ctes.TextureTarget) {
            this._context = context;
            this._target = target;
        }
    };
    export class MyTexture3D extends MyTexture {
        constructor(context: GLContext, data: ITexture3D, options: TexOptions = {}, onSuccess: () => void = null) {
            super(context, ctes.TextureTarget.Texture3D);
        }
    };
    /*export class MyTextureVideo extends MyTexture {
        constructor(context: GLContext, video: HTMLVideoElement) {
            super(context, ctes);
        };
    };*/
    export class MyTexture2D extends MyTexture {
        constructor(context: GLContext, data: HTMLImageElement);
        constructor(context: GLContext, data: ITexture2D);
        constructor(context: GLContext, data: HTMLImageElement | ITexture2D, options: TexOptions = {}, onSuccess: () => void = null) {
            super(context, ctes.TextureTarget.Texture2D);
            const gl = context.gl;
            this._handler = gl.createTexture();
            console.log(gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL));
            gl.bindTexture(gl.TEXTURE_2D, this._handler);
            if (data instanceof HTMLImageElement) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, options.flipY? options.flipY : 0);
                console.log(gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL));
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    options.level || 0,
                    options.internalFormat || gl.RGBA,
                    options.format || gl.RGBA,
                    options.type || gl.UNSIGNED_BYTE,
                    data
                );
            } else {
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    options.level || 0,
                    options.internalFormat || gl.RGBA,
                    data.width,
                    data.height,
                    options.border || 0,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    data.pixels || null
                );
            };
            console.log(gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, MB.ctes.WrapMode.Clamp2Edge);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            console.log(gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL));
        };
        public bind(n: number) {
            const gl = this._context.gl;
            gl.activeTexture(gl.TEXTURE0 + n);
            gl.bindTexture(gl.TEXTURE_2D, this._handler);
        };
        public unbind() {
            const gl = this._context.gl;
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }
}
