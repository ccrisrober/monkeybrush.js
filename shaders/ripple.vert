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

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform vec3 lightPosition;
uniform float time;

uniform sampler2D tex;

uniform float frequency;
uniform float amplitude;

void main() {
	/*vec3 pos = position;
	gl_Position = projection * view * model * vec4(pos, 1.0);

    outPosition = vec3(view * model * vec4(pos, 1.0));

    gl_PointSize = 25.0;
	mat3 normalMatrix = mat3(inverse(transpose(model)));
	outNormal = normalize(normalMatrix * normal);
	outUV = uv;*/

    float dist = length(position);
    float y = amplitude * sin(-3.1415 * dist * frequency + time);
    gl_Position = projection * view * model * vec4(position.x, y, position.z,1);
}
