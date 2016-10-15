#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;

out vec4 fragColor;

uniform vec3 viewPos;

const vec3 Color1 = vec3(0.8, 0.7, 0.0);
const vec3 Color2 = vec3(0.6, 0.1, 0.0);

const float base_freq = 0.35;

#import<SimpleNoise3D>

void main() {
    vec4 noisevec;
    noisevec.x = snoise(outPosition * base_freq * 1.0) * 8.0;
    noisevec.y = snoise(outPosition * base_freq * 2.0) * 4.0;
    noisevec.z = snoise(outPosition * base_freq * 4.0) * 2.0;
    noisevec.w = snoise(outPosition * base_freq * 8.0) * 1.0;
    // noisevec = (noisevec / 8.0 + 1.0) / 2.0;
    noisevec = noisevec / 8.0;
    // noisevec = noisevec * noisevec;

    float intensity = abs(noisevec[0] - 0.20) +
                                        abs(noisevec[1] - 0.10) +
                                        abs(noisevec[2] - 0.05) +
                                        abs(noisevec[3] - 0.025);

    // intensity = intensity *  intensity;
    intensity -= 0.3;

    // intensity = clamp(intensity * 1.5, 0.0, 1.0);

    vec3 color = mix(Color1, Color2, intensity);

    vec3 N=normalize(outNormal);
    vec3 L = normalize(viewPos - outPosition);
    float dif=dot(N,L);
    dif=clamp(dif,0.0,1.0);
    fragColor = vec4(color*dif,1.0)+vec4(color*0.3,1.0);
}
