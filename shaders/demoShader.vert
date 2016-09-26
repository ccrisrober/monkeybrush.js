#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;

out vec3 outPosition;
out vec3 outNormal;
out vec2 outUV;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

void main() {
    outPosition = vec3(model * vec4(position, 1.0));

	gl_Position = projection * view * vec4(outPosition, 1.0);
    gl_PointSize = 25.0;
	mat3 normalMatrix = mat3(inverse(transpose(model)));
	outNormal = normalize(normalMatrix * normal);
	outUV = uv;
}
