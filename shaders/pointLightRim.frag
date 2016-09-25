#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform sampler2D tex;

uniform vec3 viewPos;

uniform vec3 lightPosition;

const vec3 color = vec3(0.0, 1.0, 0.0);
const vec3 lightColor = vec3(1.0, 0.0, 0.0);
const vec3 RimColor = vec3(0.0, 0.0, 1.0);
const float gamma = 1.0/0.6;

void main() {

    float ambientStrength = 1.0;
    vec3 ambient = ambientStrength * lightColor;

    // Diffuse
    vec3 norm = normalize(outNormal);
    vec3 lightDir = normalize(lightPosition - outPosition);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = vec3(0.5) * diff;

    // Specular
    vec3 viewDir = normalize(viewPos - outPosition);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 1.0);
    vec3 specular = vec3(spec);

    // Attenuation
    float dst    = length(lightPosition - outPosition);
    float attenuation = 1.0f / (1.0 + 0.09 * dst + 0.032 * (dst * dst));

    //ambient  *= attenuation;
    //diffuse  *= attenuation;
    //specular *= attenuation;

    fragColor = vec4((ambient + diffuse + specular) * color, 1.0);

    //rim lighting
    float rim = 1.0 - max(dot(viewDir, norm), 0.0);
    rim = smoothstep(0.6, 1.0, rim);
    vec3 finalRim = RimColor * vec3(rim, rim, rim);

    //get all lights and texture
    vec3 finalColor = finalRim + diffuse + fragColor.rgb;

    vec3 finalColorGamma = vec3(pow(finalColor.r, gamma),
                                pow(finalColor.g, gamma),
                                pow(finalColor.b, gamma));

    fragColor = vec4(finalColorGamma, 1.0);
}
