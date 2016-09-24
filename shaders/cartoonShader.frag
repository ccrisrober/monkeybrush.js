#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform sampler2D tex;
uniform vec3 lightPosition;

uniform vec3 viewPos;

const float levels = 3.0;
const float scaleFactor = 1.0 / levels;

void main() {
    vec3 color = vec3(0.0, 1.0, 0.0);

    vec3 s = normalize( lightPosition - outPosition );
    float cosine = max( 0.0, dot( s, outNormal ) );
    vec3 diffuse = color * floor( cosine * levels ) * scaleFactor;
    fragColor = vec4(vec3(1.0) * (vec3(0.3) + diffuse), 1.0);
}
