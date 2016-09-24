#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

uniform sampler2D noiseTex;
uniform vec3 lightPosition;

uniform vec3 viewPos;

layout ( location = 0 ) out vec4 fragColor;

uniform float Threshold;

void main()
{
    vec4 noise = texture(noiseTex, outUV);

    if (noise.a < Threshold) discard;

    vec3 color = vec3(1.0, 0.8, 0.0);

    if (!gl_FrontFacing) {
        color = vec3(0.0, 0.3, 1.0);
    }

    // Ambient
    vec3 ambient = vec3(0.5);

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

    fragColor = vec4((ambient + diffuse + specular) * color, 1.0);
}
