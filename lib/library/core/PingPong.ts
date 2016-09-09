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


import { Framebuffer } from "./Framebuffer";
import { Vect2 } from "../maths/Vect2";

class PingPong {
  protected _fbo: Framebuffer;
  protected _flag: boolean;
  constructor(size: Vect2) {
    this._flag = true;
    // this._fbo = new Framebuffer(textures: Texture[], size);
  }
  public pingpong() {
    if (this._flag) {
      /*gl.bindTexture(gl.TEXTURE_2D, texture1);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D, texture2, 0);*/
    } else {
      /*gl.bindTexture(gl.TEXTURE_2D, texture2);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D, texture1, 0);*/
    }
    // Bind
    /*gl.bindTexture(gl.TEXTURE_2D, this._flag ? texture2 : texture1);*/
    this._flag = !this._flag;
  }

};

export { PingPong };
