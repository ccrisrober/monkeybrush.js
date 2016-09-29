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

namespace MB {
    // TODO: hacer unbind al crear textura!!

    export interface TexOptions {
        internalFormat?: ctes.PixelFormat;
        format?: ctes.PixelFormat;
        minFilter?: ctes.TextureFilter;
        magFilter?: ctes.TextureFilter;
        type?: ctes.DataType;
        level?: number;
        flipY?: number;
        wrapS?: ctes.WrapMode;
        wrapT?: ctes.WrapMode;
        wrapR?: ctes.WrapMode;
        minLOD?: number;
        maxLOD?: number;
        autoMipMap?: boolean;
        border?: number;
        compressed?: boolean;
        anisotropic?: number;

        offsets?: Array<number>;
    };

    declare var WebGL2RenderingContext: any;

    export interface ITexture2D {
        pixels?: any;
        width: number;
        height: number;
    };
    export interface ITexture2DArray {
        pixels: Array<any>;
        width: number;
        height: number;
    };
    export interface ITexture3D extends ITexture2D {
        depth: number;
    };
    export abstract class Texture {
        protected _handler: WebGLTexture;
        protected _target: ctes.TextureTarget;
        protected _context: GLContext;

        protected _level: number;
        protected _border: number;
        protected _internalFormat: MB.ctes.PixelFormat;
        protected _format: MB.ctes.PixelFormat;
        protected _minFilter: MB.ctes.TextureFilter;
        protected _magFilter: MB.ctes.TextureFilter;
        protected _type: MB.ctes.DataType;

        constructor(context: GLContext, target: ctes.TextureTarget, options: TexOptions = {}) {
            this._context = context;
            this._target = target;
            const gl = this._context.gl;
            this._handler = gl.createTexture();

            this._level = options.level || 0;
            this._border = options.border || 0;
            this._internalFormat = options.internalFormat || MB.ctes.PixelFormat.RGBA;
            this._format = options.format || MB.ctes.PixelFormat.RGBA;
            this._type = options.type || MB.ctes.DataType.UnsignedByte;

        };
        public bind(slot?: number) {
            const gl = this._context.gl;
            if (typeof slot === "number" && slot >= 0) {
                gl.activeTexture(gl.TEXTURE0 + slot);
            }
            gl.bindTexture(this._target, this._handler);
        };
        public unbind() {
            const gl = this._context.gl;
            gl.bindTexture(this._target, null);
        };
        public destroy() {
            const gl = this._context.gl;
            gl.deleteTexture(this._handler);
            this._handler = null;
        };
        get target(): ctes.TextureTarget {
            return this._target;
        };
        get handler(): WebGLTexture {
            return this._handler;
        };

        public resize(size: MB.Vect2) {
            // TODO
        }
    };
    export class Texture2DArray extends Texture {
        constructor(context: GLContext, data: ITexture2DArray, options: TexOptions = {}, onSuccess: () => void = null) {
            super(context, ctes.TextureTarget.Texture2DArray, options);
            const gl = context.gl;
            this.bind();
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

            gl.texImage3D(
                this.target, this._level, this._internalFormat,
                data.width, data.height, data.pixels.length, 0,
                this._format, this._type, null
            );

            data.pixels.forEach((image: any, i: number) => {
                gl.texSubImage3D(
                    this.target, 0, 0, 0, i, data.width, data.height, 1,
                        this._format, this._type, image);
            });

            gl.texParameteri(
                this._target,
                gl.TEXTURE_MIN_FILTER,
                options.minFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MAG_FILTER,
                options.magFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_S,
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_T,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_R,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge);


            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            this.unbind();
        }
    };
    export class Texture3D extends Texture {
        constructor(context: GLContext, data: ITexture3D, options: TexOptions = {}, onSuccess: () => void = null) {
            super(context, ctes.TextureTarget.Texture3D, options);
            const gl = context.gl;
            this.bind();
            gl.texImage3D(
                this._target,
                this._level,
                this._internalFormat,
                data.width,
                data.height,
                data.depth,
                0,
                this._format,
                this._type,
                data.pixels || null
            );
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MIN_FILTER,
                options.minFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MAG_FILTER,
                options.magFilter || MB.ctes.TextureFilter.Linear);

