#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;
in vec3 lp;

out vec4 fragColor;

// uniform samplerCube texSampler;
//
uniform sampler2D TexWood; // First Texture
uniform sampler2D TexFragile; // Second Texture

uniform vec3 viewPos;

void main() {

    /**
    float ratio = 1.00 / 1.52;
    vec3 I = normalize(outPosition - viewPos);
    vec3 R = refract(I, normalize(outNormal), ratio);
    fragColor = texture(texSampler, R);
    /**/

    /**/
    vec4 TextureFragile = texture(TexFragile, outUV);
    vec4 TextureWood = texture(TexWood, outUV);
    fragColor = mix(TextureWood,TextureFragile,TextureFragile.a);
    /**/
}
