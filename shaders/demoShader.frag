#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform sampler2D texSampler;

uniform vec3 viewPos;
uniform vec3 lightPosition;

void main() {
	/*fragColor = vec4(normalize(outNormal), 1.0);
	//fragColor = vec4(normalize(outPosition), 1.0);
	//fragColor = vec4(outPosition, 1.0);
	fragColor = vec4(outUV, 0.0, 1.0);

	vec3 color = texture(texSampler, normalize(outNormal).xy).rgb;
	fragColor = vec4(color, 1.0);*/

	vec3 ambColor = vec3(0.24725, 0.1995, 0.0745);
	vec3 objectColor =  texture(texSampler, outUV).rgb; //vec3(0.75164, 0.60648, 0.22648);
	vec3 specColor = vec3(0.628281, 0.555802, 0.366065);
	float shininess = 0.4;

	vec3 lightColor = vec3(1.0);

    vec3 ambient = ambColor * lightColor;

    // Diffuse 
    vec3 norm = normalize(outNormal);
    vec3 lightDir = normalize(lightPosition - outPosition);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular
    vec3 viewDir = normalize(viewPos - outPosition);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specColor * spec * lightColor;  

    // Attenuation
    float dist    = length(lightPosition - outPosition);

    float constant = 1.0;
    float linear = 0.14;
    float quadratic = 0.07;

    float attenuation = 1.0 / (constant + linear * dist + quadratic * (dist * dist));    

    attenuation = 1.0;

    vec3 result = ((ambient + diffuse + specular) * attenuation) * objectColor;

    fragColor = vec4(result, 1.0);
}