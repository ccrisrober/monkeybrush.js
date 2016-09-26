#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;

out vec3 outPosition;
out vec3 outNormal;
out vec2 outUV;
out vec3 lp;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

uniform float Time;
const float Freq = 2.5;
const float Velocity = 2.5;
const float Amp = 0.6;

uniform sampler2D texH;

void main() {
    mat3 normalMatrix = mat3(inverse(transpose(model)));

    vec3 pos = position;

    float u = Freq * pos.x - Velocity * Time;
    pos.y = Amp * sin( u );

    vec3 n = vec3(0.0);
    n.xy = normalize(vec2(cos( u ), 1.0));

    vec4 pp = model * vec4(pos, 1.0);
    outPosition = pp.xyz;
    outUV = uv;
    outNormal = normalize(normalMatrix * n);
    gl_Position = projection * view * pp;

    gl_PointSize = 5.0;
}
