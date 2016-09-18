#version 300 es
precision highp float;

in vec2 outUV;

out vec4 fragColor;

uniform sampler2D tex;

void main() {
    fragColor = texture(tex,outUV);
}
