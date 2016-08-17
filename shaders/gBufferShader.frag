#version 300 es
precision highp float;

layout(location = 0) out vec3 gPosition;
layout(location = 1) out vec3 gNormal;
layout(location = 2) out vec4 gAlbedoSpec;

in vec3 outPosition;
in vec3 outNormal;
in vec2 texCoords;

void main() {
	gPosition = outPosition;
	gNormal = normalize(outNormal);
	gAlbedoSpec.rgb = vec3(1.0, 0.0, 0.0);
	gAlbedoSpec.a = 1.0;
}