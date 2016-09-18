#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

out vec3 outPosition;
out vec3 outNormal;

void main() {
    mat3 normalMatrix = mat3(inverse(transpose(model)));

    gl_Position = projection * view * model * vec4(position, 1.0f);
    outNormal = mat3(transpose(inverse(model))) * normal;
    outPosition = vec3(model * vec4(position, 1.0f));

    gl_PointSize = 5.0;
}