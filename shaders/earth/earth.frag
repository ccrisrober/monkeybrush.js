#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;
in vec3 lp;

out vec4 fragColor;

uniform sampler2D tex;
uniform sampler2D tex2;

void main() {
    vec3 color = texture(tex2, outUV).xyz;

    fragColor = vec4(color, 1.0);
}
