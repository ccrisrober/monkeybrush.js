#version 300 es
precision highp float;

in vec3 outColor;

out vec4 fragColor;

void main() {
    fragColor = vec4(outColor, 1.0);
}
