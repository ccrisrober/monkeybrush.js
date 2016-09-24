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

uniform sampler2D texNormal;

void main() {
    outPosition = vec3(model * vec4(position, 1.0));
	gl_Position = projection * view * vec4(outPosition, 1.0);
	mat3 normalMatrix = mat3(inverse(transpose(model)));
    vec2 uvv = vec2(uv.x, 1.0 - uv.y);
	outNormal = normalize(normalMatrix * (texture(texNormal, uvv).rgb * 2.0 - 1.0));
	outUV = uvv;
}
