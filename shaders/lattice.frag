#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform vec3 viewPos;

uniform vec2 Threshold;
uniform vec2 Scale;

void main() {
    float ss = fract(outUV.x * Scale.s);
    float tt = fract(outUV.y * Scale.t);

    if ((ss > Threshold.s) && (tt > Threshold.t)) discard;

    vec3 color = vec3(0.5, 0.42, 0.7);

    vec3 N=normalize(outNormal);
    vec3 L = normalize(viewPos - outPosition);
    float dif=dot(N,L);
    dif=clamp(dif,0.0,1.0);
    fragColor = vec4(color*dif,1.0)+vec4(color*0.3,1.0);
}
