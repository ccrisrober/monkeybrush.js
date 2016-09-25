#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform sampler2D tex;

uniform vec3 viewPos;

uniform vec3 lightPosition;

void main() {
    vec3 color = vec3(1.0);

    vec3 norm = normalize(outNormal);

    vec3 lightDiffuse = vec3(1.0, 0.0, 0.0);
    vec3 lightGround = vec3(0.0, 1.0, 0.0);

    float ndl = dot(norm, lightPosition) * 0.5 + 0.5;
    vec3 lightColor = mix(lightGround, lightDiffuse, ndl);


    float ambientStrength = 0.5;
    vec3 ambient = ambientStrength * lightColor;

    // Diffuse
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
}
