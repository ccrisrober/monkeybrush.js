#version 300 es
precision highp float;

uniform mat4 lighSpaceMatrix;
uniform mat4 model;

void main() {
	gl_Position = lighSpaceMatrix * model * vec4(position, 1.0);
}