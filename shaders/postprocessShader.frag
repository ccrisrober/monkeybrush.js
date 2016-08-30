#version 300 es
precision highp float;
uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAlbedoSpec;

out vec4 fragColor;
in vec2 texCoord;

uniform float time;
uniform int mode;

const float near = 0.001;
const float far = 1000.0;

float LinearizeDepth(float depth)  {
    float z = depth * 2.0 - 1.0; // Back to NDC
    return (2.0 * near * far) / (far + near - z * (far - near));
}

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

    if (mode == 1) {
        fragColor = vec4(outPosition.rgb, 1.0);
    } else if (mode == 2) {
        fragColor = vec4(outNormal.rgb, 1.0);
    } else if (mode == 3) {
        fragColor = vec4(AlbedoSpec.rgb, 1.0);
    } else if (mode == 4) {
        float depth = LinearizeDepth(texture(gPosition, texCoord).w) / far; // divide by far for demonstration
        fragColor = vec4(vec3(depth), 1.0);
    }
    // apply gamma correction
    //float gamma = 2.2;
    //fragColor.rgb = pow(fragColor.rgb, vec3(1.0/gamma));
	/**/
}
