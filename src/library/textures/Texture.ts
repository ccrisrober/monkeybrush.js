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
        internalFormat?: ctes.TextureFormat;
        type?: ctes.TextureFormat; // TODO: No puede ser el mismo ...
        level?: number;
        minFilter?: ctes.TextureType;
        magFilter?: ctes.TextureType;
        flipY?: boolean;
        wrap?: ctes.WrapMode;
        wrapS?: ctes.WrapMode;
        wrapT?: ctes.WrapMode;
        wrapR?: ctes.WrapMode;
        minLOD?: number;
        maxLOD?: number;
        autoMipMap?: boolean;
        format?: ctes.TextureFormat; // TODO: No puede ser el mismo ...
        border?: number;
        compressed?: boolean;
        anisotropic?: number;

        offsets?: Array<number>;
    };

    declare var WebGL2RenderingContext: any;

    export abstract class Texture {

        protected _anisotropy_: number = 1;
        protected _internalformat_: ctes.TextureFormat = ctes.TextureFormat.RGBA;
        protected _format_: ctes.TextureFormat = ctes.TextureFormat.RGBA;

        protected _wrapS_: ctes.WrapMode = ctes.WrapMode.Clamp2Edge;
        protected _wrapT_: ctes.WrapMode = ctes.WrapMode.Clamp2Edge;
        protected _wrapR_: ctes.WrapMode = ctes.WrapMode.Clamp2Edge;

        protected _minFilter_: ctes.TextureType = ctes.TextureType.Linear;
        protected _magFilter_: ctes.TextureType = ctes.TextureType.Linear;

        protected _type_: ctes.TextureFormat; // TODO = gl.UNSIGNED_BYTE;
        protected _flipY_: boolean = true;
        protected _generateMipMaps_: boolean = false;
        protected _premultiplyAlpha_: boolean = false;

        protected _unpackAlignment_: number = 4;
        protected _target_: ctes.TextureTarget;
        protected _minLOD_: number;
        protected _maxLOD_: number;

        protected _level_: number = 0;
        protected _compressed_: boolean = false;
        /**
         * Internal WebGLTexture handler.
         * @type {WebGLTexture}
         */
        protected _handle_: WebGLTexture;

        /**
         * Returns false if gl.LINEAR is not supported as a texture
         *     filter mode for textures of type gl.FLOAT.
         * @return {boolean} [description]
         */
        public static canUseFloatingPointTextures(): boolean {
            const gl = Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                return true;
            } else {
                return !!Extensions.get("OES_texture_float");
            }
        };

        public static canUseFloatingPointLinearFiltering(): boolean {
            return !!Extensions.get("ES_texture_float_linear");
        };

        /**
         * Returns false if gl.HALF_FLOAT_OES is not supported as a
         *     texture type.
         * WebGL2 supports this without extension.
         * @return {boolean} [description]
         */
        public static canUseHalfFloatingPointTextures(): boolean {
            const gl = Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                return true;
            } else {
                return !!Extensions.get("OES_texture_half_float");
            }
        };

        /**
         * Returns false if gl.LINEAR is not supported as a texture
         *     filter mode for textures of type gl.HALF_FLOAT_OES.
         * WebGL2 supports this without extension.
         * @return {boolean} [description]
         */
        public static canUseHalfFloatingPointLinearFiltering(): boolean {
            const gl = Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                return true;
            } else {
                return !!Extensions.get("OES_texture_half_float_linear");
            }
        };

        constructor(target: ctes.TextureTarget, options: TexOptions) {
            this._target_ = target;

            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            this._handle_ = gl.createTexture();

            this._flipY_ = Boolean(options.flipY || false);
            this._internalformat_ = options.internalFormat || ctes.TextureFormat.RGBA;
            this._format_ = options.format || ctes.TextureFormat.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;

            this._compressed_ = Boolean(options.compressed || false);

            this.bind();

            this.minFilter(options.minFilter || ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || ctes.TextureType.Nearest);

            this._minLOD_ = options.minLOD || -1000;
            this._maxLOD_ = options.maxLOD || 1000;
            this._anisotropy_ = options.anisotropic || 1;

            /*
            TEXTURE_MAX_LEVEL 1000
            */

            if (this._type_ === gl.FLOAT) {
                if (!Texture.canUseFloatingPointTextures()) {
                    throw new Error('OES_texture_float is required but not supported');
                }
                if ((this._minFilter_ !== ctes.TextureType.Nearest
                    || this._magFilter_ !== ctes.TextureType.Nearest) &&
                    !Texture.canUseFloatingPointLinearFiltering()) {
                    throw new Error('OES_texture_float_linear is required but not supported');
                }
            } else if (this._type_ === gl.HALF_FLOAT) {
                if (!Texture.canUseHalfFloatingPointTextures()) {
                    throw new Error('OES_texture_half_float is required but not supported');
                }
                if ((this._minFilter_ !== ctes.TextureType.Nearest
                    || this._magFilter_ !== ctes.TextureType.Nearest) &&
                    !Texture.canUseHalfFloatingPointLinearFiltering()) {
                    throw new Error('OES_texture_half_float_linear is required but not supported');
                }
            }
        };

        /**
         * Change texture minification filter
         * @param {ctes.TextureType} filter: Minification filter type
         */
        public minFilter(filter: ctes.TextureType) {
            this.bind();
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.texParameteri(this._target_, gl.TEXTURE_MIN_FILTER, filter);
            this._minFilter_ = filter;
        };
        /**
         * Change texture magnification filter
         * @param {ctes.TextureType} filter: Magnification filter type
         */
        public magFilter(filter: ctes.TextureType) {
            this.bind();
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.texParameteri(this._target_, gl.TEXTURE_MAG_FILTER, filter);
            this._magFilter_ = filter;
        };
        public wrap(modes: Array<number>) {
            if (modes.length < 2) {
                throw new Error("Must specify wrapS, wrapT modes");
            }
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            this.bind();
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_S, modes[0]);
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_T, modes[1]);
            if (modes.length > 2) {
                gl.texParameteri(this._target_, gl.TEXTURE_WRAP_R, modes[2]);
                this._wrapR_ = modes[2];
            }
            this._wrapS_ = modes[0];
            this._wrapT_ = modes[1];
        }
        /**
         * Generate mipmap to this texture.
         */
        public generateMipMap() {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            this.bind();
            this._generateMipMaps_ = true;
            // TODO: Check NPOT??
            gl.generateMipmap(this._target_);
        }
        /**
         * Set texture anisotropic level
         * @param {number = 0} level: Anisotropic level
         */
        public setAnisotropic(level: number = 0) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            level = Math.floor(level);
            // const ext = Extensions.get("EXT_texture_filter_anisotropic");
            const max_anisotropy = Capabilities.getMaxAnisotropy();
            if (max_anisotropy < level && this._anisotropy_ !== level) {
                this._anisotropy_ = level;
                gl.texParameterf(this._target_, 0x84FE/*ext.TEXTURE_MAX_ANISOTROPY_EXT*/, level);
            }
        };
        public bind(slot?: number) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            if (typeof slot === "number") {
                gl.activeTexture(gl.TEXTURE0 + slot);
            }
            gl.bindTexture(this._target_, this._handle_);
        }
        public unbind() {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.bindTexture(this._target_, null);
        }
        /**
         * Destroy texture
         */
        public destroy() {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.deleteTexture(this._handle_);
            this._handle_ = null;
        }
        public preventNPOT() {
            /*this.wrap([
                // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
                ctes.TextureType.Linear,
                // Prevents s-coordinate wrapping (repeating).
                ctes.WrapMode.Clamp2Edge,
                // Prevents t-coordinate wrapping (repeating).
                ctes.WrapMode.Clamp2Edge
            ]);*/
        }
        get target(): number { return this._target_; }


        get handler(): WebGLTexture {
            return this._handle_;
        };

        public resize(size: Vect2) {
            // Nothing to do here
        }

        public setLOD(minLOD: number, maxLOD: number) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                this._minLOD_ = minLOD;
                this._maxLOD_ = maxLOD;
                gl.texParameterf(this._target_, gl.TEXTURE_MIN_LOD, this._minLOD_);
                gl.texParameterf(this._target_, gl.TEXTURE_MAX_LOD, this._maxLOD_);
            } else {
                console.log("TEXTURE LOD isn´t supported");
            }
        }

        // TODO: Move to abstract methods
        public getWidth(): number { return -1; }
        public getHeight(): number { return -1; }
        public getDepth(): number { return -1; }
    };
};
