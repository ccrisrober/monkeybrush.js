#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;
layout(location = 3) in vec3 offset;

out vec3 outPosition;
out vec3 outNormal;
out vec2 outUV;
out vec3 lp;

uniform mat4 model;

layout(std140, column_major) uniform;

uniform UboDemo {
    mat4 projection;
    mat4 view;
} ubo1;

uniform vec3 lightPosition;

void main() {
	mat3 normalMatrix = mat3(inverse(transpose(model)));


	vec3 pos = position;

	//outPosition = (view * model * vec4(pos, 1.0)).xyz;
	vec4 pp = model * vec4(pos, 1.0);
	pp.xyz += offset;
	pp = ubo1.view * pp;
	outPosition = pp.xyz;
	outUV = uv;
	outNormal = normalize(normalMatrix * normal);
	gl_Position = ubo1.projection * pp;

    gl_PointSize = 5.0;
	lp = (ubo1.view * model * vec4(lightPosition, 1.0)).rgb;
}
