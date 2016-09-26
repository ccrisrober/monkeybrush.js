#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;

out vec3 outPosition;
out vec3 outNormal;
out vec3 ReflectVec;
out vec3 ViewVec;
out float NdotL;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform vec3 viewPos;

void main() {
    outPosition = vec3(model * vec4(position, 1.0));

	gl_Position = projection * view * vec4(outPosition, 1.0);
	mat3 normalMatrix = mat3(inverse(transpose(model)));
	outNormal = normalize(normalMatrix * normal);

    vec3 lightVec = normalize(viewPos - outPosition);
    ReflectVec = normalize(reflect(-lightVec, outPosition));
    ViewVec = normalize(-outPosition);
    NdotL = (dot(lightVec, outNormal) + 1.0) * 0.5;
}
