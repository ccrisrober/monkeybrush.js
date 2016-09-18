#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;
in vec3 lp;

out vec4 fragColor;

void main() {
    fragColor = vec4(outUV, 0.0, 1.0);
}
