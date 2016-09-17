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
    export namespace textures {

        declare var WebGL2RenderingContext: any;

        export class DepthTexture extends Texture {
            /**
             * DepthTexture constructor
             * @param {() => void = null} onSuccess Optional callback that runs when creating DepthTexture.
             */
            constructor(onSuccess: () => void = null) {
                super(MB.ctes.TextureTarget.Texture2D);
                const gl: WebGL2RenderingContext = MB.core.Core.getInstance().getGL();
                if (gl instanceof WebGL2RenderingContext) {
                    this._internalformat_ = gl.DEPTH_COMPONENT32F;
                } else {
                    this._internalformat_ = gl.DEPTH_COMPONENT16;
                }
            };
        };
    };
};


/**
 *  TODO
 *  TODO
 *  let internalFormat = gl.DEPTH_COMPONENT;
 *  if (texture.type === gl.FLOAT) {
 *      if (!(gl typeof WebGL2RenderingContext))
 *          throw new Error("Float Depth Texture only in WebGL2");
 *      internalFormat = gl.DEPTH_COMPONENT32F;
 *  } else if (webGL2) {
 *      internalFormat = gl.DEPTH_COMPONENT16;
 *  }
 *  TODO
 *  TODO
 */
