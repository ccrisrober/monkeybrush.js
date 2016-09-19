#version 300 es
precision highp float;

layout(location = 0) out vec4 gPosition;
layout(location = 1) out vec3 gNormal;
layout(location = 2) out vec4 gAlbedoSpec;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

void main() {
	vec3 color = vec3(1.0);
	gPosition.rgb = outPosition;
    gPosition.w = gl_FragCoord.z;
	gNormal = normalize(outNormal);
	gAlbedoSpec.rgb = color;
	gAlbedoSpec.a = 1.0;
}
