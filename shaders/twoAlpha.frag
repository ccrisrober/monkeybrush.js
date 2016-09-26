#version 300 es
precision highp float;

out vec4 fragColor;

in vec2 outUV;

uniform sampler2D TexWood;
uniform sampler2D TexFragile;

void main() {
    vec4 TextureFragile = texture(TexFragile, outUV);
    vec4 TextureWood = texture(TexWood, outUV);
    fragColor = mix(TextureWood,TextureFragile,TextureFragile.a);
}
