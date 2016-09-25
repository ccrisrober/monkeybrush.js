#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in float V;

out vec4 fragColor;

uniform vec3 viewPos;

const float Frequency = 3.0;
const vec3 Color1 = vec3(0.8, 0.8, 0.8);
const vec3 Color2 = vec3(0.1, 0.1, 0.15);

void main() {
    float sawtooth = fract(V * Frequency);
    float triangle = abs(2.0 * sawtooth - 1.0);
    float dp = length(vec2(dFdx(V), dFdy(V)));
    float edge = dp * Frequency * 2.0;
    float square = smoothstep(0.5 - edge, 0.5 + edge, triangle);

    vec3 color = mix(Color1, Color2, square);

    vec3 N=normalize(outNormal);
    vec3 L = normalize(viewPos - outPosition);
    float dif=dot(N,L);
    dif=clamp(dif,0.0,1.0);
    fragColor = vec4(color*dif,1.0)+vec4(color*0.3,1.0);
}
