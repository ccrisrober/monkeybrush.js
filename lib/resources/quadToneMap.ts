/// <reference path="../core/shaderProgram.ts" />

var vertexCode = `#version 300 es
in vec3 vertex;
out vec2 texCoord;
void main() {
  texCoord = vertex.xy * 0.5 + 0.5;
  gl_Position = vec4( vertex, 1 );
}`;
module ToneMap {
  export function init(gl : WebGLRenderingContext) {
    textureQuadSimpleProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
    textureQuadSimpleProgram.addShader(`#version 300 es
      precision highp float;
      in vec2 texCoord;
      uniform sampler2D texture_;
      out vec4 fragColor;
      void main() {
        fragColor = texture( texture_, texCoord );
      }`, shader_type.fragment, mode.read_text);
    textureQuadSimpleProgram.compile();
    textureQuadSimpleProgram.addAttributes(["vertex"]);
    textureQuadSimpleProgram.addUniforms(["texture_"]);


    textureQuadGammaProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
    textureQuadGammaProgram.addShader(`#version 300 es\n
      precision highp float;
      in vec2 texCoord;
      uniform sampler2D texture_;
      uniform float brightness;
      out vec4 fragColor;
      void main() {
        fragColor = texture( texture_, texCoord );
        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction
      }`, shader_type.fragment, mode.read_text);
    textureQuadGammaProgram.compile();
    textureQuadGammaProgram.addAttributes(["vertex"]);
    textureQuadGammaProgram.addUniforms(["texture_", "brightness"]);


    textureQuadReinhardProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
    textureQuadReinhardProgram.addShader(`#version 300 es
      precision highp float;
      in vec2 texCoord;
      uniform sampler2D texture_;
      uniform float brightness;
      out vec4 fragColor;
      void main() {
        fragColor = texture( texture_, texCoord );
        fragColor.rgb = fragColor.rgb / ( 1.0 + fragColor.rgb );
        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction
      }`, shader_type.fragment, mode.read_text);
    textureQuadReinhardProgram.compile();
    textureQuadReinhardProgram.addAttributes(["vertex"]);
    textureQuadReinhardProgram.addUniforms(["texture_", "brightness"]);


    textureQuadFilmicProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
    textureQuadFilmicProgram.addShader(`#version 300 es
      precision highp float;
      in vec2 texCoord;
      uniform sampler2D texture_;
      uniform float brightness;
      out vec4 fragColor;
      void main() {
        vec3 color = texture( texture_, texCoord ).rgb * pow( abs( brightness ), 2.2 );
        color = max(vec3(0.), color - vec3(0.004));
        color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);
        fragColor = vec4( color, 1.0 );
      }`, shader_type.fragment, mode.read_text);
    textureQuadFilmicProgram.compile();
    textureQuadFilmicProgram.addAttributes(["vertex"]);
    textureQuadFilmicProgram.addUniforms(["texture_", "brightness"]);


    textureQuadsRGBProgram.addShader(vertexCode, shader_type.vertex, mode.read_text);
    textureQuadsRGBProgram.addShader(`#version 300 es
      precision highp float;
      in vec2 texCoord;
      uniform sampler2D texture_;
      out vec4 fragColor;
      float sRGB_gamma_correct(float c) {
       const float a = 0.055;
       if(c < 0.0031308) return 12.92*c;
       else return (1.0+a)*pow(c, 1.0/2.4) - a;
      }
      void main() {
        fragColor = texture( texture_, texCoord );
        fragColor.r = sRGB_gamma_correct(fragColor.r);
        fragColor.g = sRGB_gamma_correct(fragColor.g);
        fragColor.b = sRGB_gamma_correct(fragColor.b);
      }`, shader_type.fragment, mode.read_text);
    textureQuadsRGBProgram.compile();
    textureQuadsRGBProgram.addAttributes(["vertex"]);
    textureQuadsRGBProgram.addUniforms(["texture_", "brightness"]);


    textureQuadUncharted2Program.addShader(vertexCode, shader_type.vertex, mode.read_text);
    textureQuadUncharted2Program.addShader(`#version 300 es
      precision highp float;
      in vec2 texCoord;
      uniform sampler2D texture_;
      uniform float brightness;
      out vec4 fragColor;
      void main() {
        fragColor = texture( texture_, texCoord );
        float A = 0.15;
        float B = 0.50;
        float C = 0.10;
        float D = 0.20;
        float E = 0.02;
        float F = 0.30;
        float W = 11.2;
        float exposure = brightness;//2.;
        fragColor.rgb *= exposure;
        fragColor.rgb = ((fragColor.rgb * 
          (A * fragColor.rgb + C * B) + D * E) / (fragColor.rgb * 
          (A * fragColor.rgb + B) + D * F)) - E / F;
        float white = ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;
        fragColor.rgb /= white;
        fragColor.rgb = pow(fragColor.rgb, vec3(1. / 2.2));
      }`, shader_type.fragment, mode.read_text);
    textureQuadUncharted2Program.compile();
    textureQuadUncharted2Program.addAttributes(["vertex"]);
    textureQuadUncharted2Program.addUniforms(["texture_", "brightness"]);
  }
  export var textureQuadSimpleProgram : ShaderProgram = new ShaderProgram();
  export var textureQuadGammaProgram : ShaderProgram = new ShaderProgram();
  export var textureQuadReinhardProgram : ShaderProgram = new ShaderProgram();
  export var textureQuadFilmicProgram : ShaderProgram = new ShaderProgram();
  export var textureQuadsRGBProgram : ShaderProgram = new ShaderProgram();
  export var textureQuadUncharted2Program : ShaderProgram = new ShaderProgram();
}