#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform float iGlobalTime;

void main() {
	fragColor = vec4(uv,0.5+0.5*sin(iGlobalTime), 1.0);
}
