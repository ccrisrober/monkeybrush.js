#version 300 es
precision highp float;

in vec3 outNormal;

out vec4 fragColor;

uniform sampler2D tex;

uniform vec3 viewPos;

vec2 matcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);

    float m = 2.0 * sqrt(
        pow(reflected.x, 2.0) +
        pow(reflected.y, 2.0) +
        pow(reflected.z + 1.0, 2.0)
    );

    return reflected.xy / m + 0.5;
}

void main() {
    fragColor = texture(tex, matcap(viewPos, normalize(outNormal)));
}
