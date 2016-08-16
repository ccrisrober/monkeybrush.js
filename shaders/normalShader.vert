#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
out vec3 outNormal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform mat3 normalMatrix;

void main() {
	outNormal = normalize(normalMatrix * normal);
	gl_Position = projection * view * model * vec4(position, 1.0);
}