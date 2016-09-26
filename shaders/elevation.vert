#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;

out vec3 outPosition;
out vec3 outNormal;
out vec2 outUV;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform vec3 lightPosition;
uniform float heightFactor;

uniform sampler2D texH;

void main() {
    mat3 normalMatrix = mat3(inverse(transpose(model)));

    vec3 pos = position;

    const vec2 size = vec2(0.5,0.0);
    const ivec3 off = ivec3(-1,0,1);
    vec4 wave = texture(texH, uv);
    float s11 = wave.x;
    float s01 = textureOffset(texH, uv, off.xy).x;
    float s21 = textureOffset(texH, uv, off.zy).x;
    float s10 = textureOffset(texH, uv, off.yx).x;
    float s12 = textureOffset(texH, uv, off.yz).x;
    vec3 va = normalize(vec3(size.xy,s21-s01));
    vec3 vb = normalize(vec3(size.yx,s12-s10));
    vec4 bump = vec4( cross(va,vb), s11 );

    pos.y += heightFactor * bump.w;
    outNormal = bump.xyz;


    vec4 pp = model * vec4(pos, 1.0);
    pp = view * pp;
    outPosition = pp.xyz;
    outUV = uv;
    outNormal = normalize(normalMatrix * outNormal);
    gl_Position = projection * pp;
}
