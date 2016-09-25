#version 300 es
precision highp float;
precision highp sampler3D;

in vec3 outPosition;
in vec3 outNormal;
in float V;

out vec4 fragColor;

uniform vec3 viewPos;

const float frequency = 0.6;
uniform sampler3D tex;

void main() {
    vec3 N=normalize(outNormal);
    vec3 L = normalize(viewPos - outPosition);
    float dif=dot(N,L);

    float LightIntensity = dif;

    float dp = length(vec2(dFdx(V), dFdy(V)));
    float logdp = -log2(dp * 8.0);
    float ilogdp = floor(logdp);
    float stripes = exp2(ilogdp);

    float noise = texture(tex, outPosition).x;

    float sawtooth = fract((V + noise * 0.1) * frequency * stripes);
    float triangle = abs(2.0 * sawtooth - 1.0);

    float transition = logdp - ilogdp;

    // taper ends
    triangle = abs((1.0 + transition) * triangle - transition);

    const float edgew = 0.3; // width of smooth step

    float edge0 = clamp(LightIntensity - edgew, 0.0, 1.0);
    float edge1 = clamp(LightIntensity, 0.0, 1.0);
    float square = 1.0 - smoothstep(edge0, edge1, triangle);
    vec3 color = vec3(square);

    dif=clamp(dif,0.0,1.0);
    fragColor = vec4(color*dif,1.0)+vec4(color*0.3,1.0);
}
