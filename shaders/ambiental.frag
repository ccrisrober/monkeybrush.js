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
    vec3 color = vec3(0.0, 1.0, 0.0);
    vec3 lightColor = vec3(1.0);
    
    float ambientStrength = 0.5f;
    vec3 ambient = ambientStrength * lightColor;

    vec3 result = ambient * color;
    fragColor = vec4(result, 1.0f);
}
