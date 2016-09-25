#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform sampler2D tex;

uniform vec3 viewPos;
uniform vec3 color;

uniform vec2 minMaxDist;
uniform int fogType;
uniform float fogDensity;

void main() {
    vec3 N=normalize(outNormal);
    vec3 L = normalize(viewPos - outPosition);
    float dif=dot(N,L);
    dif=clamp(dif,0.0,1.0);
    vec3 color = vec3(color*dif)+vec3(color*0.3);

    vec3 viewDir = normalize(viewPos - outPosition);
    float dst = length(outPosition - viewPos);

    float minDist = minMaxDist.x;
    float maxDist = minMaxDist.y;
    vec3 fogColor = vec3(0.0);

    if(fogType >= 0 && fogType <= 2) {
        float fogFactor;
        // Linear fog
        if(fogType == 0) {
            fogFactor = (maxDist - dst) / (maxDist - minDist);
        }
        // Exp Fog
        else if(fogType == 1) {
            fogFactor = 1.0 / exp(dst * fogDensity);
        }
        // Exp2 Fog
        else if(fogType == 2) {
            fogFactor = 1.0 / exp( (dst * fogDensity)* (dst * fogDensity));
        }
        fogFactor = clamp(fogFactor, 0.0, 1.0);
        color = mix(fogColor, color, fogFactor);
    }
    fragColor = vec4(color, 1.0);
}
