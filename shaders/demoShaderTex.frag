#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;
in vec3 lp;

out vec4 fragColor;

uniform sampler2D tex;

void main() {
    fragColor = texture(tex, outUV);
}
