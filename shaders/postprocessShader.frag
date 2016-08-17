#version 300 es
precision highp float;
/*uniform sampler2D dataTexture;*/

out vec4 fragColor;
in vec2 texCoord;

uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAlbedoSpec;

uniform float time;

void main() {
	vec3 fragPos = texture(gPosition, texCoord).rgb;
	vec3 Normal = texture(gNormal, texCoord).rgb;
	vec4 AlbedoSpec = texture(gAlbedoSpec, texCoord);
	fragColor = vec4(AlbedoSpec.rgb, 1.0);
	//fragColor = vec4(texCoord, 0.0, 1.0);
	//fragColor.rgb = vec3(cos(time), 0.0, 1.0);
}