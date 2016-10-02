#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform samplerCube tex;
uniform vec3 viewPos;

void main() {
    vec3 I = normalize(outPosition - viewPos);
    vec3 R = reflect(I, normalize(outNormal));
    fragColor = vec4(texture(tex, R).rgb, 1.0);
    fragColor.rgb = mix(vec3(0.0, 0.0, 1.0), fragColor.rgb, 0.66);
    //fragColor = vec4(outNormal, 1.0);
}
