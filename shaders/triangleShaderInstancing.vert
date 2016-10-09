#version 300 es
precision highp float;

layout(location = 0) in vec3 position;

flat out int instance;

void main() {
    instance = gl_InstanceID;
    gl_Position = vec4(
        position.xy + vec2(
            float(gl_InstanceID) * 0.5 - 3.0,
            cos(float(gl_InstanceID)/10.0*2.0*3.14))*0.2,
        0.0,
        1.0);
}
