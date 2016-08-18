#version 300 es
precision highp float;

layout(location = 0) out vec3 gPosition;
layout(location = 1) out vec3 gNormal;
layout(location = 2) out vec4 gAlbedoSpec;

uniform sampler2D tex;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

uniform bool usemc;

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
	vec3 color = vec3(1.0);
    if(usemc) {
        color = texture(tex, matcap(outPosition, outNormal)).rgb;
    }

	gPosition = outPosition;
	gNormal = normalize(outNormal);
	gAlbedoSpec.rgb = color;
	gAlbedoSpec.a = 1.0;
}