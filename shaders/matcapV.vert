#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;

out vec2 outUV;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
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
    gl_Position = projection * view * model * vec4(position, 1.0);
	mat3 normalMatrix = mat3(inverse(transpose(view * model)));
	outUV = matcap(viewPos, normalize(normalMatrix * normal));
}
