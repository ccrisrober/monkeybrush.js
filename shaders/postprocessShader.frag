#version 300 es
precision highp float;
uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAlbedoSpec;

out vec4 fragColor;
in vec2 texCoord;

uniform float time;

void main() {
	vec3 outPosition = texture(gPosition, texCoord).rgb;
	vec3 outNormal = texture(gNormal, texCoord).rgb;
	vec4 AlbedoSpec = texture(gAlbedoSpec, texCoord);

	/**/	
	if (outNormal == vec3(0.0, 0.0, 0.0)){ discard; } 

	vec3 ambColor = vec3(0.24725, 0.1995, 0.0745);
	vec3 objectColor = AlbedoSpec.rgb;
	vec3 specColor = vec3(0.628281, 0.555802, 0.366065);
	float shininess = 0.4;
	vec3 lightPosition = vec3(1.0);

	vec3 lightColor = vec3(1.0); //vec3(0.0, 0.0, 1.0);

	vec3 ambient = ambColor * lightColor;

	// Diffuse 
	vec3 norm = normalize(outNormal);
	vec3 lightDir = normalize(lightPosition - outPosition);
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = diff * lightColor;

	// Attenuation
	float dist    = length(lightPosition - outPosition);

	float constant = 1.0;
	float linear = 0.14;
	float quadratic = 0.07;

	float attenuation = 1.0 / (constant + linear * dist + quadratic * (dist * dist));    

	attenuation = 1.0;

	vec3 color = ((ambient + diffuse) * attenuation) * objectColor;

	fragColor = vec4(color.rgb, 1.0);
	/**/
}