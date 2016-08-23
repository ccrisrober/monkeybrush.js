#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform sampler2D texSampler;

uniform vec3 viewPos;

in vec3 lp;


// TODO: Se puede hacer el cálculo en vértices para ahorrar ;)
vec2 matcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);

    float m = 2.0 * sqrt(
        pow(reflected.x, 2.0) +
        pow(reflected.y, 2.0) +
        pow(reflected.z + 1.0, 2.0)
    );

    return reflected.xy / m + 0.5;
}

vec2 minMaxDist = vec2(10.0, 100.0);

void colorWithFog(out vec3 color) {
    vec3 viewDir = normalize(viewPos - outPosition);
    float dst = length(outPosition - viewPos);

    float minDist = minMaxDist.x;
    float maxDist = minMaxDist.y;
    vec3 fogColor = vec3(1.0);
    float fogFactor;

    fogFactor = (maxDist - dst) / (maxDist - minDist);

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    color = mix(fogColor, color, fogFactor);
}

const float levels = 5.0;
const float thickness = 0.1;

void main() {
	/*fragColor = vec4(normalize(outNormal), 1.0);
	//fragColor = vec4(normalize(outPosition), 1.0);
	//fragColor = vec4(outPosition, 1.0);
	fragColor = vec4(outUV, 0.0, 1.0);
	vec3 color = texture(texSampler, normalize(outNormal).xy).rgb;
	fragColor = vec4(color, 1.0);*/

	vec3 ambColor = vec3(0.24725, 0.1995, 0.0745);
	vec3 objectColor = /*texture(texSampler, outUV).rgb;//*/vec3(1.0, 0.0, 0.0);
	vec3 specColor = vec3(0.628281, 0.555802, 0.366065);
	float shininess = 0.4;

	vec3 lightColor = vec3(1.0);

    vec3 ambient = ambColor * lightColor;

    // Diffuse 
    vec3 norm = normalize(outNormal);


    vec3 viewDir = normalize(viewPos - outPosition);
    /*if (abs(dot(viewDir, norm)) < thickness) {
        fragColor = vec4(vec3(0.0), 1.0);
        return;
    }*/

    vec3 lightDir = normalize(lp - outPosition);
    float diff = max(dot(norm, lightDir), 0.0);
    diff = floor(diff * levels) * (1.0 / levels);
    vec3 diffuse = diff * lightColor;

    // Specular
    /*vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);*/
    vec3 halfwayDir = normalize(lightDir + viewDir);  
    float spec = pow(max(dot(norm, halfwayDir), 0.0), 16.0);
    vec3 specular = specColor * spec * lightColor;

    // Attenuation
    float dist    = length(lp - outPosition);

    float constant = 1.0;
    float linear = 0.14;
    float quadratic = 0.07;

    float attenuation = 1.0 / (constant + linear * dist + quadratic * (dist * dist));    

    //attenuation = 1.0;

    vec3 result = ((ambient + diffuse + specular) * attenuation) * objectColor;

    fragColor = vec4(result, 1.0);

    //float avg = (fragColor.r + fragColor.g + fragColor.b) / 3.0;
    //float avg2 = (0.2126 * fragColor.r + 0.7152 * fragColor.g + 0.0722 * fragColor.b);
    //fragColor.xyz = vec3(avg2);
	
    // apply gamma correction
    //float gamma = 2.2;
    //fragColor.rgb = pow(fragColor.rgb, vec3(1.0/gamma));
    //fragColor = texture(texSampler, matcap(outPosition, norm));
    // Apply fog
    //colorWithFog(fragColor.rgb);

    fragColor = vec4(normalize(outNormal), 1.0);
}