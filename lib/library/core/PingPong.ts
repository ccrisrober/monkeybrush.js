
import { Framebuffer } from "./Framebuffer";
import { Vect2 } from "../maths/Vect2";

class PingPong {
  protected _fbo: Framebuffer;
  protected _flag: boolean;
  constructor(size: Vect2) {
    this._flag = true;
    //this._fbo = new Framebuffer(textures: Texture[], size);
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
