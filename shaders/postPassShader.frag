#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 texCoord;

uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAlbedoSpec;

const int NR_LIGHTS = 32;

uniform vec3 viewPos;

void main() {
	vec3 fragPos = texture(gPosition, texCoord).rgb;
	vec3 Normal = texture(gNormal, texCoord).rgb;
	vec4 AlbedoSpec = texture(gAlbedoSpec, texCoord);

	vec3 lighthing = AlbedoSpec.rgb * 0.1;
	vec3 viewDir = normalize(viewPos - fragPos);
	for(int i = 0; i < NR_LIGHTS; ++i) {
		vec3 lightDir = normalize(ligths[i].position - fragPos);
		vec3 diffuse = max(dot(Normal, lightDir), 0.0) * AlbedoSpec.rgb * lights[i].color;
		lighthing += diffuse;
	}
	fragColor = vec4(lighthing, 1.0);
}