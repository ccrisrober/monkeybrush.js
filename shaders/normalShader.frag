#version 300 es
precision highp float;

in vec3 outNormal;

out vec4 fragColor;

void main() {
	fragColor = vec4(normalize(outNormal), 1.0);
}