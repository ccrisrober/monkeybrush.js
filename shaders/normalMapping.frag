#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;
uniform vec3 lightPosition;

out vec4 fragColor;

uniform sampler2D texDiffuse;

uniform vec3 viewPos;

void main() {
    vec3 color = texture(texDiffuse, outUV).rgb;

    // Ambient
    vec3 ambient = vec3(0.2);

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

    ambient  *= attenuation;
    diffuse  *= attenuation;
    specular *= attenuation;

    fragColor = vec4((ambient + diffuse + specular) * color, 1.0);
}
