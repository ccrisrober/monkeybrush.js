#version 300 es
precision highp float;
layout(location = 0) in vec3 vertPosition;
out vec2 uv;
void main(void) {
    uv = vec2(vertPosition.xy * 0.5) + vec2(0.5);
    gl_Position = vec4(vertPosition, 1.0);
}