            this.unbind();
        }
    };
    /**
     * CubeMapTexture class
     * @class CubeMapTexture
     */
    export class CubeMapTexture extends Texture {

        protected _finished: boolean;
        /**
         * Returns if the cubemap is completed.
         * @return {boolean}
         */
        public isFinished(): boolean {
            return this._finished;
        };

        /**
         * CubeMapTexture constructor.
         * @param {GLContext} context [description]
         * @param {TexOptions = {}} options: Texture options
         */
        constructor(context: GLContext, options: TexOptions = {}) {
            super(context, MB.ctes.TextureTarget.TextureCubeMap, options);

            this._finished = false;

            // TODO: Faltan todo el tema de filtrados o wrap de las opciones
                // que me he saltado por falta de tiempo :(
        };
        /**
         * Add new image to cubemap
         * @param {number} i    Index
         * @param {any} data Image or buffer data.
         */
        public addImage(i: number, data: any) {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.texImage2D(0x8515 /*TEXTURE_CUBE_MAP_POSITIVE_X*/ + i, 0,
                MB.ctes.PixelFormat.RGB, MB.ctes.PixelFormat.RGB, MB.ctes.DataType.UnsignedByte, data);
        };
        /**
         * Finalize cubemap texture
         */
        public finishTex() {
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, MB.ctes.TextureFilter.Linear);
            gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, MB.ctes.TextureFilter.Linear);
            gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, MB.ctes.WrapMode.Clamp2Edge);

            if (gl.TEXTURE_WRAP_R) {
                gl.texParameteri(this._target, gl.TEXTURE_WRAP_R, MB.ctes.WrapMode.Clamp2Edge);
            }

            this._finished = true;
        }
    };
    // TODO: Support update setSubImage
    export class Texture2D extends Texture {
        constructor(context: GLContext, data: HTMLImageElement, options: TexOptions, onSuccess?: () => void);
        constructor(context: GLContext, data: ITexture2D, options: TexOptions, onSuccess?: () => void);
        constructor(context: GLContext, data: HTMLImageElement | ITexture2D, options: TexOptions = {},
            onSuccess: () => void) {
            super(context, ctes.TextureTarget.Texture2D, options);
            const gl = context.gl;
            this.bind();
            if (data instanceof HTMLImageElement) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, options.flipY? options.flipY : 0);
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    this._format,
                    this._type,
                    data
                );
            } else {
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    data.width,
                    data.height,
                    this._border,
                    this._format,
                    this._type,
                    data.pixels || null
                );
            };
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MIN_FILTER,
                options.minFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MAG_FILTER,
                options.magFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_S,
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_T,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge);
            if (options.autoMipMap === true) {
                gl.generateMipmap(this._target);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        };
        public update(data: HTMLImageElement);
        public update(data: ITexture2D);
        public update(data: HTMLImageElement | ITexture2D) {
            // Update texture
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            this.bind();
            if (data instanceof HTMLImageElement) {
                // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    this._format,
                    this._type,
                    data
                );
            } else {
                gl.texImage2D(
                    this._target,
                    this._level,
                    this._internalFormat,
                    data.width,
                    data.height,
                    this._border,
                    this._format,
                    this._type,
                    data.pixels || null
                );
            };
            // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            // gl.generateMipmap(gl.TEXTURE_2D);
            this.unbind();
        }
    }
}

namespace MBX {
    /**
     * CanvasTexture class
     * @class CanvasTexture
     *
     * This class uses an canvas image like texture
     */
    export class CanvasTexture extends MB.Texture {
        /**
         * Canvas that contains the image texture
         * @type {HTMLCanvasElement}
         */
        protected _domCanvas: HTMLCanvasElement;
        /**
         * CanvasTexture constructor.
         * @param {GLContext} context [description]
         * @param {MB.Vect2} size: Texture size
         * @param {TexOptions = {}} options: Texture options
         * @param {() => void = null} onSuccess Optional callback that runs when creating CanvasTexture.
         */
        constructor(context: MB.GLContext, domCanvas: HTMLCanvasElement,
            options: MB.TexOptions = {}, onSuccess: () => void = null) {
            super(context, MB.ctes.TextureTarget.Texture2D, options);

            const gl: WebGL2RenderingContext = this._context.gl;

            this._domCanvas = domCanvas;
            this.bind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

            gl.texImage2D(
                this._target,
                this._level,
                this._internalFormat,
                this._format,
                this._type,
                this._domCanvas
            );

            gl.texParameteri(
                this._target,
                gl.TEXTURE_MIN_FILTER,
                options.minFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_MAG_FILTER,
                options.magFilter || MB.ctes.TextureFilter.Linear);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_S,
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(
                this._target,
                gl.TEXTURE_WRAP_T,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge);

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        };
        /**
         * Updates the texture based on the current image of the canvas
         *     that was referenced in the class constructor.
         */
        public update() {
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(
                this._target,
                this._level,
                this._internalFormat,
                this._format,
                this._type,
                this._domCanvas
            );
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        };
    };
    export class VideoTexture extends MB.Texture {
        protected _video: HTMLVideoElement;
        constructor(context: MB.GLContext, video: HTMLVideoElement, loop: boolean = true,
            frameTime: number = 15, onSuccess: () => void = null) {
            super(context, MB.ctes.TextureTarget.Texture2D, {
                internalFormat: MB.ctes.PixelFormat.RGBA,
                format: MB.ctes.PixelFormat.RGBA,
                type: MB.ctes.DataType.UnsignedByte,
                flipY: 1
            });

            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

            this._video = video;
            this._video.muted = true;
            this._video.loop = loop;

            this.update();

            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

            if (onSuccess) {
                onSuccess();
            }

            this._video.play();

            setInterval(function() {
                this.update();
            }.bind(this), frameTime);
        };
        public update() {
            if (this._video.readyState !== this._video.HAVE_ENOUGH_DATA) return;

            // Update texture
            this.bind();
            const gl: WebGL2RenderingContext = this._context.gl;
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(
                this._target,
                this._level,
                this._internalFormat,
                this._format,
                this._type,
                this._video
            );
            //gl.generateMipmap(gl.TEXTURE_2D);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            this.unbind();
        };
        public destroy() {
            super.destroy();
            this._video.pause();
        }
    };
    export class WebcamTexture extends VideoTexture {
        /**
         * WebcamTexture constructor.
         * @param {GLContext} context [description]
         * @param {MB.Vect2 = [320, 320]} size Webcam viewport size.
         * @param {() => void = null} onSuccess Optional callback that runs when creating WebcamTexture.
         */
        constructor(context: MB.GLContext, size: MB.Vect2 = MB.Vect2.createFromScalar(320),
            onSuccess: () => void = null) {
            super(context, MB.ResourceMap.retrieveAsset("webcam"));

            this._video.width = size.x;
            this._video.height = size.y;
        };
    };
}
