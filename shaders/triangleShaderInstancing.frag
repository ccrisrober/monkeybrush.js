#version 300 es
precision highp float;

flat in int instance;

out vec4 fragColor;

void main() {
    fragColor = vec4(
        1.0 - float(instance) * 0.1,
        0.5,
        0.0 + float(instance) * 0.1,
        1.0);
}
