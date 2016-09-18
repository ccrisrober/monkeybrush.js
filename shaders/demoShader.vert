#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;

out vec3 outPosition;
out vec3 outNormal;
out vec2 outUV;
out vec3 lp;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform vec3 lightPosition;
uniform float time;

uniform sampler2D tex;

void main() {
    outPosition = vec3(view * model * vec4(position, 1.0));

	gl_Position = projection * vec4(outPosition, 1.0);
    gl_PointSize = 25.0;
	mat3 normalMatrix = mat3(inverse(transpose(model)));
	outNormal = normalize(normalMatrix * normal);
	outUV = uv;

	lp = vec3(view * model * vec4(lightPosition, 1.0));
}
