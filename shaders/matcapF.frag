#version 300 es
precision highp float;

in vec3 outNormal;

out vec4 fragColor;

uniform sampler2D tex;

uniform vec3 viewPos;

#import<MatCap>

void main() {
    fragColor = texture(tex, matcap(viewPos, normalize(outNormal)));
}
