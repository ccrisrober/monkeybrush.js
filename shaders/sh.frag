#version 300 es
precision highp float;

in vec3 outNormal;
in vec3 outPosition;
out vec4 fragColor;

uniform vec3 cameraPos;
uniform samplerCube CubeMap;

const float invGamma = 1.0/2.2;

const mat4 mSH_R =mat4( 0.0151426, 0.0441249, -0.0200723, 0.040842, 0.0441249, -0.0151426, 0.0147908, 0.161876, -0.0200723, 0.0147908, 0.0476559, 0.016715, 0.040842, 0.161876, 0.016715, 0.394388);
const mat4 mSH_G =mat4( 0.0158047, -0.0553513, -0.0183098, -0.0649404, -0.0553513, -0.0158047, 0.0294534, 0.147578, -0.0183098, 0.0294534, -0.0211293, 0.030445, -0.0649404, 0.147578, 0.030445, 0.381122);
const mat4 mSH_B =mat4( -0.00060538, -0.143711, -0.0279153, -0.15276, -0.143711, 0.00060538, 0.0364631, 0.183909, -0.0279153, 0.0364631, -0.0566425, 0.0386598, -0.15276, 0.183909, 0.0386598, 0.419227);

void main() {
    vec4 nor = vec4(normalize(outNormal),1.0);
    vec3 col;
    col.x = dot(nor,(mSH_R*nor));
    col.y = dot(nor,(mSH_G*nor));
    col.z = dot(nor,(mSH_B*nor));
    //Gamma correction
    fragColor = vec4(pow(col.xyz, vec3(invGamma)),1.0);
}