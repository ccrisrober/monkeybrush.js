#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

void main() {
	fragColor = vec4(outPosition, 1.0);
}