#version 300 es
precision highp float;

in vec3 position;
in vec3 normal;
out vec3 outNormal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform mat3 normalMatrix;

void main() {
	outNormal = normalize(normalMatrix * normal);
	gl_Position = projection * view * model * vec4(position, 1.0);
}