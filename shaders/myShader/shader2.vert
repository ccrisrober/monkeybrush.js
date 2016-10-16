#version 300 es
precision highp float;
precision highp int;

#define SHADER_NAME ${ShaderName}

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 normalMatrix;
uniform vec3 cameraPosition;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;
#ifdef USE_COLOR
    layout(location = 3) in vec3 color;
#endif

out vec3 outPosition;
out vec3 outNormal;
#define PI 3.14159
#define PI2 6.28318

void main() {
    outNormal = normalize(normalMatrix * normal);
    outPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * outPosition;
}

